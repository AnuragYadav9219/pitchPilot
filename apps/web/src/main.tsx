import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './app/theme/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { AuthBootstrap } from './features/auth/components/AuthBootstrap';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthBootstrap>
          <App />
        </AuthBootstrap>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
) 
