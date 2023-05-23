import React, { useState } from "react"
import style from './styles/filterComponent.module.css';

function filterComponent({dispatch, filterState, type, values}){

    const[state, setState] = useState(type);

    async function selectedType(){

        const value = await fetch('http://localhost:3000/'+type, {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({type: state})

        })

    }

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

                {values.map((value)=><label className="" onClick={(e)=>{e.stopPropagation(); setState(value)}}>{value}</label>)}

            </div>
            
        </form>

    )

}
export default filterComponent;