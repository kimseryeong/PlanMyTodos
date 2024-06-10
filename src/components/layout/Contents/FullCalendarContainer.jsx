import styled from 'styled-components';

const FullCalendarContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .fc {
        width: 100%;
    }

    .fc-dayGridMonth-view.fc-view.fc-daygrid{
        border-left: 1px solid #ddd;
    }
    .fc-theme-bootstrap5,
    .fc-theme-bootstrap5,
    .fc-scrollgrid{
        border: none;
    }
    //toolbar
    .fc .fc-toolbar.fc-header-toolbar {
        margin: 0;
        padding: 0 40px;
        background-color: #A9CCE3;
        height: 63px;
        font-weight: 600;
        font-size: 14px;
        line-height: 29px;
        color: white;
        border-radius: 20px 20px 0px 0px;
    }

    //toolbar 버튼
    .btn-primary,
    .btn-primary.disabled, 
    .btn-primary:disabled {
        background-color: #EAF2F8;
        border: none;
        color: black;
        font-weight: 600;
    }
    .btn-primary:hover{
        background-color: #73a7ce;
        color: #fff;
    }
    .fc-prev-button,
    .fc-next-button{
        width: 40px;
        border-radius: 60%;
    }
    .fc-today-button{
        border-radius: 20px;
    }

    //요일 헤더
    .fc-scrollgrid th{
        border:none;
        height: 30px;
        padding-top: 3.5px;
        background: #A9CCE3;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #fff;
    }

    //오늘 날짜
    .fc .fc-daygrid-day.fc-day-today {
        background-color: #FEF9E7;
        color: #2980B9;
        font-size: 14px;
    }
    .fc-daygrid-event-dot {
        border: calc(var(--fc-daygrid-event-dot-width) / 2) solid #2980B9;
    }    

    //날짜별 그리드
    .fc .fc-daygrid-day-frame {
        padding: 2px;
        // border: 1px solid #efefef;
    }

    //요일 정렬
    .fc .fc-daygrid-day-top {
        flex-direction: row;
        margin-bottom: 3px;
    }
    
    //일요일, 토요일 색상 변경
    .fc-day-sun a{
        color: #E74C3C;
    }
    .fc-day-sat a{
        color: #2980B9;
    }

    // 각 이벤트 요소
    .fc-event {
        cursor: pointer;
        padding: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 12px;
    }
    
    // 각 이벤트 블럭 요소
    .fc-daygrid-block-event {    
        // background-color: #A9CCE3;
        border: none;
    }
    .fc-event-main {
        font-size: 14px;
        color: #154360;
    }
    
    
    

`;

export { FullCalendarContainer }