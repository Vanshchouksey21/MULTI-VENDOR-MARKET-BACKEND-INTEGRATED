import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./pages/store.jsx"; // ✅ Corrected import

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
