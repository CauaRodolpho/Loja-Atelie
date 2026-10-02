
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/caveat';
import './global.css'
import { StrictMode } from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
