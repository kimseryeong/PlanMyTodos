import TodoItem from './TodoItem';
import React, { useEffect, useState } from 'react';
import { CmScrollStyle } from '../Common/CmScrollStyle';
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

    const res = await fetch(fetchUrl, {
        method: 'POST'
        ,credentials: 'include'
        , headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        ,body: JSON.stringify(fetchParams)
    })

    if(!res.ok){
        console.error('fetchTodosListByDate error !! ');
        return;
    }

    const data = await res.json();
    setTodoList(data);

    setLoading(false);
}



function TodoList (){
    const { session, fetchSession } = useSession();
    const userEmail = session ? session.email : null;
    const date = useRecoilValue(dateState);

    const [todoList, setTodoList] = useRecoilState(todoState);
    const [error, setError] = useState(null);
    const setLoading = useSetRecoilState(loadingState);

    useEffect(()=>{
         if(!userEmail) return;

         loadTodoList(userEmail, date, setTodoList, setLoading, setError);
    }, [userEmail, date])

    return (
        <TodoListStyle>

            { userEmail && todoList && todoList.map((v, i) => <TodoItem key={i} 
                    id={v.id}
                    title={v.title} 
                    content = {v.content}
                    done={v.completed} 
                    startAt={v.startAt}
                    endAt={v.endAt}
                    email={userEmail}
                    />
                )
            }
        </TodoListStyle>
    );
}

export default React.memo(TodoList);