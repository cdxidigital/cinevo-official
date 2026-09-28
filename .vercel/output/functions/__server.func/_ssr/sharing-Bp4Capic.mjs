import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Crq10mwm.mjs";
import { t as authClient } from "./client-Bfv0ii3R.mjs";
import { R as createSsrRpc } from "./router-DnPGrcCK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sharing-Bp4Capic.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var claimUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("f742f8d7a30fe6eb49996cb6b0306b8201fa2f0d7399acc54c534c063424a525"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e89ce23a72f695aa6514163b0d0ccdfd8b7c4ecff4d273bc467ecade4fbacdf0"));
var bumpWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("debfda2e105582d9114e12506bb512408a0400e2edcc3ba5b30ed4bed7eb8698"));
var lookupUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("c7ceec7cc6bf5575eac80724623fad4deb5b4ab2d639cf98ac11a39677e3aae0"));
var createShare = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d429d5e0c291120cfe1a14773f50a5c733edabfa4a01a292303538ee81e25668"));
var listMyShares = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("548da63b383aa8cc09c51a5899533646c52f4c68cb8c2ef2e2c9cccaa1c52f95"));
var setShareStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("319831f9a0af4c9103bf2458ab04d2536541d51dcf0f07e47fa151922a056284"));
var openShare = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("13efa651e638069cac1f159f51b3c7c2b18d85d5124730adcd04341390d3eb29"));
//#endregion
export { listMyShares as a, setShareStatus as c, getMyProfile as i, useCurrentUser as l, claimUsername as n, lookupUsername as o, createShare as r, openShare as s, bumpWatch as t, useCurrentUserState as u };
