import './App.css';
import { useNavigate, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
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
            {authState.status ? (
              <>
                <Link to="/"> Home</Link>
                <Link to="/createpost"> Create a Post</Link>
              </>
            ) : (
              <>
                <Link to="/login"> LogIn</Link>
                <Link to="/register"> Register</Link>
              </>
            )}
          </div>

          <div className='loggedInContainer'>
            <Link to={`/profile/${authState.id}`}>{authState.username}</Link>
            {authState.status && <button onClick={logOut}> LogOut</button>}
          </div>

        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
