import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { i as parsePlexSections, n as parsePlexMetadata, r as parsePlexResources, s as rankConnections } from "./plex-D48pAzQq.mjs";
import { t as authMiddleware } from "./middleware-Crq10mwm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plex-api-Cycp1qWw.js
function plexHeaders(clientId, token) {
	return {
		Accept: "application/json",
		"X-Plex-Product": "CINEVO",
		"X-Plex-Client-Identifier": clientId,
		"X-Plex-Version": "1.0.0",
		"X-Plex-Platform": "Web",
		"X-Plex-Device": "Web",
		"X-Plex-Device-Name": "CINEVO",
		...token ? { "X-Plex-Token": token } : {}
	};
}
async function plexJson(url, headers, ms = 8e3, init = {}) {
	const res = await fetch(url, {
		...init,
		headers: {
			...headers,
			...init.headers
		},
		signal: AbortSignal.timeout(ms)
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const row = Array.isArray(data) ? {} : data;
		throw new Error(String(row.error || row.message || `Plex returned ${res.status}`));
	}
	return data;
}
var plexStartPin_createServerFn_handler = createServerRpc({
	id: "8fdebd237b20b8988d4b74313d86857020fb83c844c4c09a52255338ac0a62c2",
	name: "plexStartPin",
	filename: "src/lib/plex-api.ts"
}, (opts) => plexStartPin.__executeServer(opts));
var plexStartPin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(plexStartPin_createServerFn_handler, async ({ data }) => {
	const clientId = data.clientId.trim();
	if (!clientId) return {
		ok: false,
		error: "Missing Plex client id."
	};
	try {
		const body = await plexJson("https://plex.tv/api/v2/pins?strong=true", plexHeaders(clientId), 8e3, { method: "POST" });
		const id = Number(body.id);
		const code = String(body.code || "");
		if (!id || !code) return {
			ok: false,
			error: "Plex did not issue a sign-in pin."
		};
		return {
			ok: true,
			id,
			code
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not start Plex sign-in."
		};
	}
});
var plexPollPin_createServerFn_handler = createServerRpc({
	id: "b1a629896a5a292418e73f888427598ab0a902c8f963c938f2e4cd8a5ed40586",
	name: "plexPollPin",
	filename: "src/lib/plex-api.ts"
}, (opts) => plexPollPin.__executeServer(opts));
var plexPollPin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(plexPollPin_createServerFn_handler, async ({ data }) => {
	try {
		const body = await plexJson(`https://plex.tv/api/v2/pins/${data.pinId}`, plexHeaders(data.clientId), 6e3);
		return {
			ok: true,
			token: (typeof body.authToken === "string" ? body.authToken : "") || null
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Plex sign-in timed out."
		};
	}
});
var plexListServers_createServerFn_handler = createServerRpc({
	id: "fe32bd140d3583c344ef891531d16c93349abb6d1e02a5fadc3e79e692953852",
	name: "plexListServers",
	filename: "src/lib/plex-api.ts"
}, (opts) => plexListServers.__executeServer(opts));
var plexListServers = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(plexListServers_createServerFn_handler, async ({ data }) => {
	const headers = plexHeaders(data.clientId, data.token);
	try {
		const [userRaw, resources] = await Promise.all([plexJson("https://plex.tv/api/v2/user", headers), plexJson("https://plex.tv/api/v2/resources?includeHttps=1&includeRelay=1", headers)]);
		const user = userRaw;
		const servers = parsePlexResources(resources);
		return {
			ok: true,
			username: String(user.username || user.title || user.email || "Plex"),
			servers
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not list Plex servers."
		};
	}
});
var plexOpenServer_createServerFn_handler = createServerRpc({
	id: "3b4bb4c4449e4f7cbed728d66d982ae6de5dcd43acca1136797adc964162c2ee",
	name: "plexOpenServer",
	filename: "src/lib/plex-api.ts"
}, (opts) => plexOpenServer.__executeServer(opts));
var plexOpenServer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(plexOpenServer_createServerFn_handler, async ({ data }) => {
	const token = data.server.accessToken || data.token;
	const ranked = rankConnections(data.server.connections);
	if (!ranked.length) return {
		ok: false,
		error: "That server has no reachable connections."
	};
	let last = "Could not reach that Plex server from here.";
	for (const conn of ranked) try {
		const body = await plexJson(`${conn.uri}/library/sections`, {
			...plexHeaders(data.clientId, token),
			"X-Plex-Token": token
		}, conn.local ? 2500 : 6e3);
		const sections = parsePlexSections(body);
		return {
			ok: true,
			uri: conn.uri,
			kind: conn.relay ? "relay" : conn.local ? "local" : "remote",
			sections
		};
	} catch (err) {
		last = err instanceof Error ? err.message : last;
	}
	return {
		ok: false,
		error: last
	};
});
var plexImportSections_createServerFn_handler = createServerRpc({
	id: "a2c3c4f890996a4f965cfe90be75b904e1ef7c0d41c7a73da07e74c8d6682ac0",
	name: "plexImportSections",
	filename: "src/lib/plex-api.ts"
}, (opts) => plexImportSections.__executeServer(opts));
var plexImportSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(plexImportSections_createServerFn_handler, async ({ data }) => {
	const headers = {
		...plexHeaders(data.clientId, data.token),
		"X-Plex-Token": data.token
	};
	const titles = [];
	try {
		for (const key of data.sectionKeys.slice(0, 12)) {
			const body = await plexJson(`${data.uri}/library/sections/${encodeURIComponent(key)}/all?X-Plex-Container-Start=0&X-Plex-Container-Size=80`, headers, 12e3);
			titles.push(...parsePlexMetadata(body, data.sourceLabel));
		}
		const seen = /* @__PURE__ */ new Set();
		return {
			ok: true,
			titles: titles.filter((t) => seen.has(t.id) ? false : (seen.add(t.id), true))
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not import that Plex library."
		};
	}
});
//#endregion
export { plexImportSections_createServerFn_handler, plexListServers_createServerFn_handler, plexOpenServer_createServerFn_handler, plexPollPin_createServerFn_handler, plexStartPin_createServerFn_handler };
