// const SettingsWalletManagement = () => {
//   return <div>

//   </div>;
// };

// export default SettingsWalletManagement;
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Plus } from "lucide-react"
import { HeaderWrapper } from "@/components/custom/header-wrapper"
import { ArrowRight } from "@mynaui/icons-react"
import useDialogStore from "@/stores/dialog-store"
import { CustomSheet } from "@/components/reuseable/add-causes-sheet"
import WalletHistoryDialog from "@/components/reuseable/wallet_history"
import NewPayoutDialog from "@/components/reuseable/new-payout"
// import WalletHistoryDialog from "@/components/wallet-history-dialog"
// import NewPayoutDialog from "@/components/new-payout-dialog"

export default function EcosystemWallets() {
  const [historyOpen, setHistoryOpen] = useState(false)
  const [payoutOpen, setPayoutOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const { openDialog, setWalletSettingOpenExisting, setWalletSettingAddNew } = useDialogStore();

  const openHistory = (walletName: string) => {
    setSelectedWallet(walletName)
    setWalletSettingOpenExisting(true)
  }

  const openPayout = (walletName: string) => {
    setSelectedWallet(walletName)
    setWalletSettingAddNew(true)
  }


  

  return (
 <div className="flex flex-col gap-4">
   <HeaderWrapper
    title={"Dapp Global Settings - Governance"}
    description={
      "Manage settings related to the governance of the CharCoin ecosystem"
    }
    actions={
      <Button>
        Save Settings
        <ArrowRight className="w-5 h-5" />
      </Button>
    }
  />
    <div className="min-h-screen bg-background rounded-xl text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-1">Global Ecosystem Wallets</h1>
        <p className="text-sm text-gray-400 mb-6">
          Manage the Global Ecosystem Wallets for the CharCoin ecosystem on the TG Blockchain
        </p>

        <div className="border-t-4 border-primary my-8"></div>

        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Buyback, deflationary system & marketing (10%)</h2>
            <p className="text-sm text-gray-400">Allocated for the global marketing operations</p>
          </div>

          <div className="space-y-6 border-l-4 border-secondary pl-4">
            <WalletItem
              title="Marketing Main Wallet"
              address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
              onViewHistory={() => openHistory("Marketing Main Wallet")}
              onMakePayout={() => openPayout("Marketing Main Wallet")}
            />

            <WalletItem
              title="Marketing Secondary Wallet"
              address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
              description="Used for secondary wallet related to marketing operations (50% total Revenue)"
              onViewHistory={() => openHistory("Marketing Secondary Wallet")}
              onMakePayout={() => openPayout("Marketing Secondary Wallet")}
            />

            <WalletItem
              title="Buyback Wallet"
              address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
              description="Used for the deflationary logic (50% total Revenue)"
              onViewHistory={() => openHistory("Buyback Wallet")}
              showPayoutButton={false}
            />
          </div>
        </section>

        <div className="border-t border-primary my-8"></div>

        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Charity Donation & Rewards Ecosystem (27%)</h2>
            <p className="text-sm text-gray-400">Allocated for the global ecosystem</p>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Rewards System (20%)</h3>
            <p className="text-xs text-gray-400">Allocated for the 10% of the Charity Donation & Rewards Ecosystem</p>
          </div>

          <div className="pl-4 border-l-2 border-gray-800 mb-8">
            <div className="mb-4">
              <h4 className="text-sm font-semibold">Monthly Rewards Classification (60%)</h4>
              <p className="text-xs text-gray-400">Of the 20% of the Rewards System</p>
            </div>

            <div className="space-y-6 mb-8">
              <WalletItem
                title="Top Tier Wallet"
                description="Used for the Wallet that will be used for monthly rewards (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Top Tier Wallet")}
                showPayoutButton={false}
              />

              <WalletItem
                title="Charity Lottery Wallet"
                description="Used for the Charity Lottery Wallet that will be used for monthly rewards (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Charity Lottery Wallet")}
                showPayoutButton={false}
              />
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold">Annual Rewards Classification (20%)</h4>
              <p className="text-xs text-gray-400">Of the 20% of the Rewards System</p>
            </div>

            <div className="space-y-6">
              <WalletItem
                title="Top Tier Wallet"
                description="Used for the Wallet that will be used for annual rewards (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Annual Top Tier Wallet")}
                showPayoutButton={false}
              />

              <WalletItem
                title="Charity Lottery Wallet"
                description="Used for the Charity Lottery Wallet that will be used for annual rewards (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Annual Charity Lottery Wallet")}
                showPayoutButton={false}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Donation System (80%)</h3>
            <p className="text-xs text-gray-400">Allocated for the 90% of the Charity Donation & Rewards Ecosystem</p>
          </div>

          <div className="pl-4 border-l-2 border-gray-800 mb-8">
            <div className="mb-4">
              <h4 className="text-sm font-semibold">Monthly Donation Fund (80%)</h4>
              <p className="text-xs text-gray-400">Of the 80% of the Donation System</p>
            </div>

            <div className="space-y-6 mb-8">
              <WalletItem
                title="One Time Causes/Projects Wallet"
                description="Used for the Wallet that will be used for monthly donations based on 'One Time Causes/Projects' (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("One Time Causes/Projects Wallet")}
                showPayoutButton={false}
              />

              <WalletItem
                title="Infinite Impact Causes/Projects Wallet"
                description="Used for the Wallet that will be used for monthly donations based on 'Infinite Impact Causes/Projects' (50% total Revenue). The Wallet should receive a new donation automatically, and donations will be sent to the causes in the Infinite Impact category."
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Infinite Impact Causes/Projects Wallet")}
                showPayoutButton={false}
              />
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold">Annual Donation Fund (10%)</h4>
              <p className="text-xs text-gray-400">Of the 80% of the Donation System</p>
            </div>

            <div className="space-y-6 mb-8">
              <WalletItem
                title="One Time Causes/Projects Wallet"
                description="Used for the Wallet that will be used for annual donations based on 'One Time Causes/Projects' (50% total Revenue)"
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Annual One Time Causes/Projects Wallet")}
                showPayoutButton={false}
              />

              <WalletItem
                title="Infinite Impact Causes/Projects Wallet"
                description="Used for the Wallet that will be used for annual donations based on 'Infinite Impact Causes/Projects' (50% total Revenue). The Wallet should receive a new donation automatically, and donations will be sent to the causes in the Infinite Impact category."
                address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Annual Infinite Impact Causes/Projects Wallet")}
                showPayoutButton={false}
              />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold">Crisis Classification (10%)</h4>
            <p className="text-xs text-gray-400">Of the 80% of the Donation System</p>
          </div>

          <div className="space-y-6">
            <WalletItem
              title="Crisis Wallet"
              description="Used for the Wallet that will be used for 'Crisis Situations' (Emergencies and urgent situations). The donations are made on a case-by-case basis and require the approval of the community."
              address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
              onViewHistory={() => openHistory("Crisis Wallet")}
              onMakePayout={() => openPayout("Crisis Wallet")}
            />
          </div>
        </section>

        <div className="border-t border-primary my-8"></div>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Staking Rewards (15%)</h2>
            <p className="text-sm text-gray-400">Allocated for the global ecosystem</p>
          </div>

          <div className="space-y-6">
            <WalletItem
              title="Staking Main Wallet"
              description="Used for staking rewards (100% total Revenue)"
              address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
              onViewHistory={() => openHistory("Staking Main Wallet")}
              showPayoutButton={false}
            />
          </div>
        </section>
      </div>

      {/* {selectedWallet && (
        <>
          <WalletHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} walletName={selectedWallet} />
          <NewPayoutDialog open={payoutOpen} onOpenChange={setPayoutOpen} walletName={selectedWallet} />
        </>
      )} */}

       <CustomSheet
              isOpen={openDialog == "wallet_setting_open_existing"}
              setIsOpen={setWalletSettingOpenExisting}
              title="Open Existing Wallet"
              className="pt-2 px-4"
            >
              <WalletHistoryDialog walletName={selectedWallet as string} />
            </CustomSheet>
            <CustomSheet
              isOpen={openDialog == "wallet_setting_add_new"}
              setIsOpen={setWalletSettingAddNew}
              title="Add New Wallet"
              className="pt-2 px-4"
            >
              <NewPayoutDialog walletName={selectedWallet as string} />
            </CustomSheet>
           
    </div>
 </div>  
  )
}

interface WalletItemProps {
  title: string
  address: string
  description?: string
  onViewHistory: () => void
  onMakePayout?: () => void
  showPayoutButton?: boolean
}

function WalletItem({
  title,
  address,
  description,
  onViewHistory,
  onMakePayout,
  showPayoutButton = true,
}: WalletItemProps) {
  return (
    <div className=" rounded-md p-4">
      <h3 className="font-medium mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-400 mb-2">{description}</p>}
      <div className=" rounded p-2 mb-3">
        <Input value={address} readOnly className="bg-transparent border-none text-gray-400 bg-custom-slate text-xs" />
      </div>
      <div className="flex gap-2">
        {showPayoutButton && onMakePayout && (
          <Button
            onClick={onMakePayout}
          >
            <Plus className="h-4 w-4 mr-1" />
            Make a new payout
          </Button>
        )}
        <Button
          onClick={onViewHistory}
          variant="outline"
          className="border-primary text-primary hover:bg-[#00ffcc20] text-xs rounded-md"
        >
          <Eye className="h-4 w-4 mr-1" />
          View History
        </Button>
      </div>
    </div>
  )
}
