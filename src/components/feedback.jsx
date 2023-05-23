import style from './styles/profile.module.css';
import back from './icons/back-svgrepo-com.svg';
import { useState } from 'react';

export default function Feedback({backHandle}){

    const [feedback, setFeedback] = useState('');
    const [feedbackSubmit, setFeedbackSubmit] = useState(false);
    async function submit(){

        const value = await fetch('http://localhost:3000/feedback', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({feedback: feedback})

        })

        setFeedbackSubmit(true);

    }

    return(

        <div className={style.profileDiv}>

            <div className={style.others+' '+style.options}>
                <div className={style.flex + ' '+ style.header}>

                    <div className={style.backLogo} onClick={(e)=>{e.stopPropagation();backHandle()}}>

                        <img src={back} alt="back" />

                    </div>
                    <h3>Feedback</h3>

                </div>
                <hr className={style.hrr}/>
                <div className={style.setting + ' ' +style.feedback + ' '+ style.first}>

                {feedbackSubmit?<h4>Thank you for your feedback.</h4>:<form onSubmit={(e)=>{e.preventDefault(); e.stopPropagation(); submit()}} >

                        <h5>Describe your feedback</h5>
                        <textarea onClick={(e)=>e.stopPropagation()} value={feedback} onChange={(e)=>setFeedback(e.target.value)} className={style.first + ' '+ style.textarea} id="" cols="34" rows="8"></textarea>
                        <button onClick={(e)=>e.stopPropagation()}  className={style.buttonSend}>Send</button>

                    </form>}

                </div>

            </div>

        </div>

    )

}