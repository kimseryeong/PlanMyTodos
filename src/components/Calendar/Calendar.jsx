import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5
import styled, {css} from 'styled-components';
import Modal from 'react-modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoCloseOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { CmScrollStyle } from '../Common/CmScrollStyle';
import CmButton from '../Common/CmButton';
import { FullCalendarStyle } from './FullcalendarStyle'
import { dateState, todoState } from '../../lib/atom';
import { useEffect, useState} from 'react';
import { useSession } from '../SessionProvider';
import { cmFetchPost } from '../../api/common';

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

const ModalHead = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .icon{
        margin-left: auto; 
        cursor: pointer;
    }
`;
const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Wrap = styled.div`
    display:flex;
    width: 100%;
    align-items: start;
    justify-content: center;
    margin: 5px 0;

    div{
        width: 50px;
        font-size: 14px;
        font-weight: 500;
    }
`;

const Input = styled.input`
    height: 40px;
    width: 100%;
    padding: 8px;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
    padding: 8px;
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    height: 100px;

    ${CmScrollStyle}
`;

const EventDetail = styled.div`
    margin: 20px 0;
    flex: 1 1 auto;

    ${CmScrollStyle}
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
`;
const Content = styled.div`
    font-size: 14px;

    pre{
        font-family: 'pretendard';
        font-size: 13.5px;
        white-space: pre-wrap;
    }
`;

const Buttons = styled.div`
    display: flex;
    margin: auto auto 0 auto;
`;

const IconBlock = styled.div`
    margin: 5px;
    &:hover{
        cursor: pointer;
    }

    ${props => props.type === 'update' && css`
        &:hover{color: #7FB3D5;}
    `}

    ${props => props.type === 'delete' && css`
        &:hover{color: #ff6b6b;}
    `}
`;

export default function Calendar () {
    const { session, fetchSession } = useSession();
    const userEmail = session ? session.email : null;
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
        if(!userEmail) {
            setCalEvents([]);
            return;
        }

        const loadEvents = async () => {
            
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/fetchAllTodos';
            const fetchParams = {
                email: userEmail
            }
            const data = await cmFetchPost(fetchUrl, fetchParams);

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

    }, [userEmail, todoList])
    
    
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

        console.log('event > ', data.event);

        const title = data.event._def.title;
        const content = data.event._def.extendedProps.description;
        const startDate = data.event.startStr;
        const id = data.event._def.publicId;

        setEvent([title, startDate, id, content]);
        setNewTodoTitle(title);
        setNewTodoContent(content);
    }  
    
    //이벤트 삭제
    const onDelete = async () => {
        

        console.log('onDelete [title, startAt, id, content] > ', event);
        
        console.log(userEmail);

        const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/deleteTodo';
        const fetchParams = {
            id: Number(event[2]),
            email: userEmail,
        }

        const data = await cmFetchPost(fetchUrl, fetchParams);
        setTodoList(data);
        
        isClose();
    }

    //이벤트 수정
    const onClickUpdate = () => {
        setIsEdit(true);

        onUpdate();
    }
    const onUpdate = async () => {

        if(isEdit){
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/updateTodo';
            const fetchParams = {
                id: Number(event[2]),
                email: userEmail,
                title: newTodoTitle,
                content: newTodoContent,
                
            }
    
            const data = await cmFetchPost(fetchUrl, fetchParams);
    
            setTodoList((prev) => prev.map(t => t.id === data.id ? data : t));
            
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
                    eventOrder={'-className'}
                    eventOrderStrict={true}
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
                    {
                    isEdit ? 
                    <>
                        <EventDetail>
                            <Wrap>
                                <div>제목</div>
                                <Input 
                                    autoFocus 
                                    onChange={(e) => setNewTodoTitle(e.target.value)}
                                    defaultValue={event[0]}
                                />
                            </Wrap>
                            <Wrap>
                                <div>내용</div>
                                <Textarea 
                                    onChange={(e) => setNewTodoContent(e.target.value)} 
                                    defaultValue={event[3]}
                                />
                            </Wrap>
                        </EventDetail>
                        <Buttons>
                            <CmButton name={'취소'} action={isClose}></CmButton>
                            <CmButton name={'저장'} action={onClickUpdate} backColor={true}></CmButton>
                        </Buttons>
                    </>
                    :
                    <>
                        <EventDetail>
                            <Title>{event[0]}</Title>
                            <Content><pre>{event[3]}</pre></Content>
                        </EventDetail>
                        <Buttons>
                            <IconBlock type={'delete'}><MdDelete onClick={onDelete} size={'20'}/></IconBlock>
                            <IconBlock type={'update'}><AiFillEdit onClick={onClickUpdate} size={'20'}/></IconBlock>
                        </Buttons>
                    </>
                    }
                </ModalBody>
            </Modal>
        </>
    );
}