import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from "react-redux";
import { store } from './redux/store';
import './index.css'
import App from './App.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
