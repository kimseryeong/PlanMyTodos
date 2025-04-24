import TodoItem from './TodoItem';
import React, { useEffect, useState } from 'react';

import { CmScrollStyle } from '../Common/CmScrollStyle';
import { supabase } from '../../lib/supabaseClient';
import { dateState, todoState, loadingState } from '../../lib/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useSession } from '../SessionProvider';

const TodoListStyle = styled.div`
    overflow-y: auto;

    ${CmScrollStyle}
`;

const loadTodoList = async (uuid, date, setTodoList, setLoading, setError) => {

    setLoading(true);

    const {data, error} = await supabase.from('todolist')
        .select('idx, title, content, start_date, complete_state')
        .eq('id', uuid)
        .eq('start_date', date)
        .order('complete_state', { decending: false })
    
    if(error) {
        alert('[ TodoList > loadTodoList ] 문제가 발생했습니다.');
        setError('[ TodoList > loadTodoList ] 데이터 로드 중 문제가 발생했습니다.');
        console.log(error);
        return;
    }
    
    console.log('loadTodoList > ', data);
    setTodoList(data);
    
    setLoading(false);
    

}

function TodoList (){
    const { session, fetchSession } = useSession();
    const uuid = session ? session.id : null;
    const date = useRecoilValue(dateState);
    const [todoList, setTodoList] = useRecoilState(todoState);
    const [error, setError] = useState(null);
    const setLoading = useSetRecoilState(loadingState);
    
    useEffect(()=>{
        if(!uuid) return;
        loadTodoList(uuid, date, setTodoList, setLoading, setError);
    }, [uuid, date])

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <TodoListStyle>

            { uuid && todoList && todoList.map((v, i) => <TodoItem key={i} 
                    title={v.title} 
                    content = {v.content}
                    idx={v.idx} 
                    done={v.complete_state} 
                    uuid={uuid}/>
                )
                
            }
        </TodoListStyle>
    );
}

export default React.memo(TodoList);