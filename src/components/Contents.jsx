import Calendar from './Calendar/Calendar';
import TodoTemplate from './Todo/TodoTemplate';
import styled from 'styled-components';

const ContentsStyle = styled.div`
    height: 100vh;
    display: flex;
    padding-top: 60px;
    margin: 0 50px;
`;

export default function Contents () {

    return (
        <ContentsStyle>
            <Calendar/>
            <TodoTemplate/>
        </ContentsStyle>
    );
}




