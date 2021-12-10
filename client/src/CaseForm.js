import React, {useState} from 'react'

 const CaseForm = (props) => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addCase({
            title: title,
            image: image,
            caption: caption
        })
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
export default CaseForm