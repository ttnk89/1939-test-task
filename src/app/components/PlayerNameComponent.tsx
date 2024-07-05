'use client'
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useTranslations } from 'next-intl';

export default function PlayerNameChange() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newPlayerName, id: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Name change failed.');
        return;
      }

      const data = await response.json();
      if (data.status === 'name_change_ok') {
        setNewPlayerName(data.playerName);
      } else {
        setError('Name change failed.');
      }
      } catch (err) {
        setError('An error occurred.');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <label>
        {t('playerNameChangeText')}:
      </label>
      <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} />
      <button type="submit">{t('changePlayerName')}</button>
    </form>
  );
}
