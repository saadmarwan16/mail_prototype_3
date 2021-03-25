import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Home = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/inbox" />
    } else {
        return <Redirect to="/login" />
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home)