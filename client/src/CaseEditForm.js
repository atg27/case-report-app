import {React, useState} from 'react'

 const CaseEditForm = (props) => {
    const [id] = useState(props.caseCard.id)
    const [title, setTitle] = useState(props.caseCard.title)
    const [image, setImage] = useState(props.caseCard.image)
    const [caption, setCaption] = useState(props.caseCard.caption)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.editCase({
            id: id,
            title: title,
            image: image,
            caption: caption
        })
        props.switchFormFlag()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="name"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br/>
                <label>Image:</label>
                <input 
                    type="name"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br/>
                <label>Caption:</label>
                <input 
                    type="name"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}
export default CaseEditForm