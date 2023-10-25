import React, { useContext } from "react";
import { ethers } from "ethers";

// INTERNAL IMPORTS
import {
    CheckIfWalletIsConnected,
    connectWallet,
    connectingTokenContract,
    connectingTokenSaleContract,
    getBalance,
} from "../Utils/index";
import { createContext } from "react";


const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const TOKEN_ICO = "TOKEN SALE DAPP"
    return (
        <StateContext.Provider value={{ TOKEN_ICO }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)