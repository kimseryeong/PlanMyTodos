import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useRecoilState } from 'recoil';

import { dateState } from '../../../lib/atom';
import { FullCalendarContainer } from './FullCalendarContainer'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  //boot5

const events = [
    {title: 'event1', start: new Date()},
    {
        id:'event2',
        title: 'event2',
        start: '2024-06-02', 
        end: '2024-06-04', 
        backgroundColor: '#A9CCE3', 

    },
    {title: 'event10', start: '2024-06-02', end: '2024-06-07', backgroundColor: '#A9CCE3'},
    {title: 'event3', start: '2024-06-07', backgroundColor: '#A9CCE3'},
]

export default function Calendar () {
    
    const renderTodo = (date) => {
        console.log(`날짜에 맞는 todo 렌더링하기`, date);
    
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const click = `${month}.${day}`;
    
        setClickDate(click);
    }
    const [clickDate, setClickDate] = useRecoilState(dateState);

    return (
        <>
            <FullCalendarContainer>
                <FullCalendar 
                    plugins={[dayGridPlugin, interaction, bootstrap5Plugin ]}
                    initialView='dayGridMonth'
                    events={events}
                    viewHeight={300}
                    themeSystem='bootstrap5'
                    headerToolbar={{
                        start: 'title',
                        center: '',
                        end: 'prev today next'
                    }}
                    // navLinks={true}
                    // navLinkDayClick={(date, e)=>{ //date 클릭
                    //     console.log(date); 
                    //     console.log(date.toISOString()); 
                    //     console.log(e.pageX, e.pageY)
                    //     console.log(e.srcElement.classList);
                    //     console.log(this);
                    // }}
                    dateClick={(arg) => renderTodo(arg.date)}
                    eventClick={(info) => console.log('클릭',info.event._def)} //이벤트 클릭
                />
                
            </FullCalendarContainer>
        </>
    );
}