import { dateState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';


//component style
const TodoHeadStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        background-color: #EAF2F8;
        border: 1px solid #7FB3D5;
        border-radius: 20px;
        margin: 0;
        margin-right: auto;
        padding: 2px 20px;
        font-size: 20px;
    }
    span{
        color: #bababa;
        font-size: 15px;
    }
`;

export default function TodoHead() {
    const date = useRecoilValue(dateState);

    return (
        <TodoHeadStyle>
            <p>{date}</p>
            <span>완료된 할 일은 캘린더에 추가됩니다.</span>
        </TodoHeadStyle>
    );
}