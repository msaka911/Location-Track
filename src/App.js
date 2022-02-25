import './App.css';
import MapContainer from './components/map'
import { Fragment } from 'react';
import { Routes,Route} from 'react-router-dom';
import SearchPage from './components/serachPage';
import TablePagination from './components/table';

function App() {

  
  return (
      <Routes>
        <Route path='/*' element={<SearchPage/>}/>
        <Route path='/main' element={<SearchPage/>} >
            <Route path='table' element={<TablePagination/>}/>
        </Route>
        <Route path='/map' element={<MapContainer/>} />
     </Routes>
  );
}
export default App;
