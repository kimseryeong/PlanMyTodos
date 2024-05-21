/** component 생성 */
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
    const { name, children } = props;
    return (
        <div>
            <h3>나의 새롭고 멋진 컴포넌트</h3>
            안녕하세요, 제 이름은  { name } 입니당 ^^*
            <br></br>
            children 값은 { children } 입니당 !
        </div>
    );
};

//default props 지정하기
MyComponent.defaultProps = {
    name: '기본 이름'
};

//props type 설정하기 
MyComponent.propTypes = {
    name: PropTypes.string
};

// 다른 파일에서 이 파일을 import 할 때, 
// 위에서 선언한 MyComponent 클래스 불러오도록 설정
export default MyComponent; 
