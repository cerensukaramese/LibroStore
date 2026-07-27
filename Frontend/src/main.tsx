import axios from "axios";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/index.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
      <App />
      </Provider>

    </Router>

  </StrictMode>,
)

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
