import { useReducer } from 'react';

// Context
import OrganizerContext from './OrganizerContext';
import OrganizerReducer from './OrganizerReducer';

// Other
import { SET_LOADING } from '../types';
import { backendAPI } from '../../lib/backend';

const OrganizerState = props => {
  const initialState = {
    organizer: {},
    notFound: false,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(OrganizerReducer, initialState);

  const getOrganizerById = async id => {
    console.log('getting organizer id');
  };

  return (
    <OrganizerContext.Provider
      value={{
        organizer: state.organizer,
        notFound: state.notFound,
        isLoading: state.isLoading,
        getOrganizerById,
      }}
    >
      {props.children}
    </OrganizerContext.Provider>
  );
};

export default OrganizerState;
