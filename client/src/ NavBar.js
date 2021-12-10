import React from 'react'
import { NavLink } from 'react-router-dom'
import {Button} from '@mui/material'


const Navbar = (props) => {

    if (props.loggedIn) {
        return (
            <nav className="Navbar">
                <NavLink to="/"> <Button style={{float: "center"}} variant="contained" color="success" size="small" >{props.username} Home</Button></NavLink>
                    
                <NavLink to="/cases"> <Button style={{float: "center"}} variant="contained" color="success" size="small" >{props.user.name}'s Saved Cases</Button>
                    
                </NavLink> <Button style={{float: "center"}} variant="contained" color="success" size="small" onClick={props.logoutUser}>Logout</Button>
            </nav>
        )
    } else {
        return (
        <nav className="Navbar">
            <NavLink to="/"> <button> {props.username} Home </button> </NavLink>
            <NavLink to="/signup" ><button onClick={props.clearErrors}>Signup</button></NavLink>
            <NavLink to="/login" ><button onClick={props.clearErrors}>Login</button></NavLink>
        </nav>
        )
    }
    
}
export default Navbar