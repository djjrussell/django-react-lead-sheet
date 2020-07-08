import React from 'react'

const AddNewForm = (props) => {

    const {
        isDisplayed,
        setName,
        setEmail,
        setMessage,
        saveNewLead,
    } = props;

    return (
        <div style={{display : isDisplayed ? 'block' : 'none'}}>
            <br/>
            <div>
                <label>
                    Name
                    <br/>
                    <input name="name" id="name" onBlur={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Email
                    <br/>
                    <input name="email" id="email" onBlur={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Message
                    <br/>
                    <input name="message" id="message" onBlur={(e) => setMessage(e.target.value)}/>
                </label>
            </div>
            <br/>
            <button onClick={saveNewLead}>Save+</button>
        </div>
    )
};

export default AddNewForm;