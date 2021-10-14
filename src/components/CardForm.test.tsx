import { render } from '@testing-library/react';
import { User } from '../model/user';
import { CardForm } from './CardForm';

describe('CardForm', () => {
  const user: User = {
    firstName: 'first',
    lastName: 'last',
  };

  it('should say welcome to the user', () => {
    const { getByText } = render(<CardForm user={user} />);
    expect(getByText(`Welcome ${user.firstName}`)).toBeInTheDocument();
  });

  it('should render fields', () => {
    const { getByLabelText } = render(<CardForm user={user} />);
    expect(getByLabelText('credit card number')).toBeInTheDocument();
    expect(getByLabelText('CVC')).toBeInTheDocument();
    expect(getByLabelText('expiry')).toBeInTheDocument();
  });

  it('should not enable submit when fields are invalid', () => {
    const { getByTestId } = render(<CardForm user={user} />);
    expect(getByTestId('submit')).toBeDisabled();
  });
});
