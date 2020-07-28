import React from 'react';

const Dialog = (props) => {

    const {
        leadId,
        companyId,
        name,
        email,
        message,
        dialogShown,
        setName,
        setEmail,
        setMessage,
        setCompanyId,
        setCompanyName,
        setCompanyAddress,
        cancelCallback,
        confirmCallback,
        companyData,
        companyName,
        companyAddress,
        companyIsNew,
        setCompanyIsNew,
    } = props;

    const style = {
        display: dialogShown ? "block" : "none",
    };

    return (
        <div id="dialogContainer">
            <div id="dialog" style={style}>
                <div className="panel left">
                    <label className="dialogLabel">
                        <div className="dialogTitle">Name</div>
                        <input id="editNameInput" defaultValue={name} onBlur={(e) => setName(e.target.value)}/>
                    </label>
                    <label className="dialogLabel">
                        <div className="dialogTitle">email</div>
                        <input id="editEmailInput" defaultValue={email} onBlur={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label className="dialogLabel">
                        <div className="dialogTitle">Message</div>
                        <textarea id="editMessageInput" defaultValue={message}
                                  onBlur={(e) => setMessage(e.target.value)}/>
                    </label>
                    <button id="confirmEdit" data-id={leadId} onClick={confirmCallback}>Confirm</button>
                    <button id="cancelEdit" onClick={cancelCallback}>Cancel</button>
                </div>
                <div className="panel right">
                    <label className="dialogLabel">
                        <div className="dialogTitle">Company</div>
                        <select onChange={(e) => setCompanyId(e.target.value)} value={companyId} style={{visibility: companyIsNew ? "hidden" : "visible"}}>
                            <option value="-1">Select</option>
                            {
                                Object.keys(companyData).map(id => {
                                    return (
                                        <option value={id}>{companyData[id]}</option>
                                    )
                                })
                            }
                        </select>
                        <span>
                            <button id="addNewCompany" onClick={setCompanyIsNew}>Add New</button>
                        </span>
                    </label>
                    <div id="addCompanyPanel" style={{display: companyIsNew ? "block" : "none"}}>
                        <label className="dialogLabel">
                            <div className="dialogTitle">Name</div>
                            <input id="companyName" defaultValue={companyName}
                                   onBlur={(e) => setCompanyName(e.target.value)}/>
                        </label>
                        <label className="dialogLabel">
                            <div className="dialogTitle">Address</div>
                            <input id="companyAddress" defaultValue={companyAddress}
                                   onBlur={(e) => setCompanyAddress(e.target.value)}/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Dialog;