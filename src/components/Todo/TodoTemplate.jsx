import styled from 'styled-components';
import TodoBody from './TodoBody';
import TodoHead from './TodoHead';

const TodoTemplateStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 40%;
    //font-family: 'pretendard';
    font-weight: 600;
    padding-left: 30px;
    margin: 80px 0 30px;
`;

export default function TodoTemplate () {
    return (
        <TodoTemplateStyle>
            <TodoHead />
            <TodoBody/>
        </TodoTemplateStyle>
    );
}