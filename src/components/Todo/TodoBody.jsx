import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Loading from '../../Loading';
import { dateState, userState, todoState, todosRender, loadingState } from '../../lib/atom';
import { useUserUuid } from '../../API';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const TodoBodyStyle = styled.div`
    flex: 1;
    padding: 20px;
    padding-bottom: 48px;
    overflow-y: auto;
    // border: 1px solid #7FB3D5;
`;

export default function TodoBody(){
    
    const loading = useRecoilValue(loadingState);

    return (
        <TodoBodyStyle>
            <TodoList />
            <TodoCreate />
            { loading && (
                <Loading loading={loading}/>
            )}
        </TodoBodyStyle>

    );
}