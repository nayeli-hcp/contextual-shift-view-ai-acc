import { useState } from 'react';
import { parseTime, formatDuration } from '../../utils/time';
import { SHIFT_DATA } from '../../data/mockShifts';
import styles from './MainTable.module.css';

function computeLoggedBlocksStat(blocks) {
  let totalMin = 0;
  for (const dayBlocks of Object.values(blocks)) {
    for (const b of dayBlocks) {
      totalMin += parseTime(b.endTime) - parseTime(b.startTime);
    }
  }
  return totalMin;
}

export default function MainTable({
  employees, weekDays, weekCells, blocks, rowTotals, colTotals, grandTotal, onOpenModal,
}) {
  const [syncModal, setSyncModal] = useState(false);

  const loggedBlocksMin = computeLoggedBlocksStat(blocks);
  const loggedBlocksLabel = loggedBlocksMin > 0 ? `+${formatDuration(loggedBlocksMin)}` : '0h';

  function getBlockCount(shiftKey) {
    return shiftKey ? (blocks[shiftKey] || []).length : 0;
  }

  function isClickable(shiftKey) {
    return !!(shiftKey && SHIFT_DATA[shiftKey]);
  }

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="8" y="1" width="5" height="5" rx="1.5" fill="white" opacity="0.7"/>
              <rect x="1" y="8" width="5" height="5" rx="1.5" fill="white" opacity="0.7"/>
              <rect x="8" y="8" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <span className={styles.logoText}>Housecall Pro</span>
        </div>
        <div className={styles.sidebarSearch}>
          <input className={styles.searchInput} type="text" placeholder="Search records" readOnly />
        </div>
        <nav className={styles.navSection}>
          {['Home','Schedule','Pipeline','Customers','Leads','Estimates','Jobs','Invoices','Money','Reporting'].map(item => (
            <a key={item} className={styles.navItem} href="#">{item}</a>
          ))}
        </nav>
        <div className={styles.navLabel}>Team</div>
        <nav className={styles.navSection}>
          <a className={styles.navItem} href="#">Team Members</a>
          <a className={`${styles.navItem} ${styles.navItemSub} ${styles.navItemActive}`} href="#">Time &amp; Attendance</a>
          <a className={`${styles.navItem} ${styles.navItemSub}`} href="#">Payroll</a>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userRow}>
            <div className={styles.avatar} style={{ background: '#0057ff' }}>NP</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Nayeli Perez</div>
              <div className={styles.userRole}>Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.mainArea}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageTitleRow}>
            <div>
              <h1 className={styles.pageTitle}>Time &amp; Attendance</h1>
              <p className={styles.pageSubtitle}>Track your team's time</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.btnGhost}>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Export
              </button>
              <button className={styles.btnPrimary} onClick={() => setSyncModal(true)}>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M11 4a5 5 0 10.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 1v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Sync to payroll
              </button>
            </div>
          </div>
          <div className={styles.pageTabs}>
            <div className={`${styles.tab} ${styles.tabActive}`}>Time tracking</div>
            <div className={styles.tab}>Scheduling</div>
            <div className={styles.tab}>Time off</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className={styles.content}>
          {/* Filters */}
          <div className={styles.filtersRow}>
            <span className={styles.filterLabel}>Pay period:</span>
            <input className={styles.dateInput} type="text" defaultValue="May 18, 2026" readOnly />
            <span className={styles.filterSep}>—</span>
            <input className={styles.dateInput} type="text" defaultValue="May 24, 2026" readOnly />
            <select className={styles.selectInput}>
              <option>All team members</option>
              {employees.map(e => <option key={e.id}>{e.name}</option>)}
            </select>
            <div style={{ flex: 1 }} />
            <div className={styles.toggleGroup}>
              <button className={styles.toggleBtn}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="7" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="7" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/></svg>
              </button>
              <button className={`${styles.toggleBtn} ${styles.toggleBtnActive}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 2.5h10M1 6h10M1 9.5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          {/* Stat bar */}
          <div className={styles.statBar}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Total hours</div>
              <div className={styles.statValue}>45.75h</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Logged blocks</div>
              <div className={`${styles.statValue} ${styles.statValuePrimary}`}>{loggedBlocksLabel}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Regular hours</div>
              <div className={styles.statValue}>40.0h</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Overtime</div>
              <div className={`${styles.statValue} ${styles.statValueWarning}`}>5.75h</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Double time</div>
              <div className={styles.statValue} style={{ color: 'var(--text-secondary)' }}>0h</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Time off</div>
              <div className={styles.statValue} style={{ color: 'var(--text-secondary)' }}>0h</div>
            </div>
          </div>

          <div className={styles.periodLabel}>May 18 – 24, 2026 · Pay period</div>

          {/* Main table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th} style={{ width: 160 }}>Employee</th>
                  {weekDays.map((d, i) => (
                    <th key={d.date} className={`${styles.th} ${d.date === '2026-05-20' ? styles.thHighlight : ''}`}>
                      {d.shortLabel}
                    </th>
                  ))}
                  <th className={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.empCell}>
                        <div className={styles.avatar} style={{ background: emp.avatarBg, color: emp.avatarColor, fontSize: 10, width: 24, height: 24 }}>
                          {emp.initials}
                        </div>
                        {emp.name}
                      </div>
                    </td>
                    {weekDays.map((d, i) => {
                      const cell = weekCells[emp.id][i];
                      const clickable = isClickable(cell.shiftKey);
                      const blockCount = getBlockCount(cell.shiftKey);
                      return (
                        <td
                          key={d.date}
                          className={`${styles.td} ${clickable ? styles.tdClickable : ''} ${d.date === '2026-05-20' ? styles.tdHighlight : ''}`}
                          onClick={() => clickable && onOpenModal(cell.shiftKey)}
                        >
                          {cell.displayHours ? (
                            <div className={styles.cellInner}>
                              <div className={`${styles.cellHours} ${d.date === '2026-05-20' && emp.id === 'joe' ? styles.cellHoursPrimary : ''}`}>
                                {cell.displayHours}
                              </div>
                              <div className={styles.miniBar}>
                                <div className={styles.miniBarFill} style={{ width: '68%' }} />
                              </div>
                              {blockCount > 0 && (
                                <div className={styles.blockBadge}>
                                  {blockCount} {blockCount === 1 ? 'block' : 'blocks'}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className={styles.cellEmpty}>—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className={`${styles.td} ${styles.tdTotal}`}>
                      <strong>{rowTotals[emp.id]}</strong>
                    </td>
                  </tr>
                ))}
                <tr className={styles.trWeekTotal}>
                  <td className={styles.td}>Weekly total</td>
                  {colTotals.map((t, i) => (
                    <td key={i} className={`${styles.td} ${weekDays[i]?.date === '2026-05-20' ? styles.tdHighlight : ''}`}>{t}</td>
                  ))}
                  <td className={styles.td}>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sync to payroll success modal */}
      {syncModal && (
        <div className={styles.syncOverlay} onClick={() => setSyncModal(false)}>
          <div className={styles.syncCard} onClick={e => e.stopPropagation()}>
            <div className={styles.syncIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#00a344" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.syncHeading}>Payroll sync initiated</div>
            <p className={styles.syncBody}>Time entries for May 18 – 24, 2026 have been sent to payroll.</p>
            <button className={`${styles.btnPrimary} ${styles.btnFull}`} onClick={() => setSyncModal(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
