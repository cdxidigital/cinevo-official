import SwiftUI
import WebKit

/// Current iOS remote (iOS 17+). Playback stays on the house. This screen only opens /remote.
struct RemoteScreen: View {
    @AppStorage("cinevo.house") private var house = ""
    @State private var draft = ""
    @State private var live = ""
    @State private var message = ""

    private var loopback: Bool {
        let raw = draft.lowercased()
        return raw.contains("localhost") || raw.contains("127.0.0.1") || raw.contains("[::1]")
    }

    var body: some View {
        ZStack {
            Color(red: 0.02, green: 0.02, blue: 0.02).ignoresSafeArea()
            if live.isEmpty {
                setup
            } else {
                web
            }
        }
        .preferredColorScheme(.dark)
        .onAppear {
            if draft.isEmpty { draft = house }
        }
    }

    private var setup: some View {
        VStack(alignment: .leading, spacing: 18) {
            CinevoMark()
                .frame(width: 64, height: 64)
            Text("CINEVO")
                .font(.system(size: 34, weight: .heavy))
                .tracking(1.6)
                .foregroundStyle(.white)
            Text("Your media. Your moment.")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(Color(red: 0.333, green: 0.812, blue: 1))
            Text("Enter the address of your house. This remote sends play, pause, and seek. The video stays on that screen.")
                .font(.body)
                .foregroundStyle(Color.white.opacity(0.78))
                .fixedSize(horizontal: false, vertical: true)
            TextField("https://your-cinevo", text: $draft)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .keyboardType(.URL)
                .textContentType(.URL)
                .padding(16)
                .background(Color.white.opacity(0.06), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(Color.white.opacity(0.14)))
            if loopback {
                Text("A phone cannot open localhost. Use this computer’s address on your network.")
                    .font(.footnote)
                    .foregroundStyle(Color(red: 1, green: 0.62, blue: 0.45))
            }
            if !message.isEmpty {
                Text(message)
                    .font(.footnote)
                    .foregroundStyle(Color(red: 1, green: 0.55, blue: 0.60))
            }
            Button(action: connect) {
                Text("Connect")
                    .font(.headline.weight(.bold))
                    .foregroundStyle(Color(red: 0.02, green: 0.02, blue: 0.02))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color(red: 0.333, green: 0.812, blue: 1), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            }
            .buttonStyle(.plain)
            Text("iOS 17 and later. Not an App Store build.")
                .font(.footnote)
                .foregroundStyle(Color.white.opacity(0.45))
            Spacer(minLength: 0)
        }
        .padding(24)
        .padding(.top, 12)
    }

    private var web: some View {
        VStack(spacing: 0) {
            HStack {
                CinevoMark()
                    .frame(width: 22, height: 22)
                Text("CINEVO")
                    .font(.headline.weight(.heavy))
                    .tracking(1.1)
                Spacer()
                Button("Change house") {
                    live = ""
                    message = ""
                }
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(Color(red: 0.333, green: 0.812, blue: 1))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(.ultraThinMaterial)
            HouseWebView(url: URL(string: live)!)
        }
    }

    private func connect() {
        var raw = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        if !raw.hasPrefix("http://") && !raw.hasPrefix("https://") { raw = "https://" + raw }
        guard let url = URL(string: raw), let scheme = url.scheme, let host = url.host, !host.isEmpty,
              scheme == "http" || scheme == "https" else {
            message = "Use a full address, like https://cinevo.example."
            return
        }
        var origin = "\(scheme)://\(host)"
        if let port = url.port { origin += ":\(port)" }
        house = origin
        draft = origin
        live = origin + "/remote"
        message = ""
    }
}

/// Official five-facet mark. Do not recolor.
private struct CinevoMark: View {
    var body: some View {
        Canvas { context, size in
            let scale = min(size.width, size.height) / 512
            func fill(_ points: String, _ color: Color) {
                var path = Path()
                let pairs = points.split(separator: " ")
                for (index, pair) in pairs.enumerated() {
                    let xy = pair.split(separator: ",")
                    guard xy.count == 2, let x = Double(xy[0]), let y = Double(xy[1]) else { continue }
                    let point = CGPoint(x: x * scale, y: y * scale)
                    if index == 0 { path.move(to: point) } else { path.addLine(to: point) }
                }
                path.closeSubpath()
                context.fill(path, with: .color(color))
            }
            fill("80.32,51.04 80.32,460.96 207.2,260.88", Color(red: 1, green: 0.302, blue: 0.647))
            fill("80.32,460.96 451.2,256 207.2,260.88", Color(red: 1, green: 0.624, blue: 0.110))
            fill("80.32,51.04 295.4304,169.9168 207.2,260.88", Color(red: 0.545, green: 0.184, blue: 1))
            fill("295.4304,169.9168 451.2,256 207.2,260.88", Color(red: 0.333, green: 0.812, blue: 1))
            fill("391.8592,223.2064 451.2,256 391.8592,288.7936", Color(red: 0.784, green: 0.941, blue: 1))
        }
        .accessibilityHidden(true)
    }
}

private struct HouseWebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let view = WKWebView(frame: .zero)
        view.isOpaque = false
        view.backgroundColor = .black
        view.scrollView.contentInsetAdjustmentBehavior = .never
        view.load(URLRequest(url: url))
        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        if uiView.url != url { uiView.load(URLRequest(url: url)) }
    }
}
