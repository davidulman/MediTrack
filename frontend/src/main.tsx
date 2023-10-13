import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './components/Provider/AuthProvider.tsx';
import './i18n/config';
import { AppThemeProvider } from './components/global/theme/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppThemeProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          preventDuplicate
          style={{
            borderRadius: '18px',
          }}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </AppThemeProvider>
  </Provider>
);
