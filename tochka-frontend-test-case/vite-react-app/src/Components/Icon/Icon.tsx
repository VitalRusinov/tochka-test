import React from 'react';
import iconsMap from './icons';
import styles from './Icon.module.scss';

interface IconProps {
  name: string;
  alt?: string;
}

const Icon: React.FC<IconProps> = ({ name, alt }) => {
  const IconSrc = iconsMap[name]; // Используем 'name' с расширением '.svg'

  if (!IconSrc) {
    return <span>not found</span>;
  }

  return <img src={IconSrc} alt={alt || name} />;
};

export default Icon;
