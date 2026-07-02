import FooterPage from '../home-components/FooterPage';
import Header from '../home-components/Header';
import './Journey.css'

export function Journey() { 
    return(
        <>
        <Header />
        <div className='journey-element'>
            <div className='journey-title'>
                    <h1 className='journey'>
                        How it all started?
                    </h1>
                <div className='testimony-img'>
                    <div className='testimony'>
                        <p className='my-first-testimony'>
                            I grew up in a humble family. Small kid with a big dream. We are five siblings, and I am the second youngest. I was born at Fabella Hospital in Manila and currently reside in Laspinas, where my journey began with simple roots and strong values. Growing up, I learned the importance of faith, focus, and perseverance. Life wasn't always easy, but those challenges shaped my mindset and strengthened my determination. I believe that where you come from does not limit where you can go. 
                        </p>
                        <p className='my-second-testimony'>
                            Being a teenager now, comes with different challenges. There are so many distractions, pressures, and doubts. But, i believe it's an advantage. It gives us the time to experiment, make mistakes, and learn from them. I've learned that challenges aren't meant to stop you, they're meant to teach you. Every mistake, every setback, and every failures is a chance to grow, improve, and become stronger. I focus on learning every day, trying new things, and taking small steps toward my dream, because I believe that even small progress adds up.
                        </p>
                    </div>
                    <>
                        <img
                            className='my-photo'
                            src="/images/MyImage.jpg" alt="" 
                        />
                    </>
                </div>
            </div>
            <div>
                <h1 className='second-content'>Started first industry</h1>
                <img 
                    className='first-job-img'
                    src="/images/FirstJob.png" alt="" />
                <div className='the-first-job'>
                    <p className='the-first-job-para'><b>The first job</b>, I began my first job at the age of 22, marking a significant turning point in my life. This opportunity doesn't provided me with financial independence only, but also taught me the importance of saving and believing in self. 
                    After a months, I was honored to be awarded as top Agent for three consecutive months, an accomplishment that further validated my dedication and hard work. This recognition not only boost my confidence, it taught me that there's no impossible things when you believe in yourself. The discipline, consistency, and doing what you love brought me to this, though challenging at times, but when you're dedicated, nothing is impossible. and was driven by my ambition to establish my small business.
                    </p>
                </div>
            </div>
            <div>
                <h1 className='third-content'>The certificate</h1>
                <img 
                    className='awarding-img'
                    src="/images/Awarding.jpg" alt="" />
                <div className='awarding'>
                    <p className='awarding-para'><b>The certificate.</b> My first job was with Foundever, formerly known as Sitel, an international BPO company. Fresh out of college, I decided to give it a try and was fortunate enough to be scheduled for an interview, and even luckier, I was accepted. I submitted all the requirements and began my journey on January 11th, 2022. I worked the night shift, during training, I couldn't help but notice the top agents displayed in the hallway, I was amazed on how competetive they are. I told myself, “One day, I'll be there too.” After completing a month of training, I was selected for production. A few days in, I reminded my manager and our operations manager of my goal that one day, i'll become a top agent, and in the following months, through dedication, hardwork and perseverance, I became a top agent—not just once, but three consecutive months. This experience taught me the value of believing in yourself. And I've carried that mindset into everything I pursue, applying it to every goal I set and every challenge I take on.</p>
                </div>
            </div>
            <div>
                <h1 className='forth-content'>Established businesses</h1>
                <img 
                    className='businesses-img'
                    src="/images/Businesses.jpg" alt="" />
                <div className='businesses'>
                    <p className='businesses-para'><b>Established businesses. </b>While working full-time, I really wanted to create a business to generate an additional source of income. Beyond the desire for financial diversification, I had long been eager to explore entrepreneurship. When the pandemic reshaped the landscape, opportunities began to emerge rapidly, and I decided to act. I used my personal savings, which I had set aside for future goals, as the capital for my ventures. After careful planning, sourcing products, acquiring equipment, and consulting industry experts, I launched my first business in the food industry. On October 23rd, 2023, I opened my first food cart. Over the following months, I expanded to three branches, gradually increasing my footprint. Encouraged by the success, I then ventured into selling sneakers, which proved rewarding despite the challenges and hard work. After a year, I entered the garment industry, focusing on footwear which socks, the business I am currently developing a dedicated website for. Each venture has been a valuable learning experience, providing not only knowledge and skills but especially a personal growth.</p>
                </div>
            </div>
        </div>
        <div className='footer-in-journey-page'>
            <FooterPage />
        </div>
        </>
    );
}