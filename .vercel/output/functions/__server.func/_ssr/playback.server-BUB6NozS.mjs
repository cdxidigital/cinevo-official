import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as serverAddressError, i as plexStreamTarget, n as jellyfinStreamTarget, r as nodeStreamTarget } from "./playback-urls-D1az5Dji.mjs";
import { r as getSql } from "./db-Om--2ukh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playback.server-BUB6NozS.js
var playback_server_exports = /* @__PURE__ */ __exportAll({
	createTicket: () => createTicket,
	loadTicket: () => loadTicket
});
function ticketId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
	return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
async function createTicket(input) {
	const uri = input.uri.trim();
	const key = input.key.trim();
	const token = input.token.trim();
	if (!uri || !key || !token) return {
		ok: false,
		error: "Missing playback details."
	};
	const blocked = serverAddressError(uri);
	if (blocked) return {
		ok: false,
		error: blocked
	};
	const clientId = input.clientId || "cinevo-web";
	const fit = input.fit === "compatible" ? "compatible" : "original";
	const target = input.provider === "plex" ? plexStreamTarget(uri, key, token, clientId, fit) : input.provider === "jellyfin" ? jellyfinStreamTarget(uri, key, token, clientId, fit) : nodeStreamTarget(uri, token, key, clientId);
	const id = ticketId();
	const expires = new Date(Date.now() + 72e5).toISOString();
	const sql = await getSql();
	await sql`delete from cinevo_play_tickets where expires_at < now()`;
	await sql`
    insert into cinevo_play_tickets (id, user_id, provider, url, headers, expires_at)
    values (${id}, ${input.userId}, ${input.provider}, ${target.url}, ${JSON.stringify(target.headers)}, ${expires}::timestamptz)
  `;
	return {
		ok: true,
		src: `/api/stream/${id}`
	};
}
async function loadTicket(id) {
	const row = (await (await getSql())`
    select url, headers, expires_at::text from cinevo_play_tickets
    where id = ${id} and expires_at > now()
  `)[0];
	if (!row) return null;
	let headers = {};
	try {
		headers = typeof row.headers === "string" ? JSON.parse(row.headers) : row.headers;
	} catch {
		headers = {};
	}
	return {
		url: row.url,
		headers
	};
}
//#endregion
export { playback_server_exports as n, loadTicket as t };
