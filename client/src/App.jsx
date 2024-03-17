import React,{lazy} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProtectRoute from './components/styles/auth/ProtectRoute.jsx';
import { dividerClasses } from '@mui/material';

const Home = lazy( ()=> import('./pages/Home.jsx'));
const Login = lazy( ()=> import('./pages/Login.jsx'));
const Chats = lazy( ()=> import('./pages/Chats.jsx'));
const Groups = lazy( ()=> import('./pages/Groups.jsx'));
const NotFound=lazy(()=> import("./pages/NotFound.jsx"));

let user=true;

  const App=()=>{

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ProtectRoute user={user}/>}>

          <Route path='/' element={<Home/>}/>
          <Route path='/chat/:chatid' element={<Chats/>}/>
          <Route path='/groups' element={<Groups/>}/>
        </Route>
        <Route 
          path="/login" 
          element={
            <ProtectRoute user={!user} redirect='/'>
              <Login/>
            </ProtectRoute>  
          }
        />
        <Route path="*" element={<NotFound/>}/>  
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
