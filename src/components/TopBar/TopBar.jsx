import styles from './TopBar.module.css';

const ACTION_ICONS = [
  { icon: 'near_me',      label: 'Location' },
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'checklist',    label: 'Tasks' },
  { icon: 'history',      label: 'Recent activity' },
];

export default function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.searchWrap}>
        <span className={`material-symbols-rounded ${styles.searchIcon}`}>search</span>
        <span className={styles.searchPlaceholder}>Search records</span>
      </div>

      <div className={styles.actions}>
        {ACTION_ICONS.map(({ icon, label }) => (
          <button key={icon} className={styles.iconBtn} aria-label={label}>
            <span className="material-symbols-rounded">{icon}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
