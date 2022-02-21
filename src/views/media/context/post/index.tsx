import modalActions from 'views/pages/media/context/post/modal.actions';
import modalReducers, { INITIAL_STATE } from 'views/pages/media/context/post/modal.reducer';
import createDataContext from 'views/pages/document/contexts/createDataContext';

export const { Context: ContextModalPost, Provider: ProviderModalPost } = createDataContext(modalReducers, modalActions, INITIAL_STATE) 