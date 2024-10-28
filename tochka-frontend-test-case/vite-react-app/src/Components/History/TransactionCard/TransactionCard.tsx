import styles from './TransactionCard.module.scss';

import { IEvent, typeEvents } from '../../../mocks/handlers';
import Icon from '../../Icon/Icon';
import classNames from 'classnames';

interface props {
  transaction: IEvent;
}

const TransactionCard: React.FC<props> = ({transaction}) => {

  const {date, title, description, optionalDescription, type, icon, balance, service} = transaction;

  const getBalanceClasses = () => {
    if (balance === undefined) {
      return classNames(styles.none);
    } else {
      return classNames(styles.balance, {
        [styles.positive]: balance.startsWith('+'),
        [styles.negative]: balance.startsWith('-'),
      });
    }
  }

  const getLogoClasses = () => {
    return classNames(styles.logo, {
      [styles.invoice]: title.slice(0, 7) === "Счёт на",
    });

  }

  const getDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  }

  if (type === typeEvents.Balance) {
    return (
      <div className={styles.container}>
        <div className={styles.withoutLogo}>
          <div className={getBalanceClasses()}>{balance}</div>
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
            <span className={styles.optionalDescription}>{optionalDescription}</span>
          </div>
        </div>        
        <div className={getLogoClasses()}>
          <Icon name={icon}/>
        </div>
      </div>
    )
  }

  if (type === typeEvents.Notification) {
    return (
      <div className={styles.container}>
        <div className={styles.withoutLogo}>
          <div className={styles.service}>{service}</div>
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </div>
        </div>
        <div className={getLogoClasses()}>
          <Icon name={icon}/>
        </div>
      </div>
    )
  }

  if (type === typeEvents.Date) {
    return (
      <div className={styles.date_container}>
        <div className={styles.dates}>
          <span>{title}</span>
          <span>{getDate(date)}</span>
          <span>{description}</span>
        </div>
      </div>
    )
  }

}

export default TransactionCard;
