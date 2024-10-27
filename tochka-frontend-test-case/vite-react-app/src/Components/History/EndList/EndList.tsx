import styles from './EndList.module.scss';

const EndList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.indoorBlock}>
        <span>Это - конец истории.<br />Других событий не было.</span>
      </div>
    </div>
  )
}

export default EndList;