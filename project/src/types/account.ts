export interface Account {
  id: string;
  name: string;
  pin: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  timestamp: Date;
}