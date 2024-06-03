import { atom } from 'recoil';

const globalState = atom({
    key: 'userState'
    ,default: null
})

const dateState = atom({
    key: 'clickDateState'
    ,default: null
})

export { globalState, dateState };