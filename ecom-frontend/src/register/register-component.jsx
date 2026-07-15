import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import './register-component.css'
import RegisterForm from './login-form';
import { useEffect } from 'react';

export default function Register(){
    useEffect(() => {
        const animations = document.querySelectorAll(".animation");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add("active");
                    }
                });
            },
            {
                threshold:.2
            }
        );
        animations.forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    },[]);

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