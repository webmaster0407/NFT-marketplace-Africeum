import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter  } from "react-router-dom";
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React';
import Web3ReactManager from './components/Web3ReactManager'
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { TokenPriceContextProvider } from "./contexts/TokenPriceContext";
import { AuthProvider } from './contexts/AuthContext';
// import dotenv from 'dotenv'

// import { Buffer } from 'buffer'
// (window as any).global = window;
// window.Buffer = Buffer
// dotenv.config();
(window as any).global = window;

// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ReactManager>
              <AuthProvider>
                <RefreshContextProvider>
                  <BrowserRouter>
                      <App />
                      <ToastContainer/>
                  </BrowserRouter>
                </RefreshContextProvider>
              </AuthProvider>
        </Web3ReactManager>
    </Web3ReactProvider>      
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
