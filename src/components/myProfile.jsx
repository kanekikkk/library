import style from './styles/myProfile.module.css';
import userIcon from './icons/profile-circle-svgrepo-com.svg';
import { useContext, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import UseContext from './useContext';

export default function MyProfile(){

    const [edit, setEdit] = useState(false);
    const value = useContext(UseContext);
    const location = useLocation();
    const [name, setName] = useState(location.state.userName);
    const navigation = useNavigate();

    if(value.loginCheck){
        return <div className={"primaryWidth " + style.detailsDiv}>

            <hr />
            <div className={style.Details}>

                <div className={style.flexDynamic}>

                    <div className={style.img}>

                        <img src={userIcon} alt="" />

                    </div>
                    <div className={style.info}>

                        {edit?<div className={style.name}><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/><button onClick={()=>setEdit(false)}>Save</button></div>:<div className={style.flex+' '+ style.name}><h1>{name}</h1><button onClick={()=>setEdit(true)}>Edit</button></div>}
                        <p>{location.state.email}</p>
                        <div className={style.infoDiv}>

                            <NavLink className='navLink' to='/yourLibrary'><button className={style.libraryButton}>Your Library</button></NavLink>

                        </div>

                    </div>

                </div>
                <div>


                </div>

            </ div>

        </div>
    }else navigation('../logIn');

}