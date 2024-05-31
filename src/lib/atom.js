import { atom } from 'recoil';

const globalState = atom({
    key: 'userState'
    ,default: null
})

export { globalState };