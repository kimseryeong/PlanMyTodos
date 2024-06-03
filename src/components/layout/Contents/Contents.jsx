import Calendar from './Calendar';
import './Contents.css';

import { useState } from 'react';
import { dateState } from '../../../lib/atom';
import { useRecoilValue } from 'recoil';

export default function Contents () {
    const clickDate = useRecoilValue(dateState);
    const today = `
        ${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}
    `;
    const viewDate = clickDate ? clickDate : today;
    
    const onCreate = () => {
        
    }

    return (
        <main className='contents'>
            <div className='left'>
                <Calendar />
            </div>
            <div className='right'>
                <div className='date-wrap'>
                    <h1>{viewDate}</h1>
                </div>
                <div className='todo-input-wrap'>
                    <input 
                        type='text'
                        className='todo-input'

                    />
                    <button onClick={onCreate} className='backColor'>create</button>
                </div>
            </div>
        </main>
    );
}

