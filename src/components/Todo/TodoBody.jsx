import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Loading from '../../Loading';
import { loadingState } from '../../lib/atom';
import { useRecoilValue } from 'recoil';

const TodoBodyStyle = styled.div`
    flex: 1;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 90%;

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