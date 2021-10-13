import { FC } from 'react';
import { ResetCSS } from './styles';
import { Layout } from './pages/Layout';

const App: FC = () => (
  <>
    <ResetCSS />
    <Layout />
  </>
);

export default App;
