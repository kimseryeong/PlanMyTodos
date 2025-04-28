import { atom, selector } from 'recoil';

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
