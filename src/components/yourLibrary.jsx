import { useContext, useEffect} from "react";
import UseContext from "./useContext";
import { useNavigate } from "react-router-dom";

import style from './styles/bookSearch.module.css';
import star from './icons/star-svgrepo-com.svg';
import {Link} from 'react-router-dom';

import { useState } from 'react';
import React from 'react';

export default function YourLibrary(){

    const value = useContext(UseContext);
    const navigation = useNavigate();
    useEffect(()=>{

      let response = new Promise((res, rej)=>res(fetch('http://localhost:3000/library',{

      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "Post"
  
      })))

    },[])

    if(value.loginCheck){
      return <div className={"primaryWidth " + style.detailsDiv}>

        <hr />
        <div className={style.Details}>

            <div className={style.flex}>
                {/* {searchImg.map((val)=>{
                
                    return <Book val = {val}/>

                })} */}
                        
                </div>
                
        </div>

      </div>
    }else{

      return navigation('../logIn');

    }

}

function Book({val}){

  let content = {rating: 7}
  const [hide, setHide] = useState(true); 

  return(

        <div className={style.mainContainer} onMouseOver={(e)=>{setHide(false)}} onMouseOut={()=>setHide(true)}>
            <div className={style.image}>
                <img className={style.img} src={val.src} alt=''/>
            </div>
                <div className={style.info +' '+ (hide?style.hide:'')} onMouseOver={()=>setHide(false)} onMouseOut={()=>setHide(true)}>
                    <div className={style.infoContainer}>
                        <div className={style.flex +' '+style.rating}>
                            <div className={style.logo}>
                                <img src={star} alt="star" />
                            </div>
                            <p className={style.bookName}>{content.rating}/10</p>
                        </div>
                        <p className={style.bookName}>{val.title}</p>
                        <Link className='navLink' to={'/details/'+val.title} state={{ val: val }} ><button className={style.viewDetails}>View Details</button></Link>
                    </div>

                </div>
            </div>

    )

}