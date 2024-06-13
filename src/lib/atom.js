import { atom, selector } from 'recoil';

//사용자 상태관리
export const userState = atom({
    key: 'userState'
    ,default: null
})

//날짜 상태관리
export const dateState = atom({
    key: 'dateState'
    ,default: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`
})

//todolist 상태관리
export const todoState = atom({
    key: 'todoState',
    default: []
})
export const todosRender = selector({
    key: 'todosRender',
    get: ({get}) => {
        const uuid = get(userState);
        if(!uuid) return;

        const currTodos = get(todoState);
        return currTodos;
    }
}) 

//캘린더 이벤트
export const calendarEvents = selector({
    key: 'calendarEvents',
    get: ({get}) => {
        const userInfo = get(userState);
        if(!userInfo) return;

        const data = get(todoState);
        const events = data
            .filter((v) => v.complete_state === true)
            .map((v) => {
                return {
                    title: `📌${v.title}`,
                    id: `todo_${v.idx}`, 
                    start: v.start_date, 
                    backgroundColor: 'transparent',
                    fontSize: '12px'
                }
            });
        return events;
    }
})

//에러 상태관리
export const errorState = atom({
    key: 'errorState',
    default: null
})