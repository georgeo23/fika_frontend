import * as actions from '../Actions/actions'
import FikaReducer from '../reducer/Reducer'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore();

const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
  });

describe('select_actions', () => {
  beforeEach(() => { 
    // store.clearActions();
    store = mockStore({ userData: [] });
  });

  test('Dispatches the correct action and payload', () => {
    const expectedActions = [
      {
        'type': 'LOAD_DATA',
        'payload': 'hello',
      },
    ];

    store.dispatch(actions.loadData('hello'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload', () => {
    const expectedActions = [
      {
        'type': 'LOAD_CHAT',
        'payload': 'hey',
      },
    ];

    store.dispatch(actions.loadChat('hey'));
    expect(store.getActions()).toEqual(expectedActions);
  });

});

describe('reducer', () => {
  test('returns the initial state', () => {
    const action = { type: actions, payload: [] };
    const expectedState = { userData: [], orgData:[], message:[] };

    expect(FikaReducer(undefined, action)).toEqual(expectedState);
  });
});


describe('get user data', () => {
  test('dispatch', () =>
    store
      .dispatch(actions.getUser(
        { userData: ['bhuma'] },
        mockServiceCreator('bhuma'),
      ))
      .then(() => expect(store.getActions()).toContainEqual({ type: LOAD_DATA })));

})

describe('get chat data', () => {
  test('dispatch', () =>
    store
      .dispatch(actions.getChat(
        { message: ['bhuma'] },
        mockServiceCreator('bhuma'),
      ))
      .then(() => expect(store.getActions()).toContainEqual({ type: LOAD_CHAT })));

})
