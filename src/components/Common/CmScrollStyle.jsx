import { css } from "styled-components";

export const CmScrollStyle = css`
    &::-webkit-scrollbar{
        width: 8px;
        background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
        background: #A9CCE3;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb:hover{
        cursor: pointer;
    }
`;