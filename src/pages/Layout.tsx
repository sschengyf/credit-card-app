import { FC } from 'react';
import styled from 'styled-components';
import { Menu } from '../components/Menu';
import { CardForm } from '../components/CardForm';
import { User } from '../model/user';

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
    padding: 2rem 1rem;
  `,
};

const user: User = {
  firstName: ' Livia',
  lastName: 'Diarmuid',
};

export const Layout: FC = () => (
  <Styled.Container>
    <Menu pageTitle="Register card form" menuTitle="Menu">
      Something shows on the menu.
    </Menu>
    <Styled.Main>
      <CardForm user={user} />
    </Styled.Main>
  </Styled.Container>
);
