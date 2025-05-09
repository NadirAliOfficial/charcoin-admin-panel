"use client"

import { formatCurrency } from "@/lib/utils"

interface WalletHistoryDialogProps {
  walletName: string
}

export default function WalletHistoryDialog({  walletName }: WalletHistoryDialogProps) {
  // Mock data for the wallet history
  const walletData = {
    balance: 847214.0,
    totalSent: 145000.0,
    address: "9fH7XWqE2z1B5VjKshp3Qn8Y7TcdP6ZMoJFkxuAWhqKv",
    transactions: [
      {
        type: "in",
        amount: 26000.0,
        currency: "USD",
        tokenType: "SOL",
        hash: "0xfd8bd18ba3c2a780065fe571fbdb3b57d97b717ef567e20040f15634d6fe8987b67c2",
        sender: "4d6fe8987b67c265fe8bd18ba38bdb57d97b717ef567e2138ba3857f1bdb3",
        date: "June 5, 2025",
        time: "19:54",
        authorizedBy: ["Confidencial Name 2", "Confidencial Name 4", "Confidencial Name 5"],
        note: "Payout for the marketing teams, including the services for May 2025",
      },
      {
        type: "out",
        amount: 31000.0,
        currency: "USD",
        tokenType: "SOL",
        hash: "0xfd8b34d6fe8987b67c265fe571fbdb3b57d97b717ef567e20d18ba3c2a780040f156",
        receiver: "4d6fe8987b67c265fe81bdb3b57d97b717ef567e213bd18ba38bd18ba385f",
        date: "May 5, 2025",
        time: "11:34",
        authorizedBy: ["Confidencial Name 1", "Confidencial Name 3", "Confidencial Name 4"],
        note: "Payout for the marketing teams, including the services for April 2025",
      },
      {
        type: "in",
        amount: 26000.0,
        currency: "USD",
        tokenType: "SOL",
        hash: "0xfd8bd18ba3c2a780040f1b3b57d97b717ef567e20563d6fe8987b67c265fe571fbd",
        sender: "7c265fe8bd18b57d4d6fe8987b697b717ef567e213a38bd18ba3857f1bdb3b",
        date: "April 5, 2025",
        time: "16:21",
        authorizedBy: ["Confidencial Name 2", "Confidencial Name 4", "Confidencial Name 5"],
        note: "Payout for the marketing teams, including the services for March 2025",
      },
      {
        type: "out",
        amount: 26000.0,
        currency: "USD",
        tokenType: "SOL",
        hash: "0xfd8bd18ba3c2a780040f15634d6fe8987b67c265fe571fbdb3b57d97b717ef567e20",
        receiver: "b3b57d4d6fe88bd18ba38bd18ba3857f1bd987b67c2617ef567e2135f97b77",
        date: "March 5, 2025",
        time: "17:36",
        authorizedBy: ["Confidencial Name 1", "Confidencial Name 3", "Confidencial Name 5"],
        note: "Payout for the marketing teams, including the services for February 2025",
      },
      {
        type: "out",
        amount: 26000.0,
        currency: "USD",
        tokenType: "SOL",
        hash: "0xfd040f15634d6f8bd18ba3c2a780e8987b67c265fe571fbdb3b57d97b717ef567e20",
        receiver: "040f15634d6f4d6fe8ba38bd18ba3857f1bdb3bf567e2135d97b717e7888",
        date: "February 5, 2025",
        time: "14:22",
        authorizedBy: ["Confidencial Name 1", "Confidencial Name 2", "Confidencial Name 3"],
        note: "Payout for the marketing teams, including the services for January 2025",
      },
    ],
  }

  return (
   

        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#00ffcc]">{walletName}</h2>
          <p className="text-sm text-gray-400 break-all">{walletData.address}</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-right">
              <p className="text-3xl font-bold">{formatCurrency(walletData.balance)}</p>
              <p className="text-sm text-gray-400">Current Balance</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{formatCurrency(walletData.totalSent)}</p>
              <p className="text-sm text-gray-400">Total sent in 5 transactions</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold">Transfers & Payouts History</h3>
            <p className="text-sm text-gray-400">
              Below you can find all the transactions in favor of the Organization (3 payouts)
            </p>
          </div>

          <div className="space-y-6 mt-6">
            {walletData.transactions.map((tx, index) => (
              <div key={index} className="border-l-4 border-[#00ffcc] pl-4 py-2">
                <div
                  className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
                  style={{
                    backgroundColor: tx.type === "in" ? "rgba(0, 255, 204, 0.2)" : "rgba(255, 99, 99, 0.2)",
                    color: tx.type === "in" ? "#00ffcc" : "#ff6363",
                  }}
                >
                  {tx.type === "in" ? "Transfer-In" : "Transfer-Out"}
                </div>

                <p className="text-lg font-bold">
                  ${tx.amount.toLocaleString()} {tx.currency} ({tx.tokenType})
                </p>

                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    HASH: <span className="text-gray-300">{tx.hash}</span>
                  </p>
                  {tx.type === "in" ? (
                    <p className="text-sm text-gray-400">
                      Sender Wallet: <span className="text-gray-300">{tx.sender}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Receiver Wallet: <span className="text-gray-300">{tx.receiver}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-400">
                    Sent on:{" "}
                    <span className="text-gray-300">
                      {tx.date} at {tx.time}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Authorized by administrators: <span className="text-gray-300">{tx.authorizedBy.join(", ")}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Note: <span className="text-gray-300">{tx.note}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
     
  )
}
