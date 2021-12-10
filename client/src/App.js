import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate}  from 'react-router-dom'
import logo from './xrayicon.png'
import Navbar from './ NavBar';
import SignUp from './SignUp';
import Login from './Login';
import Post from './Post';
import Case from './Case';
import Cases from './Cases';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [caseData, setCase] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    fetch('/me')
    .then(r => {
      if (r.ok) {
        r.text()
        .then(u => {
          setLoggedIn(true)
          setUser(u)
        })
      }
    })
    
  }, [])

  useEffect(() => {
    fetch("https://secret-beyond-37975.herokuapp.com/https://openi.nlm.nih.gov/api/search?coll=mpx&it=x&m=12&n=27")
    .then(r => r.json())
    .then(data =>{  
          setCase([...new Map(data.list.map(c => [c => c.pmcid(c), c])).values()])
          })
  }, [])

  const loginUser = (user) => {
    if (!user.errors) {
      setLoggedIn(true)
      setUser(user)
      navigate('/')
    } 
    else {
      setErrors(user.errors)
      
    }
  } 

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(() => {
      console.log('logged out')
      setLoggedIn(false)
      setUser({})
    })
    navigate('/')
  }

  const clearErrors = () => {
    setErrors([])
  }

  const addCase = (c) => {
    fetch('/cases', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: c.title,
      image: 'https://openi.nlm.nih.gov'+c.imgLarge,
      caption: c.image.caption,
      
    })
  })
    .then(r => r.json())
    .then(data => {
            console.log(data)
        })
  }

  return (
    <div className="App">
      <div>
        <div className="App-header">
                <img 
                    className='App-headerImage'
                    src={logo}
                    alt=""
                />
                <h3>Case Study Review</h3>
                
                <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} clearErrors={clearErrors}/>
            </div>
      </div>
             
          
            
                  <Routes>
                      <Route path="/"  element={<Post caseData={caseData} loginUser={loginUser} errors={errors} loggedIn={loggedIn} addCase={addCase}/>} />
                      <Route path="/signup" element={<SignUp loginUser={loginUser} errors={errors}/>} /> 
                      <Route path="/login" element={<Login loginUser={loginUser} errors={errors}/>} />  
                      <Route path="/cases" element={<Cases user={user} loginUser={loginUser} errors={errors} />} />  
                      <Route path="/cases/:id" element={<Case user={user} loginUser={loginUser} errors={errors} />}/>
                  </Routes>     
    </div>
  );
}

export default App;
