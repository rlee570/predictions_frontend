import React, {createContext, useReducer} from 'react';

// @ts-ignore
export const StateContext = createContext();

// @ts-ignore
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

