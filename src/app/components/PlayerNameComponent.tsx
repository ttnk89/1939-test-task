'use client'
import styles from "../../app/[locale]/page.module.css";
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PlayerNameChange({ onPlayerNameChange }: { onPlayerNameChange: (newName: string) => void }) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showInput, setShowInput] = useState(false);
  const t = useTranslations('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await fetch('/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //id should be passed from session.user.id
        body: JSON.stringify({ username: newPlayerName, id: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(t(`errorMessages.${errorData.message}`) || t('errorMessages.nameChangeFailed'));
        return;
      }

      const data = await response.json();
      if (data.status === 'name_change_ok') {
        setSuccessMessage(t('errorMessages.nameChangeSuccess'));
        onPlayerNameChange(data.username);
        //clear input field
        setNewPlayerName('');
        setShowInput(false);
      }
    } catch (err) {
      setError(t('genericError'));
    }
  };
  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      {successMessage && <p className={styles.success}><i>{successMessage}</i></p>}
      {!showInput && (
          <button onClick={handleToggleInput}>
              {t('changePlayerName')}
          </button>
      )}
      {showInput &&
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label>
            {t('nameEntry')}:
          </label>
          <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} />
          <button type="submit">{t('submit')}</button>
          <button type="button" onClick={handleToggleInput}>
            {t('cancel')}
          </button>
        </form>
      }
    </div>
  );
}
