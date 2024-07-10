import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { dateState, userState, todoState, allTodosState, calendarEvents } from '../../lib/atom';
import { FullCalendarStyle } from './FullcalendarStyle'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5
import { useEffect, useState} from 'react';
import styled from 'styled-components';
import { fetchAllTodos, useUserUuid } from '../../API';

const CalendarStyle = styled.div`
    height: 100%;
    width: 60%;
    padding: 30px;
`;

export default function Calendar () {
    const uuid = useUserUuid();
    const [date, setDate] = useRecoilState(dateState);
    const [error, setError] = useState(null);
    const [todoList, setTodoList] = useRecoilState(todoState);
    const [allTodos, setAllTodos] = useRecoilState(allTodosState);
    const calEvents = useRecoilValue(calendarEvents);
    
    useEffect(()=>{
        const loadAllTodos = async () => {
            const fetchedTodos = await fetchAllTodos(uuid);
            setAllTodos(fetchedTodos);
            console.log(fetchedTodos);
        }

        loadAllTodos();
    }, [uuid, setAllTodos])

    
    
    
    //날짜 상태관리
    const onClickDate = (date) => {
        // console.log('onClickDate')
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const fullDate = `${year}-${month}-${day}`;
        setDate(fullDate);

        console.log(this);
    }

        
    
    return (
        <CalendarStyle>
        <FullCalendarStyle>
            <FullCalendar 
                plugins={[dayGridPlugin, interaction, bootstrap5Plugin ]}
                initialView='dayGridMonth'
                events={calEvents}
                viewHeight={300}
                themeSystem='bootstrap5'
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'prev today next'
                }}
                dateClick={(arg) => onClickDate(arg.date)}
                eventClick={(info) => console.log('이벤트클릭',info.event._def)} //이벤트 클릭
                selectable={true}
            />
        </FullCalendarStyle>
        </CalendarStyle>
    );
}