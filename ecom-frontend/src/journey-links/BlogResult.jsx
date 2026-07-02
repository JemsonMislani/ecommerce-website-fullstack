import { useParams } from 'react-router-dom';
import { dataBlog } from '../datas/Journey-BlogLink.js';
import './BlogResult.css';
export default function BlogResult() {
    const { id } = useParams();
    const blogs = dataBlog.find(blg => blg.id === parseInt(id));
    if(!blogs) {
        return(<p>No blog found!</p>)
    }
    return(
        <>
            <div 
                className='blog-elements-selected'>
                <h2
                    className='blog-elements-header'>Currently working on this pages.</h2>
                <img 
                    className='blog-elements-img'
                    src={blogs.img} alt={blogs.title} />
                <p
                    className='blog-elements-date'>{blogs.date}</p>
                <h2 className='blog-elements-title'>{blogs.title}</h2>
                <p className='blog-elements-paragraph'>{blogs.description}</p>
            </div>
        </>
    );
}
