import React, {Component} from "react";
import {render} from "react-dom";
import AddNewForm from "./AddNewForm"

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
        };

        this.toggleAddNewForm = this.toggleAddNewForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.saveNewLead = this.saveNewLead.bind(this);
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
                return response.json();
            })
            .then(() => {
                self.location = self.location;
            });
    };

    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.state.data.map(contact => {
                        return (
                            <li key={contact.id}>
                                {contact.name} - {contact.email}
                            </li>
                        );
                    })}
                </ul>
                <button id="addNewButton" onClick={this.toggleAddNewForm}>Add New</button>
                <AddNewForm
                    isDisplayed={this.state.displayNewForm}
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setMessage={this.setMessage}
                    saveNewLead={this.saveNewLead}
                />
            </React.Fragment>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);