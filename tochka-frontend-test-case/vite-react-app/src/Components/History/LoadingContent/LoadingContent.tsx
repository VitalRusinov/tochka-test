import styles from './LoadingContent.module.scss';

const LoadingContent = () => {
  return (
    <div className={styles.loadingContent}>
      <div className={styles.emptyBlock1}></div>
      <div className={styles.emptyBlock2}>
        <div className={styles.interiorEmptyBlock}></div>
        <div className={styles.interiorEmptyBlock}></div>
        <div className={styles.interiorEmptyBlock}></div>
      </div>
      <div className={styles.emptyBlock3}></div>
      <div className={styles.emptyBlock4}>
        <div className={styles.interiorEmptyBlock1}>
          <div className={styles.interiorEmptyBlock1}></div>
          <div className={styles.interiorEmptyBlock2}></div>
        </div>
        <div className={styles.interiorEmptyBlock2}>
          <div className={styles.interiorEmptyBlock1}></div>
          <div className={styles.interiorEmptyBlock2}></div>
        </div>
        <div className={styles.interiorEmptyBlock3}></div>
      </div>
    </div>
  );
};

export default LoadingContent;
