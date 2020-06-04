import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(
          (contact) =>
            contact._id === action.payload._id ? action.payload : contact
          // Maps through all contacts to find the contact with id matching the one from payload, and then replaces it with payload
        ),
        loading: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          // gi means global & insensitive (upper or lowercase)
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
