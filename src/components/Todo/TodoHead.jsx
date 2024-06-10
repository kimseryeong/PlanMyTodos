import { dateState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';


//component style
const TodoHeadStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        color: #7FB3D5;
        margin-right: auto;
}
`;
const LeftTasksStyle = styled.div`
    color: #b1b1b1;
    font-size: 16px;
`;

export default function TodoHead() {
    const date = useRecoilValue(dateState);

    return (
        <TodoHeadStyle>
            <h1>{date}</h1>
            <LeftTasksStyle>{}개의 할 일 남음 !</LeftTasksStyle>

        </TodoHeadStyle>
    );
}