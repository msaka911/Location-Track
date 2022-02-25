import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import classes from './searchBox.module.css';

import { useDispatch } from "react-redux";
import {locationHandler} from "../store/mapSlice";

export default function SearchBox(props) {


  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  }

  const keyHandler=(event)=>{


    if (event.key === 'Enter' && coordinates.lat && coordinates.lng) {
      event.preventDefault();
      props.keyDown({lat:coordinates.lat, lng:coordinates.lng});
  
    }
  
    if (event.key ==='Enter'&&!coordinates.lat){
      alert("Have not selected a valid locaiton, try it again")
    }
  }

const keyClicked=(e)=>{
  e.preventDefault();
  if (coordinates.lat && coordinates.lng){
    props.keyDown({lat:coordinates.lat, lng:coordinates.lng});

  }
  else{
    alert("Not valid locaiton input, try it again")
  }
}

 
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            
            <div className={classes.actions}>
            <input  placeholder="Type address" {...getInputProps({onKeyDown:keyHandler})} />
            <button onClick={keyClicked} className={'btn'} >Search on Map</button>
            </div>
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}