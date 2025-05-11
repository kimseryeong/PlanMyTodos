import styled, { css } from "styled-components";

const Button = styled.button`
    width: 70px;
    height: 35px;
    font-size: 16px;
    background-color: white;
    border: 1px solid ${({theme}) => theme.colors.strong};
    border-radius: 20px;
    margin: 5px;

    ${props => props.backColor && css`
        background-color: ${({theme}) => theme.colors.light};
    `}

    &:hover{
        box-shadow: 1px 1px 1px ${({theme}) => theme.colors.strong};
        cursor: pointer;
    }
`;

export default function CmButton({type, name, action, backColor}){
    return (
        <Button type={type} onClick={() => action()} backColor={backColor}>{name}</Button>
    );
}