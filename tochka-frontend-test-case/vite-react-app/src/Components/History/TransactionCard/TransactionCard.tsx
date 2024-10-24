import styles from './TransactionCard.module.scss';

import { IEvent, typeEvents } from '../../../mocks/handlers';
import Icon from '../../Icon/Icon';
import classNames from 'classnames';

/*
export enum typeEvents {
    Balance = 'Balance',
    Notification = 'Notification'
}
    */
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

  if (type === typeEvents.Balance) {
    return (
      <div className={styles.container}>
        <div className={getBalanceClasses()}>{balance}</div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
          <span className={styles.optionalDescription}>{optionalDescription}</span>
        </div>
        <div className={styles.logo}>
          <Icon name={icon}/>
        </div>
      </div>
    )
  }

  if (type === typeEvents.Notification) {
    
  }

}

export default TransactionCard;