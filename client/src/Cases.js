import React from 'react'
import {useState, useEffect} from 'react'
import CaseForm from './CaseForm'
import './cases.css'
import CaseLink from './CaseLink'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const Cases = (props) => {
        const [cases, setCases] = useState([])
        const [error, setError] = useState("")
        const [casesErrors, setCasesErrors] = useState([])
        const [formFlag, setFormFlag] = useState(false)
    
        useEffect(() => {
            fetch('/cases')
            .then(r => r.json())
            .then(data => {
                console.log('use effect', data)
                if(data.error){
                    setError(data.error)
                } else {
                    setCases(data) 
                }
            })
        }, [])
    
        const addCase = (c) => {
            fetch('/cases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(c)
        })
            .then(r => r.json())
            .then(data => {
    
                if(data.errors) {
                    setCasesErrors(data.errors)
                } else {
                    console.log(data)
                setCases([...cases, data])
                setFormFlag(false)
                setCasesErrors([])
                }
            })
        }
    
        const deleteCase = (id) => {
            fetch(`/cases/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((r) => {
                if (r.ok){
                handleDeleteClick(id)
                }  
            })
        }
    
        function handleDeleteClick(id) {
            const updatedCases = cases.filter((c) => c.id !== id);
            setCases(updatedCases)
        }
    

        const errorsList = casesErrors.map(e => <div key={e.id} style={{ textTransform: 'uppercase', marginBottom: '20px', marginTop: '20px', color: 'red'}}><ul key={e.id}>{e}</ul></div>)
    
        const casesListLink = cases.map(c => <CaseLink key={c.id} cases={c} deleteCase={deleteCase} ></CaseLink>)
                
        if (error === '') {
             return (
                    <div className='cases_list'>
                        <div className="cases_header">
                            <h3>{`${props.user.name}'s Saved Cases`}</h3>
                            <br></br>
                            {formFlag ? 
                                <CaseForm addCase={addCase}/> 
                                : 
                                <Button style={{float: "center"}} variant="contained" color="success" size="small" startIcon={<AddIcon />}
                                    onClick={() => setFormFlag(true)}>Add A Custom Case
                                </Button>
                            }
                        </div>
                        <br></br>
                        <br></br>
                        {errorsList}
                        {casesListLink}
                    </div>
            )
        } else {
            return (
                <h3>Not Authorized! Please Sign Up or Login</h3>
            )
        }
}
export default Cases