// store.ts
import { createStore } from 'redux';
import reducer from './reducer';

/**
 * The createStore function from the redux library is used to create a Redux store.
 * The store is created with the reducer function as its argument.
 */
const store = createStore(reducer);

/**
 * The RootState type is defined as the return type of the getState method of the store.
 * It is used to type the state in the useSelector hook.
 */
export type RootState = ReturnType<typeof store.getState>;

export default store;