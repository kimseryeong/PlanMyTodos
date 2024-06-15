import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Loading from '../../Loading';
import { dateState, userState, todoState, todosRender, loadingState } from '../../lib/atom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const TodoBodyStyle = styled.div`
    flex: 1;
    padding: 20px;
    padding-bottom: 48px;
    overflow-y: auto;
    // border: 1px solid #7FB3D5;
`;

export default function TodoBody({uuid}){
    
    const loading = useRecoilValue(loadingState);
    const date = useRecoilValue(dateState);

    return (
        <TodoBodyStyle>
            <TodoList uuid={uuid} date={date}/>
            <TodoCreate uuid={uuid} date={date}/>
            { loading && (
                <Loading loading={loading}/>
            )}
        </TodoBodyStyle>

    );
}