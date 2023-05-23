import search from './icons/search-svgrepo-com.svg';
import random from './icons/random-svgrepo-com.svg';
import userIcon from './icons/profile-circle-svgrepo-com.svg';

import style from './styles/headerNavbar.module.css';
import Profile from './profile';

import React, { useContext} from 'react';
import UseContext from './useContext';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

function NavBar({hamburgerNav, setHamburgerNav, hideSearchBar, setHideSearchBar, setProfileOpen, profileOpen}){


    const value = useContext(UseContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchTypeValue, setSearchTypeValue] = useState('All Types');
    let defaultName = 'Kitab E-Books';
    const [productName, setProductName] = useState('Kitab E-Books');
    const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
     
    // useEffect(()=>{

    //     let length = defaultName.length;
    //     let start = 0;

    //         setProductName('');
    //         for(let i = 0; i < length; i++){

    //             (function(i){

    //                 setTimeout(()=>{
    //                     console.log(i);

    //                     start++;
    //                 }, 3000)

    //             })(i); 

    //         }


    // },[])

    function setTimeOut(start){



        return start;

    }

    async function handleSearch(e){

        e.preventDefault();
        setHideSearchBar(true);
        setSearchValue('');
        let a = await fetch('http://localhost:3000/search',{

            headers: {
                'Accept': 'application/json/pdf',
                'Content-Type': 'application/json/pdf'
            },
            method: "Post",
            body: JSON.stringify({searchValue: searchValue, searchTypeValue: searchTypeValue})

        })
        console.log(a);
        window.open(a);
        

    }   

    return(
        <>
        <header>

            <div className={style.flex+" primaryWidth headerPadding"}>

                <NavLink className='navLink' to='/'><h1 className={style.productName+' '+(hideSearchBar?'': style.hideMin)}>{productName}</h1></NavLink>
                
                <nav className={style.navBar}>
                    
                    <div className= {style.flex+" " + style.secondaryNavDiv}>

                        <form onSubmit={handleSearch} className={style.flex + " " + style.searchBar  + " " + (hideSearchBar?style.hide: '')+ " " + (hideSearchBar?style.hideMin: '')}>
                        
                            <button className={style.search + " logo "}><img src={search} alt="search" /></button>
                            <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} onClick={(e)=>{setHideSearchBar(false); e.stopPropagation()}} type="text" placeholder='Search Books...'/>
                            <div onClick={(e)=>{setHamburgerNav(!hamburgerNav); e.stopPropagation()}} className={style.hamburger}>
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" fill='none'/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#000"/>
                                </svg>
                            </div>
                            <div className={style.searchStyle+ ' ' +(!hamburgerNav?(style.hide + ' ' +style.hideMin):'')}>
                                <p onClick={(e)=>{setHamburgerNav(false); setSearchTypeValue('Title'); e.stopPropagation()}}>Title</p>
                                {/* <p onClick={(e)=>{setHamburgerNav(false); setSearchTypeValue('Author'); e.stopPropagation()}}>Author</p>
                                 */}
                                <p onClick={(e)=>{setHamburgerNav(false); setSearchTypeValue('Genre'); e.stopPropagation()}}>Genre</p>
                                <p onClick={(e)=>{setHamburgerNav(false); setSearchTypeValue('All Types'); e.stopPropagation()}}>All Types</p>
                            </div>

                        </form>
            
                        <div className={style.flex + " " + style.extra + ' '+ (!hideSearchBar?style.hideMin: '')}>

                            <div  onClick={(e)=>{setHideSearchBar(false); e.stopPropagation()}} className={"logo" + (hideSearchBar?'' : style.hide) + ' ' + (hideSearchBar?'' : style.hideMin)}>
                                
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" fill='none'/>
                                <path fillRule="evenodd" className={style.searchWhiteSvg} clipRule="evenodd" d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z" />
                                </svg>
                            
                            </div>
                            <div className={style.random+ ' ' + style.hideMin}>
                                
                                <div className={style.randomLogo}>
                                    <img src={random} alt="random" />
                                </div>
                            
                            </div>

                            <div className={style.profile}>
                                
                                {value.loginCheck ? <Binder setProfileOpen={setProfileOpen} profileOpen={profileOpen}/>: <NavLink className='navLink' to='/login'><button className='login'>Login</button></NavLink>}

                            </div>

                        </div>

                    </div>
                
                </nav>

            </div>

        </header>
        <Outlet />
        </>
    )

}

function Binder({setProfileOpen, profileOpen}){

    return(

        <>

            <div id={style.userIcon} className='logo' onClick={(e)=>{setProfileOpen(!profileOpen);e.stopPropagation()}}>
                <img src={userIcon} alt="userIcon" />
            </div>
            {profileOpen?<Profile />: ''}
        
        </>

    )

}

export default React.memo(NavBar);