import { useState } from 'react';
import { parseTime, minutesToHHMM, formatDuration } from '../../utils/time';
import { getCategoryById } from '../../data/categories';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import PayrollSummaryBar from '../PayrollSummaryBar/PayrollSummaryBar';
import styles from './AdditionalBlocksPanel.module.css';

export default function AdditionalBlocksPanel({
  shift,
  blocks,
  isPaid,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
}) {
  const [popover, setPopover]           = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Unique categories used in current blocks
  const usedCategories = [...new Set(blocks.map(b => b.category))];

  function handleSlotClick(slotStartMin, slotEndMin) {
    if (isPaid) return;
    setPopover({
      mode: 'add',
      slotStartMin,
      slotEndMin,
    });
  }

  function handleBlockClick(block) {
    if (isPaid) return;
    setPopover({
      mode: 'edit',
      block,
      slotStartMin: parseTime(block.startTime),
      slotEndMin:   parseTime(block.endTime),
    });
  }

  function handleSave({ startTime, endTime, category }) {
    if (popover.mode === 'add') {
      onAddBlock({ startTime, endTime, category });
    } else {
      onEditBlock({ ...popover.block, startTime, endTime, category });
    }
    setPopover(null);
  }

  function handleRequestDelete() {
    setDeleteTarget(popover.block);
    setPopover(null);
  }

  function handleConfirmDelete() {
    onDeleteBlock(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.title}>Additional Blocks</div>
        <div className={styles.subtitle}>Manually add time blocks for payroll context</div>
      </div>

      {/* Paid lock notice */}
      {isPaid && (
        <div className={styles.paidNotice}>
          This day is marked as paid. Uncheck Paid to make changes.
        </div>
      )}

      {/* Category legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: 'var(--success-main)' }} />
          <span>Job time</span>
        </div>
        {usedCategories.map(catId => {
          const cat = getCategoryById(catId);
          return (
            <div key={catId} className={styles.legendItem}>
              <div
                className={styles.legendDot}
                style={{ background: `var(--category-${cat.token}-border)` }}
              />
              <span>{cat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Calendar grid — scrollable */}
      <div className={styles.gridWrap}>
        <CalendarGrid
          shift={shift}
          blocks={blocks}
          isPaid={isPaid}
          popover={popover}
          onSlotClick={handleSlotClick}
          onBlockClick={handleBlockClick}
          onSaveBlock={handleSave}
          onCancelPopover={() => setPopover(null)}
          onRequestDelete={handleRequestDelete}
        />
      </div>

      {/* Payroll summary */}
      <PayrollSummaryBar shift={shift} blocks={blocks} />

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div className={styles.dialogOverlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.dialog} onClick={e => e.stopPropagation()}>
            <div className={styles.dialogTitle}>Remove this block?</div>
            <div className={styles.dialogBody}>This action cannot be undone.</div>
            <div className={styles.dialogBtns}>
              <button className={styles.btnDestructive} onClick={handleConfirmDelete}>Remove</button>
              <button className={styles.btnGhost} onClick={() => setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
