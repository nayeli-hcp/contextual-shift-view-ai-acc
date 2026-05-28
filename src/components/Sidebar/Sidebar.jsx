import { useState } from 'react';
import styles from './Sidebar.module.css';
import hcpLogo from '../../assets/hcp-logo.svg';

const NAV_ITEMS = [
  { label: 'Home',           icon: 'home',            active: true },
  { label: 'Schedule',       icon: 'calendar_month' },
  { label: 'Pipeline',       icon: 'table_chart' },
  { type: 'divider' },
  { label: 'Customers',      icon: 'person' },
  { label: 'Leads',          icon: 'radar' },
  { label: 'Estimates',      icon: 'assignment' },
  { label: 'Jobs',           icon: 'build' },
  { label: 'Invoices',       icon: 'receipt_long' },
  { type: 'divider' },
  { label: 'Communications', icon: 'forum',           expandable: true },
  { label: 'Money',          icon: 'monetization_on', expandable: true },
  { label: 'Marketing',      icon: 'campaign',        expandable: true },
  { label: 'Reporting',      icon: 'bar_chart',       expandable: true },
  { label: 'Team',           icon: 'group',           expandable: true },
  { type: 'divider' },
  { label: 'Price Book',     icon: 'sell' },
  { label: 'Apps',           icon: 'apps' },
];

function HcpMark() {
  return (
    <svg className={styles.logoMark} width="14" height="24" viewBox="0 0 14 23.6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 4.36364V19.6L7.4286 23.6V0L0 4.36364Z" fill="currentColor" />
      <path d="M9.57706 21.3818H12.7087L12.7816 2.54545H9.57706V4.32727H10.9972L10.9608 19.6364H9.57706V21.3818Z" fill="currentColor" />
    </svg>
  );
}

function NavItem({ label, icon, active, expandable, collapsed }) {
  return (
    <a href="#" className={`${styles.navItem} ${active ? styles.navItemActive : ''}`} title={collapsed ? label : undefined}>
      <span className={`material-symbols-rounded ${styles.navIcon}`}>{icon}</span>
      <span className={styles.navLabel}>{label}</span>
      {expandable && (
        <span className={`material-symbols-rounded ${styles.chevron}`}>expand_more</span>
      )}
    </a>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <img src={hcpLogo} alt="Housecall Pro" className={styles.logo} />
          <HcpMark />
          <button
            className={styles.collapseBtn}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            onClick={() => setCollapsed(c => !c)}
          >
            <span className="material-symbols-rounded">
              {collapsed ? 'last_page' : 'first_page'}
            </span>
          </button>
        </div>
        <button className={styles.createBtn}>
          <span className="material-symbols-rounded">add</span>
          <span className={styles.createLabel}>Create</span>
        </button>
      </div>

      <div className={styles.navScroll}>
        <nav className={styles.menu}>
          {NAV_ITEMS.map((item, i) =>
            item.type === 'divider'
              ? <div key={`d${i}`} className={styles.divider} />
              : <NavItem key={item.label} {...item} collapsed={collapsed} />
          )}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <NavItem label="Settings" icon="settings" collapsed={collapsed} />
        <div className={styles.accountRow}>
          <div className={styles.accountAvatar}>NP</div>
          <div className={styles.accountInfo}>
            <span className={styles.accountName}>Nayeli</span>
            <span className={styles.accountRole}>Admin</span>
          </div>
          <span className={`material-symbols-rounded ${styles.accountChevron}`}>chevron_right</span>
        </div>
      </div>
    </aside>
  );
}
