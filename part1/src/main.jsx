import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//let counter = 1;

//const refresh = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
//}

/*setInterval(() => {
  refresh()
  counter += 1
}, 1000)*/