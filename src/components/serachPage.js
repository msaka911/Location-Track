import { Fragment,useRef,useState } from "react";
import classes from './searchPage.module.css';
import { Map, GoogleApiWrapper,Marker,google} from 'google-maps-react';
import { Routes,Route,useNavigate, Link, Outlet,NavLink} from "react-router-dom";
import SearchBox from "./searchBox";
import TablePagination from "./table";
import { useDispatch } from "react-redux";
import { locationHandler } from "../store/mapSlice";


const SearchPage=()=>{
    const[clicked, setClicked]=useState({clicked: false, content:'Show History'})
    
    const clickEvent=()=>{
      if(clicked.clicked===false){
        setClicked({clicked: true, content:'Hide History'})
        
      }
      else{
        setClicked({clicked: false, content:'Show History'})
      }
      
    }

    const dispatch=useDispatch();

    const navigate=useNavigate();
    const getLocation=useRef();

    const submitFormHandler=(coordinates)=>{

      dispatch(locationHandler.add({lat:coordinates.lat, lng:coordinates.lng}))
      navigate('/map')
    }
    const cssClass=`${classes.link} centered`

    return (
      <Fragment>
        <form   className={classes.form} >
        <div className={classes.control}>
          <SearchBox keyDown={submitFormHandler} className={classes.input} placeholder="Enter a location" ref={getLocation}  type='text'/>
        </div>
       
      </form>
      <NavLink className={`${classes.link} centered`} onClick={clickEvent} to={clicked.clicked?'/main':"/main/table"}>{clicked.content}</NavLink>
      <Outlet></Outlet>
      </Fragment>
    );
  }
  
  export default SearchPage;