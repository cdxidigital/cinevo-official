import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useCinevo, d as Logo, et as remoteTitle, n as Route$3 } from "./router-DnPGrcCK.mjs";
import { s as openShare } from "./sharing-Bp4Capic.mjs";
import { n as SignedOut, t as SignedIn } from "./gates-C1ygJCE8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s._token-Bg8pw98D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SharedInvite() {
	const { token } = Route$3.useParams();
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const [pending, setPending] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [pack, setPack] = (0, import_react.useState)(null);
	const [added, setAdded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		openShare({ data: { token } }).then((res) => {
			if (!live) return;
			if (!res.ok) setError(res.error);
			else setPack(res);
		}).catch(() => {
			if (live) setError("Could not open that invite.");
		}).finally(() => {
			if (live) setPending(false);
		});
		return () => {
			live = false;
		};
	}, [token]);
	const accept = () => {
		if (!pack) return;
		const titles = pack.titles.map((t) => remoteTitle({
			id: `shared-${t.id}`,
			title: t.title,
			year: t.year,
			kind: t.kind === "series" ? "series" : "movie",
			synopsis: t.synopsis,
			source: "shared",
			sourceLabel: `${pack.ownerUsername} · ${t.sourceLabel}`,
			genre: t.genre
		}));
		addRemoteTitles(titles, {
			id: `shared-${token}`,
			kind: "shared",
			name: `@${pack.ownerUsername}`,
			selected: true,
			count: titles.length
		});
		setAdded(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-cine-bg px-5 py-16 text-cine-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						size: "lg",
						layout: "stacked"
					})
				}),
				pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-cine-muted",
					children: "Opening invite…"
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-cine-danger",
					children: error
				}) : null,
				pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
						children: "CINEVO · SHARED LIBRARY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-ui text-4xl font-semibold leading-tight tracking-tight",
						children: [
							"@",
							pack.ownerUsername,
							" opened a house for you."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-cine-muted",
						children: [
							pack.titles.length,
							" titles from ",
							pack.libraries.join(", ") || "their library",
							". Playback stays on their Plex or Jellyfin — CINEVO only shares the index."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 grid gap-2",
						children: pack.titles.slice(0, 12).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-cine-elevated px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "font-ui",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 font-mono text-xs text-cine-faint",
								children: [
									t.year,
									" · ",
									t.source
								]
							})]
						}, t.id))
					}),
					added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app",
						className: "house-btn house-btn--play mt-8 inline-flex",
						children: "Open in CINEVO"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: accept,
						className: "house-btn house-btn--play mt-8",
						children: "Add to my house"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: { mode: "in" },
						className: "house-btn house-btn--play mt-8 inline-flex",
						children: "Sign in to accept"
					}) })] })
				] }) : null
			]
		})
	});
}
//#endregion
export { SharedInvite as component };
