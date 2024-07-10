import styled from 'styled-components';
import TodoBody from './TodoBody';
import TodoHead from './TodoHead';

const TodoTemplateStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
    padding: 30px 40px;
`;

export default function TodoTemplate () {
    return (
        <TodoTemplateStyle>
            <TodoHead />
            <TodoBody/>
        </TodoTemplateStyle>
    );
}