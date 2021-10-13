import { FC, useState } from 'react';
import styled from 'styled-components';
import { MenuIcon } from './MenuIcon';
import { LeftArrowIcon } from './LeftArrowIcon';

const Styled = {
  Menu: styled.div<{ open: boolean }>`
    border: 2px solid #000;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    height: ${({ open }) => (open ? '100%' : 'auto')};
    position: ${({ open }) => (open ? 'absolute' : 'static')};
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  MenuHeader: styled.header<{ open: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: ${({ open }) => (open ? '2px solid #000' : 'none')};
    padding: 1rem;
  `,
  MenuTitle: styled.h1`
    flex: 1;
    text-align: center;
  `,
  MenuContent: styled.div`
    padding: 1rem;
  `,
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
    <Styled.Menu open={open}>
      <Styled.MenuHeader open={open}>
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
