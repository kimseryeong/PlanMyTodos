import { dateState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const TodoHeadStyle = styled.span`
    margin: 0;
    margin-right: auto;
    font-size: 20px;
    line-height: normal;
    box-shadow: inset 0 -11px ${({theme}) => theme.colors.primary};

`;

export default function TodoHead() {
    const date = useRecoilValue(dateState);

    return (
        <TodoHeadStyle>{date}</TodoHeadStyle>
    );
}