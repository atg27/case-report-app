import React, { useState } from 'react'


const Login = ({loginUser, errors}) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
        .then(r => r.json())
        .then(user => loginUser(user))
    }

    const listOfErrors = errors.map(e => <ul style={{textTransform: 'uppercase', marginBottom: '20px', marginTop: '20px', color: 'red'}} key={e.length}>{e}</ul>)


    return (
        <div className="login" style={{marginBottom: 80, padding: 100}}>
        <form onSubmit={handleSubmit}>
         <label>Name:</label>
         <input 
             type="text"
             id="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
         />
         <br/>
         <label>Password:</label>
         <input 
             type="password"
             id="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
         />
         <br/>
         <input type="submit"/>
     </form>
     {listOfErrors} 
     </div>
    )
}
export default Login