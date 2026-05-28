/** Parse "HH:MM" → minutes from midnight */
export function parseTime(hhMm) {
  const [h, m] = hhMm.split(':').map(Number);
  return h * 60 + m;
}

/** Minutes from midnight → "h:MM AM/PM" */
export function formatTime(minutes) {
  const total = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Minutes from midnight → "HH:MM" (for <input type="time">) */
export function minutesToHHMM(minutes) {
  const h = Math.floor(((minutes % 1440) + 1440) % 1440 / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Duration minutes → "Xh Ym" / "Xh" / "Ym" */
export function formatDuration(minutes) {
  if (minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

/** "HH:MM" → "HH:MM" display as "h:MM AM/PM" */
export function displayTime(hhMm) {
  return formatTime(parseTime(hhMm));
}

/** Compute gap minutes between two "HH:MM" strings */
export function gapMinutes(endHHMM, startHHMM) {
  return parseTime(startHHMM) - parseTime(endHHMM);
}
