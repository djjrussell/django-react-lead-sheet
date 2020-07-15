import React, {Component} from "react";
import {render} from "react-dom";
import AddNewForm from "./AddNewForm";
import RemoveLeadButton from './removeLeadButton';
import Dialog from './Dialog';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            displayNewForm: false,
            newName: "",
            newEmail: "",
            newMessage: "",
            selected:[],
            dialogShown: false,
            dialogName: "",
            dialogEmail: "",
            dialogMessage: "",
        };

        this.toggleAddNewForm = this.toggleAddNewForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.saveNewLead = this.saveNewLead.bind(this);
        this.removeLeadFunction = this.removeLeadFunction.bind(this);
        this.updateSelectedLeadsArray = this.updateSelectedLeadsArray.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
    }

    componentDidMount() {
        fetch("api/lead")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    toggleAddNewForm() {
        this.state.displayNewForm
            ? this.setState({displayNewForm: false})
            : this.setState({displayNewForm: true})
    }

    setName(newName) {
        this.setState({newName: newName});
    }

    setEmail(newEmail) {
        this.setState({newEmail: newEmail});
    }

    setMessage(newMessage) {
        this.setState({newMessage: newMessage});
    }

    saveNewLead() {
        fetch("api/saveNewLead", {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                location.reload();
            })

    };

    removeLeadFunction () {
        fetch("api/removeLeads", {
            method: 'POST',
            body: JSON.stringify({leads_to_remove: this.state.selected})
        })
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                location.reload();
            })

    };

    updateSelectedLeadsArray(checkbox) {
        const id = checkbox.dataset.id;
        let current = this.state.selected;
        if(current.indexOf(id) > -1) {
            current.splice(current.indexOf(id), 1);
        }else{
            current.push(id);
        }

        this.setState({selected: current});

    }

    showDialog (data) {
        const {
            id,
            name,
            email,
            message
        } = data;

        this.setState({
            dialogShown: true,
            dialogName: name,
            dialogEmail: email,
            dialogMessage: message,
        });

    }

    cancelDialog() {
        this.setState({
            dialogShown: false,
            dialogName: "",
            dialogEmail: "",
            dialogMessage: "",
        })
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.state.data.map(contact => {
                        return (
                            <li key={contact.id}>
                                {contact.name} - {contact.email} - {contact.message}
                                <input
                                    type="checkbox"
                                    name={contact.id}
                                    data-id={contact.id}
                                    className="leadCheckbox"
                                    onChange={(e) => this.updateSelectedLeadsArray(e.target)}
                                />
                                <button
                                    className="editButton"
                                    data-name={contact.name}
                                    data-email={contact.email}
                                    data-message={contact.message}
                                    data-id={contact.id}
                                    onClick={(e) => this.showDialog(e.target.dataset)}
                                >
                                    edit
                                </button>
                            </li>


                        );
                    })}
                </ul>
                <button
                    id="addNewButton"
                    onClick={this.toggleAddNewForm}
                >
                    Add New
                </button>
                <RemoveLeadButton
                    removeLeadFunction={this.removeLeadFunction}
                />
                <AddNewForm
                    isDisplayed={this.state.displayNewForm}
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setMessage={this.setMessage}
                    saveNewLead={this.saveNewLead}
                />
                <Dialog
                    dialogShown={this.state.dialogShown}
                    name={this.state.dialogName}
                    email={this.state.dialogEmail}
                    message={this.state.dialogMessage}
                    cancelCallback={this.cancelDialog}
                />
            </React.Fragment>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);