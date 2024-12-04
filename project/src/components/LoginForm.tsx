import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (id: string, pin: string) => void;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(id, pin);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          Account ID
        </label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
          PIN
        </label>
        <input
          type="password"
          id="pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
  );
};