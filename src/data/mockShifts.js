export const EMPLOYEES = [
  { id: 'joe',   initials: 'JK', name: 'Joe Kelly',     avatarBg: '#e8f0fe', avatarColor: '#0057ff' },
  { id: 'maria', initials: 'MS', name: 'Maria Santos',  avatarBg: '#e8f7f0', avatarColor: '#006b2c' },
  { id: 'devon', initials: 'DP', name: 'Devon Price',   avatarBg: '#fef3e8', avatarColor: '#c05000' },
];

export const PAY_PERIOD = {
  start: '2026-05-18',
  end:   '2026-05-24',
  label: 'May 18 – 24, 2026',
};

export const WEEK_DAYS = [
  { date: '2026-05-18', shortLabel: 'Mon 5/18' },
  { date: '2026-05-19', shortLabel: 'Tue 5/19' },
  { date: '2026-05-20', shortLabel: 'Wed 5/20' },
  { date: '2026-05-21', shortLabel: 'Thu 5/21' },
  { date: '2026-05-22', shortLabel: 'Fri 5/22' },
  { date: '2026-05-23', shortLabel: 'Sat 5/23' },
  { date: '2026-05-24', shortLabel: 'Sun 5/24' },
];

/**
 * Table display cells: [employee][dayIndex] → { displayHours, shiftKey }
 * displayHours null = "--" (no shift)
 */
export const WEEK_CELLS = {
  joe: [
    { displayHours: '8h 30m', shiftKey: 'joe_2026-05-18' },
    { displayHours: '8h 15m', shiftKey: 'joe_2026-05-19' },
    { displayHours: '8h 45m', shiftKey: 'joe_2026-05-20' },
    { displayHours: '7h 30m', shiftKey: 'joe_2026-05-21' },
    { displayHours: '9h 0m',  shiftKey: 'joe_2026-05-22' },
    { displayHours: '7h 0m',  shiftKey: 'joe_2026-05-23' },
    { displayHours: null,     shiftKey: null },
  ],
  maria: [
    { displayHours: '7h 0m',  shiftKey: 'maria_2026-05-18' },
    { displayHours: '7h 30m', shiftKey: 'maria_2026-05-19' },
    { displayHours: '7h 0m',  shiftKey: 'maria_2026-05-20' },
    { displayHours: '8h 0m',  shiftKey: 'maria_2026-05-21' },
    { displayHours: '6h 30m', shiftKey: 'maria_2026-05-22' },
    { displayHours: '7h 30m', shiftKey: 'maria_2026-05-23' },
    { displayHours: null,     shiftKey: null },
  ],
  devon: [
    { displayHours: '5h 0m',  shiftKey: 'devon_2026-05-18' },
    { displayHours: '5h 15m', shiftKey: 'devon_2026-05-19' },
    { displayHours: '5h 0m',  shiftKey: 'devon_2026-05-20' },
    { displayHours: '6h 0m',  shiftKey: 'devon_2026-05-21' },
    { displayHours: '5h 30m', shiftKey: 'devon_2026-05-22' },
    { displayHours: '4h 30m', shiftKey: 'devon_2026-05-23' },
    { displayHours: null,     shiftKey: null },
  ],
};

export const ROW_TOTALS = { joe: '40.75h', maria: '43.5h', devon: '31.25h' };
export const COL_TOTALS = ['20.5h', '20.75h', '20.75h', '21.5h', '21.0h', '19.0h', '—'];
export const GRAND_TOTAL = '115.5h';

/** Detailed shift data — used to populate the Shift Detail Modal */
export const SHIFT_DATA = {
  'joe_2026-05-20': {
    employeeId: 'joe',
    date: '2026-05-20',
    dateLabel: 'Wednesday, May 20, 2026',
    clockIn:  '07:45',
    clockOut: '16:30',
    jobs: [
      { id: 'j1', name: 'Heater tune-up',    startTime: '08:15', endTime: '10:00' },
      { id: 'j2', name: 'AC inspection',      startTime: '11:00', endTime: '13:45' },
      { id: 'j3', name: 'Filter replacement', startTime: '14:30', endTime: '15:50' },
    ],
  },
  'joe_2026-05-18': {
    employeeId: 'joe',
    date: '2026-05-18',
    dateLabel: 'Monday, May 18, 2026',
    clockIn:  '08:00',
    clockOut: '16:30',
    jobs: [
      { id: 'j4', name: 'HVAC repair',        startTime: '09:00', endTime: '12:30' },
      { id: 'j5', name: 'Water heater check', startTime: '13:30', endTime: '15:30' },
    ],
  },
  'joe_2026-05-19': {
    employeeId: 'joe',
    date: '2026-05-19',
    dateLabel: 'Tuesday, May 19, 2026',
    clockIn:  '07:45',
    clockOut: '16:00',
    jobs: [
      { id: 'j6', name: 'AC service',     startTime: '08:30', endTime: '11:30' },
      { id: 'j7', name: 'Furnace check',  startTime: '13:00', endTime: '15:00' },
    ],
  },
  'joe_2026-05-21': {
    employeeId: 'joe',
    date: '2026-05-21',
    dateLabel: 'Thursday, May 21, 2026',
    clockIn:  '08:30',
    clockOut: '16:00',
    jobs: [
      { id: 'j8', name: 'Plumbing check', startTime: '09:00', endTime: '11:30' },
      { id: 'j9', name: 'Duct cleaning',  startTime: '13:00', endTime: '14:30' },
    ],
  },
  'joe_2026-05-22': {
    employeeId: 'joe',
    date: '2026-05-22',
    dateLabel: 'Friday, May 22, 2026',
    clockIn:  '07:30',
    clockOut: '16:30',
    jobs: [
      { id: 'j10', name: 'Emergency call', startTime: '08:00', endTime: '11:00' },
      { id: 'j11', name: 'Follow-up visit',startTime: '12:00', endTime: '15:00' },
    ],
  },
  'joe_2026-05-23': {
    employeeId: 'joe',
    date: '2026-05-23',
    dateLabel: 'Saturday, May 23, 2026',
    clockIn:  '09:00',
    clockOut: '16:00',
    jobs: [
      { id: 'j12', name: 'Weekend service', startTime: '09:30', endTime: '12:30' },
    ],
  },
  'maria_2026-05-18': {
    employeeId: 'maria',
    date: '2026-05-18',
    dateLabel: 'Monday, May 18, 2026',
    clockIn:  '08:00',
    clockOut: '15:00',
    jobs: [
      { id: 'm1', name: 'Pipe inspection',   startTime: '09:00', endTime: '11:00' },
      { id: 'm2', name: 'Drain clearing',    startTime: '12:00', endTime: '14:00' },
    ],
  },
  'maria_2026-05-19': {
    employeeId: 'maria',
    date: '2026-05-19',
    dateLabel: 'Tuesday, May 19, 2026',
    clockIn:  '08:00',
    clockOut: '15:30',
    jobs: [
      { id: 'm3', name: 'Water softener',    startTime: '08:30', endTime: '11:00' },
      { id: 'm4', name: 'Leak repair',       startTime: '12:00', endTime: '14:30' },
    ],
  },
  'maria_2026-05-20': {
    employeeId: 'maria',
    date: '2026-05-20',
    dateLabel: 'Wednesday, May 20, 2026',
    clockIn:  '08:30',
    clockOut: '15:30',
    jobs: [
      { id: 'm5', name: 'Boiler tune-up',    startTime: '09:00', endTime: '11:30' },
    ],
  },
  'maria_2026-05-21': {
    employeeId: 'maria',
    date: '2026-05-21',
    dateLabel: 'Thursday, May 21, 2026',
    clockIn:  '08:00',
    clockOut: '16:00',
    jobs: [
      { id: 'm6', name: 'New install',       startTime: '09:00', endTime: '12:00' },
      { id: 'm7', name: 'Quality check',     startTime: '13:00', endTime: '15:00' },
    ],
  },
  'maria_2026-05-22': {
    employeeId: 'maria',
    date: '2026-05-22',
    dateLabel: 'Friday, May 22, 2026',
    clockIn:  '09:00',
    clockOut: '15:30',
    jobs: [
      { id: 'm8', name: 'Filter service',    startTime: '09:30', endTime: '12:00' },
    ],
  },
  'maria_2026-05-23': {
    employeeId: 'maria',
    date: '2026-05-23',
    dateLabel: 'Saturday, May 23, 2026',
    clockIn:  '08:30',
    clockOut: '16:00',
    jobs: [
      { id: 'm9',  name: 'Weekend HVAC',     startTime: '09:00', endTime: '11:30' },
      { id: 'm10', name: 'Parts pickup',     startTime: '13:00', endTime: '15:00' },
    ],
  },
  'devon_2026-05-18': {
    employeeId: 'devon',
    date: '2026-05-18',
    dateLabel: 'Monday, May 18, 2026',
    clockIn:  '10:00',
    clockOut: '15:00',
    jobs: [
      { id: 'd1', name: 'Routine check',    startTime: '10:30', endTime: '12:30' },
    ],
  },
  'devon_2026-05-19': {
    employeeId: 'devon',
    date: '2026-05-19',
    dateLabel: 'Tuesday, May 19, 2026',
    clockIn:  '09:30',
    clockOut: '14:45',
    jobs: [],
  },
  'devon_2026-05-20': {
    employeeId: 'devon',
    date: '2026-05-20',
    dateLabel: 'Wednesday, May 20, 2026',
    clockIn:  '10:00',
    clockOut: '15:00',
    jobs: [
      { id: 'd2', name: 'AC unit service',  startTime: '10:30', endTime: '13:00' },
    ],
  },
  'devon_2026-05-21': {
    employeeId: 'devon',
    date: '2026-05-21',
    dateLabel: 'Thursday, May 21, 2026',
    clockIn:  '09:00',
    clockOut: '15:00',
    jobs: [
      { id: 'd3', name: 'System diagnostic',startTime: '09:30', endTime: '12:00' },
    ],
  },
  'devon_2026-05-22': {
    employeeId: 'devon',
    date: '2026-05-22',
    dateLabel: 'Friday, May 22, 2026',
    clockIn:  '09:30',
    clockOut: '15:00',
    jobs: [],
  },
  'devon_2026-05-23': {
    employeeId: 'devon',
    date: '2026-05-23',
    dateLabel: 'Saturday, May 23, 2026',
    clockIn:  '11:00',
    clockOut: '15:30',
    jobs: [
      { id: 'd4', name: 'Weekend call',     startTime: '11:30', endTime: '14:00' },
    ],
  },
};

/** Pre-seeded blocks for the main demo shift */
export const INITIAL_BLOCKS = {
  'joe_2026-05-20': [
    { id: 'b1', category: 'travel',           startTime: '07:45', endTime: '08:15' },
    { id: 'b2', category: 'travel',           startTime: '10:00', endTime: '10:30' },
    { id: 'b3', category: 'breaks',           startTime: '13:45', endTime: '14:30' },
    { id: 'b4', category: 'materials_supply', startTime: '15:50', endTime: '16:30' },
  ],
};
