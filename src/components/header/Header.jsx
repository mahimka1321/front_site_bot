import React from 'react';
import './Header.css';
import Button from '../button/Button';
import { useTelegram } from '../../hooks/useTelegram';


const Header = () => {

    const { user, onClose } = useTelegram();

  return (
    <div className={'header'}>
        <Button onClick={onClose}>Закрыть</Button>
        <span className={'username'}>
            {user?.userneme}
        </span>
    </div>
  );
}

export default Header;
