import { create } from "zustand";

interface DialogState {
  openDialog:
  | "causes_detail"
  | "causes_edit"
  | "causes_add"
  | "community_news_add"
  | "community_user_wallet_add"
  | "community_administration_add"
  | "nfts_add"
  | "add_administrator"
  | "edit_administrator"
  | "add_category"
  | "edit_category"
  | "add_campaign"
  | "edit_campaign"
  | "wallet_setting_open_existing"
  | "wallet_setting_add_new"
  | null;

  openDetail: () => void;
  openEdit: () => void;
  openAdd: () => void;
  closeDialog: () => void;

  setCausesOpenDetail: (isOpen: boolean) => void;
  setCausesOpenEdit: (isOpen: boolean) => void;
  setCausesOpenAdd: (isOpen: boolean) => void;
  setCommunityNewsAdd: (isOpen: boolean) => void;
  setCommunityUserWalletAdd: (isOpen: boolean) => void;
  setCommunityAdministrationAdd: (isOpen: boolean) => void;
  setNtfsAdd: (isOpen: boolean) => void;
  // Adminstrator
  setAddAdministrator: (isOpen: boolean) => void;
  setEditAdministrator: (isOpen: boolean) => void;
  // Settings
  setAddCategory: (isOpen: boolean) => void;
  setEditCategory: (isOpen: boolean) => void;
  setAddCampaign: (isOpen: boolean) => void;
  setEditCampaign: (isOpen: boolean) => void;
  // Wallet Setting
  setWalletSettingOpenExisting: (isOpen: boolean) => void;
  setWalletSettingAddNew: (isOpen: boolean) => void;
}

const useDialogStore = create<DialogState>((set) => ({
  openDialog: null,

  // Open functions
  openDetail: () => set({ openDialog: "causes_detail" }),
  openEdit: () => set({ openDialog: "causes_edit" }),
  openAdd: () => set({ openDialog: "causes_add" }),
  closeDialog: () => set({ openDialog: null }),

  // Setter functions
  setCausesOpenDetail: (isOpen) =>
    set({ openDialog: isOpen ? "causes_detail" : null }),
  setCausesOpenEdit: (isOpen) =>
    set({ openDialog: isOpen ? "causes_edit" : null }),
  setCausesOpenAdd: (isOpen) =>
    set({ openDialog: isOpen ? "causes_add" : null }),
  setCommunityNewsAdd: (isOpen) =>
    set({ openDialog: isOpen ? "community_news_add" : null }),
  setCommunityUserWalletAdd: (isOpen) =>
    set({ openDialog: isOpen ? "community_user_wallet_add" : null }),
  setCommunityAdministrationAdd: (isOpen) =>
    set({ openDialog: isOpen ? "community_administration_add" : null }),
  setNtfsAdd: (isOpen) => set({ openDialog: isOpen ? "nfts_add" : null }),
  // Adminstrator
  setAddAdministrator: (isOpen) =>
    set({ openDialog: isOpen ? "add_administrator" : null }),
  setEditAdministrator: (isOpen) =>
    set({ openDialog: isOpen ? "edit_administrator" : null }),
  // Settings
  setAddCategory: (isOpen) =>
    set({ openDialog: isOpen ? "add_category" : null }),
  setEditCategory: (isOpen) =>
    set({ openDialog: isOpen ? "edit_category" : null }),
  setAddCampaign: (isOpen) =>
    set({ openDialog: isOpen ? "add_campaign" : null }),
  setEditCampaign: (isOpen) =>
    set({ openDialog: isOpen ? "edit_campaign" : null }),
  // Wallet Setting
  setWalletSettingOpenExisting: (isOpen) =>
    set({ openDialog: isOpen ? "wallet_setting_open_existing" : null }),
  setWalletSettingAddNew: (isOpen) => 
    set({ openDialog: isOpen ? "wallet_setting_add_new" : null }),

}));

export default useDialogStore;
