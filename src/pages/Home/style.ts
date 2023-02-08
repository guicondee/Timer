import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

`
export const BaseCountdowButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme["gray-100"]};

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdowButton = styled(BaseCountdowButton)`
  background: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`

export const StopCountdowButton = styled(BaseCountdowButton)`
  background: ${(props) => props.theme["red-500"]};
 

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`

export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`

export const TaskInput = styled(BaseInput)`
 flex: 1;

 &::-webkit-calendar-picker-indicator {
  display: none !important;
 }
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;

`

