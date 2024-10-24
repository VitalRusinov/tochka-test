import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

import TransactionCard from './TransactionCard/TransactionCard';

import { IEvent } from '../../mocks/handlers';
import styles from './History.module.scss';
import Arrow from '/Stroked/Arrow.svg';

const History = () => {
  const [data, setData] = useState<IEvent[]>([]); // Состояние для хранения постов
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [hasMore, setHasMore] = useState<boolean>(true); // Флаг наличия данных
  const observer = useRef<IntersectionObserver | null>(null); // Ссылка на IntersectionObserver

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
        setData((prevData) => [...prevData, ...newData]);
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

/*

    <div>
      <h1>Посты</h1>
      <ul>
        {data.map((event, index) => {
          // Если это последний элемент, устанавливаем ref
          if (index === data.length - 1) {
            return <li key={_.uniqueId()} ref={lastElementRef}>{event.title}</li>;
          }
          return <li key={_.uniqueId()}>{event.title}</li>;
        })}
      </ul>
      {loading && <p>Загрузка...</p>}
      {!hasMore && <p>Больше нет данных.</p>}
    </div>

    */
