import React from 'react'

// Creates a parent component that will give it’s child components access to the data it holds.
// It has a provider-consumer relationship. The provider has all the data and the consumer consumes it.
export const Store = React.createContext();

// This is what our initial store will look like before any new bits of data are added.
const initialState = {
    episodes: [],
    favourites: []
};

// Reducer
// Takes two arguments, state — the data in the store at the time it’s run, and action — the action object that is returned.
// The default keyword returning state is needed just in case an invalid action is dispatched.
function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_DATA':
        return { ...state, episodes: action.payload };
      case 'ADD_FAV':
        return {...state, favourites: [...state.favourites, action.payload]};
      case 'REMOVE_FAV':
        return {...state,favourites: action.payload};
      default:
        return state;
    }
}

// Will encapsulate the other components in the application
export function StoreProvider(props) {
    //  useReducer Hook. This takes two arguments, our reducer, and our intialState. 
    // It returns to us an array with state — the data in the store, and dispatch — how we dispatch an action to our reducer (and in turn change our state).
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // We then turn our new state and dispatch variables into an object and assign it to a variable called value.
    // Now we can pass our state and dispatch to our child component.
    const value = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}