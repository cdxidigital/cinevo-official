import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { d as Logo } from "./router-DnPGrcCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-frame-CUvjz-ZF.js
var import_jsx_runtime = require_jsx_runtime();
function PublicFrame({ kicker, title, lede, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cine-bg text-cine-text",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-3 text-cine-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: "md",
					tagline: false,
					layout: "horizontal"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
				children: kicker
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-5 pb-20 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-ui text-4xl font-semibold leading-tight tracking-tight md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-cine-muted",
					children: lede
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "public-prose mt-10",
					children
				})
			]
		})]
	});
}
//#endregion
export { PublicFrame as t };
