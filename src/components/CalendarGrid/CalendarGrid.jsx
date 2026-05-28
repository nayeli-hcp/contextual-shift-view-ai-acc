import { useRef } from 'react';
import { parseTime, formatTime, minutesToHHMM, formatDuration } from '../../utils/time';
import { getCategoryById } from '../../data/categories';
import AddBlockPopover from '../AddBlockPopover/AddBlockPopover';
import styles from './CalendarGrid.module.css';

const SLOT_HEIGHT = 28; // px per 30-min slot

export default function CalendarGrid({
  shift,
  blocks,
  isPaid,
  popover,
  onSlotClick,
  onBlockClick,
  onSaveBlock,
  onCancelPopover,
  onRequestDelete,
}) {
  const { clockIn, clockOut, jobs } = shift;
  const areaRef = useRef(null);

  const gridStartMin = Math.floor(parseTime(clockIn) / 30) * 30;
  const gridEndMin   = Math.ceil(parseTime(clockOut)  / 30) * 30;
  const numSlots     = (gridEndMin - gridStartMin) / 30;
  const gridHeight   = numSlots * SLOT_HEIGHT;

  function topForMinutes(min) {
    return ((min - gridStartMin) / 30) * SLOT_HEIGHT;
  }

  function heightForMinutes(min) {
    return (min / 30) * SLOT_HEIGHT;
  }

  function handleAreaClick(e) {
    if (isPaid) return;
    if (e.target.closest('[data-blockcard]') || e.target.closest('[data-popover]')) return;
    const rect = areaRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const slotIndex  = Math.max(0, Math.min(numSlots - 1, Math.floor(y / SLOT_HEIGHT)));
    const slotStart  = gridStartMin + slotIndex * 30;
    const slotEnd    = Math.min(slotStart + 30, gridEndMin);
    onSlotClick(slotStart, slotEnd);
  }

  // Popover position: keep it within grid bounds
  function popoverTop() {
    if (!popover) return 0;
    const POPOVER_H = 200;
    const rawTop = popover.mode === 'edit'
      ? topForMinutes(parseTime(popover.block.startTime))
      : topForMinutes(popover.slotStartMin);
    return Math.min(rawTop, Math.max(0, gridHeight - POPOVER_H));
  }

  return (
    <div className={styles.grid}>
      {/* Time axis */}
      <div className={styles.timeAxis}>
        {Array.from({ length: numSlots }, (_, i) => {
          const slotMin  = gridStartMin + i * 30;
          const isHour   = slotMin % 60 === 0;
          return (
            <div
              key={i}
              className={`${styles.axisSlot} ${isHour ? styles.axisSlotHour : styles.axisSlotHalf}`}
            >
              {isHour ? formatTime(slotMin) : ''}
            </div>
          );
        })}
      </div>

      {/* Block area */}
      <div
        ref={areaRef}
        className={`${styles.blockArea} ${isPaid ? styles.blockAreaLocked : ''}`}
        style={{ height: gridHeight }}
        onClick={handleAreaClick}
      >
        {/* Slot rows — visual grid lines only */}
        {Array.from({ length: numSlots }, (_, i) => {
          const slotMin = gridStartMin + i * 30;
          const isHour  = slotMin % 60 === 0;
          return (
            <div
              key={i}
              className={`${styles.slot} ${isHour ? styles.slotHour : styles.slotHalf}`}
            />
          );
        })}

        {/* Job time shading (read-only, pointer-events: none) */}
        {jobs.map(job => {
          const s   = parseTime(job.startTime);
          const e   = parseTime(job.endTime);
          const top = topForMinutes(s);
          const h   = heightForMinutes(e - s);
          return (
            <div
              key={job.id}
              className={styles.jobShading}
              style={{ top, height: Math.max(h, 2) }}
            />
          );
        })}

        {/* Saved block cards */}
        <div className={styles.blocksOverlay}>
          {blocks.map(block => {
            const s   = parseTime(block.startTime);
            const e   = parseTime(block.endTime);
            const top = topForMinutes(s);
            const h   = Math.max(heightForMinutes(e - s), 20);
            const cat = getCategoryById(block.category);
            const isEditable = !isPaid;
            return (
              <div
                key={block.id}
                data-blockcard="true"
                className={`${styles.blockCard} ${styles[`cat_${cat.token}`]}`}
                style={{ top, height: h }}
                onClick={e => { e.stopPropagation(); if (isEditable) onBlockClick(block); }}
                title={isEditable ? 'Click to edit' : ''}
              >
                <span className={styles.blockIcon}>{cat.icon}</span>
                <span className={styles.blockLabel}>{cat.label}</span>
                {h >= 38 && (
                  <span className={styles.blockTime}>
                    {formatTime(s)} – {formatTime(e)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Add / Edit popover */}
        {popover && (
          <div data-popover="true">
            <AddBlockPopover
              mode={popover.mode}
              defaultStart={minutesToHHMM(popover.slotStartMin ?? parseTime(popover.block?.startTime ?? clockIn))}
              defaultEnd={minutesToHHMM(popover.slotEndMin ?? parseTime(popover.block?.endTime ?? clockOut))}
              block={popover.block}
              clockIn={clockIn}
              clockOut={clockOut}
              topPx={popoverTop()}
              onSave={onSaveBlock}
              onCancel={onCancelPopover}
              onRequestDelete={onRequestDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
