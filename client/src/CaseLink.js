import { Link } from 'react-router-dom'
import './cases.css'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


 const CaseLink = (props) => {
    return (
        <div className='post_card'>
            <Link to={`/cases/${props.cases.id}`}>
                <h3 className="post_title">{props.cases.title} </h3>   
                <img className="post_image" alt='' src={props.cases.image}/>                                
            </Link>
            <Button style={{float: "right"}} variant="contained" color="success" size="small" startIcon={<DeleteIcon />}  onClick={() => props.deleteCase(props.cases.id)}>Remove From Saved</Button> 
        </div>

       
    )
}
export default CaseLink
