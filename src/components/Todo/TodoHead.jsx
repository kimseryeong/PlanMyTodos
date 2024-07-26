import { dateState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';


//component style
const TodoHeadStyle = styled.span`
    margin: 0;
    margin-right: auto;
    font-size: 20px;
    box-shadow: inset 0 -11px #bee1f7;
`;

export default function TodoHead() {
    const date = useRecoilValue(dateState);

    return (
        <TodoHeadStyle>{date}</TodoHeadStyle>
    );
}