import { useState } from 'react';
import style from './styles/login.module.css';
import google from './icons/google-color-svgrepo-com.svg';
import notVisible from './icons/not-visible-svgrepo-com.svg';
import visible from './icons/visible-svgrepo-com.svg';
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(true);
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorReEnterPassword, setErrorReEnterPassword] = useState(false);

    const nav = useNavigate();

    function handlePassword(e){

        setErrorPassword(false);
        setPassword(e.target.value);

    }
    function handleReEnterPassword(e){

        setErrorReEnterPassword(false);
        setReEnterPassword(e.target.value);     
        
        
    }
    async function signUpValidation(e){

        e.preventDefault();
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(password)){

            setErrorPassword(true);

        }
        if(password != reEnterPassword){

            setErrorReEnterPassword(true);

        }else{

            if(!errorPassword){

                let status = await fetch('http://localhost:3000/signUp', {

                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({name: name, password: password, email: email}) 
    
                });

                status = await status.json();
                nav('/logIn');

            }

        }

    }

    return(
    
        <div className={style.loginDiv}>

            <div className={style.secondaryLogin}>

                <h2>Create an Account</h2>
                <form onSubmit={signUpValidation} className={style.login}>

                    <input type="text" placeholder='Username' name='name' onChange={(e)=>setName(e.target.value)} value={name} required autoComplete="off"/>
                    <input type="email" placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} required autoComplete="off"/>
                    <div className={style.inputContainer}>
                        <input type={passwordVisible?"password": 'text'} placeholder='Password' value={password} onChange={handlePassword} />
                        <div className={style.logo +' '+ style.passwordIcon}><img onClick={()=>setPasswordVisible(!passwordVisible)} src={passwordVisible ? notVisible : visible} alt="notVisible" /></div>
                        {errorPassword?<p className={style.passwordError}>Add strong password.</p>:""}
                    </div>
                    <div className={style.inputContainer}>
                        <input type={reEnterPasswordVisible?"password": 'text'} placeholder='Re-Enter Password' value={reEnterPassword} onChange={handleReEnterPassword} />
                        <div className={style.logo +' '+ style.passwordIcon_}><img onClick={()=>setReEnterPasswordVisible(!reEnterPasswordVisible)} src={reEnterPasswordVisible ? notVisible : visible} alt="notVisible" /></div>
                        {errorReEnterPassword?<p className={style.passwordError}>Password didn't match.</p>:""}
                    </div>
                    
                    <button className={style.button}>Sign Up</button>

                </form>
                
                <button className={style.googleSignIn + ' ' + style.flex + ' '+ style.button}><div className={style.logo}><img src={google} alt="" /></div>Continue with Google</button>
                
                <div className={style.signUp}>

                    <NavLink className='navLink' to='/login'> <p>Already have an account? <span onClick={(e)=>{e.stopPropagation(); setToggler(false); setErrorPassword(false); setPassword(''); setName(''); setPasswordVisible(true)}}>Sign In</span></p>
                    </NavLink>

                </div>

            </div>
        </div>
        
    )

}