import { useNavigate } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { setNavigator } from './common/utils/navigate';

function App() {

  // create navigator to use in JS files
  const navigate= useNavigate();
  useEffect(()=>{
    setNavigator(navigate);
  },[navigate])

  return (
    <>
      <AppRoutes/>
      <ToastContainer />
    </>
  )
}

export default App
