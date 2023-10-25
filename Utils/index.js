import { ethers } from "ethers";
import Web3Modal from 'web3modal';

import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SALE_ABI, TOKEN_SALE_ADDRESS } from "../Context/constants"

export const CheckIfWalletIsConnected = async () => {
    try {
        if (!window.ethereum)
            console.log("Install metamask wallet...")

        const accounts = await window.ethereum.request({
            method: 'eth_accounts',
        })

        const firstAccount = accounts[0]
        return firstAccount


    } catch (error) {
        console.log("error: ", error)
    }
}

export const connectWallet = async () => {
    try {
        if (!window.ethereum)
            console.log("Install metamask wallet...")

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        const firstAccount = accounts[0]
        window.location.reload();
        return firstAccount


    } catch (error) {
        console.log("error: ", error)
    }
}


// TOKEN CONTRACT 

const fetchTokenContract = (signerOrProvider) => {
    new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signerOrProvider)
}


export const connectingTokenContract = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchTokenContract(signer)
        return contract
    } catch (error) {
        console.log("Error: ", error)
    }
}


// GET BALANCE
export const getBalance = async () => {
    try {

        const web3modal = new Web3Modal()
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        return signer.getBalance();
    } catch (error) {
        console.log("Error: ", error)
    }
}


// TOKEN SALE CONTRACT
const fetchTokenSaleContract = (signerOrProvider) => {
    new ethers.Contract(TOKEN_SALE_ADDRESS, TOKEN_SALE_ABI, signerOrProvider)
}

export const connectingTokenSaleContract = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchTokenSaleContract(signer)
        return contract
    } catch (error) {
        console.log("Error: ", error)
    }
}