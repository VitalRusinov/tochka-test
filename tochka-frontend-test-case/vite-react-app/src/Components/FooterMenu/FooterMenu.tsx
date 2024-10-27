import classNames from 'classnames';
import styles from './FooterMenu.module.scss';

import Chat from '/Filled/Chat.svg';
import History_icon from '/Filled/History.svg';
import Home from '/Filled/Home.svg';
import Payments from '/Filled/Payments.svg';
import Widget from '/Filled/Widget.svg';

const FooterMenu = () => {

  const active_button_classes = classNames(styles.mobile_menu_button, styles.active)
  return (
    <footer className={styles.mobile_menu}>
        <button className={styles.mobile_menu_button}>
          <img src={Home} alt="" />
          Главная
        </button>
        <button className={active_button_classes}>
          <div className={styles.dot}></div>
          <img src={History_icon} alt="" />
          История
        </button>
        <button className={styles.mobile_menu_button}>
          <img src={Payments} alt="" />
          Платежи
        </button>        
        <button className={styles.mobile_menu_button}>
          <img src={Widget} alt="" />
          Сервисы
        </button>        
        <button className={styles.mobile_menu_button}>
          <img src={Chat} alt="" />
          Чат
        </button>
      </footer>
  )
}

export default FooterMenu;