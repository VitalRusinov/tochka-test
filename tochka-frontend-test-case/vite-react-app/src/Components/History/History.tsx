import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TransactionCard from './TransactionCard/TransactionCard';
import { IEvent, typeEvents } from '../../mocks/handlers';
import { getFormattedData } from '../../utils/getFormattedData';

import Down from '/Stroked/Arrow_down.svg';
import Up from '/Stroked/Arrow_up.svg';
import Pen from '/Stroked/Pen.svg';
import Plus from '/Stroked/Plus.svg';

import styles from './History.module.scss';
import LoadingContent from './LoadingContent/LoadingContent';
import EmptyList from './EmptyList/EmptyList';
import LoadingError from './LoadingError/LoadingError';
import EndList from './EndList/EndList';

const History = () => {
  // Состояние для хранения операций
  const [data, setData] = useState<IEvent[]>([]); // Загруженные операции
  const [formattedData, setFormattedData] = useState<IEvent[]>([]); // Отформатированные операции

  // Для хранения состояний загрузки
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [hasMore, setHasMore] = useState<boolean>(true); // Флаг наличия данных для загрузки
  const observer = useRef<IntersectionObserver | null>(null); // Ссылка на последний элемент, который инициирует загрузку новых данных

  //Состояние какой фильтр открыт в данный момент (чтоб был открыт только один за раз)
  const [showFilter, setShowFilter] = useState<string | boolean>(false)

  //Состояния для фильтра по типам
  const [typeFilter, setTypeFilter] =  useState<{ [key in typeEvents]: boolean }>({
    [typeEvents.Balance]: true,
    [typeEvents.Notification]: true,
    [typeEvents.Date]: true,
  });

  // Состояния для фильтра по диапазону дат
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Состояние для хранения флага наличия ошибки
  const [error, setError] = useState<boolean>(false);

  // Функция для загрузки данных
  // useCallback используется для использования актуальных данных из состояний
  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return; // Предотвращаем лишние запросы

    setLoading(true); // Устанавливаем флаг загрузки
    setError(false);  // Устанавливаем флаг отсутствия ошибки

    try {
      const response = await fetch('/api/events'); // Отправляем запрос к серверу
      const JsonResponse = await response.json(); // Получаем JSON-ответ
      const newData: IEvent[] = JsonResponse.data; // Извлекаем события из ответа

      if (newData.length === 0) {
        setHasMore(false); // Если данных больше нет, останавливаем загрузку
      } else {
        setData((prevData) => [...prevData, ...newData]); // Обновляем состояние с новыми данными

        // Проверка, достигли ли мы конца диапазона
        const oldestEvent = newData[newData.length - 1]; // Самая старая дата в текущей порции обновлений
        const oldestEventDate = new Date (oldestEvent.date);

        if (startDate && oldestEventDate < startDate) {
          setHasMore(false); // Больше загружать не нужно
        }
      }
    } catch (error) {
      setError(true);
      console.error('Ошибка при загрузке данных:', error); // Логируем ошибку, если что-то пошло не так
    } finally {
      setLoading(false); // Снимаем флаг загрузки в любом случае
    }
  }, [startDate, endDate, hasMore, loading]);

  // Колбэк для отслеживания последнего элемента
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect(); // Удаляем старый наблюдатель

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Последний элемент виден. Загрузка данных...');
        fetchData();
      }
    });

    if (node) observer.current.observe(node); // Наблюдаем за новым элементом
  }, [hasMore, loading, fetchData])

  // Эффект для первоначальной загрузки данных
  useEffect(() => {
    fetchData();
  }, []);
  
  //Разрешаем загрузку при изменении диапазона дат
  useEffect(() => {
    setHasMore(true);
  }, [startDate, endDate]);

  //Форматирование списка (фильтрация, добавление "Дат")
  useEffect(() => {
    if (data.length === 0) return;
    // Фильтрация данных по типу
    const typeFilteredData = data.filter(item => typeFilter[item.type]);
    
    // Фильтрация данных по диапазону дат
    const filteredData = typeFilteredData.filter((event) => {
      if (!startDate || !endDate) return true; // Если даты не выбраны, показываем все
      const eventDate = new Date (event.date);
      const fullEndDate = new Date(endDate);
      fullEndDate.setHours(23, 59, 59, 999);
     // return isWithinInterval(eventDate, { start: startDate, end: fullEndDate });
      return eventDate >= startDate && eventDate <= fullEndDate;
    });

    //Форматирование списка
    const formattedData = getFormattedData(filteredData);    
    setFormattedData(formattedData);
  }, [data, typeFilter, startDate, endDate]);

  // Обработчик изменения состояния чекбоксов
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setTypeFilter((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Классы для кнопок фильтров
  const type_filter_button_classes = classNames(styles.filter_button, showFilter === 'type' ? styles.active : '');
  const date_filter_button_classes = classNames(styles.filter_button, showFilter === 'date' ? styles.active : '');

  //Класы для .filters
  const filters_classes = classNames(styles.filters, showFilter === false ? '' : styles.active);

  // Действия для кнопок, открывающих фильтры
  const handlerTypeFilter = () => showFilter === 'type' ? setShowFilter(false) : setShowFilter('type');
  const handlerDateFilter = () => showFilter === 'date' ? setShowFilter(false) : setShowFilter('date');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>История</span>
        {data.length === 0 && <img src={Pen} alt="" className={styles.not_mobile}/>}
        {data.length === 0 && <img src={Plus} alt="" className={styles.mobile}/>}
      </div>
      <div className={styles.content}>
        <div className={filters_classes}>

          <div className={styles.typeFilter}>
            <button onClick={handlerTypeFilter} className={type_filter_button_classes}>
              <span>Тип операции</span>
              <img src={showFilter === 'type' ? Up : Down} alt="" />
            </button>
            {(showFilter === 'type') && (
              <div className={styles.filter_options}>
                <label className={styles.custom_checkbox}>
                  <input
                    type="checkbox"
                    name={typeEvents.Balance}
                    checked={typeFilter[typeEvents.Balance]}
                    onChange={handleCheckboxChange}
                  />
                  <span className={styles.checkmark}></span>
                  Баланс
                </label>
                <label className={styles.custom_checkbox}>
                  <input
                    type="checkbox"
                    name={typeEvents.Notification}
                    checked={typeFilter[typeEvents.Notification]}
                    onChange={handleCheckboxChange}
                  />
                  <span className={styles.checkmark}></span>
                  Уведомления
                </label>
              </div>
            )}
          </div>
          
          <div className={styles.dateFilter}>
            <button onClick={handlerDateFilter} className={date_filter_button_classes}>
              <span>Период</span>
              <img src={showFilter === 'date' ? Up : Down} alt="" />
            </button>
            {/* Календарь для выбора диапазона дат */}
            {(showFilter === 'date') && (
              <div className={styles.filter_options}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date ?? undefined)} // Устанавливаем undefined, если date = null
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Начальная дата"
                  dateFormat="dd.MM.yyyy"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date ?? undefined)} // Устанавливаем undefined, если date = null
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Конечная дата"
                  dateFormat="dd.MM.yyyy"
                />
              </div>
            )}
          </div>      

          <button className={styles.filter_button}>
            <span>Счёт</span>
            <img src={Down} alt="" />
          </button>
          <button className={styles.filter_button}>
            <span>Карта</span>
            <img src={Down} alt="" />
          </button>
        </div>
        <div className={styles.transactions}>
          {formattedData.length > 0 && formattedData.map((transaction, index) => {
            // Если это последний элемент, устанавливаем ref
            if (index === formattedData.length - 1) {
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
          {formattedData.length !== 0 && !hasMore && <EndList />}
          {formattedData.length === 0 && !hasMore && <EmptyList />}
          {formattedData.length === 0 && error && <LoadingError />}
        </div>
      </div>
      {data.length === 0 && loading && <LoadingContent />}
    </div>
  );
};

export default History;
