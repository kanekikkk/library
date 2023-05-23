import style from './styles/filters.module.css';
import bag from './icons/bag-svgrepo-com.svg';
import external from './icons/external-svgrepo-com.svg';
import FilterComponent from './filterComponent';
import React,{ useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UseContext from './useContext';

export default function Filters({dispatch, filterState}){

    const value = useContext(UseContext);

    async function fetchType(){

        const value = await fetch('http://localhost:3000/filters', {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"

        })

    } 

    return(

        <div onClick={()=>{dispatch({type: ''})}}className={style.filters + " primaryWidth secondaryPadding " + style.flex}>
            
            <hr className={style.top} />
                <div className={style.selectDiv}>
                    <FilterComponent key={1} dispatch={dispatch} filterState={filterState} type='Genre'values={[]}/>
                </div>
                <div className={style.selectDiv}>
                    <FilterComponent key={2} dispatch={dispatch} filterState={filterState} type='Book Types' values={[]}/>
                </div>
                <div className={style.selectDiv}>
                    <FilterComponent key={3} dispatch={dispatch} filterState={filterState} type='Sort By' values={[]}/>
                </div>
            <hr className={style.bottom}/>
            
            <div className={style.library + " "+ style.flex}>
                
                <div className={style.bag}>
                
                    <img src={external} alt="external" />
                
                </div>
                
                <NavLink className='navLink'to={value.loginCheck?'yourLibrary':'logIn'}><p>Your Library</p></NavLink>


            </div>

            <Outlet />
        </div>

    )

}