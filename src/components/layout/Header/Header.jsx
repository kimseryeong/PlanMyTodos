import './Header.css';
import Login from './Login';
import Signin from './Signin';

const Header = () => {
    return (
        <header className='header'>
            <p className='logo'>ToDoList</p>
            <div className='btn-contents'>
                <Login>Login</Login>
                <Signin>Sign In</Signin>
            </div>
        </header>
    );
}

export default Header;