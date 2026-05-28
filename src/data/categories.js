export const CATEGORIES = [
  { id: 'shop_time',        label: 'Shop time',         token: 'shop',      icon: '🔧' },
  { id: 'admin_time',       label: 'Admin time',         token: 'admin',     icon: '📋' },
  { id: 'training',         label: 'Training',           token: 'training',  icon: '📚' },
  { id: 'travel',           label: 'Travel',             token: 'travel',    icon: '✈' },
  { id: 'meeting',          label: 'Meeting',            token: 'meeting',   icon: '👥' },
  { id: 'breaks',           label: 'Breaks',             token: 'breaks',    icon: '☕' },
  { id: 'downtime',         label: 'Downtime',           token: 'downtime',  icon: '⏸' },
  { id: 'materials_supply', label: 'Materials & Supply', token: 'materials', icon: '📦' },
  { id: 'other',            label: 'Other',              token: 'other',     icon: '●' },
];

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
