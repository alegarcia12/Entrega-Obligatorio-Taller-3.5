import './App.css'
import Contenido from './components/Contenido'
import Login from "./components/Login";
import Registro from './components/Registro';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenido />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registro' element={<Registro />}></Route>
          <Route path='*' element={<p>No se halló</p>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;


