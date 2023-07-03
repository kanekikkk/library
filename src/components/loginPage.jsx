import style from './styles/login.module.css';
import google from './icons/google-color-svgrepo-com.svg';
import notVisible from './icons/not-visible-svgrepo-com.svg';
import visible from './icons/visible-svgrepo-com.svg';
import { useContext, useState } from 'react';
import { NavLink, useNavigate} from "react-router-dom";
import UseContext from './useContext';

export default function Login(){

    const [name, setName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const nav = useNavigate();
    const value = useContext(UseContext);

    async function SignInValidation(e){

        e.preventDefault();

        if(password != ''){

            let status = await fetch('http://localhost:3000/login', {

            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({name: name, password: password})
        
            })
            status = await status.json();

            if( status.msg != 'Password match'){

                setErrorPassword(true);

            }else{

                setErrorPassword(false);
                nav('/');
                value.setLoginCheck(true);
                value.setEmail(name);

            }

        }

    }
    function handlePassword(e){

        setPassword(e.target.value);

    }

    return(

        <div className={style.loginDiv}>

            <div className={style.secondaryLogin}>

                <h2>Welcome back!</h2>

                <form onSubmit={SignInValidation} className={style.login}>

                    <input  className={errorPassword?style.errorOutline:''} type="text" placeholder='Your Email' name='name' onChange={(e)=>setName(e.target.value)} value={name} required autoComplete="off"/>
                    <div className={style.inputContainer}>
                        <input className={errorPassword?style.errorOutline:''} type={passwordVisible?"password": 'text'} placeholder='Password' value={password} onChange={handlePassword} name='password' />
                        <div className={style.logo +' '+ style.passwordIcon}><img onClick={()=>setPasswordVisible(!passwordVisible)} src={passwordVisible ? notVisible : visible} alt="notVisible" /></div>
                    </div>
                    {errorPassword?<p className={style.passwordError}>Invalid password or user name.</p>:''}
                    <button className={style.button}>Sign In</button>
            
                </form>

                <button className={style.googleSignIn + ' ' + style.flex + ' '+ style.button}><div className={style.logo}><img src={google} alt="" /></div>Continue with Google</button>
                <div className={style.signUp}>

                <NavLink className='navLink' to='/signUp'> <p>Don't have an account? <span onClick={(e)=>{e.stopPropagation(); setToggler(false); setErrorPassword(false); setPassword(''); setName(''); setPasswordVisible(true)}}>Sign Up</span></p>
                </NavLink>
                </div>

            </div>

        </div>

    )

}