import Login from './components/loginPage';
import SignUp from './components/SignUp';
import { useState, useCallback, useRef, useReducer } from 'react';
import{BrowserRouter, Routes, Route, redirect} from "react-router-dom";
import UseContext from './components/useContext';
import MyProfile from './components/myProfile';
import YourLibrary from './components/yourLibrary';
import Details from './components/details';
import Carousel from './components/carousel';
import NavBar from './components/headerNavbar';

import Filters from './components/filters';

export default function Head(){

    const [logInCheck , setLogInCheck] = useState(false);
    const [hamburgerNav, setHamburgerNav] = useState(false);
    const [hideSearchBar, setHideSearchBar] = useState(true);
    const[profileOpen , setProfileOpen] = useState(false);
    const [filterState, dispatch] = useReducer(reducer, initial);
    const refFilterState = useRef(' ');

    const dispatchUpdate = useCallback((value)=>{

        const a = refFilterState.current === value.type;
        if(!a){

            dispatch(value);
            refFilterState.current = value.type;

        }

    }, [filterState])

    return (

        <UseContext.Provider value={{loginCheck:logInCheck, setLoginCheck: setLogInCheck}}>

            <div className='body' onClick={(e)=>{e.stopPropagation; setHamburgerNav(false); setHideSearchBar(true); dispatchUpdate({type:' '}); setProfileOpen(false)}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<NavBar hamburgerNav={hamburgerNav} setHamburgerNav={setHamburgerNav} hideSearchBar={hideSearchBar} setHideSearchBar={setHideSearchBar} setProfileOpen={setProfileOpen} profileOpen={profileOpen} />} >
                            <Route path='details/:userId' element={<Details/>} />
                            <Route path='/' element={<>
                                <Filters dispatch={dispatchUpdate} filterState={filterState}/>
                                <Carousel />
                            </>} >
                            </Route>
                            <Route path='yourLibrary' element={<YourLibrary />}/>
                            <Route path='profile' element={<MyProfile />}/>
                        </Route>
                        <Route path='logIn' element={<Login />} />
                        <Route path='signUp' element={<SignUp />}/>
                        <Route path='passwordReset'/>
                    </Routes>
                </BrowserRouter>
            </div>
    
        </UseContext.Provider>

    )

}

function reducer(state, action){

    switch(action.type){

        case 'Genre':

            return{

                ...state,
                'Genre': true,
                'Book Types': false,
                'Sort By': false

            }

        case 'Book Types':

            return{

                ...state,
                'Genre': false,
                'Book Types': true,
                'Sort By': false

            }

        case 'Sort By':

            return{

                ...state,
                'Genre': false,
                'Book Types': false,
                'Sort By': true

            }

        default:

            return{

                ...state,
                'Genre': false,
                'Book Types': false,
                'Sort By': false

            }

    }

}

let initial = {

        genre: false,
        bookTypes: false,
        sortBy: false
}