import React from 'react';

const Dialog = (props) => {

    const {
        leadId,
        name,
        email,
        message,
        dialogShown,
        setName,
        setEmail,
        setMessage,
        cancelCallback,
        confirmCallback
    } = props;

    const style = {
        display: dialogShown ? "block" : "none",
    };

    return (
        <div id="dialogContainer">
            <div id="dialog" style={style}>
                <label className="dialogLabel">
                    <div className="dialogTitle">Name</div>
                    <input id="editNameInput" defaultValue={name} onBlur={(e) => setName(e.target.value) }/>
                </label>
                <label className="dialogLabel">
                    <div className="dialogTitle">email</div>
                    <input id="editEmailInput" defaultValue={email} onBlur={(e) => setEmail(e.target.value)}/>
                </label>
                <label className="dialogLabel">
                    <div className="dialogTitle">Message</div>
                    <textarea id="editMessageInput" defaultValue={message} onBlur={(e) => setMessage(e.target.value)}/>
                </label>
                <button id="confirmEdit" data-id={leadId} onClick={confirmCallback}>Confirm</button>
                <button id="cancelEdit" onClick={cancelCallback}>Cancel</button>
            </div>
        </div>
    )

};

export default Dialog;