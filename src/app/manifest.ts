import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Charcoin",
    short_name: "Charcoin",
    description: "A global crypto-powered platform that drives real-world change through impactful donations and community engagement.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#10141C", // Matches your dark background
    theme_color: "#00f0b5",       // Your brand’s neon-cyan highlight
    lang: "en-US",
    icons: [
      {
        "src": "/pwa-icons/windows11/SmallTile.scale-100.png",
        "sizes": "71x71",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/SmallTile.scale-125.png",
        "sizes": "89x89",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/SmallTile.scale-150.png",
        "sizes": "107x107",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/SmallTile.scale-200.png",
        "sizes": "142x142",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/SmallTile.scale-400.png",
        "sizes": "284x284",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Square150x150Logo.scale-100.png",
        "sizes": "150x150",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Square150x150Logo.scale-125.png",
        "sizes": "188x188",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Square150x150Logo.scale-150.png",
        "sizes": "225x225",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Square150x150Logo.scale-200.png",
        "sizes": "300x300",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Square150x150Logo.scale-400.png",
        "sizes": "600x600",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Wide310x150Logo.scale-100.png",
        "sizes": "310x150",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Wide310x150Logo.scale-125.png",
        "sizes": "388x188",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Wide310x150Logo.scale-150.png",
        "sizes": "465x225",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Wide310x150Logo.scale-200.png",
        "sizes": "620x300",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/Wide310x150Logo.scale-400.png",
        "sizes": "1240x600",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/LargeTile.scale-100.png",
        "sizes": "310x310",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/LargeTile.scale-125.png",
        "sizes": "388x388",
        "type": "image/png"
      },
      {
        "src": "/pwa-icons/windows11/LargeTile.scale-150.png",
        "sizes": "465x465",
        "type": "image/png"
      }
    ]
  };
}
