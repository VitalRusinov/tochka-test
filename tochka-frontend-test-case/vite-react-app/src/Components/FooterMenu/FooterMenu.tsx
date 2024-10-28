import { useState } from 'react';
import classNames from 'classnames';
import styles from './FooterMenu.module.scss';

import Chat from '/Filled/Chat.svg';
import History_icon from '/Filled/History.svg';
import Home from '/Filled/Home.svg';
import Payments from '/Filled/Payments.svg';
import Widget from '/Filled/Widget.svg';

type ButtonProps = {
  id: string;
  name: string;
  icon: string;
  onClick: (id: string) => void;
  isActive: boolean;
};

const Button: React.FC<ButtonProps> = ({
  id,
  name,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <button
      className={classNames(
        styles.mobile_menu_button,
        isActive ? styles.active : ''
      )}
      onClick={() => onClick(id)}
    >
      <div
        className={classNames(styles.icon)}
        style={{
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          backgroundColor: isActive ? '#835DE1' : '#C8C8C8',
        }}
      />
      {name}
      <div className={styles.dot}></div>
    </button>
  );
};

const FooterMenu = () => {
  const [activeBtn, setActiveBtn] = useState<string>('2');

  const handle = (id: string) => {
    setActiveBtn(id);
  };

  const buttons = [
    { id: '1', name: 'Главная', icon: Home },
    { id: '2', name: 'История', icon: History_icon },
    { id: '3', name: 'Платежи', icon: Payments },
    { id: '4', name: 'Сервисы', icon: Widget },
    { id: '5', name: 'Чат', icon: Chat },
  ];
  return (
    <footer className={styles.mobile_menu}>
      {buttons.map((button) => {
        const { id, name, icon } = button;
        return (
          <Button
            key={id}
            id={id}
            name={name}
            icon={icon}
            onClick={() => handle(id)}
            isActive={id === activeBtn}
          />
        );
      })}
    </footer>
  );
};

export default FooterMenu;
