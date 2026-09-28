import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, v as Navigate, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as artProxyUrl } from "./artwork-model-BKkPUVTK.mjs";
import { a as plexAuthUrl, o as plexClientId, t as connectionKind } from "./plex-D48pAzQq.mjs";
import { t as isLoopbackUrl } from "./playback-urls-D1az5Dji.mjs";
import { t as authMiddleware } from "./middleware-Crq10mwm.mjs";
import { B as Check, C as LoaderCircle, D as Library, F as Expand, G as Bell, H as Captions, I as Download, L as Clapperboard, M as House, N as HardDrive, O as LayoutGrid, P as FolderPlus, S as Menu, T as ListPlus, U as Cable, V as Cast, W as Bookmark, Y as Activity, _ as Server, b as Play, c as Trash2, g as Settings2, i as Volume2, j as Info, k as LayoutList, l as Star, m as Shuffle, n as Wrench, o as Tv, q as ArrowLeft, r as VolumeX, t as X, v as Search, w as List, x as Pause, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { A as useCinevo, E as writeHouseCode, F as pickFeatured, G as saveThumb, H as reconnectFolders, I as recentlyAdded, J as isVideoFile, K as THEMES, L as similarTo, M as byMood, N as filterCatalog, O as libraryPool, P as genresIn, Q as playableCount, R as createSsrRpc, S as readHouseCode, T as syncHouseRemote, U as roomFromParam, V as loadThumbs, W as saveFolderHandle, Z as mediaUrl, _ as nodePlayUrl, a as HouseRemote, d as Logo, et as remoteTitle, f as Mark, h as addNodeFolder, i as Route$13, j as MOODS, k as titleById, l as BrandKicker, m as paramFromRoom, nt as sourceForTitle, o as InstallCinevo, p as cn, q as applySourceFilter, s as InstallerCards, tt as scanFileList, u as BrandWatermark, x as openHouseRemote } from "./router-DnPGrcCK.mjs";
import { a as listMyShares, c as setShareStatus, i as getMyProfile, l as useCurrentUser, o as lookupUsername, r as createShare, t as bumpWatch, u as useCurrentUserState } from "./sharing-Bp4Capic.mjs";
import { n as SignedOut, t as SignedIn } from "./gates-C1ygJCE8.mjs";
import { r as UsernameGate, t as AuthSlot } from "./account-BpMfec7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-CNdEbbvo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var refreshLibraryArt = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("b670e38f35357464eddb77d89fbbffb163995da493c86e56e6512e69a50dc1d3"));
function sameLibrary(sourceName, label) {
	if (label === sourceName) return true;
	const handle = sourceName.replace(/^@/, "");
	return label.startsWith(`${handle} ·`) || label.startsWith(`${sourceName} ·`);
}
function ArtworkSync() {
	const hydrated = useCinevo((s) => s.hydrated);
	const sources = useCinevo((s) => s.sources);
	const remote = useCinevo((s) => s.remoteTitles);
	const local = useCinevo((s) => s.localTitles);
	const clientId = useCinevo((s) => s.plexClientId);
	const remoteKey = remote.filter((title) => title.source === "plex" || title.source === "jellyfin").map((title) => title.id).join(",");
	const localKey = local.map((title) => title.id).join(",");
	const ranRemote = (0, import_react.useRef)("");
	const ranLocal = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (!hydrated || !localKey || ranLocal.current === localKey) return;
		ranLocal.current = localKey;
		loadThumbs(localKey.split(",").filter(Boolean)).then((saved) => {
			useCinevo.getState().patchArtwork(Object.entries(saved).map(([id, url]) => ({
				id,
				poster: url,
				still: url
			})));
		});
	}, [hydrated, localKey]);
	(0, import_react.useEffect)(() => {
		if (!hydrated || !remoteKey || ranRemote.current === remoteKey) return;
		ranRemote.current = remoteKey;
		const targets = sources.filter((source) => (source.kind === "plex" || source.kind === "jellyfin") && source.baseUrl && source.accessToken);
		(async () => {
			for (const source of targets) {
				const keys = remote.filter((title) => title.source === source.kind && sameLibrary(source.name, title.sourceLabel)).map((title) => title.path || title.id).filter(Boolean).slice(0, 80);
				if (!keys.length || !source.baseUrl || !source.accessToken) continue;
				try {
					const res = await refreshLibraryArt({ data: {
						provider: source.kind === "jellyfin" ? "jellyfin" : "plex",
						uri: source.baseUrl,
						token: source.accessToken,
						clientId: clientId || "cinevo-web",
						userServerId: source.userId,
						keys
					} });
					if (!res.ok) continue;
					useCinevo.getState().patchArtwork(res.items.map((item) => ({
						id: item.id,
						poster: item.posterPath ? artProxyUrl(res.ticket, item.posterPath) : void 0,
						still: item.stillPath ? artProxyUrl(res.ticket, item.stillPath) : void 0,
						synopsis: item.synopsis,
						year: item.year,
						runtime: item.runtime,
						rating: item.rating,
						genre: item.genre,
						genres: item.genres,
						cast: item.cast,
						director: item.director
					})));
				} catch {}
			}
		})();
	}, [
		clientId,
		hydrated,
		remote,
		remoteKey,
		sources
	]);
	return null;
}
var NAV = [
	{
		id: "stage",
		label: "Home",
		icon: House
	},
	{
		id: "movies",
		label: "Movies",
		icon: Clapperboard
	},
	{
		id: "shows",
		label: "TV",
		icon: Tv
	},
	{
		id: "sidebar",
		label: "Library",
		icon: Library
	},
	{
		id: "tools",
		label: "Tools",
		icon: Wrench
	}
];
function networkMode(sources, nodeUrl, nodeToken) {
	if (sources.some((s) => (s.kind === "plex" || s.kind === "jellyfin") && s.baseUrl && !isLoopbackUrl(s.baseUrl))) return "relay";
	return sources.some((s) => s.kind === "folder" || isLoopbackUrl(s.baseUrl)) || Boolean(nodeToken && isLoopbackUrl(nodeUrl)) ? "local" : "idle";
}
function NetDot({ labeled = false }) {
	const mode = networkMode(useCinevo((s) => s.sources), useCinevo((s) => s.nodeUrl), useCinevo((s) => s.nodeToken));
	const label = mode === "local" ? "On this device" : mode === "relay" ? "Remote server" : "Nothing connected";
	if (!labeled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "net-dot",
		"data-mode": mode,
		title: label,
		"aria-label": label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "side-status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "net-dot",
			"data-mode": mode,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function LibrarySwitch() {
	const sources = useCinevo((s) => s.sources);
	const activeSourceId = useCinevo((s) => s.activeSourceId);
	const setActiveSource = useCinevo((s) => s.setActiveSource);
	const value = sources.some((source) => source.id === activeSourceId) ? activeSourceId : "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		className: "library-switch",
		"aria-label": "Library",
		value,
		onChange: (e) => setActiveSource(e.target.value),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "all",
			children: sources.length ? "All libraries" : "No library yet"
		}), sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: source.id,
			children: source.name
		}, source.id))]
	});
}
function Shell({ children, overlays }) {
	const room = useCinevo((s) => s.room);
	const setRoom = useCinevo((s) => s.setRoom);
	const setSearchOpen = useCinevo((s) => s.setSearchOpen);
	const setSettingsOpen = useCinevo((s) => s.setSettingsOpen);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setNoticesOpen = useCinevo((s) => s.setNoticesOpen);
	const unread = useCinevo((s) => s.notices.filter((n) => !n.readAt).length);
	const night = useCinevo((s) => s.prefs.nightMode);
	const zen = useCinevo((s) => s.prefs.zenMode);
	const searchOpen = useCinevo((s) => s.searchOpen);
	const settingsOpen = useCinevo((s) => s.settingsOpen);
	const coreOpen = useCinevo((s) => s.coreOpen);
	const noticesOpen = useCinevo((s) => s.noticesOpen);
	const selectedId = useCinevo((s) => s.selectedId);
	const playingId = useCinevo((s) => s.playingId);
	const party = useCinevo((s) => s.party);
	const endParty = useCinevo((s) => s.endParty);
	const navigate = useNavigate();
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	const [navHidden, setNavHidden] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!NAV.some((item) => item.id === room)) setRoom("stage");
	}, [room, setRoom]);
	(0, import_react.useEffect)(() => {
		if (!drawer) return;
		const onKey = (e) => {
			if (e.key === "Escape") setDrawer(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [drawer]);
	const overlayOpen = Boolean(searchOpen || settingsOpen || coreOpen || noticesOpen || selectedId);
	const playing = Boolean(playingId);
	(0, import_react.useEffect)(() => {
		if (!overlayOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [overlayOpen]);
	(0, import_react.useEffect)(() => {
		if (overlayOpen || drawer) {
			setNavHidden(false);
			return;
		}
		if (playing) {
			setNavHidden(true);
			return;
		}
		let t = window.setTimeout(() => setNavHidden(true), 2800);
		const poke = () => {
			setNavHidden(false);
			window.clearTimeout(t);
			t = window.setTimeout(() => setNavHidden(true), 2800);
		};
		window.addEventListener("mousemove", poke);
		window.addEventListener("keydown", poke);
		return () => {
			window.clearTimeout(t);
			window.removeEventListener("mousemove", poke);
			window.removeEventListener("keydown", poke);
		};
	}, [
		overlayOpen,
		drawer,
		playing
	]);
	const go = (id) => {
		setRoom(id);
		setDrawer(false);
		const room = paramFromRoom(id);
		navigate({
			to: "/app",
			search: (prev) => {
				const next = { ...prev };
				if (room) next.room = room;
				else delete next.room;
				return next;
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("cinevo-house", night && "cinevo-night", zen && "cinevo-zen"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "house-still" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "house-ambient" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "side-rail",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "CINEVO home",
						className: "side-rail__brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							size: "sm",
							tagline: false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "side-rail__nav",
						"aria-label": "Main",
						children: NAV.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go(item.id),
								className: cn(room === item.id && "is-on"),
								"aria-current": room === item.id ? "page" : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), item.label]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "side-rail__foot",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCoreOpen(true),
								children: "Core"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSettingsOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 18 }), "Settings"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDot, { labeled: true })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("top-nav", navHidden && "is-hidden"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "CINEVO home",
						className: "top-nav__brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							size: "sm",
							tagline: false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "top-nav__links max-md:hidden",
						"aria-label": "Main",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(item.id),
							className: cn(room === item.id && "is-on"),
							"aria-current": room === item.id ? "page" : void 0,
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "top-nav__tools",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "top-nav__icon md:hidden",
								"aria-label": "Open menu",
								onClick: () => setDrawer(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibrarySwitch, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "house-search",
								onClick: () => setSearchOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search this library" })]
							}),
							party ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "party-chip",
								onClick: endParty,
								title: "Ends the note on this screen. Playback is not synced to another device.",
								children: [
									"With ",
									party.with || "someone",
									" · End"
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "top-nav__core max-md:hidden",
								onClick: () => setCoreOpen(true),
								children: "Core"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Search",
								className: "top-nav__icon md:hidden",
								onClick: () => setSearchOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": unread ? `${unread} unread notices` : "Notices",
								className: "top-nav__icon relative",
								onClick: () => setNoticesOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-1.5 top-1.5 size-2 rounded-full bg-cine-magenta",
									"aria-hidden": "true"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Settings",
								className: "top-nav__icon md:hidden",
								onClick: () => setSettingsOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDot, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { className: "max-md:hidden" })
						]
					})
				]
			}),
			drawer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "drawer-scrim md:hidden",
				onMouseDown: () => setDrawer(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "drawer-panel",
					onMouseDown: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								size: "md",
								tagline: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close menu",
								className: "top-nav__icon",
								onClick: () => setDrawer(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						party ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "party-chip mb-3",
							onClick: () => {
								endParty();
								setDrawer(false);
							},
							children: [
								"With ",
								party.with || "someone",
								" · End"
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex flex-col gap-1",
							"aria-label": "Main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibrarySwitch, {}),
								NAV.map((item) => {
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => go(item.id),
										className: cn("flex h-11 w-full items-center gap-2 rounded-md px-3 font-ui text-sm font-medium", room === item.id ? "bg-cine-surface text-cine-text" : "text-cine-muted"),
										"aria-current": room === item.id ? "page" : void 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), item.label]
									}, item.id);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex h-11 w-full items-center rounded-md px-3 font-ui text-sm font-medium text-cine-muted",
									onClick: () => {
										setCoreOpen(true);
										setDrawer(false);
									},
									children: "Core"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 w-full items-center rounded-md px-3 font-ui text-sm font-medium text-cine-muted",
									onClick: () => {
										setNoticesOpen(true);
										setDrawer(false);
									},
									children: ["Notices", unread ? ` (${unread})` : ""]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
						})
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn("house-main", room !== "stage" && "house-main--page"),
				children
			}, room),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtworkSync, {}),
			overlays,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsernameGate, {})
		]
	});
}
function applyTitlePatch(title, patch) {
	if (!patch) return title;
	return {
		...title,
		title: patch.title?.trim() || title.title,
		year: patch.year?.trim() || title.year,
		genre: patch.genre?.trim() || title.genre,
		synopsis: patch.synopsis?.trim() || title.synopsis
	};
}
function duplicateGroups(titles) {
	const groups = /* @__PURE__ */ new Map();
	for (const title of titles) {
		const key = `${title.title.toLowerCase().replace(/\s+/g, " ").trim()}|${title.year}`;
		const list = groups.get(key) ?? [];
		list.push(title);
		groups.set(key, list);
	}
	return [...groups.values()].filter((group) => group.length > 1);
}
function tasteFrom(titles, favorites, progress) {
	const counts = /* @__PURE__ */ new Map();
	for (const title of titles) {
		const weight = (favorites.includes(title.id) ? 2 : 0) + ((progress[title.id] ?? 0) > 0 ? 1 : 0);
		if (!weight) continue;
		for (const genre of title.genres?.length ? title.genres : [title.genre]) {
			if (!genre) continue;
			counts.set(genre, (counts.get(genre) ?? 0) + weight);
		}
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([genre, count]) => ({
		genre,
		count
	}));
}
function mostPlayed(titles, plays, limit = 8) {
	const counts = /* @__PURE__ */ new Map();
	for (const play of plays) counts.set(play.titleId, (counts.get(play.titleId) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id, count]) => ({
		title: titles.find((t) => t.id === id),
		count
	})).filter((row) => Boolean(row.title)).slice(0, limit);
}
function renamePreview(title, pattern) {
	return pattern.replaceAll("{title}", title.title).replaceAll("{year}", title.year || "").replaceAll("{genre}", title.genre || "").replace(/\s+/g, " ").trim();
}
function peopleIn(titles, query) {
	const q = query.trim().toLowerCase();
	if (q.length < 2) return [];
	return titles.filter((title) => {
		return [title.director, ...title.cast ?? []].join(" ").toLowerCase().includes(q);
	}).slice(0, 12);
}
function clampNumber(value, min, max, fallback) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, n));
}
function useLibrary() {
	const local = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const filter = useCinevo((s) => s.sourceFilter);
	const activeSourceId = useCinevo((s) => s.activeSourceId);
	const sources = useCinevo((s) => s.sources);
	const patches = useCinevo((s) => s.patches);
	return (0, import_react.useMemo)(() => {
		let pool = applySourceFilter(filter, local, remote).map((title) => applyTitlePatch(title, patches[title.id]));
		if (activeSourceId && activeSourceId !== "all") {
			const source = sources.find((item) => item.id === activeSourceId);
			if (source) pool = pool.filter((title) => title.sourceLabel === source.name || title.sourceLabel?.startsWith(`${source.name} ·`));
		}
		return pool;
	}, [
		local,
		remote,
		filter,
		activeSourceId,
		sources,
		patches
	]);
}
function ArtImage({ src, fallback, className }) {
	const [current, setCurrent] = (0, import_react.useState)(src || fallback);
	(0, import_react.useEffect)(() => setCurrent(src || fallback), [src, fallback]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: current,
		alt: "",
		className,
		onError: () => {
			if (current !== fallback) setCurrent(fallback);
		}
	});
}
function PosterCard({ title, wide = false }) {
	const progress = useCinevo((s) => s.progress[title.id]);
	const fav = useCinevo((s) => s.favorites.includes(title.id));
	const openTitle = useCinevo((s) => s.openTitle);
	const play = useCinevo((s) => s.play);
	const toggleFavorite = useCinevo((s) => s.toggleFavorite);
	const art = wide ? title.still || title.poster : title.poster;
	const [broken, setBroken] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setBroken(false), [art]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("poster", wide && "poster--wide"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("poster-frame", wide && "is-wide"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => openTitle(title.id),
					"aria-label": `Open ${title.title}`,
					className: "block w-full",
					children: art && !broken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: art,
						alt: "",
						className: cn("w-full object-cover", wide ? "aspect-video" : "aspect-2/3"),
						onError: () => setBroken(true)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("poster-fallback", wide && "is-wide"),
						children: title.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "poster-shade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "poster-stamp",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
				}),
				progress != null && progress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "poster-progress",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${progress}%` } })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Play ${title.title}`,
					onClick: () => play(title.id),
					className: "poster-play",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 16,
						fill: "currentColor"
					})
				}),
				wide ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "poster-caption",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [title.runtime, progress != null && progress > 0 ? ` · ${Math.round(progress)}%` : ""] })]
				}) : null
			]
		}), wide ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "poster-meta",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => openTitle(title.id),
				className: "min-w-0 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						size: 10,
						className: "mr-1 inline",
						fill: "currentColor"
					}),
					title.rating.toFixed(1),
					" · ",
					title.year
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					title.sourceLabel || title.source,
					" · ",
					title.year
				] }) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": fav ? "Remove from My List" : "Add to My List",
				className: cn("poster-list", fav && "is-on"),
				onClick: () => toggleFavorite(title.id),
				children: fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { size: 16 })
			})]
		})]
	});
}
function Rail({ heading, titles, empty, wide = false }) {
	if (!titles.length) {
		if (!empty) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rail rail--empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "rail-heading",
				children: heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: empty })]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "rail-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "rail-heading",
				children: heading
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("rail-scroll", wide && "rail-scroll--wide"),
			children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("rail-card", wide && "is-wide"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					title: t,
					wide
				})
			}, t.id))
		})]
	});
}
var VIEWS = [
	{
		id: "grid",
		label: "Grid",
		icon: LayoutGrid
	},
	{
		id: "list",
		label: "List",
		icon: List
	},
	{
		id: "hybrid",
		label: "Hybrid",
		icon: LayoutList
	}
];
var SORTS = [
	{
		id: "title",
		label: "Title"
	},
	{
		id: "year",
		label: "Year"
	},
	{
		id: "added",
		label: "Added"
	}
];
function sortTitles(titles, sort) {
	const copy = [...titles];
	const byTitle = (a, b) => a.title.localeCompare(b.title, void 0, { sensitivity: "base" });
	if (sort === "year") copy.sort((a, b) => (b.year || "").localeCompare(a.year || "") || byTitle(a, b));
	else if (sort === "added") copy.sort((a, b) => (b.addedAt || "").localeCompare(a.addedAt || "") || byTitle(a, b));
	else copy.sort(byTitle);
	return copy;
}
function TitleActions({ title }) {
	const play = useCinevo((s) => s.play);
	const fav = useCinevo((s) => s.favorites.includes(title.id));
	const toggleFavorite = useCinevo((s) => s.toggleFavorite);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "library-actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `Play ${title.title}`,
			onClick: () => play(title.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
				size: 15,
				fill: "currentColor"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": fav ? "Remove from My List" : "Add to My List",
			className: fav ? "is-on" : void 0,
			onClick: () => toggleFavorite(title.id),
			children: fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { size: 15 })
		})]
	});
}
function Thumb({ title, className }) {
	const [broken, setBroken] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setBroken(false), [title.poster, title.id]);
	if (!title.poster || broken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("library-thumb library-thumb--empty", className),
		children: title.title.slice(0, 1)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: title.poster,
		alt: "",
		className: cn("library-thumb", className),
		onError: () => setBroken(true)
	});
}
function LibraryBoard({ titles, empty }) {
	const view = useCinevo((s) => s.prefs.libraryView);
	const sort = useCinevo((s) => s.prefs.librarySort);
	const patchPrefs = useCinevo((s) => s.patchPrefs);
	const openTitle = useCinevo((s) => s.openTitle);
	const progress = useCinevo((s) => s.progress);
	const ordered = (0, import_react.useMemo)(() => sortTitles(titles, sort), [titles, sort]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "library-board",
		children: [
			titles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "library-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: titles.length === 1 ? "1 title" : `${titles.length} titles` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "library-toolbar__controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "library-sort",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sort" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							"aria-label": "Sort library",
							value: sort,
							onChange: (event) => patchPrefs({ librarySort: event.target.value }),
							children: SORTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "library-views",
						role: "group",
						"aria-label": "Library layout",
						children: VIEWS.map((item) => {
							const Icon = item.icon;
							const on = view === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: on ? "is-on" : void 0,
								"aria-pressed": on,
								onClick: () => patchPrefs({ libraryView: item.id }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id);
						})
					})]
				})]
			}) : null,
			view === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-grid",
				children: ordered.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, { title }, title.id))
			}) : null,
			view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "library-list",
				children: ordered.map((title) => {
					const seen = progress[title.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "library-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "library-row__open",
							onClick: () => openTitle(title.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [
									title.year,
									title.kind === "series" ? "Series" : "Movie",
									title.genre,
									title.sourceLabel
								].filter(Boolean).join(" · ") }),
								seen != null && seen > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									className: "library-progress",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: `${Math.min(100, seen)}%` } })
								}) : null
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleActions, { title })]
					}, title.id);
				})
			}) : null,
			view === "hybrid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "library-hybrid",
				children: ordered.map((title) => {
					const seen = progress[title.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "library-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Open ${title.title}`,
							onClick: () => openTitle(title.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
								title,
								className: "is-card"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "library-card__title",
								onClick: () => openTitle(title.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title.title })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [[
								title.year,
								title.runtime,
								title.genre,
								title.sourceLabel
							].filter(Boolean).join(" · "), title.rating > 0 ? ` · ${title.rating.toFixed(1)}` : ""] }),
							title.synopsis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "library-card__synopsis",
								children: title.synopsis
							}) : null,
							seen != null && seen > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "library-progress",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: `${Math.min(100, seen)}%` } })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleActions, { title })
						] })]
					}, title.id);
				})
			}) : null,
			!titles.length && empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "library-empty",
				children: empty
			}) : null
		]
	});
}
function fileToDataUrl(file) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
		reader.onerror = () => resolve(null);
		reader.readAsDataURL(file);
	});
}
function sidecarImage(file, files) {
	const dir = (file.webkitRelativePath || file.name).split("/").slice(0, -1).join("/");
	const stem = file.name.replace(/\.[^.]+$/, "").toLowerCase();
	return files.find((candidate) => {
		if (!/\.(jpe?g|png|webp)$/i.test(candidate.name)) return false;
		if ((candidate.webkitRelativePath || candidate.name).split("/").slice(0, -1).join("/") !== dir) return false;
		const name = candidate.name.toLowerCase();
		return name.startsWith(stem) || /^(poster|cover|folder|thumb|landscape|backdrop)/.test(name);
	});
}
function captureFileStill(file) {
	return new Promise((resolve) => {
		const url = URL.createObjectURL(file);
		const video = document.createElement("video");
		video.muted = true;
		video.playsInline = true;
		video.preload = "auto";
		const finish = (value) => {
			window.clearTimeout(timer);
			URL.revokeObjectURL(url);
			video.removeAttribute("src");
			video.load();
			resolve(value);
		};
		const timer = window.setTimeout(() => finish(null), 5e3);
		video.onerror = () => finish(null);
		video.onloadeddata = () => {
			const duration = video.duration;
			video.currentTime = Number.isFinite(duration) && duration > 1 ? Math.min(12, duration * .12) : .1;
		};
		video.onseeked = () => {
			if (!video.videoWidth) return finish(null);
			const canvas = document.createElement("canvas");
			canvas.width = 640;
			canvas.height = Math.max(1, Math.round(video.videoHeight / video.videoWidth * 640));
			const ctx = canvas.getContext("2d");
			if (!ctx) return finish(null);
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			finish(canvas.toDataURL("image/jpeg", .72));
		};
		video.src = url;
	});
}
async function enrichLocalStills(titles, files) {
	const queue = titles.slice(0, 36);
	let cursor = 0;
	const worker = async () => {
		while (cursor < queue.length) {
			const title = queue[cursor];
			cursor += 1;
			const file = files.find((item) => item.name === title.path || (item.webkitRelativePath || "").endsWith(`/${title.path}`));
			if (!file) continue;
			const sidecar = sidecarImage(file, files);
			const url = sidecar ? await fileToDataUrl(sidecar) : await captureFileStill(file);
			if (!url) continue;
			await saveThumb(title.id, url);
			useCinevo.getState().patchArtwork([{
				id: title.id,
				poster: url,
				still: url
			}]);
		}
	};
	await Promise.all([worker(), worker()]);
}
var plexStartPin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("8fdebd237b20b8988d4b74313d86857020fb83c844c4c09a52255338ac0a62c2"));
var plexPollPin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("b1a629896a5a292418e73f888427598ab0a902c8f963c938f2e4cd8a5ed40586"));
var plexListServers = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fe32bd140d3583c344ef891531d16c93349abb6d1e02a5fadc3e79e692953852"));
var plexOpenServer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("3b4bb4c4449e4f7cbed728d66d982ae6de5dcd43acca1136797adc964162c2ee"));
var plexImportSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a2c3c4f890996a4f965cfe90be75b904e1ef7c0d41c7a73da07e74c8d6682ac0"));
function PlexConnect() {
	const plexToken = useCinevo((s) => s.plexToken);
	const plexUser = useCinevo((s) => s.plexUser);
	const plexServers = useCinevo((s) => s.plexServers);
	const plexClient = useCinevo((s) => s.plexClientId);
	const setPlexSession = useCinevo((s) => s.setPlexSession);
	const setPlexServers = useCinevo((s) => s.setPlexServers);
	const clearPlexSession = useCinevo((s) => s.clearPlexSession);
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)(null);
	const [opened, setOpened] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [advanced, setAdvanced] = (0, import_react.useState)(false);
	const [manualUrl, setManualUrl] = (0, import_react.useState)("http://127.0.0.1:32400");
	const [manualToken, setManualToken] = (0, import_react.useState)("");
	const pollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (pollRef.current) window.clearInterval(pollRef.current);
		};
	}, []);
	const clientId = () => {
		const existing = plexClient || plexClientId();
		if (!plexClient && existing) useCinevo.setState({ plexClientId: existing });
		return existing;
	};
	const refreshServers = async (token = plexToken, user = plexUser) => {
		if (!token) return;
		setPending(true);
		try {
			const res = await plexListServers({ data: {
				clientId: clientId(),
				token
			} });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			setPlexSession(token, res.username || user, res.servers, clientId());
			setPlexServers(res.servers);
			setMessage(res.servers.length ? `${res.servers.length} Plex ${res.servers.length === 1 ? "server" : "servers"} on this account.` : "Signed in, but no media servers are sharing with this Plex account yet.");
		} finally {
			setPending(false);
		}
	};
	const startSignIn = async () => {
		setPending(true);
		setMessage("");
		try {
			const res = await plexStartPin({ data: { clientId: clientId() } });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			setPin({
				id: res.id,
				code: res.code
			});
			const url = plexAuthUrl(clientId(), res.code, window.location.href);
			if (!window.open(url, "cinevo-plex", "popup,width=560,height=760")) setMessage("The Plex window was blocked. Use the approval link below.");
			if (pollRef.current) window.clearInterval(pollRef.current);
			const started = Date.now();
			pollRef.current = window.setInterval(() => {
				(async () => {
					if (Date.now() - started > 12e4) {
						if (pollRef.current) window.clearInterval(pollRef.current);
						setPin(null);
						setMessage("Plex sign-in timed out. Try again.");
						return;
					}
					const poll = await plexPollPin({ data: {
						clientId: clientId(),
						pinId: res.id
					} });
					if (!poll.ok) return;
					if (!poll.token) return;
					if (pollRef.current) window.clearInterval(pollRef.current);
					setPin(null);
					await refreshServers(poll.token, "");
				})();
			}, 1600);
		} catch (err) {
			const text = err instanceof Error ? err.message : "Could not start Plex sign-in.";
			setMessage(text === "Unauthorized" ? "Sign in to CINEVO first. Plex connects to your house." : text);
		} finally {
			setPending(false);
		}
	};
	const openServer = async (server) => {
		if (!plexToken) return;
		setPending(true);
		setMessage(`Reaching ${server.name}…`);
		try {
			const res = await plexOpenServer({ data: {
				clientId: clientId(),
				token: server.accessToken || plexToken,
				server
			} });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			setOpened({
				server,
				uri: res.uri,
				kind: res.kind,
				sections: res.sections
			});
			setPicked(res.sections.map((s) => s.key));
			setMessage(res.sections.length ? `Connected to ${server.name} over ${res.kind}. Choose libraries to index.` : `${server.name} is online, but it has no libraries yet.`);
		} finally {
			setPending(false);
		}
	};
	const importPicked = async () => {
		if (!opened || !picked.length) return;
		setPending(true);
		try {
			const token = opened.server.accessToken || plexToken;
			const res = await plexImportSections({ data: {
				clientId: clientId(),
				token,
				uri: opened.uri,
				sourceLabel: opened.server.name,
				sectionKeys: picked
			} });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const titles = res.titles.map((t) => remoteTitle({
				id: t.id,
				title: t.title,
				year: t.year,
				kind: t.kind === "series" ? "series" : "movie",
				synopsis: t.synopsis,
				source: "plex",
				sourceLabel: opened.server.name,
				genre: t.genre,
				genres: t.genres,
				runtime: t.runtime,
				rating: t.rating,
				cast: t.cast,
				director: t.director,
				path: t.ratingKey || t.id.replace(/^plex-/, "")
			}));
			addRemoteTitles(titles, {
				id: `plex-${opened.server.id}`,
				kind: "plex",
				name: opened.server.name,
				baseUrl: opened.uri,
				accessToken: token,
				selected: true,
				count: titles.length
			});
			setOpened(null);
			setMessage(`Imported ${titles.length} titles from ${opened.server.name}. CINEVO will proxy playback.`);
		} finally {
			setPending(false);
		}
	};
	const connectManual = async () => {
		const token = manualToken.trim() || plexToken;
		if (!token) {
			setMessage("Paste a Plex token, or sign in first.");
			return;
		}
		const server = {
			id: `manual-${hash(manualUrl)}`,
			name: "Plex (manual)",
			owned: true,
			productVersion: "",
			platform: "",
			accessToken: token,
			publicAddress: "",
			presence: true,
			connections: [{
				uri: manualUrl.replace(/\/$/, ""),
				local: true,
				relay: false,
				protocol: manualUrl.startsWith("https") ? "https" : "http",
				address: "",
				port: 32400
			}]
		};
		await openServer(server);
	};
	const owned = plexServers.filter((s) => s.owned);
	const shared = plexServers.filter((s) => !s.owned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
				className: "text-cine-cyan",
				size: 20
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-ui text-lg font-semibold tracking-tight",
				children: "Plex"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-cine-faint",
				children: "Sign in with Plex to see every server on the account — home, shared, remote. Away from home, Plex Remote Access must be on."
			}),
			plexToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cine-text",
					children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: plexUser || "Plex" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void refreshServers(),
						disabled: pending,
						className: "h-11 rounded-md border border-cine-border px-3 font-ui text-sm",
						children: "Refresh"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							clearPlexSession();
							setOpened(null);
							setMessage("Signed out of Plex.");
						},
						className: "h-11 rounded-md border border-cine-border px-3 font-ui text-sm",
						children: "Sign out"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void startSignIn(),
				disabled: pending,
				className: "mt-3 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
				children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "mx-auto animate-spin",
					size: 16
				}) : "Sign in with Plex"
			}),
			pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-md bg-cine-well px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-medium uppercase tracking-[0.1em] text-cine-muted",
						children: "Waiting for Plex"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-cine-faint",
						children: "Approve CINEVO in the Plex window. This is not a short code to type at plex.tv/link."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "mt-3 inline-flex h-11 items-center font-ui text-sm font-bold text-cine-cyan",
						href: plexAuthUrl(clientId(), pin.code, typeof window !== "undefined" ? window.location.href : void 0),
						target: "_blank",
						rel: "noreferrer",
						children: "Open Plex approval"
					})
				]
			}) : null,
			owned.length || shared.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [owned.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerGroup, {
					heading: "Your servers",
					servers: owned,
					pending,
					onOpen: openServer
				}) : null, shared.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerGroup, {
					heading: "Shared with you",
					servers: shared,
					pending,
					onOpen: openServer
				}) : null]
			}) : plexToken && !pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-cine-faint",
				children: "No servers yet. Refresh after Plex finishes sharing."
			}) : null,
			opened ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-md bg-cine-well p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-ui text-xs font-medium uppercase tracking-[0.1em] text-cine-cyan",
						children: [
							opened.server.name,
							" · ",
							opened.kind
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: opened.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-ui",
								children: [s.title, s.type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-cine-faint",
									children: s.type
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-5 accent-cine-cyan",
								checked: picked.includes(s.key),
								onChange: (e) => setPicked((cur) => e.target.checked ? [...cur, s.key] : cur.filter((k) => k !== s.key))
							})]
						}, s.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void importPicked(),
						disabled: pending || !picked.length,
						className: "mt-3 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
						children: "Add selected to CINEVO"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-left text-sm text-cine-faint hover:text-cine-text",
				onClick: () => setAdvanced((v) => !v),
				children: advanced ? "Hide manual connection" : "Connect with a URL and token"
			}),
			advanced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: manualUrl,
						onChange: (e) => setManualUrl(e.target.value),
						"aria-label": "Plex server address",
						className: "h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: manualToken,
						onChange: (e) => setManualToken(e.target.value),
						placeholder: "X-Plex-Token",
						"aria-label": "Plex token",
						className: "h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void connectManual(),
						disabled: pending,
						className: "h-11 w-full rounded-md border border-cine-cyan font-ui font-bold text-cine-cyan",
						children: "Connect this address"
					})
				]
			}) : null,
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-cine-cyan",
				children: message
			}) : null
		]
	});
}
function ServerGroup({ heading, servers, pending, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-ui text-xs font-medium uppercase tracking-[0.1em] text-cine-muted",
		children: heading
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 space-y-2",
		children: servers.map((server) => {
			const kinds = [...new Set(server.connections.map((c) => connectionKind(c)))];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: pending,
				onClick: () => onOpen(server),
				className: "flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-cine-well px-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "font-ui",
					children: server.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 text-xs text-cine-faint",
					children: [
						server.owned ? "Owned" : "Shared",
						kinds.length ? ` · ${kinds.join(" / ")}` : "",
						server.presence ? "" : " · Offline"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-ui text-xs font-semibold uppercase tracking-wider text-cine-cyan",
					children: "View"
				})]
			}) }, server.id);
		})
	})] });
}
function hash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return h.toString(16);
}
var jellyfinConnect = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("4bf247dd5cb2e1f33ca4eb67235838f6f199965b4aef17e3451f0e92425689b6"));
var jellyfinListSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("dda083ec9095a7d394310833eab3e2463ffca531929809b6071a9f5ead98e1c7"));
var jellyfinImportSections = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("0abf443269b5766502610cfd9a54a85d258dbfca038b894bdd12f186b2e3fca7"));
function JellyfinConnect() {
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const plexClient = useCinevo((s) => s.plexClientId);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [baseUrl, setBaseUrl] = (0, import_react.useState)("http://127.0.0.1:8096");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [session, setSession] = (0, import_react.useState)(null);
	const [sections, setSections] = (0, import_react.useState)([]);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const clientId = () => {
		const existing = plexClient || plexClientId();
		if (!plexClient && existing) useCinevo.setState({ plexClientId: existing });
		return existing;
	};
	const connect = async () => {
		if (!username.trim() || !password) {
			setMessage("Enter your Jellyfin username and password.");
			return;
		}
		setPending(true);
		setMessage("");
		try {
			const res = await jellyfinConnect({ data: {
				baseUrl: baseUrl.trim(),
				username: username.trim(),
				password,
				clientId: clientId()
			} });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const listed = await jellyfinListSections({ data: {
				baseUrl: res.baseUrl,
				token: res.token,
				userId: res.userId,
				clientId: clientId()
			} });
			if (!listed.ok) {
				setMessage(listed.error);
				return;
			}
			setSession({
				token: res.token,
				userId: res.userId,
				username: res.username,
				baseUrl: res.baseUrl
			});
			setSections(listed.sections);
			setPicked(listed.sections.map((s) => s.key));
			setPassword("");
			setMessage(listed.sections.length ? `Signed in as ${res.username}. Choose libraries to index.` : "Signed in, but this user has no movie or series libraries yet.");
		} finally {
			setPending(false);
		}
	};
	const importPicked = async () => {
		if (!session || !picked.length) return;
		setPending(true);
		try {
			const res = await jellyfinImportSections({ data: {
				baseUrl: session.baseUrl,
				token: session.token,
				userId: session.userId,
				clientId: clientId(),
				sourceLabel: session.username || "Jellyfin",
				sectionKeys: picked
			} });
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const titles = res.titles.map((t) => remoteTitle({
				id: t.id,
				title: t.title,
				year: t.year,
				kind: t.kind === "series" ? "series" : "movie",
				synopsis: t.synopsis,
				source: "jellyfin",
				sourceLabel: t.sourceLabel || session.username || "Jellyfin",
				genre: t.genre,
				genres: t.genres,
				runtime: t.runtime,
				rating: t.rating,
				cast: t.cast,
				director: t.director,
				path: t.path || t.id.replace(/^jellyfin-/, "")
			}));
			addRemoteTitles(titles, {
				id: `jellyfin-${session.userId}`,
				kind: "jellyfin",
				name: session.username || "Jellyfin",
				baseUrl: session.baseUrl,
				accessToken: session.token,
				userId: session.userId,
				selected: true,
				count: titles.length
			});
			setSections([]);
			setMessage(`Imported ${titles.length} titles. CINEVO will proxy playback from this Jellyfin server.`);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {
				className: "text-cine-cyan",
				size: 20
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-ui text-lg font-semibold tracking-tight",
				children: "Jellyfin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-cine-faint",
				children: [
					"Sign in with a username. If this address is reachable from here, CINEVO indexes and proxies playback — no Node required. Home-network-only servers still use",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/node",
						className: "text-cine-cyan",
						onClick: () => setCoreOpen(false),
						children: "CINEVO Node"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: baseUrl,
				onChange: (e) => setBaseUrl(e.target.value),
				"aria-label": "Jellyfin server address",
				className: "mt-3 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: username,
				onChange: (e) => setUsername(e.target.value),
				placeholder: "Username",
				"aria-label": "Jellyfin username",
				autoComplete: "username",
				className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-ui"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				value: password,
				onChange: (e) => setPassword(e.target.value),
				placeholder: session ? "Signed in — reconnect to change" : "Password",
				"aria-label": "Jellyfin password",
				autoComplete: "current-password",
				className: "mt-2 h-11 w-full rounded-md border border-cine-border bg-cine-well px-3 font-ui"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void connect(),
				disabled: pending,
				className: "mt-3 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
				children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "mx-auto animate-spin",
					size: 16
				}) : session ? "Reconnect" : "Sign in to Jellyfin"
			}),
			sections.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-md bg-cine-well p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-ui text-xs font-medium uppercase tracking-[0.1em] text-cine-cyan",
						children: [session?.username || "Jellyfin", " · libraries"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-ui",
								children: [s.title, s.type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-cine-faint",
									children: s.type
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-5 accent-cine-cyan",
								checked: picked.includes(s.key),
								onChange: (e) => setPicked((cur) => e.target.checked ? [...cur, s.key] : cur.filter((k) => k !== s.key))
							})]
						}, s.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void importPicked(),
						disabled: pending || !picked.length,
						className: "mt-3 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
						children: "Add selected to CINEVO"
					})
				]
			}) : null,
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-cine-cyan",
				children: message
			}) : null
		]
	});
}
var METHODS = [
	{
		id: "plex",
		title: "Plex",
		copy: "Sign in and pick servers — home, shared, or remote.",
		icon: Server
	},
	{
		id: "jellyfin",
		title: "Jellyfin",
		copy: "Username and address. Playback is proxied through CINEVO.",
		icon: HardDrive
	},
	{
		id: "folder",
		title: "This computer",
		copy: "Pick a folder in this browser. Names only — files stay here.",
		icon: FolderPlus
	},
	{
		id: "node",
		title: "CINEVO Node",
		copy: "Scan a disk path on the machine that holds the files.",
		icon: Cable
	}
];
function AddLibrary() {
	const sources = useCinevo((s) => s.sources);
	const localTitles = useCinevo((s) => s.localTitles);
	const removeSource = useCinevo((s) => s.removeSource);
	const addFolderTitles = useCinevo((s) => s.addFolderTitles);
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const nodeUrl = useCinevo((s) => s.nodeUrl);
	const nodeToken = useCinevo((s) => s.nodeToken);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const fileRef = (0, import_react.useRef)(null);
	const [method, setMethod] = (0, import_react.useState)("pick");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [folderPath, setFolderPath] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onFiles = (event) => {
			const files = event.detail;
			if (Array.isArray(files) && files.length) ingestFiles(files, "Home folder");
		};
		window.addEventListener("cinevo:files", onFiles);
		return () => window.removeEventListener("cinevo:files", onFiles);
	}, []);
	const ingestFiles = (files, name) => {
		const titles = scanFileList(files, name);
		if (!titles.length) {
			setMessage("No video files in that folder. mp4, mkv, mov, webm.");
			return;
		}
		const folder = titles[0].sourceLabel;
		addFolderTitles(titles, {
			id: `src-folder-${folder}`,
			kind: "folder",
			name: folder,
			selected: true,
			count: titles.length
		});
		enrichLocalStills(titles, Array.from(files));
		setMessage(`Indexed ${titles.length} files from ${folder}. Cover frames are taken from the files themselves.`);
	};
	const onFolder = (e) => {
		if (e.target.files?.length) ingestFiles(e.target.files);
		e.target.value = "";
	};
	const pickDirectory = async () => {
		const picker = window.showDirectoryPicker;
		if (!picker) {
			fileRef.current?.click();
			return;
		}
		try {
			const handle = await picker();
			const files = [];
			await walkDir(handle, files);
			ingestFiles(files, handle.name);
			await saveFolderHandle(`src-folder-${handle.name}`, handle, handle.name);
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;
			fileRef.current?.click();
		}
	};
	const addPath = async () => {
		if (!folderPath.trim()) return;
		if (!nodeToken) {
			setMessage("Pair CINEVO Node to scan a path on the computer that holds the files.");
			return;
		}
		setPending(true);
		try {
			const res = await addNodeFolder(nodeUrl, nodeToken, folderPath.trim());
			if (!res.ok) {
				setMessage(res.error);
				return;
			}
			const titles = res.titles.map((t, i) => ({
				...remoteTitle({
					id: t.id || `node-folder-${i}`,
					title: t.title || "Untitled",
					year: t.year,
					source: "plex",
					sourceLabel: res.name,
					synopsis: `Indexed from ${res.name} on CINEVO Node. Playback streams from that computer.`,
					genre: "Home library",
					path: t.path
				}),
				source: "folder",
				sourceLabel: res.name,
				genre: "Home library",
				genres: ["Home library", res.name],
				path: t.path
			}));
			addRemoteTitles(titles, {
				id: res.id,
				kind: "folder",
				name: res.name,
				path: folderPath.trim(),
				baseUrl: nodeUrl,
				selected: true,
				count: res.count
			});
			setFolderPath("");
			setMessage(`Scanned ${res.count} files on Node. Playback streams from that computer.`);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				multiple: true,
				webkitdirectory: "",
				className: "hidden",
				"aria-label": "Select media folder",
				onChange: onFolder
			}),
			method === "pick" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
					children: "IMPORT A LIBRARY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-ui text-2xl font-semibold tracking-tight",
					children: "Choose a source."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-cine-faint",
					children: "Plex and Jellyfin play through CINEVO. Folders stay on this device. Node scans a disk on another machine."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: METHODS.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setMethod(item.id);
								setMessage("");
							},
							className: "glass flex min-h-28 flex-col items-start rounded-xl p-4 text-left hover:border-cine-cyan",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "text-cine-cyan",
									size: 20
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "mt-3 font-ui text-lg font-semibold tracking-tight",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-sm text-cine-faint",
									children: item.copy
								})
							]
						}, item.id);
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setMethod("pick");
							setMessage("");
						},
						className: "inline-flex h-11 items-center gap-2 font-ui text-sm text-cine-muted hover:text-cine-text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " All sources"]
					}),
					method === "plex" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlexConnect, {}) : null,
					method === "jellyfin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JellyfinConnect, {}) : null,
					method === "folder" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, {
								className: "text-cine-cyan",
								size: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-ui text-lg font-semibold tracking-tight",
								children: "This computer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cine-faint",
								children: "Pick a folder here. CINEVO indexes names only — files never leave this browser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void pickDirectory(),
								className: "mt-4 h-11 w-full rounded-md bg-cine-cyan font-ui font-bold text-cine-bg",
								children: "Select folders"
							})
						]
					}) : null,
					method === "node" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, {
								className: "text-cine-cyan",
								size: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-ui text-lg font-semibold tracking-tight",
								children: "CINEVO Node"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-cine-faint",
								children: "Pair Node on the computer that holds the files, then scan a path. Playback streams from that machine."
							}),
							!nodeToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-cine-muted",
								children: [
									"Pair first on",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/node",
										className: "text-cine-cyan",
										onClick: () => setCoreOpen(false),
										children: "the Node page"
									}),
									"."
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-cine-cyan",
								children: "Node is paired on this browser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: folderPath,
									onChange: (e) => setFolderPath(e.target.value),
									placeholder: "/Movies or D:\\\\Media",
									"aria-label": "Folder path on Node",
									className: "h-11 min-w-0 flex-1 rounded-md border border-cine-border bg-cine-well px-3 font-mono text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void addPath(),
									disabled: pending,
									className: "h-11 rounded-md border border-cine-cyan px-3 font-ui font-bold text-cine-cyan",
									children: "Scan"
								})]
							})
						]
					}) : null
				]
			}),
			localTitles.length && playableCount() === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cine-muted",
					children: "Titles are indexed, but this browser session has no files. Reconnect the folder to play."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 h-11 rounded-md bg-cine-cyan px-4 font-ui font-bold text-cine-bg",
					onClick: async () => {
						const n = await reconnectFolders();
						if (n) {
							useCinevo.setState({ localTitles: [...useCinevo.getState().localTitles] });
							setMessage(`Reconnected ${n} files.`);
						} else fileRef.current?.click();
					},
					children: "Reconnect folders"
				})]
			}) : null,
			sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
					children: "ACTIVE SOURCES"
				}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex items-center justify-between rounded-xl px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "font-ui capitalize",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-cine-faint",
						children: [
							s.kind,
							" · ",
							s.count,
							" titles ",
							s.path ? `· ${s.path}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Remove ${s.name}`,
						className: "flex size-11 items-center justify-center text-cine-muted hover:text-cine-danger",
						onClick: () => removeSource(s.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
					})]
				}, s.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-cine-border px-4 py-5 text-sm text-cine-faint",
				children: "Nothing added yet. Import Plex, Jellyfin, a folder, or a Node path."
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cine-cyan",
				children: message
			}) : null
		]
	});
}
async function walkDir(dir, out, depth = 0) {
	if (depth > 6 || out.length > 80) return;
	for await (const entry of dir.values()) {
		if (out.length > 80) return;
		if (entry.kind === "file") {
			const file = await entry.getFile();
			if (isVideoFile(file.name)) out.push(file);
		} else if (entry.kind === "directory") await walkDir(entry, out, depth + 1);
	}
}
function ToolsRoom() {
	const library = useLibrary();
	const favorites = useCinevo((s) => s.favorites);
	const progress = useCinevo((s) => s.progress);
	const plays = useCinevo((s) => s.plays);
	const collections = useCinevo((s) => s.collections);
	const mood = useCinevo((s) => s.mood);
	const setMood = useCinevo((s) => s.setMood);
	const prefs = useCinevo((s) => s.prefs);
	const patchPrefs = useCinevo((s) => s.patchPrefs);
	const createCollection = useCinevo((s) => s.createCollection);
	const addToCollection = useCinevo((s) => s.addToCollection);
	const removeFromCollection = useCinevo((s) => s.removeFromCollection);
	const deleteCollection = useCinevo((s) => s.deleteCollection);
	const patchTitle = useCinevo((s) => s.patchTitle);
	const hideTitle = useCinevo((s) => s.hideTitle);
	const play = useCinevo((s) => s.play);
	const startParty = useCinevo((s) => s.startParty);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const flash = useCinevo((s) => s.flash);
	const [collectionName, setCollectionName] = (0, import_react.useState)("");
	const [collectionId, setCollectionId] = (0, import_react.useState)("");
	const [pickId, setPickId] = (0, import_react.useState)("");
	const [editId, setEditId] = (0, import_react.useState)("");
	const [editTitle, setEditTitle] = (0, import_react.useState)("");
	const [editYear, setEditYear] = (0, import_react.useState)("");
	const [editGenre, setEditGenre] = (0, import_react.useState)("");
	const [editSynopsis, setEditSynopsis] = (0, import_react.useState)("");
	const [pattern, setPattern] = (0, import_react.useState)("{title} ({year})");
	const [person, setPerson] = (0, import_react.useState)("");
	const [withName, setWithName] = (0, import_react.useState)("");
	const [partyId, setPartyId] = (0, import_react.useState)("");
	const taste = (0, import_react.useMemo)(() => tasteFrom(library, favorites, progress), [
		library,
		favorites,
		progress
	]);
	const dupes = (0, import_react.useMemo)(() => duplicateGroups(library), [library]);
	const played = (0, import_react.useMemo)(() => mostPlayed(library, plays, 6), [library, plays]);
	const people = (0, import_react.useMemo)(() => peopleIn(library, person), [library, person]);
	const previews = library.slice(0, 6).map((title) => ({
		id: title.id,
		from: title.title,
		to: renamePreview(title, pattern)
	}));
	const selectedCollection = collections.find((collection) => collection.id === collectionId) ?? collections[0];
	const loadEdit = (id) => {
		setEditId(id);
		const title = titleById(id);
		setEditTitle(title?.title ?? "");
		setEditYear(title?.year ?? "");
		setEditGenre(title?.genre ?? "");
		setEditSynopsis(title?.synopsis ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-page house-page--flow tools-room",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandKicker, { children: "House tools" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Care for this library" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lede",
				children: "These tools use titles you have already imported. Nothing here is a public catalog, a live channel, or a fake server graph."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tools-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseRemote, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCinevo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Taste in this house" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Genres rise when you save a title or start watching it. Ask CINEVO from Core once you opt in." }),
						taste.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "tool-pills",
							children: taste.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								item.genre,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.count })
							] }, item.genre))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tool-empty",
							children: "Save a title or press play to build a taste profile."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "house-sources",
							children: MOODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: mood === item.id ? "house-chip is-on" : "house-chip",
								onClick: () => setMood(item.id),
								children: item.label
							}, item.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Most played here" }), played.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "tool-list",
						children: played.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => play(row.title.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.title.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								row.count,
								" play",
								row.count === 1 ? "" : "s",
								" · ",
								row.title.year
							] })]
						}) }, row.title.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tool-empty",
						children: "Play a title and it will show up here. This is only your house, not a public chart."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Collections" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "tool-row",
							onSubmit: (e) => {
								e.preventDefault();
								createCollection(collectionName);
								setCollectionName("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: collectionName,
								onChange: (e) => setCollectionName(e.target.value),
								placeholder: "Collection name",
								"aria-label": "Collection name",
								maxLength: 40
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "house-btn house-btn--play",
								children: "Create"
							})]
						}),
						collections.length && library.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "tool-row",
							onSubmit: (e) => {
								e.preventDefault();
								if (!selectedCollection || !pickId) return;
								addToCollection(selectedCollection.id, pickId);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									"aria-label": "Collection",
									value: selectedCollection?.id ?? "",
									onChange: (e) => setCollectionId(e.target.value),
									children: collections.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: collection.id,
										children: collection.name
									}, collection.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Title to add",
									value: pickId,
									onChange: (e) => setPickId(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Choose a title"
									}), library.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: title.id,
										children: title.title
									}, title.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "house-btn house-btn--ghost",
									children: "Add"
								})
							]
						}) : null,
						selectedCollection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "tool-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedCollection.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "house-btn house-btn--ghost",
									onClick: () => deleteCollection(selectedCollection.id),
									children: "Delete"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "tool-list",
								children: selectedCollection.titleIds.map((id) => {
									const title = titleById(id);
									if (!title) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => play(id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: title.year })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removeFromCollection(selectedCollection.id, id),
										children: "Remove"
									})] }, id);
								})
							}),
							!selectedCollection.titleIds.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tool-empty",
								children: "This collection is empty."
							}) : null
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tool-empty",
							children: "Create a collection, then add titles you already have."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Duplicates" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Same title and year, more than once, in the library you are viewing. Removing a copy only drops it from CINEVO." }),
						dupes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "tool-list",
							children: dupes.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "tool-dupe",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
									group[0].title,
									" · ",
									group.length
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: group.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.sourceLabel || title.source }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => hideTitle(title.id),
									children: "Remove from house"
								})] }, title.id)) })] })
							}, group[0].id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tool-empty",
							children: library.length ? "No duplicates in this view." : "Import a library to scan for duplicates."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Edit details" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Changes stay in CINEVO. They do not rewrite the file on disk or the Plex server." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Title to edit",
							value: editId,
							onChange: (e) => loadEdit(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose a title"
							}), library.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: title.id,
								children: title.title
							}, title.id))]
						}),
						editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "tool-stack",
							onSubmit: (e) => {
								e.preventDefault();
								patchTitle(editId, {
									title: editTitle,
									year: editYear,
									genre: editGenre,
									synopsis: editSynopsis
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Title",
									value: editTitle,
									onChange: (e) => setEditTitle(e.target.value),
									maxLength: 120
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Year",
									value: editYear,
									onChange: (e) => setEditYear(e.target.value),
									maxLength: 8
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Genre",
									value: editGenre,
									onChange: (e) => setEditGenre(e.target.value),
									maxLength: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									"aria-label": "Synopsis",
									value: editSynopsis,
									onChange: (e) => setEditSynopsis(e.target.value),
									maxLength: 500
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "house-btn house-btn--play",
									children: "Save details"
								})
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "File name preview" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Preview only. Use ",
							"{title}",
							", ",
							"{year}",
							", and ",
							"{genre}",
							". Files are not renamed."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "tool-row",
							onSubmit: (e) => {
								e.preventDefault();
								const lines = library.slice(0, 40).map((title) => renamePreview(title, pattern)).join("\n");
								navigator.clipboard?.writeText(lines).then(() => flash("Preview copied"), () => flash("Could not copy the preview"));
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Name pattern",
								value: pattern,
								onChange: (e) => setPattern(e.target.value),
								maxLength: 80
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "house-btn house-btn--ghost",
								disabled: !library.length,
								children: "Copy preview"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "tool-list",
							children: previews.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.to || "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.from })] }) }, row.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "People in your files" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": "Cast or director",
							value: person,
							onChange: (e) => setPerson(e.target.value),
							placeholder: "Director or cast name",
							maxLength: 80
						}),
						person.trim().length >= 2 ? people.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "tool-list",
							children: people.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => play(title.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: title.director || title.cast?.[0] || title.year })]
							}) }, title.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tool-empty",
							children: "No matching credit in this library."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tool-empty",
							children: "Type at least two letters. Matches director and cast already on the title."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Playback care" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Skip the first seconds", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoundedNumber, {
							label: "Intro skip seconds",
							value: prefs.introSkip,
							min: 0,
							max: 180,
							onCommit: (introSkip) => patchPrefs({ introSkip })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Subtitle offset in seconds", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoundedNumber, {
							label: "Subtitle offset seconds",
							value: prefs.subtitleOffset,
							min: -15,
							max: 15,
							step: .5,
							onCommit: (subtitleOffset) => patchPrefs({ subtitleOffset })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Intro skip runs when a file starts from the beginning. Subtitle offset shifts cues if the file actually has a text track." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tool-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Watch with someone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Starts playback here and remembers who you are watching with. It does not sync a remote player." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "tool-row",
							onSubmit: (e) => {
								e.preventDefault();
								if (!partyId) {
									flash("Choose a title to start with");
									return;
								}
								startParty(partyId, withName);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Title to watch",
									value: partyId,
									onChange: (e) => setPartyId(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Choose a title"
									}), library.map((title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: title.id,
										children: title.title
									}, title.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Watching with",
									value: withName,
									onChange: (e) => setWithName(e.target.value),
									placeholder: "Name",
									maxLength: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "house-btn house-btn--play",
									disabled: !library.length,
									children: "Start"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "house-btn house-btn--ghost",
							onClick: () => setCoreOpen(true, "sharing"),
							children: "Library permissions"
						})
					]
				})
			]
		})]
	});
}
function BoundedNumber({ label, value, min, max, step, onCommit }) {
	const [draft, setDraft] = (0, import_react.useState)(String(value));
	(0, import_react.useEffect)(() => setDraft(String(value)), [value]);
	const commit = (raw) => {
		const next = clampNumber(raw, min, max, value);
		setDraft(String(next));
		if (next !== value) onCommit(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		"aria-label": label,
		type: "number",
		min,
		max,
		step,
		inputMode: "decimal",
		value: draft,
		onChange: (e) => setDraft(e.target.value),
		onBlur: (e) => commit(e.currentTarget.value),
		onKeyDown: (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				commit(e.currentTarget.value);
			}
		}
	});
}
var SOURCES = [
	["all", "All"],
	["folder", "Folders"],
	["plex", "Plex"],
	["jellyfin", "Jellyfin"],
	["shared", "Shared"]
];
function HeroActions({ onPlay, playLabel, onMore, moreLabel = "More info", extra, playIcon = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-actions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onPlay,
				className: "house-btn house-btn--play",
				children: [
					playIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 16,
						fill: "currentColor"
					}) : null,
					" ",
					playLabel
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMore,
				className: "house-btn house-btn--ghost",
				children: moreLabel
			}),
			extra
		]
	});
}
function PlatformArc({ quiet = false }) {
	const setRoom = useCinevo((s) => s.setRoom);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "platform-arc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: quiet ? "Also in this house" : "Start with a library you control." }), quiet ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Folders, Plex, or Jellyfin. Nothing is added until you choose it. Playback stays on servers you own." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "platform-arc__grid",
			children: [
				{
					title: "Private libraries",
					copy: "Folders on this computer, Plex, or Jellyfin. Node for disk paths on another machine.",
					action: "Open",
					onClick: () => setRoom("sidebar")
				},
				{
					title: "Friend sharing",
					copy: "Invite by username. Share Plex and Jellyfin catalogs — playback stays on the original server.",
					action: "Share",
					onClick: () => setCoreOpen(true, "sharing")
				},
				{
					title: "Library care",
					copy: "Stewardship for the collection. No watch-time scores. No social pressure.",
					action: "Review",
					onClick: () => setCoreOpen(true, "stewardship")
				},
				{
					title: "Consent-led AI",
					copy: "Ask the titles already in this house. Nothing leaves until you opt in.",
					action: "Ask",
					onClick: () => setCoreOpen(true, "ai")
				}
			].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "arc-card",
				onClick: card.onClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: card.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: card.copy }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: card.action })
				]
			}, card.title))
		})]
	});
}
function StageRoom() {
	const play = useCinevo((s) => s.play);
	const openTitle = useCinevo((s) => s.openTitle);
	const progress = useCinevo((s) => s.progress);
	const favorites = useCinevo((s) => s.favorites);
	const tonight = useCinevo((s) => s.tonight);
	const mood = useCinevo((s) => s.mood);
	const shufflePlay = useCinevo((s) => s.shufflePlay);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setRoom = useCinevo((s) => s.setRoom);
	const sourceFilter = useCinevo((s) => s.sourceFilter);
	const setSourceFilter = useCinevo((s) => s.setSourceFilter);
	const setMood = useCinevo((s) => s.setMood);
	const sources = useCinevo((s) => s.sources);
	const plays = useCinevo((s) => s.plays);
	const collections = useCinevo((s) => s.collections);
	const hydrated = useCinevo((s) => s.hydrated);
	const library = useLibrary();
	const pool = byMood(mood, library);
	const hero = pickFeatured({
		mood,
		progress,
		tonight,
		pool: library
	});
	const heroProgress = hero ? progress[hero.id] ?? 0 : 0;
	const continueWatching = library.filter((t) => {
		const p = progress[t.id];
		return p != null && p > 0 && p < 100;
	});
	const added = recentlyAdded(12, pool);
	const addedIds = new Set(added.map((t) => t.id));
	const myList = library.filter((t) => favorites.includes(t.id));
	const taste = (0, import_react.useMemo)(() => tasteFrom(library, favorites, progress), [
		library,
		favorites,
		progress
	]);
	const suggestions = (0, import_react.useMemo)(() => {
		const base = pool.filter((t) => !favorites.includes(t.id) && !addedIds.has(t.id));
		if (!taste.length) return base.slice(0, 12);
		const weight = new Map(taste.map((item) => [item.genre, item.count]));
		const score = (title) => (title.genres?.length ? title.genres : [title.genre]).reduce((n, genre) => n + (weight.get(genre) ?? 0), 0);
		return [...base].sort((a, b) => score(b) - score(a)).slice(0, 12);
	}, [
		pool,
		favorites,
		addedIds,
		taste
	]);
	const played = (0, import_react.useMemo)(() => mostPlayed(library, plays, 10).map((row) => row.title), [library, plays]);
	const queued = tonight.map((id) => titleById(id)).filter((t) => Boolean(t));
	const still = hero?.still || "/stills/hero-theater.jpg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "house-hero",
			"aria-labelledby": "featured-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtImage, {
					src: still,
					fallback: "/stills/hero-theater.jpg",
					className: "house-hero__art"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "house-hero__shade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "house-hero__copy",
					children: [
						hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "house-kicker",
							children: hero.kind === "series" ? "Series" : "Film"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandKicker, { children: "Private by design" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							id: "featured-title",
							children: hero ? hero.title : "Your media. Your moment."
						}),
						hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "house-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hero.year }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hero.runtime }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hero.genre }),
									hero.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											size: 12,
											className: "inline text-cine-amber",
											fill: "currentColor"
										}),
										" ",
										hero.rating.toFixed(1)
									] })] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lede lede--clamp",
								children: hero.synopsis
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroActions, {
								onPlay: () => play(hero.id),
								playLabel: heroProgress > 0 && heroProgress < 100 ? "Resume" : "Play",
								onMore: () => openTitle(hero.id),
								extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: shufflePlay,
									className: "house-btn house-btn--ghost",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { size: 16 }), " Surprise me"]
								})
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lede",
							children: hydrated ? "Connect Plex, Jellyfin, a folder on this computer, or Node. Your titles appear here — nothing is published, and nothing is filled in for you." : "Opening your house…"
						}), hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroActions, {
							onPlay: () => setRoom("sidebar"),
							playLabel: "Add library",
							playIcon: false,
							onMore: () => setCoreOpen(true, "libraries"),
							moreLabel: "Open Core"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-11 w-48 animate-pulse rounded-md bg-cine-surface" })] })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "house-stage",
			children: library.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "house-filters",
				children: [sources.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "house-sources",
					role: "tablist",
					"aria-label": "Sources",
					children: SOURCES.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": sourceFilter === id,
						onClick: () => setSourceFilter(id),
						className: sourceFilter === id ? "house-chip is-on" : "house-chip",
						children: label
					}, id))
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "house-sources",
					role: "tablist",
					"aria-label": "Mood",
					children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": mood === m.id,
						onClick: () => setMood(m.id),
						className: mood === m.id ? "house-chip is-on" : "house-chip",
						children: m.label
					}, m.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "house-library",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "house-rails",
					children: [
						continueWatching.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Continue watching",
							titles: continueWatching,
							wide: true
						}) : null,
						queued.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Up next",
							titles: queued,
							wide: true
						}) : null,
						played.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Most played here",
							titles: played
						}) : null,
						added.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Recently added",
							titles: added
						}) : null,
						suggestions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "For you",
							titles: suggestions
						}) : null,
						myList.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "My List",
							titles: myList
						}) : null,
						collections.map((collection) => {
							const titles = collection.titleIds.map((id) => library.find((title) => title.id === id)).filter((title) => Boolean(title));
							if (!titles.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
								heading: collection.name,
								titles
							}, collection.id);
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformArc, { quiet: true })]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "house-library",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformArc, {})
			})
		})]
	});
}
function BrowseRoom({ kind: initialKind = "all" }) {
	const [kind, setKind] = (0, import_react.useState)(initialKind);
	const [genre, setGenre] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		setKind(initialKind);
		setGenre("All");
	}, [initialKind]);
	const library = useLibrary();
	const titles = (0, import_react.useMemo)(() => filterCatalog({
		kind,
		genre,
		pool: library
	}), [
		kind,
		genre,
		library
	]);
	const genres = genresIn(library);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandKicker, { children: "CINEVO library" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: initialKind === "movie" ? "Movies" : initialKind === "series" ? "TV Shows" : "Browse" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede",
					children: "Find something worth disappearing into."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "house-sources mb-4",
				children: [
					"all",
					"movie",
					"series"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(k),
					className: kind === k ? "house-chip is-on" : "house-chip",
					children: k === "all" ? "All" : k === "movie" ? "Movies" : "Series"
				}, k))
			}),
			genres.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "house-sources mb-8",
				children: genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setGenre(g),
					className: genre === g ? "house-chip is-on" : "house-chip",
					children: g
				}, g))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryBoard, {
				titles,
				empty: "No titles yet. Import a library from Plex, Jellyfin, a folder, or Node."
			})
		]
	});
}
function SidebarRoom() {
	const local = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const yours = [...local, ...remote];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-page house-page--flow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandKicker, { children: "CINEVO · Add sources" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Add sources" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede",
					children: "Folders scan in this browser. Sign in with Plex or Jellyfin to index and proxy playback. Pair Node for disk paths on another computer."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLibrary, {}),
			yours.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "rail-heading",
					children: "In your library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryBoard, { titles: yours })]
			}) : null
		]
	});
}
function RoomSwitch({ room }) {
	switch (room) {
		case "browse": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, {});
		case "movies": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, { kind: "movie" });
		case "shows": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseRoom, { kind: "series" });
		case "sidebar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarRoom, {});
		case "tools": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsRoom, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRoom, {});
	}
}
var askCinevo = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7ebb63b2bc6bc267a35ed0fda7ece5b3241b752253db5bd836ae7020e8c799f4"));
function SharePanel() {
	const sources = useCinevo((s) => s.sources);
	const remoteTitles = useCinevo((s) => s.remoteTitles);
	const localTitles = useCinevo((s) => s.localTitles);
	const flash = useCinevo((s) => s.flash);
	const addRemoteTitles = useCinevo((s) => s.addRemoteTitles);
	const [guest, setGuest] = (0, import_react.useState)("");
	const [days, setDays] = (0, import_react.useState)(7);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [outgoing, setOutgoing] = (0, import_react.useState)([]);
	const [incoming, setIncoming] = (0, import_react.useState)([]);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [link, setLink] = (0, import_react.useState)("");
	const load = async () => {
		try {
			const res = await listMyShares();
			if (res.ok) {
				setOutgoing(res.outgoing);
				setIncoming(res.incoming);
			}
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const ownSources = (0, import_react.useMemo)(() => sources.filter((s) => s.kind !== "shared"), [sources]);
	(0, import_react.useEffect)(() => {
		if (ownSources.length && !picked.length) setPicked(ownSources.map((s) => s.id));
	}, [ownSources, picked.length]);
	const titles = (0, import_react.useMemo)(() => {
		const pool = [...remoteTitles, ...localTitles];
		const selected = ownSources.filter((s) => picked.includes(s.id));
		const names = new Set(selected.map((s) => s.name));
		return pool.filter((t) => names.has(t.sourceLabel) && t.source !== "shared").map((t) => ({
			id: t.id,
			title: t.title,
			year: t.year,
			kind: t.kind,
			genre: t.genre,
			synopsis: t.synopsis,
			source: t.source === "jellyfin" ? "jellyfin" : t.source === "folder" ? "folder" : "plex",
			sourceLabel: t.sourceLabel
		}));
	}, [
		localTitles,
		ownSources,
		picked,
		remoteTitles
	]);
	const send = async () => {
		setPending(true);
		try {
			const found = await lookupUsername({ data: { username: guest } });
			if (!found.ok) {
				flash(found.error);
				return;
			}
			const created = await createShare({ data: {
				guestName: found.username,
				days,
				libraries: ownSources.filter((s) => picked.includes(s.id)).map((s) => s.name),
				titles
			} });
			if (!created.ok) {
				flash(created.error);
				return;
			}
			const url = `${window.location.origin}/s/${created.token}`;
			setLink(url);
			await navigator.clipboard?.writeText(url).catch(() => void 0);
			flash(`Invite sent to @${found.username}`);
			await load();
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-cine-muted",
			children: "Sign in and claim a username to share Plex and Jellyfin indexes with a friend."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			search: { mode: "in" },
			className: "house-btn house-btn--play inline-flex",
			children: "Sign in"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cine-muted",
				children: "Share the catalog — not the files. Playback stays on the original Plex or Jellyfin server."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: ownSources.length ? ownSources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center justify-between rounded-lg bg-cine-well px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-ui text-sm",
						children: [
							s.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-cine-faint",
								children: s.kind
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "size-5 accent-cine-cyan",
						checked: picked.includes(s.id),
						onChange: (e) => setPicked((cur) => e.target.checked ? [...cur, s.id] : cur.filter((id) => id !== s.id))
					})]
				}, s.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cine-faint",
					children: "Connect a Plex, Jellyfin, or folder library first."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: guest,
						onChange: (e) => setGuest(e.target.value),
						className: "h-11 rounded-md border border-cine-border bg-cine-well px-3 font-ui",
						placeholder: "@username",
						"aria-label": "Friend username"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: days,
						onChange: (e) => setDays(Number(e.target.value)),
						className: "h-11 rounded-md border border-cine-border bg-cine-well px-3 font-ui",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 3,
								children: "3 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 7,
								children: "7 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 14,
								children: "14 days"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-md bg-cine-magenta px-4 font-ui font-bold text-white",
						disabled: pending || !guest.trim() || !picked.length,
						onClick: () => void send(),
						children: pending ? "Sending…" : "Share libraries"
					})
				]
			}),
			link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "break-all rounded-lg bg-cine-surface px-3 py-2 font-mono text-xs text-cine-cyan",
				children: link
			}) : null,
			outgoing.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
					children: "SENT"
				}), outgoing.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex items-center justify-between rounded-lg bg-cine-surface px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
						className: "font-ui",
						children: ["@", i.guestName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "ml-2 text-cine-faint",
						children: [
							i.status,
							" · ",
							i.titles.length,
							" titles · ",
							i.days,
							"d"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "font-ui text-sm text-cine-danger",
						onClick: () => void setShareStatus({ data: {
							id: i.id,
							status: "revoked"
						} }).then(() => load()),
						children: "Revoke"
					})]
				}, i.id))]
			}) : null,
			incoming.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
					children: "SHARED WITH YOU"
				}), incoming.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex items-center justify-between gap-3 rounded-lg bg-cine-surface px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/s/$token",
						params: { token: i.token },
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
							className: "font-ui",
							children: ["@", i.ownerUsername || "CINEVO member"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
							className: "ml-2 text-cine-faint",
							children: [
								i.titles.length,
								" titles · ",
								i.libraries.join(" · ")
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "shrink-0 font-ui text-sm font-bold text-cine-cyan",
						onClick: () => {
							const titles = i.titles.map((t) => remoteTitle({
								id: `shared-${t.id}`,
								title: t.title,
								year: t.year,
								kind: t.kind === "series" ? "series" : "movie",
								synopsis: t.synopsis,
								source: "shared",
								sourceLabel: `${i.ownerUsername || "friend"} · ${t.sourceLabel}`,
								genre: t.genre
							}));
							addRemoteTitles(titles, {
								id: `shared-${i.token}`,
								kind: "shared",
								name: `@${i.ownerUsername || "friend"}`,
								selected: true,
								count: titles.length
							});
						},
						children: "Add"
					})]
				}, i.id))]
			}) : null
		] })]
	});
}
var AI_PRESETS = [
	{
		label: "Tonight",
		q: "What should I watch tonight from this library?"
	},
	{
		label: "Short",
		q: "Pick a shorter title I can finish tonight."
	},
	{
		label: "Comfort",
		q: "A comforting rewatch from titles I already have."
	},
	{
		label: "Bold",
		q: "Something bold and cinematic I have not queued lately."
	}
];
function Detail() {
	const id = useCinevo((s) => s.selectedId);
	const closeTitle = useCinevo((s) => s.closeTitle);
	const play = useCinevo((s) => s.play);
	const fav = useCinevo((s) => id ? s.favorites.includes(id) : false);
	const queued = useCinevo((s) => id ? s.tonight.includes(id) : false);
	const progress = useCinevo((s) => id ? s.progress[id] ?? 0 : 0);
	const toggleFavorite = useCinevo((s) => s.toggleFavorite);
	const addTonight = useCinevo((s) => s.addTonight);
	const removeTonight = useCinevo((s) => s.removeTonight);
	const addNote = useCinevo((s) => s.addNote);
	const title = titleById(id);
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setNote("");
	}, [id]);
	if (!title) return null;
	const similar = similarTo(title, libraryPool());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "house-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtImage, {
				src: title.still || title.poster,
				fallback: "/stills/theater.jpg",
				className: "house-detail__art"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "house-detail__veil" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "house-detail__inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: closeTitle,
						className: "house-back",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }), " Back"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "house-detail__copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "house-kicker",
								children: title.kind === "series" ? "Series" : "Feature"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "house-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.year }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.runtime }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.genre }),
									title.rating > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											size: 12,
											className: "inline text-cine-amber",
											fill: "currentColor"
										}),
										" ",
										title.rating.toFixed(1)
									] })] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "house-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => play(title.id),
										className: "house-btn house-btn--play",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												size: 16,
												fill: "currentColor"
											}),
											" ",
											progress > 0 && progress < 100 ? "Resume" : "Play"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleFavorite(title.id),
										className: "house-btn house-btn--ghost",
										children: [fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { size: 16 }), fav ? "In My List" : "My List"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => queued ? removeTonight(title.id) : addTonight(title.id),
										className: "house-btn house-btn--ghost",
										children: queued ? "Queued" : "Tonight"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-xl text-cine-muted",
								children: title.synopsis
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 font-ui text-sm text-cine-faint",
								children: [
									title.sourceLabel ? `From ${title.sourceLabel}` : null,
									title.director && title.director !== title.sourceLabel ? ` · Dir. ${title.director}` : null,
									title.cast.length ? ` · ${title.cast.join(" · ")}` : null
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-10 max-w-xl",
						onSubmit: (e) => {
							e.preventDefault();
							addNote(title.id, note);
							setNote("");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "house-kicker",
								children: "A note on this title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (e) => setNote(e.target.value),
								maxLength: 280,
								placeholder: "Private. Stays on this device.",
								className: "mt-2 h-20 w-full rounded-md border border-cine-border bg-cine-well p-3 font-ui"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "house-btn house-btn--ghost mt-2",
								children: "Save note"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							heading: "Similar titles",
							titles: similar
						})
					})
				]
			})
		]
	});
}
function SearchThumb({ title }) {
	const [broken, setBroken] = (0, import_react.useState)(!title.poster);
	(0, import_react.useEffect)(() => setBroken(!title.poster), [title.poster, title.id]);
	if (broken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "search-thumb",
		"aria-hidden": "true",
		children: title.title.slice(0, 1)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "search-thumb",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: title.poster,
			alt: "",
			onError: () => setBroken(true)
		})
	});
}
function SearchOverlay() {
	const open = useCinevo((s) => s.searchOpen);
	const setSearchOpen = useCinevo((s) => s.setSearchOpen);
	const openTitle = useCinevo((s) => s.openTitle);
	const [q, setQ] = (0, import_react.useState)("");
	const extra = useCinevo((s) => s.localTitles);
	const remote = useCinevo((s) => s.remoteTitles);
	const results = (0, import_react.useMemo)(() => {
		const query = q.trim();
		if (!query) return [];
		return filterCatalog({
			query,
			pool: [...extra, ...remote]
		}).slice(0, 8);
	}, [
		q,
		extra,
		remote
	]);
	(0, import_react.useEffect)(() => {
		if (!open) setQ("");
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-cine-bg/80 p-4 pt-16",
		onMouseDown: () => setSearchOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong w-full max-w-2xl rounded-xl p-4",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-lg border border-cine-border bg-cine-well px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 16,
							className: "text-cine-cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search your library",
							"aria-label": "Search your library",
							className: "h-12 flex-1 bg-transparent font-ui text-base outline-none",
							onKeyDown: (e) => {
								if (e.key === "Enter" && q.trim() && results[0]) {
									openTitle(results[0].id);
									setSearchOpen(false);
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Close search",
							className: "flex size-11 items-center justify-center",
							onClick: () => setSearchOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-cine-faint",
					children: extra.length + remote.length === 0 ? "Nothing in your library yet." : !q.trim() ? "Type a title, person, or genre." : results.length ? `${results.length} ${results.length === 1 ? "title" : "titles"} · Enter opens · Esc` : "No matches."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "search-results",
					children: results.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-cine-well",
						onClick: () => {
							openTitle(t.id);
							setSearchOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchThumb, { title: t }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "block truncate font-ui",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "text-cine-faint",
								children: [
									t.year,
									" · ",
									t.genre
								]
							})]
						})]
					}, t.id))
				})
			]
		})
	});
}
function SettingsModal() {
	const open = useCinevo((s) => s.settingsOpen);
	const setSettingsOpen = useCinevo((s) => s.setSettingsOpen);
	const prefs = useCinevo((s) => s.prefs);
	const patchPrefs = useCinevo((s) => s.patchPrefs);
	const setTheme = useCinevo((s) => s.setTheme);
	const clearLocalData = useCinevo((s) => s.clearLocalData);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) setConfirmClear(false);
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-cine-bg/80 p-4",
		onMouseDown: () => setSettingsOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong mx-auto mt-16 max-w-lg rounded-xl p-5",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
						children: "LOCAL PREFERENCES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-ui text-lg font-semibold tracking-tight",
						children: "Settings"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close settings",
						onClick: () => setSettingsOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
							children: "THEME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "theme-grid",
							role: "listbox",
							"aria-label": "Theme",
							children: THEMES.map((t) => {
								const on = prefs.theme === t.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "option",
									"aria-selected": on,
									"aria-label": `${t.label} theme`,
									onClick: () => setTheme(t.id),
									className: on ? "theme-option is-on" : "theme-option",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
											className: "swatch",
											"data-swatch": t.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t.feel })] }),
										on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : null
									]
								}, t.id);
							})
						}),
						[
							{
								key: "nightMode",
								label: "Dim the billboard",
								hint: "Darken featured art. Colors stay with the theme."
							},
							{
								key: "zenMode",
								label: "Zen mode",
								hint: "Hide poster metadata"
							},
							{
								key: "focusMode",
								label: "Focus player",
								hint: "Quieter playback chrome"
							}
						].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-4 rounded-lg bg-cine-surface px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "block font-ui text-sm",
								children: row.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-cine-faint",
								children: row.hint
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: prefs[row.key],
								onChange: (e) => patchPrefs({ [row.key]: e.target.checked }),
								className: "size-5 accent-cine-cyan"
							})]
						}, row.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseRemote, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCinevo, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-cine-danger/40 bg-cine-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-ui text-sm",
							children: "Local data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-cine-faint",
							children: "This clears watch progress, My List, indexed titles, Plex sign-in, and Node pairing on this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `mt-3 h-11 w-full rounded-md font-ui font-bold ${confirmClear ? "bg-cine-danger text-cine-text" : "border border-cine-danger text-cine-danger"}`,
							onClick: () => {
								if (!confirmClear) {
									setConfirmClear(true);
									return;
								}
								clearLocalData();
								setConfirmClear(false);
								setSettingsOpen(false);
							},
							children: confirmClear ? "Tap again to clear everything" : "Clear all local data"
						})
					]
				})
			]
		})
	});
}
function CoreModal() {
	const open = useCinevo((s) => s.coreOpen);
	const tab = useCinevo((s) => s.coreTab);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setCoreTab = useCinevo((s) => s.setCoreTab);
	const sources = useCinevo((s) => s.sources);
	const aiConsent = useCinevo((s) => s.aiConsent);
	const setAiConsent = useCinevo((s) => s.setAiConsent);
	const flash = useCinevo((s) => s.flash);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		getMyProfile().then((res) => {
			if (res.ok && res.profile) setProfile(res.profile);
		}).catch(() => void 0);
	}, [open]);
	if (!open) return null;
	const points = (sources.length ? 1 : 0) + (profile ? 1 : 0) + (aiConsent ? 1 : 0);
	const ask = async () => {
		if (!question.trim() || pending) return;
		setPending(true);
		try {
			const res = await askCinevo({ data: {
				question,
				titles: libraryPool().map((t) => ({
					title: t.title,
					year: t.year,
					kind: t.kind,
					genre: t.genre,
					rating: t.rating,
					synopsis: t.synopsis
				}))
			} });
			if (res.ok) setAnswer(res.text.replace(/\*\*/g, ""));
			else flash(res.error);
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-cine-bg/80 p-4",
		onMouseDown: () => setCoreOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong mx-auto my-8 max-w-3xl rounded-xl p-5",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
						children: "CINEVO CORE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-ui text-xl font-semibold tracking-tight",
						children: "Your media. Your rules."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close Core",
						onClick: () => setCoreOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mb-5 flex flex-wrap gap-2",
					children: [
						"libraries",
						"sharing",
						"stewardship",
						"ai"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCoreTab(t),
						className: `h-11 rounded-full px-4 font-ui text-sm font-semibold ${tab === t ? "bg-cine-cyan text-cine-bg" : "bg-cine-surface text-cine-muted"}`,
						children: t === "libraries" ? "Libraries" : t === "sharing" ? "Sharing" : t === "stewardship" ? "Privacy" : "AI"
					}, t))
				}),
				tab === "libraries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cine-muted",
							children: sources.length ? `${sources.length} source${sources.length === 1 ? "" : "s"} connected.` : "No sources yet. Folders scan in the browser. Sign in with Plex from Library. Jellyfin uses CINEVO Node."
						}),
						sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-cine-surface px-3 py-3 font-ui text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "capitalize",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 font-mono text-xs text-cine-faint",
									children: [
										s.kind,
										" · ",
										s.count
									]
								})]
							}, s.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 rounded-md bg-cine-cyan px-5 font-ui font-bold text-cine-bg",
							onClick: () => {
								setCoreOpen(false);
								useCinevo.getState().setRoom("sidebar");
							},
							children: "Open Library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-ui text-xs font-semibold tracking-[0.1em] text-cine-cyan",
								children: "NODE INSTALLERS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-cine-muted",
								children: "Needed for Jellyfin and disk paths on the computer that holds the files. Plex signs in here. Folder pick works in this browser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/node",
								className: "mt-3 inline-flex h-11 items-center font-ui text-sm font-bold text-cine-cyan",
								onClick: () => setCoreOpen(false),
								children: "Open pairing"
							})
						] })
					]
				}),
				tab === "sharing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharePanel, {}),
				tab === "stewardship" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-4xl text-cine-cyan",
						children: points
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-sm text-cine-muted",
						children: "stewardship points — for care, not watch-time."
					}),
					profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-ui text-sm text-cine-text",
						children: [
							"@",
							profile.username,
							" · ",
							profile.xp,
							" XP · ",
							profile.streak,
							" night streak"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-cine-faint",
						children: "Claim a username to start a streak and share libraries."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [
							{
								label: "Private index",
								done: sources.length > 0
							},
							{
								label: "Username ready",
								done: Boolean(profile)
							},
							{
								label: "AI consent",
								done: aiConsent
							},
							{
								label: "Library care",
								done: sources.length > 0
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg border border-cine-border bg-cine-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "font-ui text-sm",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-cine-faint",
								children: item.done ? "Complete" : "Open"
							})]
						}, item.label))
					})
				] }),
				tab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between rounded-lg bg-cine-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-ui text-sm",
							children: "Private metadata assistance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-cine-faint",
							children: "Only titles in this CINEVO library"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: aiConsent,
							onChange: (e) => setAiConsent(e.target.checked),
							className: "size-5 accent-cine-cyan"
						})]
					}), aiConsent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: AI_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-full bg-cine-well px-4 font-ui text-sm",
								onClick: () => setQuestion(p.q),
								children: p.label
							}, p.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: question,
							onChange: (e) => setQuestion(e.target.value),
							maxLength: 400,
							placeholder: "What should I watch tonight?",
							className: "h-24 w-full rounded-md border border-cine-border bg-cine-well p-3 font-ui"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: ask,
							disabled: pending,
							className: "h-11 rounded-md bg-cine-cyan px-5 font-ui font-bold text-cine-bg",
							children: pending ? "Thinking…" : "Ask CINEVO"
						}),
						answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg bg-cine-surface p-3 text-sm text-cine-muted",
							children: answer
						}) : null
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cine-faint",
						children: "Enable consent to ask the concierge."
					})]
				})
			]
		})
	});
}
function NoticesOverlay() {
	const open = useCinevo((s) => s.noticesOpen);
	const setNoticesOpen = useCinevo((s) => s.setNoticesOpen);
	const notices = useCinevo((s) => s.notices);
	const markNoticeRead = useCinevo((s) => s.markNoticeRead);
	const markAllNoticesRead = useCinevo((s) => s.markAllNoticesRead);
	const dismissNotice = useCinevo((s) => s.dismissNotice);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const setRoom = useCinevo((s) => s.setRoom);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-cine-bg/80 p-4",
		onMouseDown: () => setNoticesOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong mx-auto mt-16 max-w-lg rounded-xl p-5",
			onMouseDown: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Notices",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
						children: "HOUSE NOTES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-ui text-lg font-semibold tracking-tight",
						children: "Notices"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close notices",
						onClick: () => setNoticesOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				notices.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "font-ui text-xs text-cine-cyan",
						onClick: markAllNoticesRead,
						children: "Mark all read"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cine-faint",
					children: "Nothing waiting. Library changes and sharing land here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: notices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `rounded-lg px-3 py-3 ${n.readAt ? "bg-cine-well" : "bg-cine-surface"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full text-left",
							onClick: () => {
								markNoticeRead(n.id);
								if (n.href?.includes("core=sharing")) setCoreOpen(true, "sharing");
								else if (n.href?.includes("core=libraries")) {
									setCoreOpen(false);
									setRoom("sidebar");
								} else if (n.href?.includes("core=ai")) setCoreOpen(true, "ai");
								setNoticesOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "block font-ui text-sm",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-cine-muted",
								children: n.message
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 font-ui text-xs text-cine-faint hover:text-cine-danger",
							onClick: () => dismissNotice(n.id),
							children: "Dismiss"
						})]
					}, n.id))
				})
			]
		})
	});
}
function Toast() {
	const toast = useCinevo((s) => s.toast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-cine-cyan bg-cine-elevated px-4 py-2 font-ui text-sm tracking-wide",
		children: toast
	});
}
var issuePlayback = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("285ba666976a3441837695ddd867727ae066a2557f7d04def4368d428fa219cc"));
function hostOf(href) {
	return new URL(href).hostname.toLowerCase().replace(/^\[|\]$/g, "");
}
/** A cast target fetches the stream on its own. Blob files and loopback pages never reach a TV. */
function castBlock(file, pageHref) {
	if (!file || file.startsWith("blob:") || file.startsWith("data:")) return "local";
	let href = file;
	try {
		href = new URL(file, pageHref).href;
		const host = hostOf(href);
		if (host === "localhost" || host === "127.0.0.1" || host === "::1") return "loopback";
	} catch {
		return "loopback";
	}
	return null;
}
function formatClock(current, duration) {
	const stamp = (n) => {
		if (!Number.isFinite(n) || n < 0) return "0:00";
		return `${Math.floor(n / 60)}:${Math.floor(n % 60).toString().padStart(2, "0")}`;
	};
	return `${stamp(current)} / ${stamp(duration)}`;
}
function streamPath(file, source) {
	if (!file) return "No stream";
	if (file.startsWith("blob:")) return "Direct play · this browser";
	if (file.includes("/api/stream")) {
		if (source === "plex") return "CINEVO proxy · Plex";
		if (source === "jellyfin") return "CINEVO proxy · Jellyfin";
		if (source === "folder") return "CINEVO proxy · Node";
		return "CINEVO proxy";
	}
	if (file.includes("/v1/play")) return "Node on this computer";
	return "CINEVO proxy";
}
function captionTracks(video) {
	const tracks = [];
	for (let i = 0; i < video.textTracks.length; i++) {
		const track = video.textTracks[i];
		if (track.kind === "subtitles" || track.kind === "captions") tracks.push(track);
	}
	return tracks;
}
function shiftCueTimes(video, offset, bases) {
	let cues = 0;
	for (const track of captionTracks(video)) {
		const list = track.cues;
		if (!list) continue;
		for (let i = 0; i < list.length; i++) {
			const cue = list[i];
			if (!("startTime" in cue) || !("endTime" in cue)) continue;
			let base = bases.get(cue);
			if (!base) {
				base = {
					start: cue.startTime,
					end: cue.endTime
				};
				bases.set(cue, base);
			}
			const start = Math.max(0, base.start + offset);
			cue.startTime = start;
			cue.endTime = Math.max(start + .05, base.end + offset);
			cues += 1;
		}
	}
	return cues;
}
function Player() {
	const playingId = useCinevo((s) => s.playingId);
	const playing = useCinevo((s) => s.playing);
	const progress = useCinevo((s) => s.playingId ? s.progress[s.playingId] ?? 0 : 0);
	const focusMode = useCinevo((s) => s.prefs.focusMode);
	const play = useCinevo((s) => s.play);
	const togglePlay = useCinevo((s) => s.togglePlay);
	const stopPlay = useCinevo((s) => s.stopPlay);
	const setProgress = useCinevo((s) => s.setProgress);
	const flash = useCinevo((s) => s.flash);
	const introSkip = useCinevo((s) => s.prefs.introSkip);
	const subtitleOffset = useCinevo((s) => s.prefs.subtitleOffset);
	const markers = useCinevo((s) => s.markers);
	const addMarker = useCinevo((s) => s.addMarker);
	const removeMarker = useCinevo((s) => s.removeMarker);
	const sources = useCinevo((s) => s.sources);
	const nodeUrl = useCinevo((s) => s.nodeUrl);
	const nodeToken = useCinevo((s) => s.nodeToken);
	const plexClient = useCinevo((s) => s.plexClientId);
	const user = useCurrentUser();
	const title = titleById(playingId);
	const videoRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const [chrome, setChrome] = (0, import_react.useState)(true);
	const [statsOpen, setStatsOpen] = (0, import_react.useState)(false);
	const [nerd, setNerd] = (0, import_react.useState)(null);
	const [infoOpen, setInfoOpen] = (0, import_react.useState)(false);
	const [remoteSrc, setRemoteSrc] = (0, import_react.useState)();
	const [remoteErr, setRemoteErr] = (0, import_react.useState)("");
	const [remotePending, setRemotePending] = (0, import_react.useState)(false);
	const [playbackFailed, setPlaybackFailed] = (0, import_react.useState)(false);
	const [fit, setFit] = (0, import_react.useState)("original");
	const [fitTitle, setFitTitle] = (0, import_react.useState)(playingId);
	if (fitTitle !== playingId) {
		setFitTitle(playingId);
		setFit("original");
	}
	const [onTv, setOnTv] = (0, import_react.useState)(false);
	const blob = title ? mediaUrl(title.id) : void 0;
	const file = playbackFailed ? void 0 : blob || remoteSrc;
	const cueBase = (0, import_react.useRef)(/* @__PURE__ */ new WeakMap());
	const primed = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video || !file) {
			setOnTv(false);
			return;
		}
		video.disableRemotePlayback = false;
		video.setAttribute("x-webkit-airplay", "allow");
		const remote = video.remote;
		if (!remote) return;
		const mark = () => setOnTv(remote.state === "connected");
		remote.addEventListener("connect", mark);
		remote.addEventListener("connecting", mark);
		remote.addEventListener("disconnect", mark);
		mark();
		return () => {
			remote.removeEventListener("connect", mark);
			remote.removeEventListener("connecting", mark);
			remote.removeEventListener("disconnect", mark);
		};
	}, [file]);
	const onCast = () => {
		const video = videoRef.current;
		if (!video || !file) return;
		const block = castBlock(file, window.location.href);
		if (block === "local") {
			flash("This file is only in this browser. Cast and AirPlay need a proxied stream the TV can open.");
			return;
		}
		if (block === "loopback") {
			flash("This page is on localhost. A TV cannot open it. Use the house address on your network.");
			return;
		}
		const remote = video.remote;
		if (remote?.prompt) {
			remote.prompt().catch((err) => {
				const name = err instanceof DOMException ? err.name : "";
				if (name === "NotAllowedError" || name === "AbortError") return;
				if (typeof video.webkitShowPlaybackTargetPicker === "function") {
					video.webkitShowPlaybackTargetPicker();
					return;
				}
				flash("No Cast or AirPlay receiver answered. Use Chrome on Android, or Safari on iPhone or Mac, on the same network.");
			});
			return;
		}
		if (typeof video.webkitShowPlaybackTargetPicker === "function") {
			video.webkitShowPlaybackTargetPicker();
			return;
		}
		flash("This browser has no Cast or AirPlay. Use Chrome on Android, or Safari on iPhone or Mac.");
	};
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setRemoteSrc(void 0);
		setRemoteErr("");
		setRemotePending(false);
		setPlaybackFailed(false);
		setStatsOpen(false);
		setInfoOpen(false);
		primed.current = "";
		cueBase.current = /* @__PURE__ */ new WeakMap();
		if (!title || mediaUrl(title.id)) return;
		const source = sourceForTitle(title, sources) || sources.find((item) => item.kind === title.source && item.baseUrl && (item.accessToken || item.kind === "folder"));
		const openProxy = (provider, uri, key, token, clientId) => {
			setRemotePending(true);
			issuePlayback({ data: {
				provider,
				uri,
				key,
				token,
				clientId,
				fit: provider === "node" ? "original" : fit
			} }).then((res) => {
				if (cancelled) return;
				if (res.ok) setRemoteSrc(res.src);
				else setRemoteErr(res.error);
			}).catch(() => {
				if (!cancelled) setRemoteErr("Could not open a playback stream through CINEVO.");
			}).finally(() => {
				if (!cancelled) setRemotePending(false);
			});
		};
		if (title.source === "folder" && source?.baseUrl && title.path && nodeToken) {
			const base = source.baseUrl || nodeUrl;
			if (isLoopbackUrl(base)) {
				setRemoteSrc(nodePlayUrl(base, nodeToken, title.path, title.id));
				return;
			}
			openProxy("node", base, title.path, nodeToken, title.id);
			return () => {
				cancelled = true;
			};
		}
		if ((title.source === "plex" || title.source === "jellyfin") && title.path && source?.baseUrl && source.accessToken) openProxy(title.source, source.baseUrl, title.path, source.accessToken, plexClient || void 0);
		return () => {
			cancelled = true;
		};
	}, [
		title?.id,
		title?.path,
		title?.source,
		title?.sourceLabel,
		nodeToken,
		nodeUrl,
		plexClient,
		sources,
		fit
	]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video || !file) return;
		video.muted = muted;
		if (playing) video.play().catch(() => useCinevo.setState({ playing: false }));
		else video.pause();
	}, [
		playing,
		file,
		playingId,
		muted
	]);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video || !file) return;
		if (captionTracks(video).some((track) => track.mode === "showing")) shiftCueTimes(video, subtitleOffset, cueBase.current);
	}, [
		subtitleOffset,
		file,
		playingId
	]);
	(0, import_react.useEffect)(() => {
		if (!playing || !file) {
			setChrome(true);
			return;
		}
		let timer = window.setTimeout(() => setChrome(false), 2200);
		const bump = () => {
			setChrome(true);
			window.clearTimeout(timer);
			timer = window.setTimeout(() => setChrome(false), 2200);
		};
		window.addEventListener("mousemove", bump);
		window.addEventListener("touchstart", bump);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("mousemove", bump);
			window.removeEventListener("touchstart", bump);
		};
	}, [playing, file]);
	(0, import_react.useEffect)(() => {
		if (!playingId || !user || user.isDevFallback) return;
		bumpWatch().catch(() => void 0);
	}, [playingId, user]);
	(0, import_react.useEffect)(() => {
		if (!statsOpen) return;
		const tick = () => {
			const v = videoRef.current;
			const path = streamPath(file, title?.source);
			if (!v) {
				setNerd({
					output: "—",
					dropped: "—",
					buffered: "—",
					clock: "—",
					path
				});
				return;
			}
			const quality = v.getVideoPlaybackQuality?.();
			const buffered = v.buffered?.length ? v.buffered.end(v.buffered.length - 1) : 0;
			setNerd({
				output: v.videoWidth ? `${v.videoWidth}×${v.videoHeight}` : "—",
				dropped: quality ? `${quality.droppedVideoFrames} / ${quality.totalVideoFrames}` : "—",
				buffered: buffered ? `${Math.round(buffered)}s` : "—",
				clock: formatClock(v.currentTime, v.duration),
				path
			});
		};
		tick();
		const id = window.setInterval(tick, 400);
		return () => window.clearInterval(id);
	}, [
		statsOpen,
		file,
		title?.source
	]);
	const seek = (value) => {
		if (!title) return;
		setProgress(title.id, value);
		const video = videoRef.current;
		if (video && Number.isFinite(video.duration) && video.duration > 0) video.currentTime = value / 100 * video.duration;
	};
	const onToggle = () => {
		if (!title) return;
		const video = videoRef.current;
		if ((progress >= 100 || video?.ended) && video && file) {
			video.currentTime = 0;
			setProgress(title.id, 0);
			useCinevo.setState({ playing: true });
			video.play().catch(() => useCinevo.setState({ playing: false }));
			return;
		}
		if (video && file) {
			if (video.paused) {
				useCinevo.setState({ playing: true });
				video.play().catch(() => useCinevo.setState({ playing: false }));
			} else {
				video.pause();
				useCinevo.setState({ playing: false });
			}
			return;
		}
		if (progress >= 100) play(title.id);
		else togglePlay();
	};
	(0, import_react.useEffect)(() => {
		const onRemote = (event) => {
			const command = event.detail;
			if (!command) return;
			const video = videoRef.current;
			const current = titleById(useCinevo.getState().playingId);
			if (command.type === "playTitle") {
				play(command.titleId);
				return;
			}
			if (!current) return;
			if (command.type === "stop") {
				stopPlay();
				return;
			}
			if (command.type === "toggle") {
				onToggle();
				return;
			}
			if (command.type === "play") {
				useCinevo.setState({ playing: true });
				if (video) video.play().catch(() => useCinevo.setState({ playing: false }));
				return;
			}
			if (command.type === "pause") {
				if (video) video.pause();
				useCinevo.setState({ playing: false });
				return;
			}
			if (command.type === "volume") {
				if (!video) return;
				video.volume = command.value;
				video.muted = command.value <= 0;
				setMuted(command.value <= 0);
				return;
			}
			if (command.type === "seek" && video && Number.isFinite(video.duration) && video.duration > 0) {
				if (typeof command.by === "number") video.currentTime = Math.min(video.duration, Math.max(0, video.currentTime + command.by));
				else if (typeof command.to === "number") video.currentTime = command.to / 100 * video.duration;
				setProgress(current.id, video.currentTime / video.duration * 100);
			} else if (command.type === "seek" && typeof command.to === "number") seek(command.to);
		};
		window.addEventListener("cinevo-remote", onRemote);
		return () => window.removeEventListener("cinevo-remote", onRemote);
	});
	(0, import_react.useEffect)(() => {
		if (!title) return;
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.key === "i" || e.key === "I") {
				e.preventDefault();
				setStatsOpen((open) => !open);
				return;
			}
			if (e.key !== " ") return;
			e.preventDefault();
			onToggle();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		title,
		file,
		progress,
		playing
	]);
	if (!title) return null;
	const missing = remotePending ? fit === "compatible" ? "This file will not play as-is. Asking your server for a browser-friendly copy…" : "Opening a private stream through CINEVO…" : remoteErr ? remoteErr : title.source === "folder" ? "Folder playback needs a folder picked in this browser, or a paired CINEVO Node for a disk path." : title.source === "shared" ? "Shared libraries are an index only. Playback stays on the original Plex or Jellyfin server." : title.source === "plex" || title.source === "jellyfin" ? "Reconnect this library so CINEVO can proxy playback from your server." : "No playable file on this device.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stageRef,
		className: "fixed inset-0 z-50 bg-cine-bg text-cine-text",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${title.title} player`,
		onClick: () => file && onToggle(),
		children: [
			file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				"data-cinevo-player": "",
				src: file,
				className: "player-video absolute inset-0 h-full w-full bg-cine-bg object-contain",
				playsInline: true,
				preload: "auto",
				autoPlay: true,
				disableRemotePlayback: false,
				muted,
				onLoadedData: (e) => {
					const v = e.currentTarget;
					v.muted = muted;
					if (primed.current !== title.id) {
						primed.current = title.id;
						const skip = useCinevo.getState().prefs.introSkip;
						if (progress > 0 && progress < 100 && Number.isFinite(v.duration)) v.currentTime = progress / 100 * v.duration;
						else if (skip > 0 && Number.isFinite(v.duration) && v.duration > skip + 1) {
							v.currentTime = skip;
							setProgress(title.id, skip / v.duration * 100);
							flash(`Skipped the first ${skip}s`);
						}
					}
					if (playing) v.play().catch(() => useCinevo.setState({ playing: false }));
				},
				onTimeUpdate: (e) => {
					const v = e.currentTarget;
					if (!v.duration) return;
					setProgress(title.id, v.currentTime / v.duration * 100);
				},
				onError: () => {
					if (!blob && !remoteSrc) return;
					if (!blob && remoteSrc?.includes("/api/stream") && fit === "original" && (title.source === "plex" || title.source === "jellyfin")) {
						setFit("compatible");
						setPlaybackFailed(false);
						return;
					}
					setPlaybackFailed(true);
					if (blob) setRemoteErr("This file could not be played in the browser.");
					else if (remoteSrc?.includes("/v1/play")) setRemoteErr("Could not play this file from Node on this computer.");
					else if (fit === "compatible") setRemoteErr("Your server could not make a browser-friendly copy of this file.");
					else setRemoteErr("CINEVO could not play this file through the proxy. The server has to be reachable from here.");
				},
				onEnded: () => {
					setProgress(title.id, 100);
					useCinevo.setState({ playing: false });
					setChrome(true);
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: title.still || title.poster,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandWatermark, { className: `absolute left-4 top-4 z-10 transition-opacity ${file && playing && !chrome ? "opacity-40" : "opacity-90"}` }),
			statsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "nerd-stats",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: title.title })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: title.sourceLabel || title.source })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Decision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: nerd?.path ?? streamPath(file, title.source) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Quality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fit === "compatible" ? "Browser copy · your server" : file?.startsWith("/api/stream") ? "Original · proxied" : file ? "Original on this device" : "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Output" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: nerd?.output ?? "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Dropped frames" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: nerd?.dropped ?? "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Buffered" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: nerd?.buffered ?? "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Clock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: nerd?.clock ?? "—" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Intro skip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: introSkip > 0 ? `${introSkip}s from the start` : "Off" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtitle offset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: subtitleOffset ? `${subtitleOffset > 0 ? "+" : ""}${subtitleOffset}s` : "0s" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Text track" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: videoRef.current ? captionTracks(videoRef.current).length ? "Present" : "None on this file" : "—" })] })
				]
			}) : null,
			infoOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "player-info",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "player-info__kicker",
						children: "On this file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [
						title.year,
						title.runtime,
						title.genre
					].filter(Boolean).join(" · ") }),
					title.director ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Directed by ", title.director] }) : null,
					title.cast?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title.cast.slice(0, 6).join(", ") }) : null,
					title.synopsis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title.synopsis }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "player-info__note",
						children: [title.sourceLabel || title.source || "This house", " · CINEVO does not add a public filmography."]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-cine-bg to-transparent transition-opacity ${chrome ? "opacity-100" : "opacity-0"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close player",
				onClick: (e) => {
					e.stopPropagation();
					stopPlay();
				},
				className: `absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-cine-line bg-cine-elevated/80 text-cine-text transition-opacity ${chrome ? "opacity-100" : "opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-opacity ${file && playing && !chrome ? "opacity-0" : "opacity-100"}`,
				children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-16 items-center justify-center rounded-full bg-cine-text text-cine-bg",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
						size: 26,
						fill: "currentColor"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						size: 26,
						fill: "currentColor"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto max-w-md text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-sm text-cine-muted",
						children: missing
					}), title.source === "folder" && !remotePending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "house-btn house-btn--play mt-4",
						onClick: async (e) => {
							e.stopPropagation();
							const n = await reconnectFolders();
							if (n) {
								useCinevo.setState({ localTitles: [...useCinevo.getState().localTitles] });
								flash(`Reconnected ${n} files`);
							} else {
								flash("Re-select the folder in Library");
								useCinevo.getState().setRoom("sidebar");
								stopPlay();
							}
						},
						children: "Reconnect folder"
					}) : null]
				}), file && muted && playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-medium uppercase tracking-[0.08em] text-cine-muted",
					children: "Sound off · unmute in the bar"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `player-bar absolute inset-x-0 bottom-0 z-10 space-y-3 transition-opacity ${chrome ? "opacity-100" : "pointer-events-none opacity-0"} ${focusMode ? "opacity-70" : ""}`,
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-medium tracking-[0.08em] text-cine-muted",
						children: progress >= 100 ? "Finished · Play again from the start" : file ? "Esc closes · Space pauses · I stats" : "Esc closes"
					}),
					file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "player-marks",
						children: [
							introSkip > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const v = videoRef.current;
									if (!v || !Number.isFinite(v.duration) || v.duration <= introSkip) {
										flash("This file is shorter than the skip");
										return;
									}
									v.currentTime = introSkip;
									setProgress(title.id, introSkip / v.duration * 100);
								},
								children: [
									"Skip ",
									introSkip,
									"s"
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const v = videoRef.current;
									const at = v && v.duration ? v.currentTime / v.duration * 100 : progress;
									const stamp = v && Number.isFinite(v.currentTime) ? formatClock(v.currentTime, v.duration).split(" / ")[0] : "";
									addMarker(title.id, at, stamp ? `Mark ${stamp}` : "Marker");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { size: 14 }), " Mark"]
							}),
							markers.filter((marker) => marker.titleId === title.id).map((marker) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "player-mark",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => seek(marker.at),
									children: marker.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Remove ${marker.label}`,
									onClick: () => removeMarker(marker.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
								})]
							}, marker.id))
						]
					}) : null,
					file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 font-mono text-xs text-cine-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 tabular-nums",
								children: [Math.round(progress), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Timeline",
								type: "range",
								min: 0,
								max: 100,
								value: progress,
								onChange: (e) => seek(Number(e.target.value)),
								className: "h-1 flex-1 accent-cine-cyan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title.runtime })
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-x-3 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onToggle,
								"aria-label": playing ? "Pause" : "Play",
								className: "flex size-11 items-center justify-center",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 18 })
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "truncate font-ui text-lg font-semibold tracking-tight",
								children: title.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex max-w-full flex-wrap items-center justify-end text-cine-muted",
							children: [file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": muted ? "Unmute" : "Mute",
									className: "flex size-11 items-center justify-center",
									onClick: () => {
										const next = !muted;
										setMuted(next);
										if (videoRef.current) videoRef.current.muted = next;
									},
									children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Subtitles",
									"aria-pressed": Boolean(videoRef.current && captionTracks(videoRef.current).some((track) => track.mode === "showing")),
									className: "flex size-11 items-center justify-center",
									onClick: () => {
										const video = videoRef.current;
										if (!video) {
											flash("No subtitles on this file");
											return;
										}
										const tracks = captionTracks(video);
										if (!tracks.length) {
											flash("No subtitles on this file");
											return;
										}
										if (tracks.some((track) => track.mode === "showing")) {
											for (const track of tracks) track.mode = "hidden";
											flash("Subtitles off");
											return;
										}
										for (const track of tracks) track.mode = "showing";
										const offset = useCinevo.getState().prefs.subtitleOffset;
										const cues = shiftCueTimes(video, offset, cueBase.current);
										if (offset !== 0 && cues === 0) flash("Track on. Cue times are not exposed yet, so the offset cannot move them.");
										else if (offset !== 0) flash(`Subtitles on · ${offset > 0 ? "+" : ""}${offset}s`);
										else flash("Subtitles on");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": infoOpen,
									"aria-label": infoOpen ? "Hide file info" : "File info",
									className: "flex size-11 items-center justify-center",
									onClick: () => setInfoOpen((open) => !open),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": statsOpen,
									"aria-label": statsOpen ? "Hide nerd stats" : "Show nerd stats",
									className: "flex size-11 items-center justify-center",
									onClick: () => setStatsOpen((open) => !open),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Download original",
									className: "flex size-11 items-center justify-center",
									onClick: () => {
										if (!file.startsWith("/api/stream")) {
											flash("This file plays from the browser. Use the folder if you need the original.");
											return;
										}
										const href = `${file}${file.includes("?") ? "&" : "?"}download=1`;
										const link = document.createElement("a");
										link.href = href;
										link.download = `${title.title}.mp4`;
										document.body.appendChild(link);
										link.click();
										link.remove();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": onTv,
									"aria-label": onTv ? "Playing on a TV" : "Play on a TV",
									className: `flex size-11 items-center justify-center ${onTv ? "text-cine-cyan" : ""}`,
									onClick: onCast,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cast, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Fullscreen",
									className: "flex size-11 items-center justify-center",
									onClick: () => {
										const node = stageRef.current;
										if (!node) return;
										if (document.fullscreenElement) document.exitFullscreen();
										else node.requestFullscreen();
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Expand, { size: 18 })
								})
							] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 px-3 font-ui text-sm font-bold text-cine-cyan",
								onClick: stopPlay,
								children: "Close"
							})]
						})]
					})
				]
			})
		]
	});
}
function isTyping(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
function Keys() {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const s = useCinevo.getState();
			if (s.playingId) {
				if (e.key === "Escape") s.stopPlay();
				return;
			}
			if (e.key === "Escape") {
				if (s.searchOpen) s.setSearchOpen(false);
				else if (s.settingsOpen) s.setSettingsOpen(false);
				else if (s.coreOpen) s.setCoreOpen(false);
				else if (s.noticesOpen) s.setNoticesOpen(false);
				else if (s.selectedId) s.closeTitle();
				return;
			}
			if (isTyping(e.target)) return;
			if (e.key === "/") {
				e.preventDefault();
				s.setSearchOpen(true);
			}
			if (e.key === "t" || e.key === "T") {
				if (s.searchOpen || s.settingsOpen || s.coreOpen || s.selectedId) return;
				const i = THEMES.findIndex((th) => th.id === s.prefs.theme);
				const next = THEMES[(i + 1) % THEMES.length];
				s.setTheme(next.id);
				s.flash(`${next.label} theme`);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return null;
}
function snapshot(library) {
	const state = useCinevo.getState();
	const current = titleById(state.playingId);
	const video = document.querySelector("video[data-cinevo-player]");
	const duration = video && Number.isFinite(video.duration) ? video.duration : 0;
	const position = duration > 0 && video ? video.currentTime / duration * 100 : current ? state.progress[current.id] ?? 0 : 0;
	const volume = video ? video.muted ? 0 : video.volume : 1;
	const rest = library.filter((item) => item.id !== current?.id).slice(0, current ? 23 : 24);
	const titles = [...current ? [{
		id: current.id,
		name: current.title
	}] : [], ...rest.map((item) => ({
		id: item.id,
		name: item.title
	}))];
	return {
		title: current?.title ?? "",
		detail: current ? [current.year, current.kind === "series" ? "Series" : "Movie"].filter(Boolean).join(" · ") : "",
		playing: Boolean(state.playing && current),
		position,
		volume,
		titles
	};
}
function apply(commands) {
	for (const command of commands) window.dispatchEvent(new CustomEvent("cinevo-remote", { detail: command }));
}
function RemoteBridge() {
	const library = useLibrary();
	const libraryRef = (0, import_react.useRef)(library);
	libraryRef.current = library;
	(0, import_react.useEffect)(() => {
		let stop = false;
		let code = readHouseCode();
		let timer = 0;
		const tick = async () => {
			if (stop || !code) return;
			try {
				const res = await syncHouseRemote(code, snapshot(libraryRef.current));
				if (res.ok && res.commands?.length) apply(res.commands);
			} catch {}
		};
		const start = async () => {
			try {
				const res = await openHouseRemote(code);
				if (stop) return;
				if (res.ok && res.code) {
					code = res.code;
					writeHouseCode(res.code);
				}
			} catch {}
			if (stop || !code) return;
			await tick();
			timer = window.setInterval(() => void tick(), 1200);
		};
		start();
		return () => {
			stop = true;
			window.clearInterval(timer);
		};
	}, []);
	return null;
}
function AppSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cinevo-house min-h-screen bg-cine-bg text-cine-text",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "top-nav",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "top-nav__brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: "sm",
					tagline: false
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-[max(5vw,1.25rem)] py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-28 animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-12 w-64 max-w-full animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-11 w-40 animate-pulse rounded-md bg-cine-surface" })
			]
		})]
	});
}
function Cinema() {
	const { user, isPending } = useCurrentUserState();
	const room = useCinevo((s) => s.room);
	const setRoom = useCinevo((s) => s.setRoom);
	const setCoreOpen = useCinevo((s) => s.setCoreOpen);
	const search = Route$13.useSearch();
	(0, import_react.useEffect)(() => {
		const next = roomFromParam(search.room);
		if (next) setRoom(next);
		if (search.core) setCoreOpen(true, search.core);
	}, [
		search.room,
		search.core,
		setRoom,
		setCoreOpen
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: {
			mode: "in",
			...search.room ? { room: search.room } : {},
			...search.core ? { core: search.core } : {}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		overlays: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {})
		] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keys, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoteBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomSwitch, { room })
		]
	});
}
//#endregion
export { Cinema as component };
