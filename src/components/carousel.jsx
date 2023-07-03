import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import star from './icons/star-svgrepo-com.svg';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import style from './styles/carosel.module.css';


function Carousel(){

    const [carosel,setCarosel] = useState([]);
    const [carosel2,setCarosel2] = useState([]);

    useEffect(()=>{

        let response = new Promise((res, rej)=> res(fetch('http://localhost:3000/carousel',{

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "Post"
        
        }))
        )

        response.then((response)=>response.json()).then((response)=>{

            setCarosel(response.map((val)=>{
                return{index: val.id, title: val.title, src: `data:image/png;base64, ${val.src}`}
            }));

        });
        let response2 = new Promise((res, rej)=> res(fetch('http://localhost:3000/carousel2',{

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "Post"
        
        }))
        )

        response2.then((response)=>response.json()).then((response)=>{

            setCarosel2(response.map((val)=>{
                return{index: val.id, title: val.title, src: `data:image/png;base64, ${val.src}`}
            }));

        });

    }, [])

    return(
        <div className={style.carousel}>
    
                <div className="primaryWidth">

                    <div className={style.heading}>
                        <h1>Trending now</h1>
                    </div>
                    <div>
                    
                        <div className={style.flex +' '+ style.carouselDiv}>
                
                            {carosel.map(val => <CarouselCard content={val} />)}

                        </div>

                    </div>
                    <div className={style.heading + ' '+ style.paddingTop}>
                        <h1>Recently Added</h1>
                    </div>
                    <div>
                    
                        <div className={style.flex +' '+ style.carouselDiv}>
                
                            {carosel2.map(val => <CarouselCard content={val} />)}

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
    
                <img className={style.img} src={content.src} alt="thinklikeamonk" />
    
            </div>
            <div className={style.info +' '+ (hide?style.hide:'')} onMouseOver={()=>setHide(false)} onMouseOut={()=>setHide(true)}>
    
                <div className={style.infoContainer}>
    
                    <div className={style.flex +' '+style.rating}>
                        <div className={style.logo}>
                            <img src={star} alt="star" />
                        </div>
                        <p className={style.bookName}>7/10</p>
                    </div>
                    <p className={style.bookName}>{content.title}</p>
                    <Link className='navLink' to={'/details/'+content.title} state={{ val: content }} ><button className={style.viewDetails}>View Details</button></Link>
                </div>
                
            </div>
            
    
        </div>
    
    </div>
    
    </div>

}

export default React.memo(Carousel);