const dayjs = require('dayjs');

const formatDate = (inputDate: string): string => {
  const parsedDate = dayjs(inputDate);
  const formattedDate = parsedDate.format('D-M-YYYY');
  return formattedDate;
}

export default formatDate;