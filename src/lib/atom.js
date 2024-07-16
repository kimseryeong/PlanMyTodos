import { atom, selector } from 'recoil';
import { supabase } from './supabaseClient';

//사용자 상태관리
export const userState = atom({
    key: 'userState'
    ,default: null
})


// export const todosRender = selector({
//     key: 'todosRender',
//     get: ({get}) => {
//         const uuid = get(userState);
//         if(!uuid) return;

//         const currTodos = get(todoState);
//         return currTodos;
//     }
// }) 


export const userUuid = selector({
    key: 'userUuid',
    get: ({get}) => {
        const session = get(userState);
        return session ? session.user.id : null
    }
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

//모든 날짜 todolist 상태관리
export const allTodosState = atom({
    key: 'fetchAllTodos',
    default: []
})

//에러 상태관리
export const errorState = atom({
    key: 'errorState',
    default: null
})

export const loadingState = atom({
    key: 'loadingState',
    default: false
})
