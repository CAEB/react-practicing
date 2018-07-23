import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'

import '../src/static/css/reset.css'
import '../src/static/css/common.css'

import routes from './router/route'

render(
    (
        <Router routes={ routes } history={ hashHistory }></Router>
    ),
    document.getElementById("app")
)

