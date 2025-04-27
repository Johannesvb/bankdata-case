import './App.css'
import { AccountsView } from './views/Accounts.view'

function App() {

  return (
    <>
      <div class="max-w-lg mx-auto py-16">
        <h1 class='my-4'>Welcome to my
          <span class='mx-2 inline-block bg-gradient-to-r from-purple-500 to-orange-500 text-4xl text-transparent bg-clip-text'>
            Account API
          </span>
        </h1>
        <AccountsView />
      </div>
    </>
  )
}

export default App
