import React, {Component} from "react";
import {render} from "react-dom";
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
            selected: [],
            dialogShown: false,
            leadId: 0,
            leadName: "",
            leadEmail: "",
            leadMessage: "",
        };

        this.toggleAddNewForm = this.toggleAddNewForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.addEditLead = this.addEditLead.bind(this);
        this.removeLeadFunction = this.removeLeadFunction.bind(this);
        this.updateSelectedLeadsArray = this.updateSelectedLeadsArray.bind(this);
        this.showDialog = this.showDialog.bind(this);
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
                debugger;
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    toggleAddNewForm() {
        this.setState({
            dialogShown: true,
        })
    }

    setName(newName) {
        this.setState({leadName: newName});
    }

    setEmail(newEmail) {
        this.setState({leadEmail: newEmail});
    }

    setMessage(newMessage) {
        this.setState({leadMessage: newMessage});
    }

    addEditLead() {
        fetch("api/addEditLead", {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong!"};
                    });
                }
                debugger;
                location.reload();
            })
    };

    removeLeadFunction() {
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
        if (current.indexOf(id) > -1) {
            current.splice(current.indexOf(id), 1);
        } else {
            current.push(id);
        }

        this.setState({selected: current});

    }

    showDialog(data, leadId) {
        const {
            leadName,
            leadEmail,
            leadMessage
        } = data;

        this.setState({
            leadId: leadId,
            dialogShown: true,
            leadName: leadName,
            leadEmail: leadEmail,
            leadMessage: leadMessage,
        });

    }

    cancelDialog() {
        this.setState({
            leadId: 0,
            dialogShown: false,
            leadName: "",
            leadEmail: "",
            leadMessage: "",
        })
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <h1>
                        Dennis' Super Awesome Leads Sheet
                    </h1>
                </section>
                <hr />
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
                                    data-lead-name={contact.name}
                                    data-lead-email={contact.email}
                                    data-lead-message={contact.message}
                                    onClick={(e) => this.showDialog(e.target.dataset, contact.id)}
                                >
                                    edit
                                </button>
                            </li>


                        );
                    })}
                </ul>
                <button
                    id="addNewButton"
                    onClick={() => this.showDialog(this.state, 0)}
                >
                    Add New
                </button>
                <RemoveLeadButton
                    removeLeadFunction={this.removeLeadFunction}
                />
                <Dialog
                    dialogShown={this.state.dialogShown}
                    leadId={this.state.leadId}
                    name={this.state.leadName}
                    email={this.state.leadEmail}
                    message={this.state.leadMessage}
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setMessage={this.setMessage}
                    cancelCallback={this.cancelDialog}
                    confirmCallback={this.addEditLead}
                />
            </React.Fragment>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);