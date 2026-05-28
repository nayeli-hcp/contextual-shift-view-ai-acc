import { useState, useEffect } from 'react';
import { parseTime, formatDuration } from '../../utils/time';
import { EMPLOYEES } from '../../data/mockShifts';
import RecordedActivityPanel from '../RecordedActivityPanel/RecordedActivityPanel';
import AdditionalBlocksPanel from '../AdditionalBlocksPanel/AdditionalBlocksPanel';
import styles from './ShiftDetailModal.module.css';

export default function ShiftDetailModal({
  shift, shiftKey, blocks, isPaid,
  onAddBlock, onEditBlock, onDeleteBlock, onTogglePaid, onClose,
}) {
  const [paidWarning, setPaidWarning] = useState(false);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const emp = EMPLOYEES.find(e => e.id === shift.employeeId) || EMPLOYEES[0];
  const shiftMin = parseTime(shift.clockOut) - parseTime(shift.clockIn);

  function computeUnclassified() {
    const jobMin = shift.jobs.reduce(
      (sum, j) => sum + (parseTime(j.endTime) - parseTime(j.startTime)), 0
    );
    const blockMin = blocks.reduce(
      (sum, b) => sum + (parseTime(b.endTime) - parseTime(b.startTime)), 0
    );
    return Math.max(0, shiftMin - jobMin - blockMin);
  }

  function handlePaidToggle(e) {
    const newVal = e.target.checked;
    if (newVal && computeUnclassified() > 0) {
      setPaidWarning(true);
    } else {
      onTogglePaid(newVal);
    }
  }

  function handleConfirmPaid() {
    onTogglePaid(true);
    setPaidWarning(false);
  }

  return (
    <>
      {/* Scrim */}
      <div className={styles.scrim} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modal} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.empInfo}>
            <div
              className={styles.empAvatar}
              style={{ background: emp.avatarBg, color: emp.avatarColor }}
            >
              {emp.initials}
            </div>
            <div>
              <div className={styles.empName}>{emp.name}</div>
              <div className={styles.shiftMeta}>
                {shift.dateLabel} · Shift: {formatDuration(shiftMin)}
              </div>
            </div>
          </div>

          <div className={styles.headerRight}>
            <label className={styles.paidToggle} title={isPaid ? 'Uncheck to edit blocks' : 'Mark day as paid'}>
              <input
                type="checkbox"
                checked={isPaid}
                onChange={handlePaidToggle}
                className={styles.paidCheckbox}
              />
              <span className={styles.paidLabel}>Paid</span>
            </label>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Left: Recorded Activity (38%) */}
          <div className={styles.leftCol}>
            <RecordedActivityPanel shift={shift} />
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Right: Additional Blocks (62%) */}
          <div className={styles.rightCol}>
            <AdditionalBlocksPanel
              shift={shift}
              blocks={blocks}
              isPaid={isPaid}
              onAddBlock={onAddBlock}
              onEditBlock={onEditBlock}
              onDeleteBlock={onDeleteBlock}
            />
          </div>
        </div>
      </div>

      {/* Paid warning dialog */}
      {paidWarning && (
        <div className={styles.warningOverlay} onClick={() => setPaidWarning(false)}>
          <div className={styles.warningDialog} onClick={e => e.stopPropagation()}>
            <div className={styles.warningIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 3L2 19h18L11 3z" stroke="var(--warning-main)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 9v4M11 15.5v.5" stroke="var(--warning-main)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.warningTitle}>Mark this day as paid?</div>
            <div className={styles.warningBody}>
              This shift has <strong>{computeUnclassified()} minutes</strong> of unclassified time.
              Are you sure you want to mark it as paid?
            </div>
            <div className={styles.warningBtns}>
              <button className={styles.btnPrimary} onClick={handleConfirmPaid}>Mark as paid</button>
              <button className={styles.btnGhost} onClick={() => setPaidWarning(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
