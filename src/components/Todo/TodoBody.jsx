import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

const TodoBodyStyle = styled.div`
    flex: 1;
    padding: 20px;
    padding-bottom: 48px;
    overflow-y: auto;
    border: 1px solid #7FB3D5;
`;

export default function TodoBody(){
    return (
        <TodoBodyStyle>
            <TodoList />
            <TodoCreate />
        </TodoBodyStyle>

    );
}