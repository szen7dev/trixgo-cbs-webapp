import modalActions from 'views/media/contexts/post/modal.actions';
import modalReducers, { INITIAL_STATE } from 'views/media/contexts/post/modal.reducer';
import createDataContext from './createDataContext';

export const { Context: ContextModalPost, Provider: ProviderModalPost } = createDataContext(modalReducers, modalActions, INITIAL_STATE)