import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Check, J as ArrowDownRight, K as ArrowRight, b as Play, h as ShieldCheck } from "../_libs/lucide-react.mjs";
import { c as PhoneApps, d as Logo, f as Mark, p as cn, s as InstallerCards } from "./router-DnPGrcCK.mjs";
import { u as useCurrentUserState } from "./sharing-Bp4Capic.mjs";
import { n as LandingAuth } from "./account-BpMfec7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BsQM1WrO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useInView(once = true) {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (reducedMotion()) {
			setInView(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				if (once) io.disconnect();
			} else if (!once) setInView(false);
		}, {
			threshold: .16,
			rootMargin: "0px 0px -10% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, [once]);
	return {
		ref,
		inView
	};
}
function useParallax(factor = 28) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !factor || reducedMotion()) return;
		let raf = 0;
		const tick = () => {
			raf = 0;
			const rect = el.getBoundingClientRect();
			const mid = rect.top + rect.height / 2;
			const p = (window.innerHeight / 2 - mid) / window.innerHeight;
			el.style.transform = `scale(1.14) translate3d(0, ${p * factor}px, 0)`;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(tick);
		};
		tick();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [factor]);
	return ref;
}
function Reveal({ as: Tag = "div", children, className, delay = 0, variant = "rise" }) {
	const { ref, inView } = useInView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("cine-reveal", `cine-reveal-${variant}`, inView && "is-in", className),
		style: { "--cine-delay": `${delay}ms` },
		children
	});
}
var STEPS = [
	{
		n: "01",
		t: "Pick a source",
		d: "Plex, Jellyfin, a folder on this computer, or CINEVO Node — one wizard, one library at a time."
	},
	{
		n: "02",
		t: "Choose sections",
		d: "Select only the movie and series libraries you want CINEVO to index."
	},
	{
		n: "03",
		t: "Make it yours",
		d: "Your connected library appears only after your choice. Nothing is published."
	}
];
var HIGHLIGHTS = [
	{
		n: "01",
		eyebrow: "PRIVATE LIBRARIES",
		title: "Choose exactly what belongs in view.",
		description: "Folders, Plex, or Jellyfin. Select the sections CINEVO may index. Playback is proxied through CINEVO for servers you own.",
		action: "Set up libraries",
		search: { room: "library" }
	},
	{
		n: "02",
		eyebrow: "FRIEND SHARING",
		title: "Share with care, never by default.",
		description: "Invite by CINEVO username. Share Plex and Jellyfin catalogs — never the files. Playback stays on the original server.",
		action: "Manage sharing",
		search: { core: "sharing" }
	},
	{
		n: "03",
		eyebrow: "CINEVO CORE",
		title: "A quieter way to care for your collection.",
		description: "Library health, setup, and consent — without turning private media into a social performance.",
		action: "Explore Core",
		search: { core: "libraries" }
	},
	{
		n: "04",
		eyebrow: "CONSENT-LED AI",
		title: "Thoughtful suggestions on your terms.",
		description: "Ask only the titles already in this house. Nothing leaves until you opt in.",
		action: "See AI controls",
		search: { core: "ai" }
	}
];
function EnterHouse({ className = "public-primary", label = "Enter CINEVO" }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || !user || user.isDevFallback) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/login",
		search: { mode: "in" },
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
				size: 15,
				fill: "currentColor"
			}),
			" ",
			label
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/app",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
				size: 15,
				fill: "currentColor"
			}),
			" ",
			label
		]
	});
}
function Home() {
	const chapterStill = useParallax(32);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "public-nav",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Homepage",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							search: { room: "library" },
							children: "Your library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/node",
							children: "Node"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/help",
							children: "Help"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "public-nav__actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingAuth, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "public-hero",
					"aria-labelledby": "public-hero-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/stills/hero-theater.jpg",
							alt: "",
							className: "public-hero__still"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "public-hero__veil" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "public-hero__content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
									size: "xl",
									layout: "stacked",
									tagline: false,
									className: "public-hero__logo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									id: "public-hero-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your media." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Your moment." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The libraries you control, in one private house. Folders, Plex, and Jellyfin — shared by username, never published." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "public-hero__actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterHouse, { label: "Play your library" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/login",
										search: { mode: "up" },
										className: "public-secondary",
										children: ["Create account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { size: 16 })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "public-hero__note",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Private from the first connection" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Personal media stays on your computer or the server you own." })] })]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-reel",
					"aria-labelledby": "home-reel-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						as: "header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "public-kicker",
							children: "START WITH YOUR LIBRARY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "home-reel-title",
							children: "Nothing appears here until you choose it."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CINEVO never fills your library with sample media or imported catalogue data." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-library-steps",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							as: "article",
							delay: i * 90,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.n }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: step.t }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step.d })
							]
						}, step.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "public-chapter",
					id: "libraries",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							ref: chapterStill,
							src: "/stills/doorway.jpg",
							alt: "",
							className: "public-chapter__still"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "public-chapter__veil" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "home-manifesto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								className: "home-manifesto__intro",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "public-kicker",
										children: "THE PRIVATE MEDIA OS"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
										"Every library is personal.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "So CINEVO starts with permission." })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bring together the media you own and host without turning it into someone else’s platform. Folders on this computer. Plex at home or remote. Jellyfin from the library wizard." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app",
										search: { room: "library" },
										className: "public-text-link",
										children: ["Connect a library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
								className: "home-manifesto__rules",
								delay: 120,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Select libraries deliberately" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Choose the individual sections CINEVO can see." })] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Keep sharing intentional" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Invite by username. Share the catalog, not the files." })] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Stay in control of AI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Opt in and set the metadata scope for each request." })] })] })
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-highlights",
					id: "sharing",
					"aria-labelledby": "home-highlights-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						as: "header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "public-kicker",
							children: "A MORE CONSIDERED MEDIA LIFE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "home-highlights-title",
							children: [
								"Everything useful.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Nothing extractive."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-highlights__grid",
						children: HIGHLIGHTS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 70,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/app",
								search: item.search,
								className: "home-highlight",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.n }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.eyebrow }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
										item.action,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
									] })
								]
							})
						}, item.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-downloads",
					id: "downloads",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "public-kicker",
								children: "CINEVO NODE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-ui text-4xl font-semibold leading-tight tracking-tight md:text-5xl",
								children: "The projector lives at home."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 mb-10 max-w-xl text-sm text-cine-muted",
								children: "Install Node on the computer that holds the files. Pair once. Jellyfin and disk paths stay on loopback."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallerCards, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: 120,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "public-kicker mt-14",
									children: "PHONE REMOTE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-ui text-3xl font-semibold tracking-tight md:text-4xl",
									children: "Android, and current iPhone."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 mb-6 max-w-xl text-sm text-cine-muted",
									children: "The phone controls the house. It does not play the file. Cast and AirPlay stay on the screen that has the video."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneApps, {})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "home-closing",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "public-kicker",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "public-kicker__gem" }), " CINEVO · CINEMA, REINVENTED"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"A home for your",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "entire world of stories." })
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: 100,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Connect the library you trust. Claim a username. Then settle in." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterHouse, { label: "Begin with your library" })]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "public-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "public-brand",
						"aria-label": "CINEVO home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							size: "lg",
							layout: "stacked"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cinema, reinvented. Your media. Your moment." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "public-footer__links",
						"aria-label": "More",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/node",
								children: "Node"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/help",
								children: "Help"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/legal/privacy",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/legal/terms",
								children: "Terms"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterHouse, {
						className: "public-footer__enter",
						label: "Enter CINEVO"
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
