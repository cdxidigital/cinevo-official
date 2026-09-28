import { n as factsFromJellyfin, r as factsFromPlex } from "./artwork-model-BKkPUVTK.mjs";
import { n as parsePlexMetadata } from "./plex-D48pAzQq.mjs";
import { a as serverAddressError } from "./playback-urls-D1az5Dji.mjs";
import { r as getSql } from "./db-Om--2ukh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artwork.server-BrIBCLDn.js
function ticketId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
	return `a${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
function plexHeaders(clientId, token) {
	return {
		Accept: "application/json",
		"X-Plex-Token": token,
		"X-Plex-Product": "CINEVO",
		"X-Plex-Client-Identifier": clientId || "cinevo-web",
		"X-Plex-Platform": "Chrome",
		"X-Plex-Version": "1.0.0"
	};
}
function jellyfinHeader(clientId, token) {
	return {
		Accept: "application/json",
		"X-Emby-Token": token,
		"X-Emby-Authorization": `MediaBrowser Client="CINEVO", Device="Web", DeviceId="${clientId || "cinevo-web"}", Version="1.0.0", Token="${token}"`
	};
}
async function createArtTicket(input) {
	const uri = input.uri.trim().replace(/\/$/, "");
	const blocked = serverAddressError(uri);
	if (blocked) return {
		ok: false,
		error: blocked
	};
	if (!input.token.trim()) return {
		ok: false,
		error: "Missing library token."
	};
	const headers = input.provider === "plex" ? plexHeaders(input.clientId || "", input.token.trim()) : jellyfinHeader(input.clientId || "", input.token.trim());
	const id = ticketId();
	const expires = new Date(Date.now() + 2592e6).toISOString();
	await (await getSql())`
    insert into cinevo_play_tickets (id, user_id, provider, url, headers, expires_at)
    values (${id}, ${input.userId}, ${`art-${input.provider}`}, ${uri}, ${JSON.stringify(headers)}, ${expires}::timestamptz)
  `;
	return {
		ok: true,
		ticket: id
	};
}
async function plexItems(uri, token, clientId, keys) {
	const items = [];
	const headers = plexHeaders(clientId, token);
	for (let i = 0; i < keys.length; i += 20) {
		const chunk = keys.slice(i, i + 20).map((key) => key.replace(/^plex-/, "")).filter(Boolean);
		if (!chunk.length) continue;
		try {
			const res = await fetch(`${uri}/library/metadata/${chunk.join(",")}`, {
				headers,
				signal: AbortSignal.timeout(12e3)
			});
			if (!res.ok) continue;
			const body = await res.json();
			for (const row of parsePlexMetadata(body, "")) {
				const facts = factsFromPlex({
					summary: row.synopsis,
					year: row.year,
					rating: row.rating,
					Genre: row.genres.map((tag) => ({ tag })),
					Role: row.cast.map((tag) => ({ tag })),
					Director: row.director ? [{ tag: row.director }] : [],
					thumb: row.posterPath,
					art: row.stillPath
				}, row.ratingKey);
				items.push({
					id: row.id,
					...facts,
					runtime: row.runtime || facts.runtime
				});
			}
		} catch {}
	}
	return items;
}
async function jellyfinItems(uri, token, clientId, userId, keys) {
	const ids = keys.map((key) => key.replace(/^jellyfin-/, "").replace(/^jf-/, "")).filter(Boolean);
	if (!ids.length) return [];
	const headers = jellyfinHeader(clientId, token);
	const params = new URLSearchParams({
		Ids: ids.slice(0, 80).join(","),
		Fields: "Overview,Genres,People,ProductionYear,PremiereDate,RunTimeTicks,CommunityRating,ImageTags,BackdropImageTags"
	});
	const path = userId ? `/Users/${encodeURIComponent(userId)}/Items?${params}` : `/Items?${params}`;
	try {
		const res = await fetch(`${uri}${path}`, {
			headers,
			signal: AbortSignal.timeout(12e3)
		});
		if (!res.ok) return [];
		return ((await res.json()).Items || []).slice(0, 80).map((item) => {
			const row = item;
			const facts = factsFromJellyfin(row);
			return {
				id: `jellyfin-${row.Id || ""}`,
				...facts
			};
		});
	} catch {
		return [];
	}
}
async function refreshArtwork(input) {
	const ticket = await createArtTicket(input);
	if (!ticket.ok) return ticket;
	const uri = input.uri.trim().replace(/\/$/, "");
	const keys = input.keys.map((key) => key.trim()).filter(Boolean).slice(0, 80);
	const items = input.provider === "plex" ? await plexItems(uri, input.token.trim(), input.clientId || "", keys) : await jellyfinItems(uri, input.token.trim(), input.clientId || "", input.userServerId || "", keys);
	return {
		ok: true,
		ticket: ticket.ticket,
		items
	};
}
//#endregion
export { refreshArtwork };
