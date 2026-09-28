import { r as factsFromPlex } from "./artwork-model-BKkPUVTK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plex-D48pAzQq.js
function plexClientId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		try {
			const key = "cinevo-plex-client";
			if (typeof localStorage !== "undefined") {
				const existing = localStorage.getItem(key);
				if (existing) return existing;
				const id = `cinevo-${crypto.randomUUID()}`;
				localStorage.setItem(key, id);
				return id;
			}
		} catch {}
		return `cinevo-${crypto.randomUUID()}`;
	}
	return "cinevo-web";
}
function plexAuthUrl(clientId, code, forwardUrl) {
	const params = new URLSearchParams({
		clientID: clientId,
		code,
		"context[device][product]": "CINEVO",
		"context[device][version]": "1.0.0",
		"context[device][platform]": "Web",
		"context[device][device]": "Web",
		"context[device][deviceName]": "CINEVO"
	});
	if (forwardUrl) params.set("forwardUrl", forwardUrl);
	return `https://app.plex.tv/auth/#!?${params.toString()}`;
}
function isPlexServer(resource) {
	return String(resource.provides || "").split(",").map((s) => s.trim().toLowerCase()).includes("server") || String(resource.product || "").toLowerCase().includes("plex media server");
}
function parsePlexConnections(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.map((c) => {
		const row = c;
		const uri = String(row.uri || "").replace(/\/$/, "");
		if (!uri) return null;
		return {
			uri,
			local: Boolean(row.local),
			relay: Boolean(row.relay),
			protocol: String(row.protocol || (uri.startsWith("https") ? "https" : "http")),
			address: String(row.address || ""),
			port: Number(row.port || 32400)
		};
	}).filter((c) => Boolean(c));
}
function rankConnections(conns) {
	return [...conns].sort((a, b) => connectionScore(b) - connectionScore(a));
}
function connectionScore(c) {
	let score = 0;
	if (c.local && !c.relay) score += 50;
	else if (!c.relay) score += 25;
	else score += 5;
	if (c.protocol === "https") score += 10;
	if (c.protocol === "http" && c.local) score += 6;
	return score;
}
function connectionKind(c) {
	if (c.relay) return "Relay";
	if (c.local) return "Local";
	return "Remote";
}
function parsePlexResources(raw) {
	const wrapped = raw;
	const list = Array.isArray(raw) ? raw : Array.isArray(wrapped?.resources) ? wrapped.resources : [];
	const servers = [];
	for (const item of list) {
		const row = item;
		if (!isPlexServer(row)) continue;
		const id = String(row.clientIdentifier || row.machineIdentifier || "");
		if (!id) continue;
		servers.push({
			id,
			name: String(row.name || "Plex server"),
			owned: Boolean(row.owned),
			productVersion: String(row.productVersion || ""),
			platform: String(row.platform || ""),
			accessToken: String(row.accessToken || ""),
			publicAddress: String(row.publicAddress || ""),
			presence: row.presence !== false,
			connections: parsePlexConnections(row.connections)
		});
	}
	return servers.sort((a, b) => Number(b.owned) - Number(a.owned) || a.name.localeCompare(b.name));
}
function parsePlexSections(raw) {
	return ((raw?.MediaContainer)?.Directory || []).map((item) => {
		const d = item;
		return {
			key: String(d.key ?? d.uuid ?? ""),
			title: String(d.title || "Library"),
			type: String(d.type || ""),
			count: Number(d.size || d.count || 0) || void 0
		};
	}).filter((s) => s.key);
}
function parsePlexMetadata(raw, sourceLabel) {
	return ((raw?.MediaContainer)?.Metadata || []).slice(0, 80).map((item) => {
		const m = item;
		const facts = factsFromPlex(m, String(m.ratingKey || ""));
		const genreTag = facts.genre || "Plex";
		return {
			id: `plex-${m.ratingKey || m.guid || m.title}`,
			ratingKey: String(m.ratingKey || ""),
			title: String(m.title || "Untitled"),
			year: String(m.year || facts.year || ""),
			kind: m.type === "show" ? "series" : "movie",
			synopsis: facts.synopsis || String(m.summary || ""),
			genre: genreTag,
			genres: facts.genres.length ? facts.genres : [genreTag],
			runtime: facts.runtime,
			rating: facts.rating,
			cast: facts.cast,
			director: facts.director,
			posterPath: facts.posterPath,
			stillPath: facts.stillPath,
			sourceLabel
		};
	});
}
//#endregion
export { plexAuthUrl as a, parsePlexSections as i, parsePlexMetadata as n, plexClientId as o, parsePlexResources as r, rankConnections as s, connectionKind as t };
