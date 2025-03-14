export default function handleDateFormat(date) {
  if (!date || typeof date !== 'string') return date;
  const parts = date.split('-');
  if (parts.length !== 3) return date;
  const [year, month, day] = parts;
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}