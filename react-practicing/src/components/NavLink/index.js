import React from 'react'
import { Link } from 'react-router'

import './index.css'

export default (props) => {
    return (
        <Link {...props } activeClassName="active"></Link>
    )
}