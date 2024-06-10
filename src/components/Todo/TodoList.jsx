import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { globalUuid, dateState } from '../../lib/atom';
import { supabase } from '../../lib/supabaseClient';

import TodoItem from './TodoItem';

const TodoListStyle = styled.div`
    padding: 0 20px;
`;

//todolist load

const loadTodoList = async (uuid, date, setDataList, setError) => {
    if(!uuid){
        setError('로그인 후 이용 가능합니다.');
        return;
    }

    const {data, error} = await supabase.from('todolist')
        .select('idx, title, start_date, complete_state')
        .eq('id', uuid)
        .eq('start_date', date)

    if(error){
        alert('문제가 발생했습니다. 다시 시도하세요.');
        setError('데이터 로드 중 문제가 발생했습니다.');
        return;
    }
    else{
        setDataList(data);
    }
}

export default function TodoList () {
    const userId = useRecoilValue(globalUuid);
    const date = useRecoilValue(dateState);  
    const [dataList, setDataList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        loadTodoList(userId, date, setDataList, setError);
    }, [userId, date, dataList]);

    if(error){
        // return <div>{error}</div>;
        // console.log(error);
    }

    

    return (
        <TodoListStyle>
            {
                dataList.length > 0
                ? dataList.map((v, i) => <TodoItem idx={v.idx} title={v.title} done={v.complete_state} />)
                : <div>할 일이 없습니다.</div>
            }
        </TodoListStyle>
    );
}