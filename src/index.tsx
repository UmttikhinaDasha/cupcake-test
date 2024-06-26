import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

import { App } from './components/app/App'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
