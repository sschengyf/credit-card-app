import { FC } from 'react';
import { ResetCSS } from './styles';
import { Menu } from './components/Menu';

const App: FC = () => (
  <>
    <ResetCSS />
    <div>
      <Menu pageTitle="Register card form" menuTitle="Menu">
        Something shows on the menu.
      </Menu>
    </div>
  </>
);

export default App;
