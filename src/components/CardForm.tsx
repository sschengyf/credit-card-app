import { FC, useState, useEffect } from 'react';
import { User } from '../model/user';
import { useInput } from '../hooks/useInput';
import styled from 'styled-components';

const Styled = {
  Welcome: styled.h3`
    text-align: center;
  `,
  FormControl: styled.div`
    margin-top: 1rem;
    margin-left: 1rem;
  `,
  FormControlGroup: styled.div`
    display: flex;
  `,
  ErrorMessage: styled.span`
    display: block;
    color: #ff0000;
    margin-top: 4px;
  `,
};

interface CardForm {
  cardNumber: string | undefined;
  cvc: string | undefined;
  date: string | undefined;
}

export const isNumber = (value: string) => '' !== value.trim() && Number.isInteger(Number(value.trim()));
export const isDate = (value: string) => /^\d\d\/\d\d$/.test(value);

export const CardForm: FC<{ user: User }> = ({ user }) => {
  const [cardForm, setCardForm] = useState<CardForm>({ cardNumber: '', cvc: '', date: '' });
  const {
    value: cardNumber,
    bind: bindCardNumber,
    isValid: isCardNumberValid,
    isDirty: isCardNumberDirty,
  } = useInput(cardForm.cardNumber, isNumber);
  const { value: cvc, bind: bindCvc, isValid: isCvcValid, isDirty: isCvcDirty } = useInput(cardForm.cvc, isNumber);
  const {
    value: expiry,
    bind: bindExpiry,
    isValid: isExpiryValid,
    isDirty: isExpiryDirty,
  } = useInput(cardForm.date, isDate);

  useEffect(() => {
    if (isCardNumberValid) {
      setCardForm({ ...cardForm, ...{ cardNumber } });
    }
  }, [isCardNumberValid, cardNumber]);

  useEffect(() => {
    if (isCvcValid) {
      setCardForm({ ...cardForm, ...{ cvc } });
    }
  }, [isCvcValid, cvc]);

  useEffect(() => {
    if (isExpiryValid) {
      setCardForm({ ...cardForm, ...{ expiry } });
    }
  }, [isExpiryValid, expiry]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('The card form is: ', cardForm);
  };

  return (
    <>
      <Styled.Welcome data-testid="welcome">Welcome {user.firstName}</Styled.Welcome>
      <form onSubmit={handleSubmit}>
        <Styled.FormControl>
          <input aria-label="credit card number" type="text" placeholder="Credit card number" {...bindCardNumber} />
          {!isCardNumberValid && isCardNumberDirty && <Styled.ErrorMessage>Card number is invalid</Styled.ErrorMessage>}
        </Styled.FormControl>
        <Styled.FormControlGroup>
          <Styled.FormControl>
            <input aria-label="CVC" type="text" placeholder="CVC" {...bindCvc} />
            {!isCvcValid && isCvcDirty && <Styled.ErrorMessage>CVC is invalid</Styled.ErrorMessage>}
          </Styled.FormControl>
          <Styled.FormControl>
            <input aria-label="expiry" type="text" title="dd/yy" placeholder="Expiry dd/yy" {...bindExpiry} />
            {!isExpiryValid && isExpiryDirty && (
              <Styled.ErrorMessage>Expiry is invalid, please use format dd/yy</Styled.ErrorMessage>
            )}
          </Styled.FormControl>
        </Styled.FormControlGroup>
        <Styled.FormControl>
          <button type="submit" data-testid="submit" disabled={!isCardNumberValid || !isCvcValid || !isExpiryValid}>
            Submit
          </button>
        </Styled.FormControl>
      </form>
    </>
  );
};
