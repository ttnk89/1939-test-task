import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

interface PlayerNameProps {
  playerName: string;
  onChangePlayerName: (newName: string) => void;
}

export default function PlayerName({ playerName, onChangePlayerName }: PlayerNameProps) {
  const [newName, setNewName] = useState(playerName);
  const [error, setError] = useState('');
  const { t } = useTranslation('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Name change failed.');
        return;
      }

      const data = await response.json();
      if (data.status === 'name_change_ok') {
        onChangePlayerName(data.playerName);
      } else {
        setError('Name change failed.');
      }
      } catch (err) {
      setError('An error occurred. Please try again.');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        {t('playerName')}:
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      </label>
      <button type="submit">{t('changePlayerName')}</button>
    </form>
  );
}
