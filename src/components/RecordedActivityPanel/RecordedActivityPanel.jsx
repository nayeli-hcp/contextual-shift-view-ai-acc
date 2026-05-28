import { displayTime, parseTime, formatDuration, gapMinutes } from '../../utils/time';
import styles from './RecordedActivityPanel.module.css';

export default function RecordedActivityPanel({ shift }) {
  const { clockIn, clockOut, jobs } = shift;

  const shiftDuration = parseTime(clockOut) - parseTime(clockIn);
  const jobTotalMin   = jobs.reduce((sum, j) => sum + (parseTime(j.endTime) - parseTime(j.startTime)), 0);

  // Build timeline items: clock-in, [gap, job, ...], gap, clock-out
  const items = [];

  items.push({ type: 'clock', label: `${displayTime(clockIn)} — Clock In` });

  if (jobs.length === 0) {
    const gap = parseTime(clockOut) - parseTime(clockIn);
    items.push({ type: 'gap', minutes: gap });
  } else {
    // gap before first job
    const gapBefore = gapMinutes(clockIn, jobs[0].startTime);
    if (gapBefore > 0) items.push({ type: 'gap', minutes: gapBefore });

    jobs.forEach((job, idx) => {
      items.push({ type: 'job', job });
      const nextStart = idx < jobs.length - 1 ? jobs[idx + 1].startTime : clockOut;
      const gapAfter  = gapMinutes(job.endTime, nextStart);
      if (gapAfter > 0) items.push({ type: 'gap', minutes: gapAfter });
    });
  }

  items.push({ type: 'clock', label: `${displayTime(clockOut)} — Clock Out` });

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.title}>Recorded Activity</div>
        <div className={styles.subtitle}>Auto-captured from clock-in and job events</div>
      </div>

      <div className={styles.timeline}>
        {items.map((item, i) => {
          if (item.type === 'clock') {
            return (
              <div key={i} className={styles.vtItem}>
                <div className={`${styles.vtDot} ${styles.vtDotClock}`} />
                <div className={styles.vtClockLabel}>{item.label}</div>
              </div>
            );
          }
          if (item.type === 'gap') {
            return (
              <div key={i} className={styles.vtItem}>
                <div className={`${styles.vtDot} ${styles.vtDotGap}`} />
                <div className={styles.vtGap}>{formatDuration(item.minutes)} unclassified</div>
              </div>
            );
          }
          if (item.type === 'job') {
            const dur = parseTime(item.job.endTime) - parseTime(item.job.startTime);
            return (
              <div key={i} className={styles.vtItem}>
                <div className={`${styles.vtDot} ${styles.vtDotJob}`} />
                <div className={styles.vtCard}>
                  <div className={styles.vtCardTitle}>{item.job.name}</div>
                  <div className={styles.vtCardMeta}>
                    {displayTime(item.job.startTime)} – {displayTime(item.job.endTime)} · {formatDuration(dur)}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className={styles.footer}>
        <span>Job time: <strong className={styles.footerJobTime}>{formatDuration(jobTotalMin)}</strong></span>
        <span className={styles.footerSep}>·</span>
        <span>Shift: <strong>{formatDuration(shiftDuration)}</strong></span>
      </div>
    </div>
  );
}
