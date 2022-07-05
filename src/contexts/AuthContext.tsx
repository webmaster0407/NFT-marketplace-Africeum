import axios from 'axios';
import React, { useReducer, createContext, useEffect } from 'react';
import Querystring from "query-string"
import { signMessage } from '../utils/web3React';
import { useActiveWeb3React } from '../hooks';

let token = localStorage.getItem('africeumNFTToken')
    ? localStorage.getItem('africeumNFTToken')
    : '';


export const initialState = {
    user: null,
    token: '' || token,
    loading: false,
    errorMessage: null,
};


/**
 * Context
 */

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext({});

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }

    return context;
}
 
export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    
    const { account } = useActiveWeb3React()

    useEffect(() => {
        if(account) {
            //getUser(dispatch, account)
        }
    }, [account])

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};



/**
 *  Actions
 */

export async function getUser(dispatch, address) {
    axios.get(`/user`, {
        params: {
            address: address,
        }
    })
        .then(async res => {
            console.log('getUser',res)
            dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data.user });
            // dispatch({ type: 'SET_USER', payload: res.data.user });
        })
        .catch(err => {
            console.log('getUser err',err)
            dispatch({ type: 'FETCH_USER_SUCCESS', payload: null });
        })
}

export async function loginUser(dispatch, account, nonce, signer) {
	try {
		dispatch({ type: 'REQUEST_LOGIN' });
        try {
            const signature = await signMessage(signer, account, 
              `I am signing my one-time nonce: ${nonce}`
            );
            
            if(signature) {
                const { data } = await axios.post(`/login`, Querystring.stringify({address: account, signature: signature}))
                const token = data.token;
                if(token) {
                    window.localStorage.setItem('africeumNFTToken', token);
                    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
                    await getUser(dispatch, account);
                    return token;
                }
            }
          } catch (err) {
            dispatch({ type: 'LOGIN_ERROR', error: err });
            console.log(err);
          }

	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('africeumNFTToken');
}
 

 /**
  * Reducers
  */


export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_SUCCESS': 
        return {
            ...initialState,
            user: action.payload,
            loading: false,
        };
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
                token: action.payload,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                user: '',
                token: '',
            };

        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
  