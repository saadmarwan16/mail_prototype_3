import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'

const Navbar = ({ logout, email }) => {
    return (
        <>
            <h2 className="main__owner-address">{email}</h2>

            <NavLink className="btn btn-sm btn-outline-primary main__nav-btn" exact to="/inbox">
                Inbox
            </NavLink>
            <NavLink className="btn btn-sm btn-outline-primary main__compose-btn" to="/compose">
                Compose
            </NavLink>
            <NavLink className="btn btn-sm btn-outline-primary main__nav-btn" to="/sent">
                Sent
            </NavLink>
            <NavLink className="btn btn-sm btn-outline-primary main__nav-btn" to="/archive">
                Archive
            </NavLink>
            <NavLink className="btn btn-sm btn-outline-primary main__nav-btn" to="/trash">
                Trash
            </NavLink>
            <Link className="btn btn-sm btn-outline-primary main__logout-btn" to="/logout" onClick={logout}>
                Log Out
            </Link>

            <hr className="main__seperator" />
        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
}

const mapStateToProps = state => ({ email: state.auth.email })

export default connect(mapStateToProps, { logout })(Navbar)