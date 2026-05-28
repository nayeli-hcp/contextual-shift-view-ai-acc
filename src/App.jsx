import { useState } from 'react';
import MainTable from './components/MainTable/MainTable';
import ShiftDetailModal from './components/ShiftDetailModal/ShiftDetailModal';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import { EMPLOYEES, WEEK_CELLS, WEEK_DAYS, SHIFT_DATA, INITIAL_BLOCKS, ROW_TOTALS, COL_TOTALS, GRAND_TOTAL } from './data/mockShifts';
import styles from './App.module.css';

function App() {
  const [blocks, setBlocks]           = useState(INITIAL_BLOCKS);
  const [openShiftKey, setOpenShiftKey] = useState(null);
  const [paidDays, setPaidDays]       = useState(new Set());

  const openShift    = openShiftKey ? SHIFT_DATA[openShiftKey] : null;
  const currentBlocks = openShiftKey ? (blocks[openShiftKey] || []) : [];
  const isPaid        = openShiftKey ? paidDays.has(openShiftKey) : false;

  function handleOpenModal(shiftKey) {
    if (SHIFT_DATA[shiftKey]) setOpenShiftKey(shiftKey);
  }

  function handleCloseModal() {
    setOpenShiftKey(null);
  }

  function handleAddBlock(block) {
    setBlocks(prev => ({
      ...prev,
      [openShiftKey]: [...(prev[openShiftKey] || []), { ...block, id: `b_${Date.now()}` }],
    }));
  }

  function handleEditBlock(updated) {
    setBlocks(prev => ({
      ...prev,
      [openShiftKey]: (prev[openShiftKey] || []).map(b => b.id === updated.id ? updated : b),
    }));
  }

  function handleDeleteBlock(blockId) {
    setBlocks(prev => ({
      ...prev,
      [openShiftKey]: (prev[openShiftKey] || []).filter(b => b.id !== blockId),
    }));
  }

  function handleTogglePaid(value) {
    setPaidDays(prev => {
      const next = new Set(prev);
      if (value) next.add(openShiftKey);
      else next.delete(openShiftKey);
      return next;
    });
  }

  return (
    <div className={styles.appRoot}>
      <Sidebar />
      <div className={styles.mainArea}>
        <TopBar />
        <MainTable
          employees={EMPLOYEES}
          weekDays={WEEK_DAYS}
          weekCells={WEEK_CELLS}
          blocks={blocks}
          rowTotals={ROW_TOTALS}
          colTotals={COL_TOTALS}
          grandTotal={GRAND_TOTAL}
          onOpenModal={handleOpenModal}
        />
        {openShift && (
          <ShiftDetailModal
            shift={openShift}
            shiftKey={openShiftKey}
            blocks={currentBlocks}
            isPaid={isPaid}
            onAddBlock={handleAddBlock}
            onEditBlock={handleEditBlock}
            onDeleteBlock={handleDeleteBlock}
            onTogglePaid={handleTogglePaid}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
