import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const { getByText } = render(<App />);
    expect(getByText('Register card form')).toBeInTheDocument();
  });
});
