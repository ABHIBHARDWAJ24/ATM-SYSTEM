import { useState } from 'react';
import { Account } from '../types/account';
import { initialAccounts } from '../data/accounts';

export const useAtm = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string>('');

  const login = (id: string, pin: string) => {
    const account = accounts.find(acc => acc.id === id && acc.pin === pin);
    if (account) {
      setCurrentAccount(account);
      setError('');
      return true;
    }
    setError('Invalid account ID or PIN');
    return false;
  };

  const logout = () => {
    setCurrentAccount(null);
    setError('');
  };

  const withdraw = (amount: number) => {
    if (!currentAccount) return false;
    if (amount <= 0) {
      setError('Invalid amount');
      return false;
    }
    if (amount > currentAccount.balance) {
      setError('Insufficient funds');
      return false;
    }

    const updatedAccounts = accounts.map(acc => {
      if (acc.id === currentAccount.id) {
        return { ...acc, balance: acc.balance - amount };
      }
      return acc;
    });

    setAccounts(updatedAccounts);
    setCurrentAccount({ ...currentAccount, balance: currentAccount.balance - amount });
    setError('');
    return true;
  };

  const deposit = (amount: number) => {
    if (!currentAccount) return false;
    if (amount <= 0) {
      setError('Invalid amount');
      return false;
    }

    const updatedAccounts = accounts.map(acc => {
      if (acc.id === currentAccount.id) {
        return { ...acc, balance: acc.balance + amount };
      }
      return acc;
    });

    setAccounts(updatedAccounts);
    setCurrentAccount({ ...currentAccount, balance: currentAccount.balance + amount });
    setError('');
    return true;
  };

  return {
    currentAccount,
    error,
    login,
    logout,
    withdraw,
    deposit
  };
};