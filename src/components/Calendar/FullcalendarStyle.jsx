import styled from 'styled-components';

export const FullCalendarStyle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    
    .fc {
        width: 100%;
        font-size: 13px;
        font-family: 'pretendard';
        font-weight: 500;
    }


    //date text css
    .fc .fc-toolbar-title {
        font-family: 'pretendard';
        font-weight: 700;
    }

    
    //button css ------------------------------
    .btn-primary,
    .btn-primary.disabled, 
    .btn-primary:disabled {
        background-color: #fff;
        border: none;
        color: black;
        font-weight: 600;
    }
    
    .btn-primary:hover{
        background-color: #EAF2F8;
    }
    .fc-prev-button,
    .fc-next-button{
        width: 40px;
        border-radius: 50%
    }
    .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
        margin-left: 5px;
    }
    //button css ------------------------------
    
    .fc-daygrid-block-event {    
        border: none;
    }
    .fc-event-main {
        font-size: 12px;
        color: black;
    }
    .fc-event-title{
        color: black;
    }

    //클릭한 날짜 배경색
    .fc-highlight {
        background: #EAF2F8 !important;
    }

    //today 배경
    .fc .fc-daygrid-day.fc-day-today{
        
        background-color: #fff;
    }

    //today 글씨
    .fc-day-today > * > .fc-daygrid-day-top a{
        background-color: #EAF2F8;
        border: 1px solid #A9CCE3;
        border-radius: 40px;
        font-weight: 800;
        padding: 2px;
        margin: 0;
        text-align: center;
        width: 25px;
    }

    //캘린더 이벤트 팝업 스타일
    .fc .fc-popover-header{
        border-bottom-color: #fff;
        background-color: #fff;
        font-family: pretendard;
        font-weight: 700;
    }

    .fc .fc-more-popover .fc-popover-body{
        font-family: pretendard;
        font-weight: 700;
    }


    .cmpltTodos > div > div > div > .fc-event-title{
        text-decoration-line: line-through;
        color: #757575;
    }
`;