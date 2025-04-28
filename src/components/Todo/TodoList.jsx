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


const loadTodoList = async (userEmail, date, setTodoList, setLoading, setError) => {

    setLoading(true);
    const fetchUrl = `https://planmytodos-api-production.up.railway.app/todo/fetchTodosByDate`;
    const fetchParams = {
        email: userEmail,
        currentAt: date,
    }

    await fetch(fetchUrl, {
        method: 'POST'
        ,credentials: 'include'
        , headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        ,body: JSON.stringify(fetchParams)
    })
    .then(res => res.json())
    .then(data => {   
        console.log('fetchTodosByDate res > ', data);
        setTodoList(data);
    })


    setLoading(false);



    // setLoading(true);

    // const {data, error} = await supabase.from('todolist')
    //     .select('idx, title, content, start_date, complete_state')
    //     .eq('id', uuid)
    //     .eq('start_date', date)
    //     .order('complete_state', { decending: false })
    
    // if(error) {
    //     alert('[ TodoList > loadTodoList ] 문제가 발생했습니다.');
    //     setError('[ TodoList > loadTodoList ] 데이터 로드 중 문제가 발생했습니다.');
    //     console.log(error);
    //     return;
    // }
    
    //console.log('loadTodoList > ', data);
    //setTodoList(data);
    
    
    

}

const fetchTodoList = async (userEmail, date, setTodoList) => {
    const fetchUrl = `https://planmytodos-api-production.up.railway.app/todo/fetchTodosByDate`;
    const fetchParams = {
        email: userEmail,
        currentAt: date,
    }

    await fetch(fetchUrl, {
        method: 'POST'
        ,credentials: 'include'
        , headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        ,body: JSON.stringify(fetchParams)
    })
    .then(res => res.json())
    .then(data => {   
        console.log('fetchTodosByDate res > ', data);
        setTodoList(data);
    })
}


function TodoList (){
    const { session, fetchSession } = useSession();
    const userEmail = session ? session.email : null;
    const date = useRecoilValue(dateState);

    
    const [todoList, setTodoList] = useState(null);
    
    useEffect(() => {
        console.log('TodoList userEmail, date: ', userEmail, date);
        fetchTodoList(userEmail, date, setTodoList);

        console.log(todoList);
    }, [userEmail, date])


    //useRecoilState(todoState);
    //const [error, setError] = useState(null);
    const setLoading = useSetRecoilState(loadingState);
    
    // useEffect(()=>{
    //     if(!userEmail) return;

    //     loadTodoList(userEmail, date, setTodoList, setLoading, setError);
    // }, [userEmail, date])

    return (
        <TodoListStyle>

            { userEmail && todoList && todoList.map((v, i) => <TodoItem key={i} 
                    title={v.title} 
                    content = {v.content}
                    done={v.completed} 
                    email={userEmail}
                    id={v.id}
                    />
                )
            }
        </TodoListStyle>
    );
}

export default React.memo(TodoList);