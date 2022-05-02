import './App.css';
import { useNavigate, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './helpers/authContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  let navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(() => {
    axios.get('http://localhost:8080/auth/', {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      setAuthState({
        username: res.data.username,
        id: res.data.id,
        status: true
      })
    }).catch((err) => {
      setAuthState({
        ...authState,
        status: false
      })
    })
  }, []);

  const logOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")
    setAuthState({
      username: "",
      id: 0,
      status: false
    })
    navigate("/login")
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className='navbar'>
          <div className='links'>
            <Link to="/"> Home</Link>
            <Link to="/createpost"> Create a Post</Link>
            {!authState.status && (
              <>
                <Link to="/login"> LogIn</Link>
                <Link to="/register"> Register</Link>
              </>
            )}
            </div>
          
          <div className='loggedInContainer'>
            <h1>{authState.username}</h1>
            {authState.status && <button onClick={logOut}> LogOut</button>}
          </div>
              
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
