import star from './icons/star-svgrepo-com.svg';
import bookIcon from './icons/book-closed-svgrepo-com.svg';
import external from './icons/external-svgrepo-com.svg';
import arrow from './icons/back-svgrepo-com.svg';

import style from './styles/details.module.css';

import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import UseContext from './useContext';

export default function Details(){

    const value = useContext(UseContext);
    console.log(value);
    let location = useLocation();
    location = location.state.val;
    console.log(location);

    async function pdf(){

        const pdf = await fetch('http://localhost:3000/pdf', {

            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "Post",
            body: JSON.stringify({index: location.index})

        })
        let a = await pdf.blob();
        a = URL.createObjectURL(a);
        window.open(a);


    }

    async function addLibrary(){

        let response = await fetch('http://localhost:3000/addLibrary',{

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "Post",
            body: JSON.stringify({index: location.index})
        
        })

    }

    return <div className={"primaryWidth " + style.detailsDiv}>

        <hr />
        <div className={style.Details}>

            <div className={`${style.main} ${style.flex}`}>

                <div className={style.info}>

                    <div className={style.imgDiv+' '+style.hide}>

                        <img className={style.img} src={location.src} alt='bookImg' />

                    </div>
                    <h1>{location.title}</h1>
                    <p className={style.author}>Author</p>
                    <div className={style.infoRating+' '+style.flex}>

                        <div className={style.rating}>

                            <div className={style.flex}>

                                <h5>7.5</h5>
                                <div className={style.logo}>

                                    <img src={star} alt="star" />

                                </div>

                            </div>

                            <h4>Rating</h4>

                        </div>
                        <div className={style.rating}>

                        <div className={style.flex}>

                            <div className={style.bookLogo}>

                                <img src={bookIcon} alt="bookIcon" />

                            </div>

                        </div>

                        <h4>Ebook</h4>

                        </div>
                        <div className={style.rating}>

                            <h3>387</h3>
                            <h4>Pages</h4>

                        </div>
                        <div className={style.rating}>

                            <h3>Eng</h3>
                            <h4>Language</h4>

                        </div>

                    </div>
                    <div className={style.flex +' '+style.buttons}>

                        <div>

                            <button className={style.flex} onClick={(e)=>{pdf();e.stopPropagation()}}>
                            <div className={style.logo}>
                                <img src={bookIcon} alt="" /> 
                            </div>Read</button>

                        </div>
                        <div>

                            <button className={style.flex} onClick={(e)=>{addLibrary();e.stopPropagation();}}>
                            <div className={style.logo}>
                                 <img src={external} alt="" />
                            </div>Add Library</button>

                        </div>

                    </div>
                    <div className={style.aboutBook}>

                        <h2 className={style.flex}>About this book <div className={style.arrow}><img src={arrow} alt="" /></div></h2>
                        <p>The Sunday Times Number One Bestseller Jay Shetty, social media superstar and host of the #1 podcast ‘On Purpose’, distils the timeless wisdom he learned as a practising monk into practical steps anyone can take every day to live a less anxious, more meaningful life.....</p>

                    </div>

                </div>

                <div className={style.imgDiv+' '+style.hideMin}>

                    <img className={style.img} src={location.src} alt='bookImg' />

                </div>

            </div>

        </div>


    </div>

}