import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, v as Navigate, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as sessionTokenFromAuthResponse, i as rememberSessionToken, o as signIn, t as authClient } from "./client-Bfv0ii3R.mjs";
import { o as GROK_PROVIDERS } from "./verify.server-BvKSE9O1.mjs";
import { d as Logo, r as Route$10 } from "./router-DnPGrcCK.mjs";
import { n as claimUsername, u as useCurrentUserState } from "./sharing-Bp4Capic.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-wANPx91v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const nav = useNavigate();
	const { mode: initial, room, core, error: oauthError } = Route$10.useSearch();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)(initial);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMode(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		if (!oauthError) return;
		setError("Google or X did not finish signing in. Try again, or use email.");
	}, [oauthError]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-28 animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-10 w-56 animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-4 w-full animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-12 w-full animate-pulse rounded-xl bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-12 w-full animate-pulse rounded-xl bg-cine-surface" })
			]
		})
	});
	if (!isPending && user && !user.isDevFallback) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/app",
		search: {
			...room ? { room } : {},
			...core ? { core } : {}
		}
	});
	const afterEmail = async (name) => {
		if (name.trim()) try {
			await claimUsername({ data: {
				username: name.trim(),
				display: name.trim()
			} });
		} catch {}
		nav({
			to: "/app",
			search: {
				...room ? { room } : {},
				...core ? { core } : {}
			}
		});
	};
	const keepSession = { onSuccess(context) {
		rememberSessionToken(sessionTokenFromAuthResponse(context.response.headers.get("set-auth-token")));
	} };
	const submit = async (e) => {
		e.preventDefault();
		setError("");
		setPending(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: username.trim() || email.split("@")[0],
					fetchOptions: keepSession
				});
				if (err) {
					setError(err.message || "Could not create that account.");
					return;
				}
				await afterEmail(username);
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password,
					fetchOptions: keepSession
				});
				if (err) {
					setError(err.message || "Email or password did not match.");
					return;
				}
				nav({
					to: "/app",
					search: {
						...room ? { room } : {},
						...core ? { core } : {}
					}
				});
			}
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Sign-in failed.");
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						size: "lg",
						layout: "stacked"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
					children: "CINEVO · PRIVATE CINEMA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-ui text-4xl font-semibold leading-tight tracking-tight",
					children: mode === "up" ? "Create your house." : "Take your seat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-cine-muted",
					children: "A username lets friends share Plex and Jellyfin catalogs with you. Your dashboard stays private until you sign in."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								signIn(p.providerId, { callbackURL: `/app${room || core ? `?${new URLSearchParams({
									...room ? { room } : {},
									...core ? { core } : {}
								}).toString()}` : ""}` }).catch((err) => {
									setError(err instanceof Error ? err.message : "Could not start that sign-in.");
								});
							},
							className: "h-12 rounded-xl border border-cine-border bg-cine-elevated font-ui text-sm font-bold hover:border-cine-cyan",
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "my-5 text-center font-ui text-xs font-medium uppercase tracking-[0.12em] text-cine-muted",
						children: "or email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void submit(e),
						className: "grid gap-3",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: username,
								onChange: (e) => setUsername(e.target.value),
								placeholder: "Username",
								autoComplete: "username",
								"aria-label": "Username",
								required: true,
								minLength: 3,
								maxLength: 20,
								pattern: "[A-Za-z][A-Za-z0-9_]{2,19}",
								title: "3–20 letters, numbers, or underscores, starting with a letter",
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "Email",
								autoComplete: "email",
								required: true,
								"aria-label": "Email",
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Password",
								autoComplete: mode === "up" ? "new-password" : "current-password",
								required: true,
								minLength: 8,
								"aria-label": "Password",
								className: "h-12 rounded-xl border border-cine-border bg-cine-well px-4 font-ui"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-cine-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-cine-faint",
								children: ["Password at least 8 characters.", mode === "up" ? " Username: 3–20 letters, numbers, or underscores." : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pending,
								className: "house-btn house-btn--play h-12 w-full",
								children: pending ? "Working…" : mode === "up" ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-5 font-ui text-sm text-cine-cyan",
						onClick: () => {
							setMode(mode === "up" ? "in" : "up");
							setError("");
						},
						children: mode === "up" ? "Already have a house? Sign in" : "New here? Create an account"
					})
				] })
			]
		})
	});
}
//#endregion
export { Login as component };
