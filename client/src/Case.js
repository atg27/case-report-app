import React, {useState, useEffect} from 'react'
import './cases.css'
import CaseEditForm from './CaseEditForm'
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';




 const Case = (props) => {
    const [caseCard, setCaseCard] = useState({})
    const [errors, setErrors ] = useState('')
    const [formFlag, setFormFlag] = useState(false) 

    const switchFormFlag = () => {
        formFlag ? setFormFlag(false) : setFormFlag(true)
    }

    useEffect(() => {
        fetch(`/cases/${props.match.params.id}`)
        .then(r => r.json())
        .then(data =>{
                if (data.error) {
                    setErrors(data.error)
                } else {
                    setCaseCard(data)
                }
        })
    },[])

    const editCase = (editedCase) => {
        fetch(`/cases/${editedCase.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedCase)
        })
        .then(r => r.json())
        .then((data)=>{
            setCaseCard(data)
        })
    }



        if (errors==="") { 
            return (
                <div>
                    <div className="edit_form">
                             {
                                formFlag? <CaseEditForm caseCard={caseCard} switchFormFlag={switchFormFlag} editCase={editCase}></CaseEditForm>
                                :
                                <Button className="edit_button" style={{float: "center"}} variant="contained" color="success" size="small" startIcon={< EditIcon/>}  onClick={switchFormFlag}> edit case </Button>
                            }
                    </div>
                           
                        <br></br>
                    
                    <div className="case_card">
                        <h3 className="post_title">{caseCard.title}</h3>
                        <img className="post_image" alt='' src={caseCard.image}/>
                        <h4 className="post_caption"><b>Impression</b>: {caseCard.caption}</h4> 
                    </div>
                    
                </div>
            
            )
        } else {
            return (
                <h3>{errors}</h3>
            )
        }
 }
        
export default Case 