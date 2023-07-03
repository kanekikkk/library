import Login from './components/loginPage';
import SignUp from './components/SignUp';
import { useState, useCallback, useRef, useReducer, useEffect } from 'react';
import{BrowserRouter, Routes, Route} from "react-router-dom";
import UseContext from './components/useContext';
import MyProfile from './components/myProfile';
import YourLibrary from './components/yourLibrary';
import Details from './components/details';
import Carousel from './components/carousel';
import NavBar from './components/headerNavbar';
import BookSearch from './components/BookSearch';
import bookFilter from './components/bookFilter';

import Filters from './components/filters';
import BookFilter from './components/bookFilter';

export default function Head(){

    const [logInCheck , setLogInCheck] = useState(false);
    const [hamburgerNav, setHamburgerNav] = useState(false);
    const [hideSearchBar, setHideSearchBar] = useState(true);
    const[profileOpen , setProfileOpen] = useState(false);
    const [filterState, dispatch] = useReducer(reducer, initial);
    const refFilterState = useState(' ');
    const [searchImg, setSearchImg] = useState([]);
    const [search_Value, setSearchValue] = useState('');
    const [filterCheck_, setFilterCheck] = useState(false);
    const [filterValue, setFilterValue] = useState(['','','']);
    const [filterImg, setFilterImg] = useState([]);
    const [email, setEmail] = useState('aa');

    const dispatchUpdate = useCallback((value)=>{

        const a = refFilterState.current === value.type;
        if(!a){

            dispatch(value);
            refFilterState.current = value.type;

        }

    }, [filterState])

    function filterCheck(genre, bookType, sortBy){

        console.log(genre, bookType, sortBy);
        setFilterCheck(true);
        setFilterValue([genre, bookType, sortBy]);

    }

    const handleSearchResult = useCallback( async(searchValue, searchTypeValue)=>{
        
        setSearchValue(searchValue);
        let response = await fetch('http://localhost:3000/search',{

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "Post",
            body: JSON.stringify({searchValue: searchValue, searchTypeValue: searchTypeValue})
        
        })

        let data = await response.json();

        setSearchImg(data.map(val=>{
            return{index: val.id, title: val.title, src: `data:image/png;base64, ${val.src}`}
        })); 

    },[searchImg])

    
    useEffect(()=>{
        
        if(filterValue[0] !='' || filterValue[2] !='' || filterValue[1] !=''){

            console.log('sended');
            let response = new Promise((res, rej)=>res(fetch('http://localhost:3000/filter',{

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "Post",
                body: JSON.stringify({genre:filterValue[0], bookType: filterValue[1], sortBy: filterValue[2]})
            
            })))

            response.then(response=>response.json())
            .then(res=>{

                setFilterImg(res.map(val=>{
                    return{index: val.id, title: val.title, src: `data:image/png;base64, ${val.src}`}
                })); 

            });

        }

    },[filterValue])

    console.log(filterCheck_);

    return (

        <UseContext.Provider value={{loginCheck:logInCheck, setLoginCheck: setLogInCheck, email: email, setEmail: setEmail}}>
            
            <div className='body' onClick={(e)=>{e.stopPropagation; setHamburgerNav(false); setHideSearchBar(true); dispatchUpdate({type:' '}); setProfileOpen(false)}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<NavBar setFilterValue={setFilterValue
                        } setFilterCheck={setFilterCheck} setSearchVal={setSearchValue} handleSearchResult={handleSearchResult} hamburgerNav={hamburgerNav} setHamburgerNav={setHamburgerNav} hideSearchBar={hideSearchBar} setHideSearchBar={setHideSearchBar} setProfileOpen={setProfileOpen} profileOpen={profileOpen} />} >
                            <Route path='details/:userId' element={<Details/>} />
                            <Route path='/' element={search_Value === ''?<>
                                    <Filters filterCheck={filterCheck} dispatch={dispatchUpdate} filterState={filterState}/>
                                    {filterCheck_?<BookFilter searchImg={filterImg}/>: <Carousel />}
                                </>: <BookSearch searchImg={searchImg} />}>
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