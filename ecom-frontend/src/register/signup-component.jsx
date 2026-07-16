import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import './signup-component.css'
import { useEffect } from 'react';
import RegisterForm from './signup-form';

export default function RegisterFormComponent(){
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