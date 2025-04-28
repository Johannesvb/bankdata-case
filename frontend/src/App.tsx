import { Portal } from 'solid-js/web'
import './App.css'
import { AccountsView } from './views/Accounts.view'
import { Toaster } from './components/solid-ui/toast'

function App() {

  return (
    <>
      <div class="max-w-lg mx-auto py-16">
        <h1 class='my-4'>Welcome to the
          <span class='mx-2 inline-block bg-gradient-to-r from-green-500 to-slate-800 text-4xl font-extrabold text-transparent bg-clip-text'>
            AccountAPI
          </span>
        </h1>
        <AccountsView />
      </div>
      <Portal>
        <Toaster />
      </Portal>
    </>
  )
}

export default App
