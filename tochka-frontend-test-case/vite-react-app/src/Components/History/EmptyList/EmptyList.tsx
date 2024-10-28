import Icon from '../../Icon/Icon';
import styles from './EmptyList.module.scss';

const EmptyList = () => {
  return (
    <div className={styles.container}>
      <Icon name={'Illustration.svg'} />
      <span>
        Здесь будут все платежи и другие собития.
        <br />
        Пока их нет.
      </span>
    </div>
  );
};

export default EmptyList;
