import React from 'react';

const Dialog = (props) => {

    const {
        name,
        email,
        message,
        dialogShown,
        cancelCallback,
    } = props;

    const style = {
        display: dialogShown ? "block" : "none",
    };

    return (
        <div id="dialogContainer">
            <div id="dialog" style={style}>
                <label className="dialogLabel">
                    <div className="dialogTitle">Name</div>
                    <input id="editNameInput" value={name}/>
                </label>
                <label className="dialogLabel">
                    <div className="dialogTitle">email</div>
                    <input id="editEmailInput" value={email}/>
                </label>
                <label className="dialogLabel">
                    <div className="dialogTitle">Message</div>
                    <textarea id="editMessageInput" value={message}/>
                </label>
                <button id="confirmEdit">Confirm</button>
                <button id="cancelEdit" onClick={cancelCallback}>Cancel</button>
            </div>
        </div>
    )

};

export default Dialog;