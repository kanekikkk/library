import React, {useState } from 'react';
import {Link} from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import style from './styles/carosel.module.css';
// import star from './icons/star-svgrepo-com.svg';


// import thinLikeAMonk from './image/think like a monk.jpg';
// import thinLikeAMonkPdf from './pdf/16-05-2021-072848Think-Like-a-Monk.pdf';

// import atomicHabit from './resource/Atomic habits/10457043-L.jpg';
// import atomicHabitPdf from './resource/Atomic habits/atomic-habits.pdf';


function Carousel(){

    // const arr = [{img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'},{img: atomicHabit, pdf: atomicHabitPdf, rating: 9, name: 'Atomic Habits'},{img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'}, {img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'}, {img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'}, {img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'}, {img: thinLikeAMonk, pdf: thinLikeAMonkPdf, rating: 7, name: 'Think Like a monk'}];
    const arr = [];
    console.log('hello');

    return(
        <div className={style.carousel}>
    
                <div className="primaryWidth">

                    <div className={style.heading}>
                        <h1>Trending now</h1>
                    </div>
                    <div>
                    
                        <div className={style.flex +' '+ style.carouselDiv}>
                
                            {arr.map(val => <CarouselCard key={val.img} content={val}/>)}

                        </div>

                    </div>

                </div>

        </div>
    )

}

function CarouselCard({content}){

    const [hide, setHide] = useState(true); 
    return <div className="tercaryPadding">

    <div className={style.flex} >
    
        <div className={style.bookInfo}>
    
            <div className={style.image} onMouseOver={(e)=>{setHide(false)}} onMouseOut={()=>setHide(true)}>
    
                <img className={style.img} src={content.img} alt="thinklikeamonk" />
    
            </div>
            <div className={style.info +' '+ (hide?style.hide:'')} onMouseOver={()=>setHide(false)} onMouseOut={()=>setHide(true)}>
    
                <div className={style.infoContainer}>
    
                    <div className={style.flex +' '+style.rating}>
                        <div className={style.logo}>
                            <img src={star} alt="star" />
                        </div>
                        <p className={style.bookName}>{content.rating}/10</p>
                    </div>
                    <p className={style.bookName}>{content.name}</p>
                    <Link className='navLink' to={'/details/'+content.name} state={{ content: content }} ><button className={style.viewDetails}>View Details</button></Link>
                </div>
                
            </div>
            
    
        </div>
    
    </div>
    
    </div>

}

export default React.memo(Carousel);