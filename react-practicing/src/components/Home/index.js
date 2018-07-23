import React from 'react'
import NavLink from '../NavLink/index'
import './index.less'

class Home extends React.Component {

    render () {
        return (
            <div className="content">
                <ul className="header flex flex-around">
                    <li>
                        <NavLink to="/" onlyActiveOnIndex >Hello World</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ttt">Tic-Tac-Toe</NavLink>
                    </li>
                    <li>
                        <NavLink to="/todo">Todo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/2048">2048</NavLink>
                    </li>
                </ul>
                <div className="wrapper">
                    { this.props.children }
                </div>
            </div>
        )
    }
}


export default Home