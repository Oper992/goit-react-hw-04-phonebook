import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContacts = (contactName, contactNumber) => {
    const id = nanoid();

    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === contactName.toLowerCase()
      )
    ) {
      window.alert(`${contactName} is already in contacts`);
    } else {
      this.setState(prevState => {
        const newContactsArray = [...prevState.contacts];
        newContactsArray.push({
          id: id,
          name: contactName,
          number: contactNumber,
        });

        return {
          contacts: newContactsArray,
        };
      });
    }
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addToFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = e => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          ({ name }) => name !== e.target.value
        ),
      };
    });
  };

  componentDidMount() {
    const contactsFromLastSession = JSON.parse(
      localStorage.getItem('contacts')
    );

    this.setState({ contacts: contactsFromLastSession });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContacts={this.addContacts} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} addToFilter={this.addToFilter} />
        <ContactList
          filteredContacts={this.filteredContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
