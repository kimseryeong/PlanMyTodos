import './Contents.css';
import Calendar from './Calendar';
import TodoTemplate from '../../Todo/TodoTemplate';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState, allTodosState } from '../../../lib/atom';
import { fetchAllTodos } from '../../../API';
import { useEffect } from 'react';



export default function Contents () {

    const setAllTodos = useSetRecoilState(allTodosState);
    const userInfo = useRecoilValue(userState);
    const uuid = userInfo ? userInfo.user.id : null;
    

    useEffect(()=>{
        const loadAllTodos = async () => {
            const fetchedTodos = await fetchAllTodos(uuid);
            setAllTodos(fetchedTodos);
            console.log('fetchedTodos');
            console.log(fetchedTodos);
        }

        loadAllTodos();
    }, [uuid, setAllTodos])


    return (
        <main className='contents'>
            <div className='left'>
                <TodoTemplate uuid={uuid}/>
            </div>
            <div className='right'>
                <Calendar />
            </div>
        </main>
    );
}




