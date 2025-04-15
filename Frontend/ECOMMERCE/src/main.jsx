import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import AuthProvider from './Components/context/AuthProvider.jsx';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer, { getTotal } from './slices/cartSlice.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
});

store.dispatch(getTotal());

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
)
