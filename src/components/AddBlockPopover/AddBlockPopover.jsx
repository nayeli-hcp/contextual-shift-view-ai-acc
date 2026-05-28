import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import { parseTime, minutesToHHMM, formatTime } from '../../utils/time';
import styles from './AddBlockPopover.module.css';

export default function AddBlockPopover({
  mode,           // 'add' | 'edit'
  defaultStart,   // 'HH:MM'
  defaultEnd,     // 'HH:MM'
  block,          // existing block (edit mode)
  clockIn,        // 'HH:MM'
  clockOut,       // 'HH:MM'
  topPx,          // absolute top position
  onSave,
  onCancel,
  onRequestDelete,
}) {
  const [startTime, setStartTime] = useState(block?.startTime ?? defaultStart);
  const [endTime,   setEndTime]   = useState(block?.endTime   ?? defaultEnd);
  const [category,  setCategory]  = useState(block?.category  ?? CATEGORIES[0].id);
  const [error, setError]         = useState('');

  useEffect(() => {
    if (mode === 'add') {
      setStartTime(defaultStart);
      setEndTime(defaultEnd);
      setCategory(CATEGORIES[0].id);
      setError('');
    }
  }, [mode, defaultStart, defaultEnd]);

  function validate() {
    if (!startTime || !endTime) {
      setError('Start time and end time are required.');
      return false;
    }
    const s = parseTime(startTime);
    const e = parseTime(endTime);
    if (e <= s) {
      setError('End time must be after start time.');
      return false;
    }
    const ci = parseTime(clockIn);
    const co = parseTime(clockOut);
    if (s < ci || e > co) {
      setError(`Block must fall within the shift window (${formatTime(ci)} – ${formatTime(co)}).`);
      return false;
    }
    return true;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({ startTime, endTime, category });
  }

  return (
    <div
      className={styles.popover}
      style={{ top: topPx }}
      onClick={e => e.stopPropagation()}
    >
      <div className={styles.title}>{mode === 'edit' ? 'Edit time block' : 'Add time block'}</div>

      <div className={styles.timeRow}>
        <input
          className={styles.timeInput}
          type="time"
          value={startTime}
          onChange={e => { setStartTime(e.target.value); setError(''); }}
        />
        <span className={styles.toLabel}>to</span>
        <input
          className={styles.timeInput}
          type="time"
          value={endTime}
          onChange={e => { setEndTime(e.target.value); setError(''); }}
        />
      </div>

      <div className={styles.categoryRow}>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.btnRow}>
        <button className={styles.btnSave} onClick={handleSave}>
          {mode === 'edit' ? 'Save' : 'Add block'}
        </button>
        <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
      </div>

      {mode === 'edit' && (
        <button className={styles.removeLink} onClick={onRequestDelete}>
          Remove block
        </button>
      )}
    </div>
  );
}
