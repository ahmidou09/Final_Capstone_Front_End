import { render } from 'preact'
import { App } from './app.jsx'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import store from './redux/store.js'

render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
     </Provider>
    </BrowserRouter>
    , document.getElementById('app')
)
