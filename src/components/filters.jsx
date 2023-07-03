import style from './styles/filters.module.css';
import bag from './icons/bag-svgrepo-com.svg';
import external from './icons/external-svgrepo-com.svg';
import FilterComponent from './filterComponent';
import React,{ useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UseContext from './useContext';

export default function Filters({filterCheck, dispatch, filterState}){

    const value = useContext(UseContext);
    const [genra, setGenra] = useState('');
    const [bookType, setBookType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const initial = useRef(false);

    useEffect(()=>{
        if(initial.current)
            filterCheck(genra, bookType, sortBy)
        else
            initial.current = true;
    },[genra, bookType, sortBy])

    return(

        <div onClick={()=>{dispatch({type: ''})}}className={style.filters + " primaryWidth secondaryPadding " + style.flex}>
            
            <hr className={style.top} />
                <div className={style.selectDiv}>
                    <FilterComponent key={1} dispatch={dispatch} set={setGenra} filterState={filterState} type='Genre'values={["Horror","Love Romance","Biography","self help book","Fiction","Spirituality","Fairy tales","Adventure"]}/>
                </div>
                <div className={style.selectDiv}>
                    <FilterComponent key={2} dispatch={dispatch} set={setBookType} filterState={filterState} type='Book Types' values={["education", "comic", 'novel', '']}/>
                </div>
                <div className={style.selectDiv}>
                    <FilterComponent key={3} dispatch={dispatch} set={setSortBy} filterState={filterState} type='Sort By' values={["Rating", 'Latest', 'A-Z', 'Z-A']}/>
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