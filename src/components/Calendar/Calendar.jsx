import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5

import styled, {css} from 'styled-components';
import { useEffect, useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dateState, todoState } from '../../lib/atom';

import { FullCalendarStyle } from './FullcalendarStyle'
import { useSession } from '../SessionProvider';
import { cmFetchPost, cmDateToString } from '../../api/common';
import { LoginModal } from '../LoginModal';
import { TodoDetailModal } from '../Todo/TodoDetailModal';
import sampleData from '../../data/sampleTodos.json'

const CalendarStyle = styled.div`
    height: 100%;
    width: 60%;
    padding: 30px;
`;

const style = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: 1000,
    }
    ,content: {
        textAlign: 'center'
        ,maxWidth: '40vw'
        ,minHeight: 'fit-content'
        ,maxHeight: 'fit-content'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
        ,fontFamily: 'pretendard'
        ,display: 'flex'
        ,flexDirection: 'column'
    }
}

const getSampleEvents = () => {

    return sampleData.allTodos.map(todo => {
        
        const offsetDate = new Date();
        offsetDate.setDate(offsetDate.getDate() + todo.offsetDays);
        
        return {
            title: todo.title,
            id: todo.id, 
            start: cmDateToString(offsetDate),
            backgroundColor: '#a2d2ff',
            fontSize: '12px',
            className: todo.completed ? 'cmpltTodos' : '',
            description: todo.content,
        }
    })
}

export default function Calendar () {
    const { session, fetchSession } = useSession();
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoContent, setNewTodoContent] = useState('');
    const [date, setDate] = useRecoilState(dateState);
    const [todoList, setTodoList] = useRecoilState(todoState);
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState([]);
    
    const isClose = () => {
        setIsOpen(false);
        setIsEdit(false);
    }
    
    const [isEdit, setIsEdit] = useState(false);
    const [calEvents, setCalEvents] = useState([]);

    useEffect(()=>{
        if(!session) {
            const sampleEvents = getSampleEvents();
            setCalEvents(sampleEvents);

            return;
        }

        const loadEvents = async () => {
            
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/fetchAllTodos';
            const fetchParams = {
                email: session
            }
            const data = await cmFetchPost(fetchUrl, fetchParams);

            if(!data) return;

            const events = data.reduce((acc, todo)=> {
                const startDate = `${todo.startAt[0]}-${String(todo.startAt[1]).padStart(2, '0')}-${todo.startAt[2]}`
                const event = {
                    title: todo.title,
                    id: todo.id, 
                    start: startDate,
                    backgroundColor: '#bee0f5',
                    fontSize: '12px',
                    className: todo.completed ? 'cmpltTodos' : '',
                    description: todo.content,
                };
                
                acc.push(event);
                return acc;
            }, [])

            setCalEvents(events);
        }
        
        loadEvents();

    }, [session, todoList])
    
    
    //날짜 상태관리
    const onClickDate = (date) => {
        console.log('onClickDate > date', date);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const fullDate = `${year}-${month}-${day}`;
        setDate(fullDate);
    }

    //캘린더 이벤트 클릭
    const onClickEvent = (data) => {
        setIsOpen(true);
        setShowDetailModal(true);

        const title = data.event._def.title;
        const content = data.event._def.extendedProps.description;
        const startDate = data.event.startStr;
        const id = data.event._def.publicId;

        setEvent([title, startDate, id, content]);
        setNewTodoTitle(title);
        setNewTodoContent(content);
    }  
    
    const [ showLoginModal, setShowLoginModal ] = useState(false);
    const [ showDetailModal, setShowDetailModal ] = useState(false);

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
                    eventClick={(info) => onClickEvent(info)}
                    selectable={true}
                    dayMaxEventRows={true}
                    views={{
                        dayMaxEventRows: 6
                    }}
                    eventOrder={'-className'}
                    eventOrderStrict={true}
                />
            </FullCalendarStyle>
            </CalendarStyle>
            
            {showLoginModal && <LoginModal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}/>}
            {showDetailModal && (
                <TodoDetailModal 
                    date={event[1]}
                    title={event[0]}
                    content={event[3]}
                    isOpen={showDetailModal}
                    onRequestClose={() => setShowDetailModal(false)}
                    id={Number(event[2])}
                />
            )}
            
        </>
    );
}