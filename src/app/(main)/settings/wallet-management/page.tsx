// const SettingsWalletManagement = () => {
//   return <div>

//   </div>;
// };

// export default SettingsWalletManagement;
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleArrowRight, Eye, File, Plus } from "lucide-react"
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
        title={"Dapp Global Settings - Wallets Management"}
        description={
          "Manage settings related to important wallets in the ecosystem, you will require 3 administrator level access signatures to perform any update or action"
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
          <p className="text-sm text-gray-400 mb-20 border-b border-[#323138] pb-5">
            Manage the main logic setup for the operational wallets (based on the 1% collection)
          </p>

          <div className="border-t-4 border-primary my-8"></div>

          <section className="mb-5 border-b-4 border-primary pb-24">


            <div className="space-y-6 border-l-[20px] border-secondary pl-4">
              <div className="mb-5 ml-4 border-b border-[#323138] pb-5">
                <h2 className="text-lg font-bold">Buyback, deflationary system & marketing (10%)</h2>
                <p className="text-sm text-gray-400">Based on the 1% global collection</p>
              </div>
              <WalletItem
                title="Marketing Main Wallet"
                description="Enter the main wallet related to marketing operations (SOLANA Network)"
                address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                onViewHistory={() => openHistory("Marketing Main Wallet")}
                onMakePayout={() => openPayout("Marketing Main Wallet")}
              />

              <WalletItem
                title="Marketing Secondary Wallet"
                address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                description="Enter the secondary wallet related to marketing operations (SOLANA Network)"
                onViewHistory={() => openHistory("Marketing Secondary Wallet")}
                onMakePayout={() => openPayout("Marketing Secondary Wallet")}
              />

              <WalletItem
                title="Death Wallet"
                address="9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                description="Enter the death wallet related to the deflacionary logic (SOLANA Network)"
                onViewHistory={() => openHistory("death wallet")}
                showPayoutButton={false}
              />
            </div>
          </section>

          <section className="mb-12 border-l-[20px] border-secondary pl-5">

            <div className="mb-4">
              <h2 className="text-lg font-bold">Charity Donation & Rewards Ecosystem (75%)</h2>
              <p className="text-sm text-gray-400">Based on the 1% global collection</p>
            </div>

            <div className="mb-12 border-l-[20px] border-secondary pl-5">
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Rewards System (20%)</h3>
                <p className="text-xs text-gray-400">Based on the 75% of the Charity Donation & Rewards Ecosystem</p>
              </div>

              <div className="pl-4 border-l-[20px] border-secondary mb-8">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold">Monthly Rewards Classification (50%)</h4>
                  <p className="text-xs text-gray-400">Of the 20% of the Rewards System</p>
                </div>

                <div className="space-y-6 mb-8">
                  <WalletItem
                    title="Top Tier Wallet"
                    description="Enter the Top Tier Wallet that will be used for monthly rewards (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Top Tier Wallet")}
                    showPayoutButton={false}
                  />

                  <WalletItem
                    title="Charity Lottery Wallet"
                    description="Enter the Charity Lottery Wallet that will be used for monthly rewards (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Charity Lottery Wallet")}
                    showPayoutButton={false}
                  />
                </div>

                <div className="mb-4 px-4">
                  <h4 className="text-sm font-semibold">Annual Rewards Classification (50%)</h4>
                  <p className="text-xs text-gray-400">Of the 20% of the Rewards System</p>
                </div>

                <div className="space-y-6">
                  <WalletItem
                    title="Top Tier Wallet"
                    description="Enter the Top Tier Wallet that will be used for annual rewards (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Annual Top Tier Wallet")}
                    showPayoutButton={false}
                  />

                  <WalletItem
                    title="Charity Lottery Wallet"
                    description="Enter the Charity Lottery Wallet that will be used for annual rewards (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Annual Charity Lottery Wallet")}
                    showPayoutButton={false}
                  />
                </div>
              </div>
            </div>


            <div className="mb-12 border-l-[20px] border-secondary pl-5">
              <div className="mb-6 border-b border-[#323138] pb-5">
                <h3 className="text-md font-semibold mb-2">Donation System (80%)</h3>
                <p className="text-xs text-gray-400">Based on the 75% of the Charity Donation & Rewards Ecosystem</p>
              </div>

              <div className="pl-4 border-l-[20px] border-secondary mb-8">
                <div className="mb-6 border-b border-[#323138] pb-5">
                  <h4 className="text-sm font-semibold">Monthly Donation Fund (80%)</h4>
                  <p className="text-xs text-gray-400">Of the 80% of the Donation System</p>
                </div>

                <div className="space-y-6 mb-8">
                  <WalletItem
                    title="One Time Causes/Projects Wallet"
                    description="Enter the Wallet that will be used for monthly donations focused on “One Time Causes/Projects” (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("One Time Causes/Projects Wallet")}
                    showPayoutButton={false}
                  />

                  <WalletItem
                    title="Infinite Impact Causes/Projects Wallet"
                    description="Enter the Wallet that will be used for monthly donations focused on “Infinite Impact Causes/Projects” (SOLANA Network). This Wallet should always stake all tokens received automatically and donations will be sent to organizations from the profits of the staked tokens only"
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
                    description="Enter the Wallet that will be used for annual donations focused on “One Time Causes/Projects” (SOLANA Network)"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Annual One Time Causes/Projects Wallet")}
                    showPayoutButton={false}
                  />

                  <WalletItem
                    title="Infinite Impact Causes/Projects Wallet"
                    description="Enter the Wallet that will be used for annual donations focused on “Infinite Impact Causes/Projects” (SOLANA Network). This Wallet should always stake all tokens received automatically and donations will be sent to organizations from the profits of the staked tokens only"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Annual Infinite Impact Causes/Projects Wallet")}
                    showPayoutButton={false}
                  />
                </div>
              </div>


              <div className="pl-4 border-l-[20px] border-secondary mb-28">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold">Crisis Classification (10%)</h4>
                  <p className="text-xs text-gray-400">Of the 80% of the Donation System</p>
                </div>

                <div className="space-y-6">
                  <WalletItem
                    title="Ch'ai Wallet"
                    description="Enter the Wallet that will be used for Ch’ai donations focused on “Emergencies and urgent donations” (SOLANA Network). This donations will remain out of public governance and donations will be performed at any moment by the directive team’s authorization"
                    address="pubkey9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv"
                    onViewHistory={() => openHistory("Ch'ai Wallet")}
                    onMakePayout={() => openPayout("Ch'ai Wallet")}
                  />
                </div>
              </div>

            </div>



          </section>

          <div className="border-t-4 border-primary my-8"></div>

          <section className="pl-4 border-l-[20px] border-secondary mb-28">
            <div className="mb-4 border-b border-[#323138] pb-5">
              <h2 className="text-lg font-bold">Staking Rewards (15%)</h2>
              <p className="text-sm text-gray-400">Based on the 1% global collection</p>
            </div>

            <div className="space-y-6">
              <WalletItem
                title="Staking Main Wallet"
                description="Enter the main wallet related to staking operations (SOLANA Network)"
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
      <div className=" rounded py-2 mb-3">
        <Input value={address} readOnly className="bg-[#3d3c44] border-none text-gray-400  text-xs" />
      </div>
      <div className="flex gap-2">
        {showPayoutButton && onMakePayout && (
          <Button
            onClick={onMakePayout}
          >
            Make a new payout
            <CircleArrowRight className="-rotate-45 h-4 w-4 mr-1" />
          </Button>
        )}
        <Button
          onClick={onViewHistory}
          variant="outline"
          className="border-primary text-black bg-primary hover:bg-[#00ffcc20] text-xs rounded-md"
        >
          View History
          <File className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  )
}
