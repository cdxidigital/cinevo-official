import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as KeyRound, C as LoaderCircle, E as Link2, R as CircleCheck, a as Unplug, h as ShieldCheck, q as ArrowLeft, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { A as useCinevo, b as revokeConnection, d as Logo, g as checkNode, s as InstallerCards, v as nodeStatus, y as pairNode } from "./router-DnPGrcCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/node-DNCv3Spb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NodePairing() {
	const nodeUrl = useCinevo((s) => s.nodeUrl);
	const setNodeUrl = useCinevo((s) => s.setNodeUrl);
	const nodeToken = useCinevo((s) => s.nodeToken);
	const setNodeSession = useCinevo((s) => s.setNodeSession);
	const clearNodeSession = useCinevo((s) => s.clearNodeSession);
	const [code, setCode] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("Install CINEVO Node on this computer, then enter its pairing code.");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [ok, setOk] = (0, import_react.useState)(Boolean(nodeToken));
	const ping = async () => {
		setLoading(true);
		try {
			const res = await checkNode(nodeUrl || "http://127.0.0.1:48184");
			setOk(res.ok);
			setMessage(res.ok ? "CINEVO Node is ready. Enter the code from its dashboard." : res.error);
		} finally {
			setLoading(false);
		}
	};
	const pair = async () => {
		if (!code.trim()) {
			setMessage("Enter the short code shown by CINEVO Node.");
			return;
		}
		setLoading(true);
		try {
			const res = await pairNode(nodeUrl || "http://127.0.0.1:48184", code);
			if (!res.ok) {
				setOk(false);
				setMessage(res.error);
				return;
			}
			setNodeSession(res.token, res.deviceId);
			const st = await nodeStatus(nodeUrl || "http://127.0.0.1:48184", res.token);
			if (st.ok) setStatus(st.status);
			setOk(true);
			setMessage("Paired for a short local session. Media-server credentials stay in CINEVO Node.");
		} finally {
			setLoading(false);
		}
	};
	const refresh = async () => {
		if (!nodeToken) return;
		setLoading(true);
		try {
			const st = await nodeStatus(nodeUrl || "http://127.0.0.1:48184", nodeToken);
			if (!st.ok) {
				clearNodeSession();
				setStatus(null);
				setMessage(st.error);
				return;
			}
			setStatus(st.status);
		} finally {
			setLoading(false);
		}
	};
	const remove = async (id) => {
		if (!nodeToken) return;
		setLoading(true);
		const res = await revokeConnection(nodeUrl || "http://127.0.0.1:48184", nodeToken, id);
		if (!res.ok) setMessage(res.error);
		else {
			setMessage("Connection removed locally.");
			await refresh();
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cine-bg text-cine-text",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex max-w-3xl items-center justify-between px-5 py-5",
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
				children: "CINEVO NODE"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative z-10 mx-auto max-w-6xl px-5 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-3 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-cine-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/node-icon.png",
								alt: "",
								className: "size-8 rounded-md"
							}), "CINEVO Node"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-ui text-4xl font-semibold leading-tight tracking-tight md:text-6xl",
							children: [
								"Your library,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"close to home."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-cine-muted",
							children: "Pair this browser with the Node running on your Mac or Windows PC. It stays on loopback, uses a ten-minute code, and never sends Plex or Jellyfin credentials to CINEVO."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3 text-sm text-cine-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										size: 15,
										className: "text-cine-cyan"
									}), " Loopback only"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
										size: 15,
										className: "text-cine-cyan"
									}), " 10-minute code"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
										size: 15,
										className: "text-cine-cyan"
									}), " Files stay on this computer"]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "glass rounded-xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "mb-5 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "block font-ui",
									children: "Connect this device"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-cine-faint",
									children: "Local pairing only"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void ping(),
									disabled: loading,
									"aria-label": "Check CINEVO Node",
									className: "flex size-11 items-center justify-center rounded-full border border-cine-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
										size: 16,
										className: loading ? "animate-spin" : ""
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-ui text-xs font-medium tracking-[0.1em] text-cine-muted",
								children: "LOCAL NODE ADDRESS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: nodeUrl,
								onChange: (e) => setNodeUrl(e.target.value),
								className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm",
								autoCapitalize: "none",
								autoCorrect: "off",
								"aria-label": "Local Node address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block font-ui text-xs font-medium tracking-[0.1em] text-cine-muted",
								children: "PAIRING CODE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: code,
								onChange: (e) => setCode(e.target.value.toUpperCase()),
								placeholder: "ABC-123",
								"aria-label": "Pairing code",
								className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-base tracking-[0.12em]",
								autoCapitalize: "characters",
								autoCorrect: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void pair(),
								disabled: loading,
								className: "mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-cine-cyan font-ui font-bold tracking-wider text-cine-bg",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 16,
									className: "animate-spin"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 16 }), "Pair with CINEVO Node"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `mt-3 flex gap-2 text-sm ${ok ? "text-cine-lime" : "text-cine-muted"}`,
								children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 14,
									className: "mt-0.5 shrink-0"
								}) : null, message]
							})
						]
					})]
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
							children: "LOCAL STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-ui mt-1 text-2xl font-semibold tracking-tight",
							children: "Connected servers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-xl text-sm text-cine-muted",
							children: [
								"Only names and addresses. Access tokens never leave Node. Device ",
								status.deviceId,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-2",
							children: status.connections.length ? status.connections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-cine-border bg-cine-surface px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "font-ui capitalize",
									children: c.provider
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-cine-faint",
									children: c.baseUrl
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex h-11 items-center gap-1 font-ui text-sm text-cine-muted",
									onClick: () => void remove(c.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { size: 14 }), " Remove"]
								})]
							}, c.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl border border-dashed border-cine-border px-4 py-6 text-sm text-cine-faint",
								children: "No local media servers yet. Add Plex or Jellyfin in the Node dashboard, then refresh."
							})
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
							children: "INSTALLERS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-ui mt-1 text-2xl font-semibold tracking-tight",
							children: "Windows and Mac nodes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 mb-5 max-w-xl text-sm text-cine-muted",
							children: "Unsigned release candidates. Loopback only. Sign and notarize before a public channel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "flow-grid flow-grid--steps mt-14",
					children: [
						[
							"01",
							"Start Node",
							"Open the installer on the computer that already hosts your library."
						],
						[
							"02",
							"Pair once",
							"Enter the code from the local dashboard. It expires after ten minutes."
						],
						[
							"03",
							"Stay in control",
							"Review connected servers here and remove them locally at any time."
						]
					].map(([n, t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-cine-border bg-cine-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-cine-cyan",
								children: n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-ui text-lg font-semibold tracking-tight",
								children: t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-cine-muted",
								children: d
							})
						]
					}, n))
				})
			]
		})]
	});
}
//#endregion
export { NodePairing as component };
