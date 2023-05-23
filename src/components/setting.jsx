import style from './styles/profile.module.css';
import back from './icons/back-svgrepo-com.svg';

export default function Setting({backHandle}){

    return(

        <div className={style.profileDiv}>

            <div className={style.others + ' '+ style.options}>

                <div className={style.flex + ' '+ style.header}>

                    <div className={style.backLogo} onClick={(e)=>{e.stopPropagation();backHandle()}}>

                        <img src={back} alt="back" />

                    </div>
                    <h3>Settings</h3>

                </div>
                <hr className={style.hrr}/>
                <div className={style.setting + ' '+ style.first}>

                    <p>Change Password</p>

                </div>
                <div className={style.setting}>

                    <p>Update Email Address</p>

                </div>
                <div className={style.setting}>

                    <p>Deactivate Account</p>

                </div>

            </div>

        </div>

    )

}