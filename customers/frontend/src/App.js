import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalogue from './pages/catalogue'
import Admin from './pages/admin'
import Payments from './pages/payment'
import UpdateItems from './pages/updateitems'
import Orders from './pages/customerorderslist'
import KitchenOrders from './pages/kitchenorderlist'

function App() {
  return (
    <>
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/kitchenorders' element={<KitchenOrders/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/catalogue' element={<Catalogue/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/payment' element={<Payments/>} />
          <Route path='/updateitems' element={<UpdateItems/>}  />
        </Routes>
      </div>
    </Router>

    <ToastContainer/>
    </>
  );
}

export default App;
