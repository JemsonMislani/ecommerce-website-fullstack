import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import LoginForm from './login-form';
import useScrollAnimation from '../scrollAnimation/scrollAnimation';

export default function Register(){
    useScrollAnimation()
    return(
        <>
            <Header />
            <div className='animation'>
                <LoginForm />
            </div>
            <div className='animation'>
            <FooterPage/>
            </div>
        </>
    );
}