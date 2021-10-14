import { render } from '@testing-library/react';
import { User } from '../model/user';
import { CardForm, isNumber, isDate } from './CardForm';

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

describe('#isNumber', () => {
  test('empty string should return false', () => {
    expect(isNumber('')).toBe(false);
  });

  test('non-numerical string should return false', () => {
    expect(isNumber('test')).toBe(false);
    expect(isNumber('test1')).toBe(false);
  });

  test('numerical string should return true', () => {
    expect(isNumber('0')).toBe(true);
    expect(isNumber('1')).toBe(true);
    expect(isNumber('001')).toBe(true);
    expect(isNumber('100')).toBe(true);
  });
});

describe('#isDate', () => {
  test('only string in format dd/yy is valid', () => {
    expect(isDate('')).toBe(false);
    expect(isDate('test')).toBe(false);
    expect(isDate('1111')).toBe(false);
    expect(isDate('1/1')).toBe(false);
    expect(isDate('aa/bb')).toBe(false);
    expect(isDate('11/11')).toBe(true);
    expect(isDate('00/00')).toBe(true);
  });
});
