import { useContext, useEffect} from "react";
import UseContext from "./useContext";
import { useNavigate } from "react-router-dom";

export default function YourLibrary(){

    const value = useContext(UseContext);
    const navigation = useNavigate();

    if(value.loginCheck)
      return (<h1>Your Library</h1>)
    else navigation('../logIn');

}