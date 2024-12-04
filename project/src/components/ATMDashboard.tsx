import React, { useState } from 'react';
import { Account } from '../types/account';

interface ATMDashboardProps {
  account: Account;
  onWithdraw: (amount: number) => void;
  onDeposit: (amount: number) => void;
  onLogout: () => void;
  error?: string;
}

export const ATMDashboard: React.FC<ATMDashboardProps> = ({
  account,
  onWithdraw,
  onDeposit,
  onLogout,
  error
}) => {
  const [amount, setAmount] = useState('');

  const handleTransaction = (type: 'withdraw' | 'deposit') => {
    const value = parseFloat(amount);
    if (isNaN(value)) return;

    if (type === 'withdraw') {
      onWithdraw(value);
    } else {
      onDeposit(value);
    }
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome, {account.name}</h2>
        <p className="text-lg">
          Current Balance:{' '}
          <span className="font-bold">${account.balance.toFixed(2)}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            onClick={() => handleTransaction('withdraw')}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Withdraw
          </button>
          <button
            onClick={() => handleTransaction('deposit')}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Deposit
          </button>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};