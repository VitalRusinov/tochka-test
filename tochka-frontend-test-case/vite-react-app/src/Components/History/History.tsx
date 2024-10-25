import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

import TransactionCard from './TransactionCard/TransactionCard';

import { IEvent, typeEvents } from '../../mocks/handlers';
import styles from './History.module.scss';
import Arrow from '/Stroked/Arrow.svg';

const History = () => {
  const [data, setData] = useState<IEvent[]>([]); // Состояние для хранения постов
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [hasMore, setHasMore] = useState<boolean>(true); // Флаг наличия данных
  const observer = useRef<IntersectionObserver | null>(null); // Ссылка на IntersectionObserver

  //Состояния для фильтров
  const [typeFilter, setTypeFilter] = useState<Omit<{ [key in typeEvents]: boolean }, typeEvents.Date>>({
    [typeEvents.Balance]: true,
    [typeEvents.Notification]: true,
});
  const [showTypeFilter, setShowTypeFilter] = useState(false);

  // Вспомогательная функция-предикат для сравнения двух дат
  function isThisIsOneDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear();
  }

  //Вспомогательная функция для добавления "Сегодня, вчера"
  const getTitle = (today: Date, date: Date): string => {
    // Проверка на "сегодня"
    if (isThisIsOneDay(today, date)) return "Сегодня, ";

    // Проверка на "вчера"
    const yesterday = new Date(today); // Создаем новый объект на основе today
    yesterday.setDate(today.getDate() - 1); // Уменьшаем день на 1
    if (isThisIsOneDay(yesterday, date)) return "Вчера, ";

    return '';
  }

  //Вспомогательная функция для создания элемента "Дата"
  const createDateEl = (date: Date, title: string, description: string = ''): IEvent => {
    return {
      date,
      title,
      description,
      type: typeEvents.Date,
      icon: '',
    }
  }

  //Функция для добавления элементов "Дата" в массив с данными
  const getFormattedData = (newFetchData: IEvent[], data: IEvent[]): IEvent[] => {
    const today = new Date();
    let currentDate = data.length === 0 ? today : new Date(data[data.length - 1].date);
    const formattedData: IEvent[] = [];

    //Создание первой "Даты" в списке
    if (data.length === 0) {
      console.log(data, 'data', data.length, 'data.length');
      const date = new Date(newFetchData[0].date)
      const firstDate = createDateEl(date, getTitle(today, date));
      formattedData.push(firstDate);
    }

    newFetchData.forEach((item) => {
      const { date } = item;
      const formDate = new Date(date)
      if (!isThisIsOneDay(currentDate, formDate)) {
        const dateEl = createDateEl(formDate, getTitle(today, formDate));
        formattedData.push(dateEl);
        currentDate = formDate;
      }
      formattedData.push(item);
    })

    return formattedData;
  }

  // Функция для загрузки данных
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events');
      const JsonResponse = await response.json();
      const newData: IEvent[] = JsonResponse.data;
      console.log('response newData:', newData)

      // Если нет новых данных, устанавливаем флаг hasMore в false
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => {
          const newFormattedData = getFormattedData(newData, prevData); // Используем предыдущее состояние
          return [...prevData, ...newFormattedData]; // Обновляем состояние
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // Колбэк для отслеживания последнего элемента
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect(); // Удаляем старый наблюдатель

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Последний элемент виден. Загружаем данные...');
        fetchData(); // Загружаем новые данные
      }
    });

    if (node) observer.current.observe(node); // Наблюдаем за новым элементом
  }, [hasMore]);

  // Эффект для первоначальной загрузки данных
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>История</span>
      </div>
      <div className={styles.content}>
        <div className={styles.filters}>
          <button className={styles.filter_button}>
            <span>Тип операции</span>
            <img src={Arrow} alt="" />
          </button>
          <button className={styles.filter_button}>
            <span>Период</span>
            <img src={Arrow} alt="" />
          </button>
          <button className={styles.filter_button}>
            <span>Счёт</span>
            <img src={Arrow} alt="" />
          </button>
          <button className={styles.filter_button}>
            <span>Карта</span>
            <img src={Arrow} alt="" />
          </button>
        </div>
        <div className={styles.transactions}>
          {data.map((transaction, index) => {
            // Если это последний элемент, устанавливаем ref
            if (index === data.length - 1) {
              return (
                <div key={_.uniqueId()} ref={lastElementRef} className={styles.transactionCard}>
                  <TransactionCard transaction={transaction}/>
                </div>
              )
            }
            return (
              <div key={_.uniqueId()} className={styles.transactionCard}>
                <TransactionCard transaction={transaction}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default History;

