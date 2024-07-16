import styled from "styled-components";

const Error = styled.span`
    color: red;
    padding-left: 10px;
    text-align: left;
    font-size: 12px;
    padding-left: 33px;
`;

export default function CmErrorMsg({msg}){
    return (
        <Error>{msg}</Error>
    );
}