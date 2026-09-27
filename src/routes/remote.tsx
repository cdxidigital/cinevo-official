import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { Logo } from "@/components/cinevo/logo";
import { InstallCinevo, REMOTE_APK } from "@/components/cinevo/house-remote";
import { readPhoneRemote, sendRemoteCommand } from "@/lib/remote-client";
import { normalizeCode, type RemoteNow } from "@/lib/remote-protocol";

export const Route = createFileRoute("/remote")({
  component: RemotePage,
  head: () => ({
    meta: [
      { title: "CINEVO Remote" },
      { name: "description", content: "Control the CINEVO house that is open on your screen." },
      { name: "theme-color", content: "#050505" },
    ],
  }),
});

const PHONE_CODE = "cinevo-phone-code";

function RemotePage() {
  const [draft, setDraft] = useState("");
  const [code, setCode] = useState("");
  const [now, setNow] = useState<RemoteNow | null>(null);
  const [ageMs, setAgeMs] = useState(0);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    try {
      const saved = normalizeCode(localStorage.getItem(PHONE_CODE));
      if (saved) {
        setCode(saved);
        setDraft(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!code) return;
    let stop = false;
    const tick = async () => {
      const res = await readPhoneRemote(code);
      if (stop) return;
      if (!res.ok || !res.now) {
        setError(res.error || "The house did not answer.");
        setNow(null);
        return;
      }
      setError("");
      setNow(res.now);
      setAgeMs(res.ageMs ?? 0);
    };
    void tick();
    const timer = window.setInterval(() => void tick(), 1000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, [code]);

  const join = (event: React.FormEvent) => {
    event.preventDefault();
    const next = normalizeCode(draft);
    if (!next) {
      setError("Enter the six-character code from the house.");
      return;
    }
    setError("");
    setCode(next);
    try {
      localStorage.setItem(PHONE_CODE, next);
    } catch {
      /* ignore */
    }
  };

  const send = async (command: Parameters<typeof sendRemoteCommand>[1]) => {
    if (!code) return;
    setPending(true);
    const res = await sendRemoteCommand(code, command);
    setPending(false);
    if (!res.ok) setError(res.error || "The house did not take that.");
    else if (now && (command.type === "play" || command.type === "pause" || command.type === "toggle")) {
      setNow({ ...now, playing: command.type === "pause" ? false : command.type === "play" ? true : !now.playing });
    }
  };

  const live = Boolean(now && ageMs < 8000);
  const playing = Boolean(now?.playing);

  return (
    <main className="remote-app">
      <header className="remote-app__bar">
        <Logo size="sm" tagline={false} />
        <span>Remote</span>
      </header>

      {!code ? (
        <form className="remote-join glass-strong" onSubmit={join}>
          <h1>Control the house</h1>
          <p>This remote controls the house. It does not play or cast. Cast and AirPlay are on the screen that has the video.</p>
          <label>
            House code
            <input
              value={draft}
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              inputMode="text"
              maxLength={7}
              placeholder="ABC-DEF"
              onChange={(event) => setDraft(event.target.value.toUpperCase())}
            />
          </label>
          {error ? <p className="remote-app__error">{error}</p> : null}
          <button type="submit" className="house-btn">
            Connect
          </button>
        </form>
      ) : (
        <section className="remote-pad">
          <div className="remote-now glass">
            <p className={live ? "is-live" : ""}>{live ? "House is open" : "Waiting for the house"}</p>
            <h1>{now?.title || "Nothing is playing"}</h1>
            <small>{now?.detail || (live ? "Pick a title below, or press play on the house." : "Keep CINEVO open on the screen you want to control.")}</small>
          </div>
          {error ? <p className="remote-app__error">{error}</p> : null}
          <div className="remote-transport">
            <button type="button" aria-label="Back 10 seconds" disabled={!live || pending} onClick={() => void send({ type: "seek", by: -10 })}>
              <SkipBack />
            </button>
            <button type="button" className="is-main" aria-label={playing ? "Pause" : "Play"} disabled={!live || pending} onClick={() => void send({ type: playing ? "pause" : "play" })}>
              {playing ? <Pause /> : <Play />}
            </button>
            <button type="button" aria-label="Forward 10 seconds" disabled={!live || pending} onClick={() => void send({ type: "seek", by: 10 })}>
              <SkipForward />
            </button>
          </div>
          <div className="remote-sliders">
            <label>
              Position
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                disabled={!live || !now?.title}
                value={Math.round(now?.position ?? 0)}
                onChange={(event) => now && setNow({ ...now, position: Number(event.target.value) })}
                onPointerUp={(event) => void send({ type: "seek", to: Number((event.target as HTMLInputElement).value) })}
              />
            </label>
            <label>
              Volume
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                disabled={!live}
                value={Math.round((now?.volume ?? 1) * 100)}
                onChange={(event) => now && setNow({ ...now, volume: Number(event.target.value) / 100 })}
                onPointerUp={(event) => void send({ type: "volume", value: Number((event.target as HTMLInputElement).value) / 100 })}
              />
            </label>
          </div>
          <button type="button" className="house-btn house-btn--ghost remote-stop" disabled={!live || pending} onClick={() => void send({ type: "stop" })}>
            <Square size={14} /> Stop
          </button>
          <div className="remote-titles">
            <h2>In this library</h2>
            {now?.titles.length ? (
              <ul>
                {now.titles.map((item) => (
                  <li key={item.id}>
                    <button type="button" disabled={!live || pending} onClick={() => void send({ type: "playTitle", titleId: item.id })}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No imported titles yet. Add a library on the house, then they show up here.</p>
            )}
          </div>
          <button
            type="button"
            className="remote-forget"
            onClick={() => {
              setCode("");
              setNow(null);
              try {
                localStorage.removeItem(PHONE_CODE);
              } catch {
                /* ignore */
              }
            }}
          >
            Use a different code
          </button>
        </section>
      )}

      <footer className="remote-app__foot">
        <InstallCinevo compact />
        <a href={REMOTE_APK} download>
          <Download size={16} /> Download the Android remote
        </a>
        <p>The APK is a sideload remote, not a Play Store app. It opens this page after you enter your CINEVO address.</p>
      </footer>
    </main>
  );
}
