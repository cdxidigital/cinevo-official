import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-Crq10mwm.mjs";
import { r as getSql } from "./db-Om--2ukh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sharing-C_NGc1ex.js
var USERNAME_RE = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
function parseTitles(raw) {
	try {
		const data = JSON.parse(raw);
		return Array.isArray(data) ? data.slice(0, 200) : [];
	} catch {
		return [];
	}
}
function parseList(raw) {
	try {
		const data = JSON.parse(raw);
		return Array.isArray(data) ? data : [];
	} catch {
		return [];
	}
}
function token() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
	const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
	let out = "";
	for (let i = 0; i < 12; i++) out += alphabet[Math.floor(Math.random() * 31)];
	return out;
}
function normalizeUsername(value) {
	return value.trim().replace(/^@/, "");
}
var claimUsername_createServerFn_handler = createServerRpc({
	id: "f742f8d7a30fe6eb49996cb6b0306b8201fa2f0d7399acc54c534c063424a525",
	name: "claimUsername",
	filename: "src/lib/sharing.ts"
}, (opts) => claimUsername.__executeServer(opts));
var claimUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(claimUsername_createServerFn_handler, async ({ data, context }) => {
	const username = normalizeUsername(data.username);
	if (!USERNAME_RE.test(username)) return {
		ok: false,
		error: "Usernames are 3–20 letters, numbers, or underscores, starting with a letter."
	};
	const sql = await getSql();
	if ((await sql`
      select user_id from cinevo_profiles where lower(username) = ${username.toLowerCase()} and user_id <> ${context.userId}
    `).length) return {
		ok: false,
		error: "That username is taken."
	};
	const display = (data.display || username).slice(0, 40);
	try {
		await sql`
        insert into cinevo_profiles (user_id, username, display)
        values (${context.userId}, ${username}, ${display})
        on conflict (user_id) do update set username = excluded.username, display = excluded.display
      `;
	} catch {
		return {
			ok: false,
			error: "That username is taken."
		};
	}
	return {
		ok: true,
		username
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "e89ce23a72f695aa6514163b0d0ccdfd8b7c4ecff4d273bc467ecade4fbacdf0",
	name: "getMyProfile",
	filename: "src/lib/sharing.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`select username, display, xp, streak from cinevo_profiles where user_id = ${context.userId}`;
	if (!rows[0]) return {
		ok: true,
		profile: null
	};
	return {
		ok: true,
		profile: {
			username: rows[0].username,
			display: rows[0].display,
			xp: Number(rows[0].xp),
			streak: Number(rows[0].streak)
		}
	};
});
var bumpWatch_createServerFn_handler = createServerRpc({
	id: "debfda2e105582d9114e12506bb512408a0400e2edcc3ba5b30ed4bed7eb8698",
	name: "bumpWatch",
	filename: "src/lib/sharing.ts"
}, (opts) => bumpWatch.__executeServer(opts));
var bumpWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(bumpWatch_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const rows = await sql`
      select streak, last_watch::text as last_watch, xp from cinevo_profiles where user_id = ${context.userId}
    `;
	if (!rows[0]) return {
		ok: false,
		error: "Claim a username first."
	};
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const last = rows[0].last_watch ? String(rows[0].last_watch).slice(0, 10) : null;
	let streak = Number(rows[0].streak) || 0;
	if (last === today) {} else if (last) {
		const prev = /* @__PURE__ */ new Date(`${last}T00:00:00Z`);
		streak = ((/* @__PURE__ */ new Date(`${today}T00:00:00Z`)).getTime() - prev.getTime()) / 864e5 === 1 ? streak + 1 : 1;
	} else streak = 1;
	const xp = Number(rows[0].xp) + 12;
	await sql`
      update cinevo_profiles set streak = ${streak}, xp = ${xp}, last_watch = ${today}::date
      where user_id = ${context.userId}
    `;
	return {
		ok: true,
		streak,
		xp
	};
});
var lookupUsername_createServerFn_handler = createServerRpc({
	id: "c7ceec7cc6bf5575eac80724623fad4deb5b4ab2d639cf98ac11a39677e3aae0",
	name: "lookupUsername",
	filename: "src/lib/sharing.ts"
}, (opts) => lookupUsername.__executeServer(opts));
var lookupUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(lookupUsername_createServerFn_handler, async ({ data }) => {
	const username = normalizeUsername(data.username);
	const rows = await (await getSql())`
      select username, display from cinevo_profiles where lower(username) = ${username.toLowerCase()}
    `;
	if (!rows[0]) return {
		ok: false,
		error: "No CINEVO member with that username."
	};
	return {
		ok: true,
		username: rows[0].username,
		display: rows[0].display
	};
});
var createShare_createServerFn_handler = createServerRpc({
	id: "d429d5e0c291120cfe1a14773f50a5c733edabfa4a01a292303538ee81e25668",
	name: "createShare",
	filename: "src/lib/sharing.ts"
}, (opts) => createShare.__executeServer(opts));
var createShare = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createShare_createServerFn_handler, async ({ data, context }) => {
	const guest = normalizeUsername(data.guestName);
	if (!USERNAME_RE.test(guest)) return {
		ok: false,
		error: "Name the friend by their CINEVO username."
	};
	const days = Math.min(30, Math.max(1, Number(data.days) || 7));
	const libraries = (data.libraries || []).slice(0, 12);
	const titles = (data.titles || []).slice(0, 200).map((t) => ({
		id: String(t.id || "").slice(0, 80),
		title: String(t.title || "Untitled").slice(0, 160),
		year: String(t.year || "").slice(0, 8),
		kind: t.kind === "series" ? "series" : "movie",
		genre: String(t.genre || "").slice(0, 40),
		synopsis: String(t.synopsis || "").slice(0, 400),
		source: t.source === "jellyfin" ? "jellyfin" : t.source === "folder" ? "folder" : "plex",
		sourceLabel: String(t.sourceLabel || t.source).slice(0, 80)
	}));
	const sql = await getSql();
	const guestRow = await sql`
      select username from cinevo_profiles where lower(username) = ${guest.toLowerCase()}
    `;
	if (!guestRow[0]) return {
		ok: false,
		error: "No CINEVO member with that username."
	};
	const guestName = guestRow[0].username;
	const id = `share-${token()}`;
	const shareToken = token();
	const expires = new Date(Date.now() + days * 864e5).toISOString();
	await sql`
      insert into cinevo_shares (id, owner_id, token, guest_name, libraries, titles, days, status, expires_at)
      values (
        ${id},
        ${context.userId},
        ${shareToken},
        ${guestName},
        ${JSON.stringify(libraries)},
        ${JSON.stringify(titles)},
        ${days},
        ${"active"},
        ${expires}::timestamptz
      )
    `;
	return {
		ok: true,
		id,
		token: shareToken,
		expiresAt: expires
	};
});
var listMyShares_createServerFn_handler = createServerRpc({
	id: "548da63b383aa8cc09c51a5899533646c52f4c68cb8c2ef2e2c9cccaa1c52f95",
	name: "listMyShares",
	filename: "src/lib/sharing.ts"
}, (opts) => listMyShares.__executeServer(opts));
var listMyShares = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyShares_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const outgoing = await sql`
      select id, token, guest_name, libraries, titles, days, status, created_at::text, expires_at::text
      from cinevo_shares where owner_id = ${context.userId} order by created_at desc
    `;
	const me = await sql`select username from cinevo_profiles where user_id = ${context.userId}`;
	const incoming = me[0] ? await sql`
          select id, token, guest_name, libraries, titles, days, status, created_at::text, expires_at::text, owner_id
          from cinevo_shares
          where lower(guest_name) = ${me[0].username.toLowerCase()} and status = ${"active"}
            and expires_at > now()
          order by created_at desc
        ` : [];
	const ownerIds = [...new Set(incoming.map((r) => r.owner_id))];
	const owners = ownerIds.length === 0 ? [] : await Promise.all(ownerIds.map(async (id) => {
		return (await sql`
                select user_id, username from cinevo_profiles where user_id = ${id}
              `)[0];
	}));
	const ownerMap = new Map(owners.flatMap((o) => o ? [[o.user_id, o.username]] : []));
	const map = (row, ownerUsername) => ({
		id: row.id,
		token: row.token,
		guestName: row.guest_name,
		libraries: parseList(row.libraries),
		titles: parseTitles(row.titles),
		days: Number(row.days),
		status: row.status,
		createdAt: row.created_at,
		expiresAt: row.expires_at,
		ownerUsername
	});
	return {
		ok: true,
		outgoing: outgoing.map((r) => map(r)),
		incoming: incoming.map((r) => map(r, ownerMap.get(r.owner_id)))
	};
});
var setShareStatus_createServerFn_handler = createServerRpc({
	id: "319831f9a0af4c9103bf2458ab04d2536541d51dcf0f07e47fa151922a056284",
	name: "setShareStatus",
	filename: "src/lib/sharing.ts"
}, (opts) => setShareStatus.__executeServer(opts));
var setShareStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(setShareStatus_createServerFn_handler, async ({ data, context }) => {
	await (await getSql())`
      update cinevo_shares set status = ${data.status}
      where id = ${data.id} and owner_id = ${context.userId}
    `;
	return { ok: true };
});
var openShare_createServerFn_handler = createServerRpc({
	id: "13efa651e638069cac1f159f51b3c7c2b18d85d5124730adcd04341390d3eb29",
	name: "openShare",
	filename: "src/lib/sharing.ts"
}, (opts) => openShare.__executeServer(opts));
var openShare = createServerFn({ method: "POST" }).validator((input) => input).handler(openShare_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = (await sql`
      select token, guest_name, libraries, titles, days, status, expires_at::text, owner_id
      from cinevo_shares where token = ${data.token.trim()}
    `)[0];
	if (!row) return {
		ok: false,
		error: "That invite is not valid."
	};
	if (row.status !== "active") return {
		ok: false,
		error: "That invite was paused or revoked."
	};
	if (new Date(row.expires_at).getTime() < Date.now()) return {
		ok: false,
		error: "That invite has expired."
	};
	const owner = await sql`
      select username, display from cinevo_profiles where user_id = ${row.owner_id}
    `;
	return {
		ok: true,
		guestName: row.guest_name,
		libraries: parseList(row.libraries),
		titles: parseTitles(row.titles),
		days: Number(row.days),
		expiresAt: row.expires_at,
		ownerUsername: owner[0]?.username || "CINEVO member",
		ownerDisplay: owner[0]?.display || "CINEVO member"
	};
});
//#endregion
export { bumpWatch_createServerFn_handler, claimUsername_createServerFn_handler, createShare_createServerFn_handler, getMyProfile_createServerFn_handler, listMyShares_createServerFn_handler, lookupUsername_createServerFn_handler, openShare_createServerFn_handler, setShareStatus_createServerFn_handler };
