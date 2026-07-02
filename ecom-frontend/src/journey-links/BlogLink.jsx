import { useNavigate } from 'react-router-dom';
import './BlogLink.css'
import { dataBlog } from '../datas/Journey-BlogLink';
export default function BlogLink() {
    const blogs = ( dataBlog )
    const nav = useNavigate();

    return(
        <>
            <div className='blog-elements'>
                <h1 className='blog'>Blogs</h1>
                <img 
                    className='blog-img'
                    src="/images/Blog-img.jpg" alt="" />
            </div>
            <div className='blog-container'>
                    {blogs.map((item) => (
                        <div 
                            onClick={() => nav(`/blog/${item.id}`)}
                            key={item.id}>
                            <img 
                                className='blogdetails-img'
                                src={item.img} alt="" 
                            />
                            <p className='blogdate'>{item.date}</p>
                            <p className='blog-title'>{item.title}</p>
                            <p className='blog-description'>{item.description}</p>
                        </div>
                    ))}
            </div>
        </>
    );
}