'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface LoginFormProps {
  onLogin: (name: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const t = useTranslations('common');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorKey(null);
    
    try {
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        setErrorKey(t('loginFailed'));
        return;
      }

      const loginData = await loginResponse.json();

      if (loginData.status === 'login_ok') {
        const playerResponse = await fetch('/api/player');
        const playerData = await playerResponse.json();
        onLogin(playerData.playerName);
      } else {
        setErrorKey(t('loginFailed'));
      }
    } catch (err) {
      setErrorKey(t('genericError'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorKey && <p>{t('error', {error: errorKey})}</p>}
      <input
        type="text"
        placeholder={t('username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{t('submit')}</button>
    </form>
  );
}
