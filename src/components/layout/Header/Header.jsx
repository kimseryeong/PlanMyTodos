import './Header.css';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
    return (
        <header className='header'>
            <p className='logo'>ToDoList</p>
            <div className='btn-contents'>
                <Login>Login</Login>
                <Signup>Sign Up</Signup>
            </div>
        </header>
    );
}

export default Header;