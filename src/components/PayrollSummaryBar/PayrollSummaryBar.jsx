import { parseTime, formatDuration } from '../../utils/time';
import styles from './PayrollSummaryBar.module.css';

export default function PayrollSummaryBar({ shift, blocks }) {
  const shiftMin = parseTime(shift.clockOut) - parseTime(shift.clockIn);
  const blockMin = blocks.reduce((sum, b) => sum + (parseTime(b.endTime) - parseTime(b.startTime)), 0);
  const count = blocks.length;

  return (
    <div className={styles.bar}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="var(--primary-main)" strokeWidth="1.3"/>
        <path d="M7 4v3.5l2 1.5" stroke="var(--primary-main)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
      <span>Shift total:</span>
      <strong className={styles.shiftVal}>{formatDuration(shiftMin)}</strong>
      <span className={styles.sep}>·</span>
      <span>{count} {count === 1 ? 'block' : 'blocks'} logged:</span>
      <strong className={styles.blockVal}>{blockMin > 0 ? formatDuration(blockMin) : '0m'}</strong>
    </div>
  );
}
