import { IEvent, typeEvents } from '../mocks/handlers';

// Вспомогательная функция-предикат для сравнения двух дат
const isThisIsOneDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

//Вспомогательная функция для добавления "Сегодня, вчера"
const getRelativeDay = (today: Date, date: Date): string => {
  // Проверка на "сегодня"
  if (isThisIsOneDay(today, date)) return 'Сегодня, ';

  // Проверка на "вчера"
  const yesterday = new Date(today); // Создаем новый объект на основе today
  yesterday.setDate(today.getDate() - 1); // Уменьшаем день на 1
  if (isThisIsOneDay(yesterday, date)) return 'Вчера, ';

  return '';
};

// Вспомогательная функция для добавления года
const getYear = (date1: Date, date2: Date): string => {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return String(date2.getFullYear());
  }
  return '';
};

//Вспомогательная функция для создания элемента "Дата"
const createDateEl = (
  date: Date,
  title: string,
  description: string = ''
): IEvent => {
  return {
    date,
    title,
    description,
    type: typeEvents.Date,
    icon: '',
  };
};

//Функция для добавления элементов "Дата" в массив с данными
export const getFormattedData = (newData: IEvent[]): IEvent[] => {
  if (newData.length === 0) return [];
  const today = new Date();
  let currentDate = new Date(newData[0].date);
  const formattedData: IEvent[] = [];

  //Создание первой "Даты" в списке
  const firstDate = createDateEl(
    currentDate,
    getRelativeDay(today, currentDate)
  );
  formattedData.push(firstDate);

  newData.forEach((item) => {
    const { date } = item;
    const formDate = new Date(date);
    if (!isThisIsOneDay(currentDate, formDate)) {
      const dateEl = createDateEl(
        formDate,
        getRelativeDay(today, formDate),
        getYear(currentDate, formDate)
      );
      formattedData.push(dateEl);
      currentDate = formDate;
    }
    formattedData.push(item);
  });

  return formattedData;
};
