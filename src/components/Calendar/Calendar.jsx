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
import { supabase } from '../../lib/supabaseClient';
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";

const CalendarStyle = styled.div`
    height: 100%;
    width: 60%;
    padding: 30px;
`;

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '500px'
        ,height: '150px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
    }
}

const ModalHead = styled.div`
    display: flex;
    align-items: center;
    .icon{
        margin-left: auto; 
        cursor: pointer;
    }
`;
const ModalBody = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
`;

export default function Calendar () {
    const uuid = useUserUuid();
    const [date, setDate] = useRecoilState(dateState);
    const [error, setError] = useState(null);
    const todoList = useRecoilValue(todoState);
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState(null);

    const [calEvents, setCalEvents] = useState([]);
    useEffect(()=>{
        // console.log(uuid);
        if(!uuid) {
            setCalEvents([]);
            return;
        }

        const loadEvents = async () => {
            const {data, error} = await supabase.from('todolist')
                .select('idx, title, complete_state, start_date')
                .eq('id', uuid)
                .eq('complete_state', true)

            if(error) setError('캘린더 이벤트 로드 중 에러 발생');

            // console.log('loadEvents > ', data);
            const events = data.map((todo) => {
                return {
                    title: `📌${todo.title}`,
                    id: `todo_${todo.idx}`, 
                    start: todo.start_date, 
                    backgroundColor: '#EAF2F8',
                    fontSize: '12px'
                }
            })

            // console.log('events > ', events);
            setCalEvents(events);
        }
        loadEvents();

    }, [uuid, todoList])
    
    
    //날짜 상태관리
    const onClickDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const fullDate = `${year}-${month}-${day}`;
        setDate(fullDate);
    }

    //캘린더 이벤트 클릭
    const onClickEvent = (data) => {
        // console.log('이벤트클릭',data.event._def);
        setIsOpen(true);

        const todo = data.event._def.title;
        // console.log(todo);

        setEvent(todo);
    }
    
    const isClose = () => setIsOpen(false);

    return (
        <>
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
                    eventClick={(info) => onClickEvent(info)} //이벤트 클릭
                    selectable={true}
                    dayMaxEventRows={true}
                    views={{
                        dayMaxEventRows: 6
                    }}
                />
            </FullCalendarStyle>
            </CalendarStyle>
            <Modal
                isOpen={isOpen}
                onRequestClose={isClose}
                style={style}
            >
                <ModalHead onClick={isClose} >
                    <IoCloseOutline className='icon'/>
                </ModalHead>
                <ModalBody>
                    {event}
                </ModalBody>
            </Modal>
        </>
    );
}