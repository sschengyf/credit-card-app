import { FC, useState } from 'react';
import styled from 'styled-components';
import { MenuIcon } from './MenuIcon';
import { LeftArrowIcon } from './LeftArrowIcon';

const Styled = {
  Menu: styled.div`
    border: 2px solid #000;
  `,
  MenuHeader: styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px solid #000;
  `,
  MenuTitle: styled.h1`
    flex: 1;
    text-align: center;
  `,
  MenuContent: styled.div``,
  Toggle: styled.button`
    border: 0;
    background: none;
    cursor: pointer;
  `,
};

interface MenuProps {
  pageTitle: string;
  menuTitle?: string;
}

export const Menu: FC<MenuProps> = ({ children, pageTitle, menuTitle = 'Menu' }) => {
  const [open, setOpen] = useState(false);

  return (
    <Styled.Menu>
      <Styled.MenuHeader>
        <Styled.Toggle onClick={() => setOpen(!open)} data-testid="menu-toggle">
          {open && <LeftArrowIcon />}
          {!open && <MenuIcon />}
        </Styled.Toggle>
        <Styled.MenuTitle data-testid="menu-title">
          {open && menuTitle}
          {!open && pageTitle}
        </Styled.MenuTitle>
      </Styled.MenuHeader>
      {open && <Styled.MenuContent data-testid="menu-content">{children}</Styled.MenuContent>}
    </Styled.Menu>
  );
};
