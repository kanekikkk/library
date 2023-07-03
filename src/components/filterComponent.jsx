import React, { useEffect, useState } from "react"
import style from './styles/filterComponent.module.css';

function filterComponent({dispatch, set, filterState, type, values}){

    const[state, setState] = useState(type);

    useEffect(()=>{

        if(state != 'Genre'){

            const value = new Promise ((res, rej)=>res(fetch('http://localhost:3000/filter/'+type, {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({type: state})

            })))
            value.then((value)=>value.json())
            .then((val)=>console.log(val));

        }

    },[state])

    function handlePop(e){

        if(filterState[type] != ''){

            dispatch({type: ''});

        }else{

            dispatch({type: type});

        }
        e.stopPropagation();    

    }
    return(

        <form onClick={handlePop} className={style.select}>

            <label>{state}</label>
            <div  onClick={(e)=>{e.stopPropagation();dispatch({type: ''})}} className={style.options + ' '+ (filterState[type]? ' ' : style.hide)}>

                {values.map((value)=><label className="" onClick={(e)=>{setState(value), set(value)}}>{value}</label>)}

            </div>
            
        </form>

    )

}
export default filterComponent;