import { createSlice } from '@reduxjs/toolkit';


const mapSlice = createSlice({
  name: 'Locations',
  initialState:  {locations:[{lat: 47.4985562, lng: -122.141844},
    {lat: 47.359423, lng: -122.021071},
    {lat: 47.2052192, lng: -121.9884262},
    {lat: 47.6307081, lng: -122.1434325},
    {lat: 47.3084488, lng: -122.2140121},
    {lat: 44.2311717, lng: -76.4859544}]},

 

  reducers: {
    delete(state,action) {
      const existLocationIndex=action.payload;
    

      for (var i = existLocationIndex.length -1; i >= 0; i--)
      state.locations.splice(existLocationIndex[i],1);
    }
    ,
    add(state,action) {
      const newLocation=action.payload;
      state.locations.push(newLocation)

    },
  },
});

export const locationHandler = mapSlice.actions;

export default mapSlice.reducer;
