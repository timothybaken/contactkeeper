import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        name: "Jill Juicy",
        type: "professional",
        email: "jj@gmail.com",
        phone: "123456",
        id: "1",
      },
      {
        name: "John Jammy",
        type: "personal",
        email: "jjwastaken@gmail.com",
        phone: "1234567",
        id: "2",
      },
      {
        name: "Bob Burly",
        type: "professional",
        email: "bb@gmail.com",
        phone: "12345678",
        id: "3",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuid(); // Adds a random id to the contact because we're not using the mongoDB id yet
    dispatch({ type: ADD_CONTACT, payload: contact }); // dispatches to the reducer
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id }); // dispatches to the reducer
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact }); // dispatches to the reducer
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT }); // dispatches to the reducer
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact }); // dispatches to the reducer
  };

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
