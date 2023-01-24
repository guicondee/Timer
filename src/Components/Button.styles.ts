import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}


const buttonVariants = {
  primary: 'blue',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 100px;
height: 40px;
border: none;
margin: 8px;
border-radius: 4px;

background-color: ${props => props.theme['gray-100']};
color: ${props => props.theme['green-300']};

/* ${props => {
    return css`
    background-color: ${buttonVariants[props.variant]}
  `
  }} */


`