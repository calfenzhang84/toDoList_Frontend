import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";


// Prepares the dataLayer
export const StateContext = createContext();

//Wrap our app and provide the Data layer

const StateProvider = ({ children }) => {

    return (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
    )
};

export default StateProvider;

//This is a Hook, Pull information from the data layer
export const useStateValue = () =>  useContext(StateContext);