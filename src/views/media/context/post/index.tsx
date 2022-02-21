import modalActions from './modal.actions';
import modalReducers, { INITIAL_STATE } from './modal.reducer';
import createDataContext from 'views/document/contexts/createDataContext';

export const { Context: ContextModalPost, Provider: ProviderModalPost } = createDataContext(modalReducers, modalActions, INITIAL_STATE) 