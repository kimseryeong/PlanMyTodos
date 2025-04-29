import styled, { css } from "styled-components";

const Button = styled.button`
    width: 80px;
    height: 35px;
    font-size: 16px;
    background-color: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    margin: 5px;

    ${props => props.backColor && css`
        background-color: #EAF2F8;
    `}

    &:hover{
        box-shadow: 1px 1px 1px #ddd;
        cursor: pointer;
    }
`;

export default function CmButton({name, action, backColor}){
    return (
        <Button type="button" onClick={() => action()} backColor={backColor}>{name}</Button>
    );
}