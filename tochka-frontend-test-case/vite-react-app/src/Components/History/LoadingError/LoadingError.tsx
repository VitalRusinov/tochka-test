import styles from './LoadingError.module.scss';
import Reload from '../../../../public/Stroked/Reload.svg';

const LoadingError = () => {
  return (
    <div className={styles.container}>
      <span>
        Ничего не загрузилось...
        <br />
        Попробуйте перезагрузить экран.
        <br />
        Все получится.
      </span>
      <div className={styles.svg_container}>
        <img src={Reload} alt="" />
      </div>
    </div>
  );
};

export default LoadingError;
