import star from './icons/star-svgrepo-com.svg';
import bookIcon from './icons/book-closed-svgrepo-com.svg';
import external from './icons/external-svgrepo-com.svg';
import arrow from './icons/back-svgrepo-com.svg';

import style from './styles/details.module.css';

import { useLocation } from 'react-router-dom';

export default function Details(){

    const location = useLocation();

    return <div className={"primaryWidth " + style.detailsDiv}>

        <hr />
        <div className={style.Details}>

            <div className={`${style.main} ${style.flex}`}>

                <div className={style.info}>

                    <div className={style.imgDiv+' '+style.hide}>

                        <img className={style.img} src={location.state.content.img} alt='bookImg' />

                    </div>
                    <h1>{location.state.content.name}</h1>
                    <p className={style.author}>Author</p>
                    <div className={style.infoRating+' '+style.flex}>

                        <div className={style.rating}>

                            <div className={style.flex}>

                                <h5>{location.state.content.rating}</h5>
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

                            <button className={style.flex} onClick={()=>window.open(location.state.content.pdf)}>
                            <div className={style.logo}>
                                <img src={bookIcon} alt="" /> 
                            </div>Read</button>

                        </div>
                        <div>

                            <button className={style.flex}>
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

                    <img className={style.img} src={location.state.content.img} alt='bookImg' />

                </div>

            </div>

        </div>


    </div>

}