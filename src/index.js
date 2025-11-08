import React from 'react';
import ReactDOM from 'react-dom/client';
// We don't need App.css or index.css, AdminPage.css handles it all
import AdminPage from './AdminPage'; // Import AdminPage instead of App
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminPage /> {/* Render AdminPage instead of App */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();