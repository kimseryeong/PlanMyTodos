import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5
import styled from 'styled-components';
import Modal from 'react-modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoCloseOutline } from "react-icons/io5";

import CmButton from '../Common/CmButton';
import { FullCalendarStyle } from './FullcalendarStyle'
import { dateState, todoState, userUuid } from '../../lib/atom';
import { useEffect, useState} from 'react';
import { supabase } from '../../lib/supabaseClient';

const CalendarStyle = styled.div`
    height: 100%;
    width: 60%;
    padding: 30px;
`;

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,maxWidth: '500px'
        ,height: '230px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
        ,fontFamily: 'pretendard'
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
    font-weight: 700;
    display: flex;
    flex-direction: column;
    height: 75%;
`;

const EventDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 60%;
    overflow-y: auto;
    padding: 5px 0;
    
    span{
        width: 100%;
        height: 100%;
    }

    &::-webkit-scrollbar{
        width: 8px;
        background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
        background: #A9CCE3;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb:hover{
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    display: flex;
    margin: auto auto 0 auto;
`;

const Input = styled.textarea`
    padding: 12px;
    width: 100%;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #ddd;

    &::-webkit-scrollbar{
        width: 8px;
        background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
        background: #A9CCE3;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb:hover{
        cursor: pointer;
    }
`;

export default function Calendar () {
    const uuid = useRecoilValue(userUuid);
    const [newTodo, setNewTodo] = useState('');
    const [date, setDate] = useRecoilState(dateState);
    const [error, setError] = useState(null);
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

            const events = data.map((todo) => {
                return {
                    title: `${todo.title}`,
                    id: `${todo.start_date}_${todo.idx}`, 
                    start: todo.start_date, 
                    backgroundColor: '#bee0f5',
                    fontSize: '12px'
                }
            })

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
        setIsOpen(true);

        const todo = data.event._def.title;
        const [date, idx] = data.event._def.publicId.split('_');

        setEvent([todo, date, idx]);
    }  
    
    //이벤트 삭제
    const onDelete = async () => {
        console.log('onDelete [todo, date, idx] > ', event);
        console.log(uuid, Number(event[2]));

        const { data, error } = await supabase
            .from('todolist')
            .delete()
            .eq('id', uuid)
            .eq('idx', Number(event[2]))
            .select('idx, title, start_date')

        if(error) console.log(error);

        isClose();
        setTodoList((prev) => prev.filter(t => t.idx !== Number(event[2])));
    }

    //이벤트 수정
    const onClickUpdate = () => {
        setIsEdit(true);

        onUpdate();
    }
    const onUpdate = async () => {

        if(isEdit){
            const { data, error } = await supabase
                .from('todolist')
                .update({ title: newTodo })
                .eq('id', uuid)
                .eq('idx', Number(event[2]))
                .select('idx, title, complete_state, start_date')
            
            if(error) console.log(error);
            
            setTodoList((prev) => prev.map(t => t.idx === data[0].idx ? data[0] : t));
            isClose();
        }
    }

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
                />
            </FullCalendarStyle>
            </CalendarStyle>
            <Modal
                isOpen={isOpen}
                onRequestClose={isClose}
                style={style}
            >
                <ModalHead>
                    <span>{event[1]}</span>
                    <IoCloseOutline className='icon' onClick={isClose} size='25'/>
                </ModalHead>
                <ModalBody>
                    {isEdit ? <Input onChange={(e) => setNewTodo(e.target.value)}>{event[0]}</Input> : <EventDetail><span>{event[0]}</span></EventDetail>}
                    <Buttons>
                        <CmButton name={'삭제'} action={onDelete} ></CmButton>
                        <CmButton name={'수정'} action={onClickUpdate} backColor={true}></CmButton>
                    </Buttons>
                </ModalBody>
            </Modal>
        </>
    );
}