import React from 'react';
import { LoginForm } from './components/LoginForm';
import { ATMDashboard } from './components/ATMDashboard';
import { useAtm } from './hooks/useAtm';

function App() {
  const { currentAccount, error, login, logout, withdraw, deposit } = useAtm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ATM System</h1>
          <p className="mt-2 text-gray-600">
            {currentAccount ? 'Manage your account' : 'Please login to continue'}
          </p>
        </div>

        {currentAccount ? (
          <ATMDashboard
            account={currentAccount}
            onWithdraw={withdraw}
            onDeposit={deposit}
            onLogout={logout}
            error={error}
          />
        ) : (
          <LoginForm onLogin={login} error={error} />
        )}
      </div>
    </div>
  );
}

export default App;