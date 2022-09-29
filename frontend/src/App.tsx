import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Login, Register } from './pages';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
