import './Journey.css'

export default function Journey() { 
    return(
        <>
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
                        <img
                            className='my-photo'
                            src="/images/MyImage.jpg" alt="" 
                        />
                </div>
            </div>
        </>
    );
}