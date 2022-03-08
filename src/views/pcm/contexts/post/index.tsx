import createDataContext from 'services/contexts/createDataContext';
import modalActions from './modal.actions';
import modalReducers, { INITIAL_STATE } from './modal.reducer';

export const { Context: ContextModalPost, Provider: ProviderModalPost } = createDataContext(modalReducers, modalActions, INITIAL_STATE)