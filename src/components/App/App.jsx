import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

import { Container } from './App.styled';

const originalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));

  const visibleContacts =
    localContacts?.length > 0 ? localContacts : originalContacts;

  const [contacts, setContacts] = useState(visibleContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const checkName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkName) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibileContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter value={filter} changeFilter={changeFilter} />
          <ContactList
            contactsList={getVisibileContacts()}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <p>No contacts</p>
      )}
    </Container>
  );
};
export default App;
