
# 🌐 CharCoin Admin Panel

This is the official admin dashboard for the CharCoin ecosystem — designed for governance, reward distribution, charity fund control, and smart contract management.

Built with [Next.js](https://nextjs.org) and bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Features

- ✅ Trigger monthly/annual fund releases
- ✅ Manage DAO proposals and votes
- ✅ View staking data and contract states
- ✅ Emergency halt/unhalt and multi-sig actions
- ✅ Role-based admin access

---

## 📦 Tech Stack

- Framework: **Next.js (App Router)**  
- Styling: **Tailwind CSS**  
- Wallet: **Solana Wallet Adapter**  
- Contracts: **Anchor (Rust)**  
- Deployment: **Vercel**

---

## 🛠 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Then open: [http://localhost:3000](http://localhost:3000) to view the dashboard.

Start editing in: `app/page.tsx` — live reload is enabled.

---

## 🌐 Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PROGRAM_ID=Your_Anchor_Program_ID
```

---

## 🖋 Fonts & UI

Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font) for performance.

---

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Solana Anchor Docs](https://book.anchor-lang.com/)
* [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

---

## 🚀 Deploy on Vercel

Deploy with 1-click: [Deploy CharCoin Admin Panel on Vercel](https://vercel.com/new)

Full deployment guide: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

