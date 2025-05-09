import {
  Confetti,
  Hash,
  HeartCircle,
  Leaves,
  UserCircle,
} from "@mynaui/icons-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: Hash,
          submenus: [],
        },
        {
          href: "/causes",
          label: "Causes",
          icon: Leaves,
          submenus: [],
        },
        {
          href: "/rewards",
          label: "Rewards",
          icon: Confetti,
          submenus: [
            {
              href: "/rewards/top-tiers",
              label: "Top Tiers",
              icon: Hash,
            },
            {
              href: "/rewards/charity-lottery",
              label: "Charity Lottery",
              icon: Hash,
            },
            {
              href: "/rewards/nfts",
              label: "NTFs",
              icon: Hash,
            },
            {
              href: "/rewards/staking",
              label: "Staking",
              icon: Hash,
            },
          ],
        },
        {
          href: "/community",
          label: "Community",
          icon: HeartCircle,
          submenus: [
            {
              href: "/community/news",
              label: "News",
              icon: Hash,
            },
            {
              href: "/community/user-and-wallets",
              label: "Users & Wallets",
              icon: Hash,
            },
            {
              href: "/community/administration",
              label: "Administration",
              icon: Hash,
            },
          ],
        },
        {
          href: "/settings",
          label: "Dapp Global Settings",
          icon: UserCircle,
          submenus: [
            {
              href: "/settings/causes",
              label: "Causes",
              icon: Hash,
            },
            {
              href: "/settings/governance",
              label: "Governance",
              icon: Hash,
            },
            {
              href: "/settings/rewards",
              label: "Rewards",
              icon: Hash,
            },
            {
              href: "/settings/wallet-management",
              label: "Wallets Management",
              icon: Hash,
            },
          ],
        },
      ],
    },
  ];
}
