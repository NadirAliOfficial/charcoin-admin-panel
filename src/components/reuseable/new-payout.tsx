import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface PayoutInterfaceProps {
  walletName: string;
}

interface AuthState {
  username: string;
  password: string;
  pin: string;
  otp: string;
}

export default function PayoutInterface({ walletName }: PayoutInterfaceProps) {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [receiverWallet, setReceiverWallet] = useState<string>('');
  const [confirmWallet, setConfirmWallet] = useState<string>('');
  
  const [auth1, setAuth1] = useState<AuthState>({
    username: '',
    password: '',
    pin: '',
    otp: ''
  });
  
  const [auth2, setAuth2] = useState<AuthState>({
    username: '',
    password: '',
    pin: '',
    otp: ''
  });
  
  const [auth3, setAuth3] = useState<AuthState>({
    username: '',
    password: '',
    pin: '',
    otp: ''
  });

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen text-white md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-xl font-semibold">Make a new payout</h1>
              <p className="text-gray-400 text-sm">Place a new transaction, multi-signature from 3 random administrators is needed to proceed</p>
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        <div className=" rounded-lg mb-10 border-b border-secondary pb-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-2">{walletName}</h2>
              <p className="text-cyan-400 font-mono text-sm">9JH7XWqE221B5VjKshp3Gn8Y7TCqP6ZMoJFkxuAWhqKv</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$847,214.00</div>
              <div className="text-gray-400 text-sm">Current Balance</div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Transaction details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <p className="text-gray-400 text-sm mb-3">Enter the total amount to be sent in USDT on the Solana network. Ensure the value is within the allowed limits</p>
              <input
                type="text"
                placeholder="Enter an amount in USDT (SOLANA)"
                value={amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                className="w-full bg-[#3d3c44] border border-gray-700 rounded-lg px-4 py-3 text-white  focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description / Notes</label>
              <p className="text-gray-400 text-sm mb-3">Provide a brief note or reason for the transaction. This helps track payments and justifications</p>
              <textarea
                placeholder="Enter details describing the reason for this transaction"
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                className="w-full bg-[#3d3c44] border border-gray-700 rounded-lg px-4 py-3 text-white  focus:border-cyan-400 focus:outline-none h-24 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Receiver Wallet</label>
              <p className="text-gray-400 text-sm mb-3">Enter the recipient&apos;s Solana wallet address where the USDT will be sent</p>
              <input
                type="text"
                placeholder="Enter a USDT (SOLANA) Wallet Address"
                value={receiverWallet}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setReceiverWallet(e.target.value)}
                className="w-full bg-[#3d3c44] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Receiver Wallet</label>
              <p className="text-gray-400 text-sm mb-3">Double-check the receiver wallet for accuracy</p>
              <input
                type="text"
                placeholder="Confirm Wallet Address"
                value={confirmWallet}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmWallet(e.target.value)}
                className="w-full bg-[#3d3c44] border border-gray-700 rounded-lg px-4 py-3 text-white  focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Authorizations */}
        <div className="mb-8 border-b border-secondary">
          <h3 className="text-lg font-semibold mb-2">Authorizations</h3>
          <p className="text-gray-400 text-sm mb-6">Approval required from authorized administrators before the transaction is processed</p>

          {/* Authorization 1 */}
          <div className=" relative rounded-lg p-6 mb-4">
            <div className=" absolute left-0 h-full top-0 w-[8px] md:w-[15px] rounded-3xl bg-secondary"></div>
            <h4 className="text-lg font-semibold mb-2">Authorization #1</h4>
            <p className="text-gray-400 text-sm mb-6">Complete the fields below with an administrator&apos;s details to proceed</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Administrator Username</label>
                <input
                  type="text"
                  placeholder="Enter a username"
                  value={auth1.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth1({...auth1, username: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={auth1.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth1({...auth1, password: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">PIN</label>
                <input
                  type="password"
                  placeholder="• • • • • •"
                  value={auth1.pin}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth1({...auth1, pin: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">
                  OTP Code / <span className="text-cyan-400 cursor-pointer">Request via email</span>
                </label>
                <input
                  type="text"
                  placeholder="• • • • • •"
                  value={auth1.otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth1({...auth1, otp: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Authorization 2 */}
          <div className=" relative rounded-lg p-6 mb-4">
            <div className=" absolute left-0 h-full top-0 w-[8px] md:w-[15px] rounded-3xl bg-secondary"></div>
            <h4 className="text-lg font-semibold mb-2">Authorization #2</h4>
            <p className="text-gray-400 text-sm mb-6">Complete the fields below with an administrator&apos;s details to proceed</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Administrator Username</label>
                <input
                  type="text"
                  placeholder="Enter a username"
                  value={auth2.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth2({...auth2, username: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={auth2.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth2({...auth2, password: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">PIN</label>
                <input
                  type="password"
                  placeholder="• • • • • •"
                  value={auth2.pin}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth2({...auth2, pin: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">
                  OTP Code / <span className="text-cyan-400 cursor-pointer">Request via email</span>
                </label>
                <input
                  type="text"
                  placeholder="• • • • • •"
                  value={auth2.otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth2({...auth2, otp: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Authorization 3 */}
          <div className=" relative rounded-lg p-6 mb-8">
            <div className=" absolute left-0 h-full top-0 w-[8px] md:w-[15px] rounded-3xl bg-secondary"></div>
            <h4 className="text-lg font-semibold mb-2">Authorization #3</h4>
            <p className="text-gray-400 text-sm mb-6">Complete the fields below with an administrator&apos;s details to proceed</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Administrator Username</label>
                <input
                  type="text"
                  placeholder="Enter a username"
                  value={auth3.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth3({...auth3, username: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={auth3.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth3({...auth3, password: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">PIN</label>
                <input
                  type="password"
                  placeholder="• • • • • •"
                  value={auth3.pin}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth3({...auth3, pin: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <label className="block text-sm font-medium mb-2">
                  OTP Code / <span className="text-cyan-400 cursor-pointer">Request via email</span>
                </label>
                <input
                  type="text"
                  placeholder="• • • • • •"
                  value={auth3.otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth3({...auth3, otp: e.target.value})}
                  className="w-full bg-[#3d3c44] border border-gray-600 rounded-lg px-3 py-2 text-white  focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Send Transfer Button */}
        <button 
          onClick={handleSubmit}
          className="w-fit bg-primary hover:bg-cyan-500 text-black font-semibold py-2 px-10 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Send Transfer
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}