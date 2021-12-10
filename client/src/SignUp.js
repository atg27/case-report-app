import React, { useState } from 'react'


const SignUp = ({loginUser, errors}) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                password_confirmation: passwordConfirmation
            })
        })
        .then(r => r.json())
        .then(user => {
            if (user.errors) {
                loginUser(user)
            } else {
                loginUser(user)
            }
        })
        
    }

    const listOfErrors = errors.map(e => <ul style={{textTransform: 'uppercase', marginBottom: '20px', marginTop: '20px', color: 'red'}} key={e.length}>{e}</ul>)
    

    return (
        <div className="signup" style={{marginBottom: 80, padding: 100}}>
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
            <label>Confirm Password:</label>
            <input 
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <br/>
            <br></br>
            <input type="submit"/>
        </form>

       {errors ? <div>{listOfErrors}</div> : null}
        
        </div>
    )
}
export default SignUp