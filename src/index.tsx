import './global.styles.scss'

import React from 'react'
import { render } from 'react-dom'

import App from './app'

render(
  <App />,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}