import TodoItem from './TodoItem';
import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dateState, userState, todoState, todosRender, loadingState } from '../../lib/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserUuid } from '../../API';


const loadTodoList = async (uuid, date, setTodoList, setLoading, setError) => {

    setLoading(true);

    const {data, error} = await supabase.from('todolist')
        .select('idx, title, start_date, complete_state')
        .eq('id', uuid)
        .eq('start_date', date)
    
    if(error) {
        alert('[ TodoList > loadTodoList ] 문제가 발생했습니다.');
        setError('[ TodoList > loadTodoList ] 데이터 로드 중 문제가 발생했습니다.');
        console.log(error);
        return;
    }
    else{
        // console.log('[ TodoList > loadTodoList ]');
        // console.log(data);
        setTodoList(data); //recoil
    }
    
    setLoading(false);

}

function TodoList (){
    const uuid = useUserUuid();
    const date = useRecoilValue(dateState);
    const [todoList, setTodoList] = useRecoilState(todoState);
    const [error, setError] = useState(null);
    const setLoading = useSetRecoilState(loadingState);
    
    useEffect(()=>{
        if(!uuid) return;
        loadTodoList(uuid, date, setTodoList, setLoading, setError);
    }, [uuid, date])

    // const currTodos = useRecoilValue(todosRender);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {
                todoList && todoList.map((v, i) => <TodoItem key={i} 
                    title={v.title} 
                    idx={v.idx} 
                    done={v.complete_state} 
                    uuid={uuid}/>
                )
            }
        </>
    );
}

export default React.memo(TodoList);