import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  &:focus-within {
    border: 2px solid #fff;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      border: 0;
      -webkit-text-fill-color: #f4ede8;
      -webkit-box-shadow: 0 0 0px 1000px #232129 inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
