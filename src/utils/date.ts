export const getFormattedDate = (date: Date): string => {
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  const year: number = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const convertStringToDate = (dateString: string): Date => {
  const parsedDate: Date = new Date(dateString);
  return parsedDate;
}