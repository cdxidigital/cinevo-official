import { Download } from "lucide-react";
import { INSTALLERS } from "@/lib/node-client";
import { Mark } from "./logo";

export function InstallerCards() {
  return (
    <div className="app-shelf app-shelf--grid">
      {INSTALLERS.map((item) => (
        <a key={item.id} href={item.href} download className="dl-card">
          <img src="/node-icon.png" alt="" />
          <p className="dl-card__kicker">{item.label}</p>
          <strong>{item.arch}</strong>
          <p>{item.hint}</p>
          <span className="dl-card__go">
            <Download size={16} /> Download Node
          </span>
        </a>
      ))}
    </div>
  );
}

const PHONE_APPS = [
  {
    id: "android",
    kicker: "Android",
    title: "Remote 1.1",
    detail: "Sideload the APK. Play, pause, and seek only. The video stays on the house.",
    href: "/installers/CINEVO-Remote.apk",
    download: true,
    action: "Download APK",
  },
  {
    id: "ios-profile",
    kicker: "iPhone & iPad",
    title: "Home Screen",
    detail: "Install the CINEVO profile in Settings. It opens this house’s remote, full screen.",
    href: "/api/ios-profile",
    download: false,
    action: "Get profile",
  },
  {
    id: "ios-xcode",
    kicker: "iOS 17 and later",
    title: "Xcode project",
    detail: "Current SwiftUI remote for iPhone and iPad. Sign it with your Apple ID. Not an App Store build.",
    href: "/installers/CINEVO-Remote-iOS.zip",
    download: true,
    action: "Download project",
  },
] as const;

export function PhoneApps() {
  return (
    <div className="app-shelf app-shelf--grid">
      {PHONE_APPS.map((item) => (
        <a key={item.id} href={item.href} download={item.download || undefined} className="dl-card">
          <Mark />
          <p className="dl-card__kicker">{item.kicker}</p>
          <strong>{item.title}</strong>
          <p>{item.detail}</p>
          <span className="dl-card__go">
            <Download size={16} /> {item.action}
          </span>
        </a>
      ))}
    </div>
  );
}
