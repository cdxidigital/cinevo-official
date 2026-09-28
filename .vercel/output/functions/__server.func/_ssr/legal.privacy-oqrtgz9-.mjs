import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PublicFrame } from "./public-frame-CUvjz-ZF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal.privacy-oqrtgz9-.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicFrame, {
		kicker: "PRIVACY",
		title: "Your media stays yours.",
		lede: "CINEVO is a private house for libraries you control. It is not a public streaming service.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sign-in uses Google, X, or email and a password. Your username is how friends address a share. It is not a public profile." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Libraries" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Folder scans keep names in this browser. Plex and Jellyfin credentials stay with those servers. CINEVO indexes the titles you choose so the house can list them. Playback is proxied. Files are not republished." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "On this device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Progress, My List, theme, and layout stay in this browser until you clear local data in Settings." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Ask CINEVO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Suggestions run only after you opt in, and only against titles already in this house. Nothing is asked until you send a question." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sharing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"An invite shows a catalog to one username. It does not copy files. Manage invites from ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					search: { core: "sharing" },
					children: "Sharing"
				}),
				"."
			] })] })
		]
	});
}
//#endregion
export { Privacy as component };
