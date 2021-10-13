import { FC } from 'react';
import styled from 'styled-components';
import { Menu } from '../components/Menu';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 1024px;
    margin: 1rem auto;
    height: calc(100vh - 2rem);
    position: relative;
    box-sizing: border-box;
  `,
  Main: styled.main`
    flex: 1;
    border: 2px solid #000;
    border-top: none;
  `,
};

export const Layout: FC = () => (
  <Styled.Container>
    <Menu pageTitle="Register card form" menuTitle="Menu">
      Something shows on the menu.
    </Menu>
    <Styled.Main>Will be a form</Styled.Main>
  </Styled.Container>
);
