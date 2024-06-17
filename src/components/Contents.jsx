import './Contents.css';
import Calendar from './Calendar/Calendar';
import TodoTemplate from './Todo/TodoTemplate';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState, allTodosState } from '../lib/atom';
import { fetchAllTodos } from '../API';
import { useEffect } from 'react';
import styled from 'styled-components';

const ContentsStyle = styled.div`
    height: 100vh;
    display: flex;
    padding-top: 60px;
`;

export default function Contents () {

    
    const userInfo = useRecoilValue(userState);
    const uuid = userInfo ? userInfo.user.id : null;
    
    // const setAllTodos = useSetRecoilState(allTodosState);
    // useEffect(()=>{
    //     const loadAllTodos = async () => {
    //         const fetchedTodos = await fetchAllTodos(uuid);
    //         setAllTodos(fetchedTodos);
    //     }

    //     loadAllTodos();
    // }, [uuid, setAllTodos])


    return (
        <ContentsStyle>
            <Calendar/>
            <TodoTemplate/>
        </ContentsStyle>
    );
}




