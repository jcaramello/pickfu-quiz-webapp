import './App.css'
import { Logo } from './Logo'

import { AppRouter } from './Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContextProvider } from './Shared/NotificationHub';
import { PickFuQueryClientProvider } from './Shared/PickFuQueryClientProvider';

function App() {
  return (
    <NotificationContextProvider>
      <PickFuQueryClientProvider>
        <Logo />
        <AppRouter />
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} />
      </PickFuQueryClientProvider>
    </NotificationContextProvider>
  )
}

export default App
