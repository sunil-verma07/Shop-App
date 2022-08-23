import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store}>
    <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <App />
    <ToastContainer />
    </Provider>
    
  </React.StrictMode>
);

