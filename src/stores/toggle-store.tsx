import { create } from "zustand";

// Define the type for permissions
type Permissions = {
  [key: string]: boolean;
};

// Define the state structure
interface SwitchesProviderState {
  permissions: Permissions;
  togglePermission: (key: keyof Permissions) => void;
}

// Default permissions object
const defaultPermissions: Permissions = {
  dashboard: false,
  "causes.view": false,
  "causes.create": false,
  "causes.update": false,
  "causes.delete": false,
  "rewards.topTier.view": false,
  "rewards.charityLottery.view": false,
  "rewards.nfts.view": false,
  "rewards.nfts.create": false,
  "rewards.staking.view": false,
  "community.news.view": false,
  "community.news.create": false,
  "community.news.update": false,
  "community.news.delete": false,
  "dappGlobalSettings.causes": false,
  "dappGlobalSettings.governance": false,
  "dappGlobalSettings.rewards": false,
  "dappGlobalSettings.walletsManagement": false,
};

// Create Zustand store with typed state
export const useSwitchesProvider = create<SwitchesProviderState>((set) => ({
  permissions: defaultPermissions,
  togglePermission: (key) =>
    set((state) => ({
      permissions: {
        ...state.permissions,
        [key]: !state.permissions[key],
      },
    })),
}));
