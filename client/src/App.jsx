import React,{lazy} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const Home = lazy( ()=> import('./pages/Home.jsx'))
const Login = lazy( ()=> import('./pages/Login.jsx'))
const Chats = lazy( ()=> import('./pages/Chats.jsx'))
const Groups = lazy( ()=> import('./pages/Groups.jsx'))

function App() {
  const [count, setCount] = React.useState(0)

  return (
  <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chat/:chatid' element={<Chats/>}/>
      <Route path='/groups' element={<Groups/>}/>
    </Routes>
  
  </BrowserRouter>
  );
}

export default App
