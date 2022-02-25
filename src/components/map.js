import { Map, GoogleApiWrapper,Marker,InfoWindow} from 'google-maps-react';
// import { set } from 'immer/dist/internal';
import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MapContainer=({ google })=>{

 
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let labelIndex = 0;

  

  const [localTime, setLocalTime]=useState("");
  const locationDepository = useSelector((state) => state.mapSlice.locations);
  
  const lat=locationDepository[locationDepository.length-1].lat
  const lng=locationDepository[locationDepository.length-1].lng
  
  const [state,setState]=useState({
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  });

  const onMarkerClick = (props, marker) =>
    setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

    const onInfoWindowClose = () =>
    setState({
      activeMarker: null,
      showingInfoWindow: false
    });

    const onMapClicked = () => {
      if (state.showingInfoWindow)
        setState({
          activeMarker: null,
          showingInfoWindow: false
        });
    };


  const getTime=async(lat,lng)=>{
    try{
      const response=await fetch("https://api.timezonedb.com/v2.1/get-time-zone?key=8FY1FBVIXOOM&format=json&by=position&lat="+lat+"&lng="+lng)
      if (!response.ok){
       throw new Error("something went wrong")
      }
      const data=await response.json();
      const formattedData= await data.formatted
      setLocalTime(formattedData);
     }
   catch(error){
      alert(error)
   }
  }

  useEffect(()=>{getTime(lat,lng);},[lat,lng])
  


  const mapStyles = {
        width: '100%',
        height: '100%',
  };

  const displayMarkers = () => {
        return  locationDepository.map((point, index) => {
          return <Marker name="hello" label={labels[labelIndex++ % labels.length]}  key={index} id={index} position={{
           lat: point.lat,
           lng: point.lng
         }}
         onClick={onMarkerClick}
         >
       </Marker>
                  
               
        })
  }

      
    return(
            <Map
              google={google}
              zoom={5}
              style={mapStyles}        
              initialCenter={locationDepository?{ lat: locationDepository[locationDepository.length-1].lat, lng: locationDepository[locationDepository.length-1].lng}:{lat:44.2311717,lng:-76.4859544}}
              onClick={onMapClicked}
            >
            
            {displayMarkers()}
            <InfoWindow
            marker={state.activeMarker}
            onClose={onInfoWindowClose}
            visible={state.showingInfoWindow}
          >
          <div>
            <h4>{localTime}</h4>
          </div>
        </InfoWindow>
            
            </Map>
    )
};


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCvd7z7srN_k_ooLzpSZDzEhL5WbGbGVZE'
  })(MapContainer);
