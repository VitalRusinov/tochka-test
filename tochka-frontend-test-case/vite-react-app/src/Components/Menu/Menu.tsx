import styles from './Menu.module.scss';
import Logo from '/Logo.svg';
import Logout from '/Stroked/Logout.svg';
import InviteMan from '/Stroked/Invite Man.svg';
import Bell from '/Stroked/Bell.svg';
import Gear from '/Common/Stroked/Gear.svg';

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="#">
          <img src={Logo} className="logo" alt="Vite logo" />
        </a>
        <div className={styles.indicator}>
          <div className={styles.dot}></div>
        </div>
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navBtn}>
          Главная
        </a>
        <a href="#" className={styles.navBtn}>
          Платежи
        </a>
        <a href="#" className={styles.navBtn}>
          Сервисы
        </a>
      </nav>
      <div className={styles.settings}>
        <div className={styles.button_mobile}>
          <img src={Bell} alt="Bell" />
          <div className={styles.dot}></div>
        </div>
        <div className={styles.button_not_mobile}>
          <img src={InviteMan} alt="Invite Man Button" />
        </div>
        <div className={styles.button_mobile}>
          <img src={Gear} alt="Gear" />
        </div>
        <div className={styles.button_not_mobile}>
          <img src={Logout} alt="Logout Button" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
