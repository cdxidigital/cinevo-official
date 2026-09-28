import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { n as factsFromJellyfin } from "./artwork-model-BKkPUVTK.mjs";
import { t as authMiddleware } from "./middleware-Crq10mwm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jellyfin-api-zxrsfFfD.js
function authHeader(deviceId, token) {
	const parts = [
		`Client="CINEVO"`,
		`Device="Web"`,
		`DeviceId="${deviceId}"`,
		`Version="1.0.0"`
	];
	if (token) parts.push(`Token="${token}"`);
	return `MediaBrowser ${parts.join(", ")}`;
}
async function jfFetch(url, headers, init = {}, ms = 1e4) {
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
		if (res.status === 401 || res.status === 403) throw new Error("Jellyfin could not verify those details.");
		throw new Error(String(data.message || data.error || `Jellyfin returned ${res.status}`));
	}
	return data;
}
function normalizeBase(url) {
	return url.trim().replace(/\/$/, "");
}
var jellyfinConnect_createServerFn_handler = createServerRpc({
	id: "4bf247dd5cb2e1f33ca4eb67235838f6f199965b4aef17e3451f0e92425689b6",
	name: "jellyfinConnect",
	filename: "src/lib/jellyfin-api.ts"
}, (opts) => jellyfinConnect.__executeServer(opts));
var jellyfinConnect = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(jellyfinConnect_createServerFn_handler, async ({ data }) => {
	const baseUrl = normalizeBase(data.baseUrl);
	const deviceId = data.clientId.trim() || "cinevo-web";
	try {
		const body = await jfFetch(`${baseUrl}/Users/AuthenticateByName`, {
			"Content-Type": "application/json",
			"X-Emby-Authorization": authHeader(deviceId)
		}, {
			method: "POST",
			body: JSON.stringify({
				Username: data.username.trim(),
				Pw: data.password
			})
		}, 12e3);
		const user = body.User ?? {};
		const token = String(body.AccessToken || "");
		if (!token || !user.Id) return {
			ok: false,
			error: "Jellyfin did not return a usable session."
		};
		return {
			ok: true,
			token,
			userId: String(user.Id),
			username: String(user.Name || data.username),
			baseUrl
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not reach that Jellyfin library from here."
		};
	}
});
var jellyfinListSections_createServerFn_handler = createServerRpc({
	id: "dda083ec9095a7d394310833eab3e2463ffca531929809b6071a9f5ead98e1c7",
	name: "jellyfinListSections",
	filename: "src/lib/jellyfin-api.ts"
}, (opts) => jellyfinListSections.__executeServer(opts));
var jellyfinListSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(jellyfinListSections_createServerFn_handler, async ({ data }) => {
	const baseUrl = normalizeBase(data.baseUrl);
	try {
		const body = await jfFetch(`${baseUrl}/Users/${encodeURIComponent(data.userId)}/Views`, { "X-Emby-Authorization": authHeader(data.clientId, data.token) });
		return {
			ok: true,
			sections: (Array.isArray(body.Items) ? body.Items : []).filter((item) => {
				const kind = String(item.CollectionType || item.Type || "").toLowerCase();
				return kind.includes("movie") || kind.includes("tv") || kind.includes("series") || !kind;
			}).map((item) => ({
				key: String(item.Id || ""),
				title: String(item.Name || "Library"),
				type: String(item.CollectionType || item.Type || "")
			})).filter((s) => s.key)
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not list Jellyfin libraries."
		};
	}
});
var jellyfinImportSections_createServerFn_handler = createServerRpc({
	id: "0abf443269b5766502610cfd9a54a85d258dbfca038b894bdd12f186b2e3fca7",
	name: "jellyfinImportSections",
	filename: "src/lib/jellyfin-api.ts"
}, (opts) => jellyfinImportSections.__executeServer(opts));
var jellyfinImportSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(jellyfinImportSections_createServerFn_handler, async ({ data }) => {
	const baseUrl = normalizeBase(data.baseUrl);
	const headers = { "X-Emby-Authorization": authHeader(data.clientId, data.token) };
	const titles = [];
	try {
		for (const key of data.sectionKeys.slice(0, 12)) {
			const params = new URLSearchParams({
				ParentId: key,
				IncludeItemTypes: "Movie,Series",
				Recursive: "true",
				Fields: "Overview,Genres,People,ProductionYear,PremiereDate,CommunityRating,RunTimeTicks,ImageTags,BackdropImageTags",
				Limit: "80",
				SortBy: "DateCreated",
				SortOrder: "Descending"
			});
			const body = await jfFetch(`${baseUrl}/Users/${encodeURIComponent(data.userId)}/Items?${params}`, headers, {}, 12e3);
			const items = Array.isArray(body.Items) ? body.Items : [];
			for (const item of items.slice(0, 80)) {
				const facts = factsFromJellyfin(item);
				titles.push({
					id: `jellyfin-${item.Id || item.Name}`,
					title: String(item.Name || "Untitled"),
					year: facts.year || (item.ProductionYear ? String(item.ProductionYear) : ""),
					kind: String(item.Type || "") === "Series" ? "series" : "movie",
					synopsis: facts.synopsis,
					genre: facts.genre || "Jellyfin",
					genres: facts.genres,
					runtime: facts.runtime,
					rating: facts.rating,
					cast: facts.cast,
					director: facts.director,
					sourceLabel: data.sourceLabel,
					path: String(item.Id || "")
				});
			}
		}
		const seen = /* @__PURE__ */ new Set();
		return {
			ok: true,
			titles: titles.filter((t) => seen.has(t.id) ? false : (seen.add(t.id), true))
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not import that Jellyfin library."
		};
	}
});
//#endregion
export { jellyfinConnect_createServerFn_handler, jellyfinImportSections_createServerFn_handler, jellyfinListSections_createServerFn_handler };
