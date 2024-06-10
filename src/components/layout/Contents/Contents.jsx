import './Contents.css';
import Calendar from './Calendar';
import TodoTemplate from '../../Todo/TodoTemplate';


export default function Contents () {

    return (
        <main className='contents'>
            <div className='left'>
                <TodoTemplate/>
            </div>
            <div className='right'>
                <Calendar />
            </div>
        </main>
    );
}




