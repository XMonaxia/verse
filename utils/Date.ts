// Satu Tahun
export const oneYear = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
};
// Satu Bulan
export const oneMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
};
// Satu Minggu
export const oneWeek = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
// 3 Hari
export const threeDays = () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
// 1 Hari
export const oneDay = () => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
// 11 Jam
export const elevenHours = () => new Date(Date.now() + 11 * 60 * 60 * 1000);
// 5 Jam
export const fiveHours = () => new Date(Date.now() + 5 * 60 * 60 * 1000);
// 1 Jam
export const oneHour = () => new Date(Date.now() + 1 * 60 * 60 * 1000);
// 30 Menit
export const thirtyMinutes = () => new Date(Date.now() + 30 * 60 * 1000);
// 15 Menit
export const fifteenMinutes = () => new Date(Date.now() + 15 * 60 * 1000);
// 7 Menit
export const sevenMinutes = () => new Date(Date.now() + 7 * 60 * 1000);
// 1 Menit
export const oneMinute = () => new Date(Date.now() + 1 * 60 * 1000);
