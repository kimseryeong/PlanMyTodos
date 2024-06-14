import { dateState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';


//component style
const TodoHeadStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
        color: #7FB3D5;
        margin-right: auto;
    }
    span{
        color: #bababa;
        font-size: 12px;
    }
`;

export default function TodoHead() {
    const date = useRecoilValue(dateState);

    return (
        <TodoHeadStyle>
            <h2>{date}</h2>
            <span>완료된 할 일은 캘린더에 추가됩니다.</span>
        </TodoHeadStyle>
    );
}