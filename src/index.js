import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore'
import Root from './root'
import { fetchTodos } from './api'

fetchTodos('all').then(todos => console.log(todos))
const store = configureStore()
render(
  <Root store={store} />,
  document.getElementById('root')
)
