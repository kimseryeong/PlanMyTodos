import TodoItem from './TodoItem';
import React, { useEffect, useState } from 'react';
import { CmScrollStyle } from '../Common/CmScrollStyle';
import { dateState, todoState, loadingState } from '../../lib/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useSession } from '../SessionProvider';
import { toast, Toaster } from 'react-hot-toast';
import { cmDateToString } from '../../api/common';
import sampleData from '../../data/sampleTodos.json'

const TodoListStyle = styled.div`
    overflow-y: auto;

    ${CmScrollStyle}
`;


const loadTodoList = async (userEmail, date, setTodoList, setLoading, setError) => {

    setLoading(true);

    try{
        const fetchUrl = 'http://localhost:8080/todo/fetchTodosByDate';//`https://planmytodos-api-production.up.railway.app/todo/fetchTodosByDate`;
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

    }
    catch(error){
        toast.error('failed load todolist');
        console.error('loadTodoList error > ', error);
    }

    setLoading(false);
}

const getSampleTodos = (date) => {

    return sampleData.allTodos.filter(todo => {
        const today = new Date();
        today.setDate(today.getDate() + todo.offsetDays);

        return date == cmDateToString(today);
    })
    
}

function TodoList (){
    const { session, fetchSession } = useSession();
    const date = useRecoilValue(dateState);

    const [todoList, setTodoList] = useRecoilState(todoState);
    const [error, setError] = useState(null);
    const setLoading = useSetRecoilState(loadingState);

    useEffect(()=>{
        if(!session){
            const sampleTodos = getSampleTodos(date);
            setTodoList(sampleTodos);

            return;
        }

        loadTodoList(session, date, setTodoList, setLoading, setError);
    }, [session, date])

    return (
        <TodoListStyle>
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            { todoList && todoList.map((v, i) => <TodoItem key={i} 
                    id={v.id}
                    title={v.title} 
                    content = {v.content}
                    done={v.completed} 
                    startAt={v.startAt}
                    endAt={v.endAt}
                    email={session}
                    />
                )
            }
        </TodoListStyle>
    );
}

export default React.memo(TodoList);