import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dateState, userState, todoState, todosRender } from '../../lib/atom';
import { useRecoilState, useRecoilValue } from 'recoil';


const loadTodoList = async (uuid, date, setTodoList, setError) => {

    const {data, error} = await supabase.from('todolist')
        .select('*')
        .eq('id', uuid)
        .eq('start_date', date)
    
    if(error) {
        alert('[ TodoList > loadTodoList ] 문제가 발생했습니다.');
        setError('[ TodoList > loadTodoList ] 데이터 로드 중 문제가 발생했습니다.');
        console.log(error);
        return;
    }
    else{
        // console.log('[ TodoList > loadTodoList ] 조회성공 >> ');
        setTodoList(data); //recoil
    }

}

export default function TodoList (){
    const userInfo = useRecoilValue(userState);
    const uuid = userInfo ? userInfo.user.id : null;
    const date = useRecoilValue(dateState);
    const [todoList, setTodoList] = useRecoilState(todoState)
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        if(!userInfo) return;
        loadTodoList(uuid, date, setDataList, setTodoList, setError);
    }, [uuid, date])
    
    const currTodos = useRecoilValue(todosRender);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {
                currTodos && currTodos.map((v, i) => <TodoItem key={i} title={v.title} idx={v.idx} done={v.complete_state}/>)
            }
        </>
    );
}