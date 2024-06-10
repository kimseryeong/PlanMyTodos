import { atom } from 'recoil';

const globalState = atom({
    key: 'userEmail'
    ,default: null
})

const globalUuid = atom({
    key: 'userUuid'
    ,default: null
})

const dateState = atom({
    key: 'dateState'
    ,default: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`
})

const calDate = atom({
    key: 'calDate'
    ,default: null
})

export { globalState, globalUuid, dateState, calDate };