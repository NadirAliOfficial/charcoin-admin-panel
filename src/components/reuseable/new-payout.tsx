"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface NewPayoutDialogProps {

    walletName: string
}

export default function NewPayoutDialog({ }: NewPayoutDialogProps) {
    const [amount, setAmount] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
    const [note, setNote] = useState("")
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([])

    // Mock data for administrators
    const administrators = [
        "Confidencial Name 1",
        "Confidencial Name 2",
        "Confidencial Name 3",
        "Confidencial Name 4",
        "Confidencial Name 5",
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle payout submission logic here
        console.log({ amount, receiverAddress, note, selectedAdmins })
        // onOpenChange(false)
    }

    const toggleAdmin = (admin: string) => {
        setSelectedAdmins((prev) => (prev.includes(admin) ? prev.filter((a) => a !== admin) : [...prev, admin]))
    }

    return (


        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                        Amount
                    </Label>
                    <div className="flex">
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <Select defaultValue="USD">
                            <SelectTrigger className="bg-accent ml-6">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="SOL">SOL</SelectItem>
                                <SelectItem value="ETH">ETH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium">
                        Date
                    </Label>
                    <Input
                        id="date"
                        type="date"

                        defaultValue={new Date().toISOString().split("T")[0]}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="receiver" className="text-sm font-medium">
                    Receiver Wallet Address
                </Label>
                <Input
                    id="receiver"
                    placeholder="Enter wallet address"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium">Authorized by administrators</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2  p-3 ">
                    {administrators.map((admin) => (
                        <div key={admin} className="flex items-center space-x-2">
                            <Checkbox
                                id={`admin-${admin}`}
                                checked={selectedAdmins.includes(admin)}
                                onCheckedChange={() => toggleAdmin(admin)}
                                className="border-gray-500 data-[state=checked]:bg-[#00ffcc] data-[state=checked]:border-[#00ffcc]"
                            />
                            <label htmlFor={`admin-${admin}`} className="text-sm text-gray-300 cursor-pointer">
                                {admin}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="note" className="text-sm font-medium">
                    Note
                </Label>
                <Textarea
                    id="note"
                    placeholder="Add a note about this payout"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="bg-accent border-gray-700 focus:border-[#00ffcc] focus:ring-[#00ffcc] min-h-[100px]"
                    required
                />
            </div>

            <div className="pt-4">
                <Button type="submit" className="w-full bg-[#00ffcc] hover:bg-[#00ccaa] text-black font-medium py-6">
                    Create Payout
                </Button>
            </div>
        </form>

    )
}
