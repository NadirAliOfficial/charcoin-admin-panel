# CharCoin Admin Panel

**Description**

CharCoin Admin Panel is a web‑based dashboard built with Next.js, React and TypeScript that allows administrators of the CharCoin ecosystem to manage staking pools, configure reward distribution, monitor private‑sale participants and view transaction and wallet analytics.

# CharCoin Admin Panel

Admin dashboard for the CharCoin ecosystem — manage staking pools, reward distribution, private sale allocations, and token analytics.

## Features
- Staking pool management
- Reward distribution controls
- Private sale participant overview
- Transaction and wallet analytics
- Role-based access control

## Tech Stack
- React + TypeScript
- Tailwind CSS
- Ethers.js / Web3 integration

## Requirements
- Node.js (>= 20)
- npm (>= 10) or pnpm

## Setup
```bash
npm install
npm run dev
```

## Configuration
The project does not require any mandatory environment variables for local development. If you add custom variables, create a `.env` file based on the names used in the source code.

## Usage
Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3004` (port is set via the `PORT` environment variable in the `dev` script).

## Project Structure
```
.gitignore
LICENSE
README.md
components.json
eslint.config.mjs
next-env.d.ts
next.config.js
next.config.ts
package.json
pnpm-lock.yaml
postcss.config.mjs
public/
  manifest.json
  pwa-icons/
src/
  app/
    (main)/
      causes/
      community/
        administration/
          admins.js
          page.tsx
        news/
          page.tsx
        user-and-wallets/
          page.tsx
      dashboard/
        page.tsx
      layout.tsx
      rewards/
        charity-lottery/
          page.tsx
        nfts/
          page.tsx
        staking/
          page.tsx
        top-tiers/
          page.tsx
      settings/
        causes/
          page.tsx
        governance/
          page.tsx
        rewards/
          page.tsx
        wallet-management/
          page.tsx
      error.tsx
      globals.css
      layout.tsx
      login/
        page.tsx
      manifest.ts
      not-found.tsx
      page.tsx
  components/
    WalletButton.tsx
    ... (other component files)
  lib/
    dummy-data.ts
    helper.ts
    menu-list.ts
    utils.ts
  schemas/
    adminstration-schema.ts
    auth-schema.ts
    campaign-schema.ts
    category-schema.ts
    causes-schema.ts
    news-schema.ts
    nfts-schema.ts
    payout-schema.ts
    ...
  stores/
    useUmiStore.ts
  types/
    administration.ts
    causes.ts
    news.ts
    rewards.ts
    staking.ts
    table.ts
```

## License
MIT
<!-- updated: 2026-06-18 -->
