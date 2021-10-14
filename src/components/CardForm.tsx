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

const isNumber = (value: string) => '' !== value.trim() && Number.isInteger(Number(value.trim()));

export const CardForm: FC<{ user: User }> = ({ user }) => {
  const [cardForm, setCardForm] = useState<CardForm>({ cardNumber: '', cvc: '', date: '' });
  const {
    value: cardNumber,
    bind: bindCardNumber,
    isValid: isCardNumberValid,
    isDirty: isCardNumberDirty,
  } = useInput(cardForm.cardNumber, isNumber);
  const { value: cvc, bind: bindCvc, isValid: isCvcValid, isDirty: isCvcDirty } = useInput(cardForm.cvc, isNumber);
  const { value: expiry, bind: bindExpiry, isValid: isExpiryValid } = useInput(cardForm.date);

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
            <input aria-label="expiry" type="date" placeholder="Expiry" />
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
