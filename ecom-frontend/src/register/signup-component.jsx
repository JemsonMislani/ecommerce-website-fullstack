import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import RegisterForm from './signup-form';
import useScrollAnimation from '../scrollAnimation/scrollAnimation';

export default function RegisterFormComponent(){
    useScrollAnimation()
    return(
        <>
            <Header />
            <div className='animation'>
                <RegisterForm />
            </div>
            <div className='animation'>
            <FooterPage/>
            </div>
        </>
    );
}