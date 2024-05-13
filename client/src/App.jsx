import React,{Suspense, lazy, useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute.jsx';
import { LayoutLoader } from './components/layout/Loaders.jsx';
import axios from 'axios'
import { server } from './constants/config.js';
import {useDispatch, useSelector} from 'react-redux'
import { Toaster } from 'react-hot-toast'


const Home = lazy( ()=> import('./pages/Home.jsx'));
const Login = lazy( ()=> import('./pages/Login.jsx'));
const Chat = lazy( ()=> import('./pages/Chat.jsx'));
const Groups = lazy( ()=> import('./pages/Groups.jsx'));
const NotFound=lazy(()=> import("./pages/NotFound.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"))
const ChatManagement= lazy(() => import("./pages/admin/ChatManagement.jsx"))
const MessagesManagement= lazy(() => import("./pages/admin/MessageManagement.jsx"))



const App=()=>{

  const { user , loader} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get(`${server}/api/v1/user/me`)
    .then((res) => console.log(res))
    .catch((error) => dispatch(userNotExists()));
  },[dispatch])

  return loader ? (
    <LayoutLoader/>
  ) : (
    <BrowserRouter>

      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectRoute user={user}/>}>

          <Route path='/' element={<Home/>}/>
          <Route path='/chat/:chatId' element={<Chat/>}/>
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

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element = {<Dashboard/>}/>
        <Route path='/admin/users' element = {<UserManagement/>}/>
        <Route path='/admin/chats' element = {<ChatManagement/>}/>
        <Route path='/admin/messages' element = {<MessagesManagement/>}/>
        

        <Route path="*" element={<NotFound/>}/>  
      </Routes>
      </Suspense>
          <Toaster position='bottom-center' />
    </BrowserRouter>
  );
}

export default App
