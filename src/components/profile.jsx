import style from './styles/profile.module.css';
import userIcon from './icons/profile-circle-svgrepo-com.svg';
import profileSettings from './icons/profile-image-round-1326-svgrepo-com.svg';
import setting from './icons/settings-svgrepo-com.svg';
import logout from './icons/logout-svgrepo-com.svg';
import feedback from './icons/feedback-svgrepo-com.svg';
import aboutUs from './icons/info-svgrepo-com.svg';

import { useState,useContext, useEffect } from 'react';
import { NavLink} from 'react-router-dom';

import Setting from './setting';
import Feedback from './feedback';
import AboutUs from './aboutUs';
import UseContext from './useContext';

export default function Profile(){

    const [open, setOpen] = useState(false);
    const[type, setType] = useState('');
    const value = useContext(UseContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{


        fetch('http://localhost:3000/profile', {

                headers: {

                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                method: "POST"
            
        }).then((res)=>{

            return res.json();

        }).then((res)=>{

            setUsername(res.username);
            setEmail(res.email);

        });

    },[]);

    function onclick(){

        setOpen(!open);

    }
    function finiteSizeUsername(value){

        if(13 <= value.length){

            let a = '';
            for(let i = 0; i < 13; i++){
    
                a += value.charAt(i);
    
            }
            a += '...';
            return a;

        }else{

            return value;            

        }

    }
    function finiteSizeEmail(value){

        if(18 <= value.length){

            let a = '';
            for(let i = 0; i < 18; i++){
    
                a += value.charAt(i);
    
            }
            console.log(a);
            a += '...';
            return a;

        }else{

            return value;            

        }

    }

    return(
        <>
            {open ? <Filter type={type} backHandle={onclick} />: <div className={style.profileDiv}>
            
            <div className={style.profile +' '+ style.flex + ''}>

                <div className={style.logo}>

                    <img src={userIcon} alt="userIcon" />

                </div>
                <div className={style.info}>

                    <p className={style.userName}>{finiteSizeUsername(username)}</p>
                    <p className={style.userEmail}>{finiteSizeEmail(email)}</p>

                </div>
            </div>
            <hr />
            <div className={style.others}>

                <div className={style.flex}>
                    <div className={style.subLogo}>
                        <img src={profileSettings} alt="profileSettings" />
                    </div>
                    <NavLink className='navLink' to={value.loginCheck?'profile':'logIn'} state={value.loginCheck? {userName: username, email: email}:''} ><p>My profile</p></NavLink>
                
                </div>
                <div className={style.flex} onClick={(e)=>{e.stopPropagation(); onclick(); setType('setting')}}>
                    <div className={style.subLogo}>
                        <img src={setting} alt="setting" />
                    </div>
                    <p>Settings</p>
                </div>
                <div className={style.flex} onClick={(e)=>{e.stopPropagation(); onclick(); setType('logout')}}>
                    <div className={style.subLogo}>
                        <img src={logout} alt="logout" />
                    </div>
                    <p>Logout</p>    
                </div>

            </div>
            <hr />
            <div className={style.others}>

                <div className={style.flex} onClick={(e)=>{e.stopPropagation(); onclick(); setType('sendFeedback')}}>
                    <div className={style.subLogo}>
                        <img src={feedback} alt="feedback" />
                    </div>
                    <p>Send feedback</p>
                </div>
                <div className={style.flex} onClick={(e)=>{e.stopPropagation(); onclick(); setType('aboutUs')}}>
                    <div className={style.subLogo}>
                        <img src={aboutUs} alt="about us" />
                    </div>
                    <p>About Us</p>
                </div>

            </div>

        </div>}
    </>
    )

}

function Filter({type, backHandle}){

    const value = useContext(UseContext);

    if('setting' == type){

        return (

            <Setting backHandle={backHandle}/>

        )
        
    }else if('sendFeedback' == type){

        return(

            <Feedback backHandle={backHandle}/>

        )

    }else if('logout' == type){

        console.log('logout');
        value.setLoginCheck(false);

    }else{

        return(

            <AboutUs backHandle={backHandle}/>

        )

    }

}