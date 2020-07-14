import React, {Component} from "react";
import {render} from "react-dom";
import AddNewForm from "./AddNewForm";
import RemoveLeadButton from './removeLeadButton';

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
        };

        this.toggleAddNewForm = this.toggleAddNewForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.saveNewLead = this.saveNewLead.bind(this);
        this.removeLeadFunction = this.removeLeadFunction.bind(this);
        this.updateSelectedLeads = this.updateSelectedLeads.bind(this);
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

    updateSelectedLeads(checkbox) {
        const id = checkbox.dataset.id;
        let current = this.state.selected;
        if(current.indexOf(id) > -1) {
            current.splice(current.indexOf(id), 1);
        }else{
            current.push(id);
        }

        this.setState({selected: current});

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
                                    onChange={(e) => this.updateSelectedLeads(e.target)}
                                />
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
                <AddNewForm
                    isDisplayed={this.state.displayNewForm}
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setMessage={this.setMessage}
                    saveNewLead={this.saveNewLead}
                />
                <RemoveLeadButton
                    removeLeadFunction={this.removeLeadFunction}
                />
            </React.Fragment>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);