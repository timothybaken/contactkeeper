import React, { useReducer } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({ type: GET_CONTACTS, payload: res.data }); // dispatches to the reducer
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data }); // dispatches to the reducer
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id }); // dispatches to the reducer
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data }); // dispatches to the reducer
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact }); // dispatches to the reducer
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT }); // dispatches to the reducer
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text }); // dispatches to the reducer
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER }); // dispatches to the reducer
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
