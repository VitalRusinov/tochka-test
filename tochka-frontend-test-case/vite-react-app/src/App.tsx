import styles from './App.module.scss';
import History from './Components/History/History';
import Menu from './Components/Menu/Menu';

// Основной компонент
const App = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Menu />
      </header>
      <main className={styles.main}>
        <div className={styles.wrapper_left}>
          <div className={styles.left_menu}>
            <span>Левое меню</span>
          </div>
        </div>
        <div className={styles.history}>
          <History />
        </div>
        <div className={styles.wrapper_right}>
          <div className={styles.widgets}>
            <span>Виджеты</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
