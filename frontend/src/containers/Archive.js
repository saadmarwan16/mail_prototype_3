import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import Mailbox from '../components/Mailbox'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Archive = ({ isAuthenticated, logout }) => {
    const [mails, setMails] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [nextNumber, setNextNumber] = useState(1)

    const fetchData = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    
        try {
            axios.get(`http://127.0.0.1:5000/api/emails/mailbox/archive/${nextNumber}`, config)
            .then(res => {
                setMails([...mails, ...res.data.body])
                setHasMore(res.data.has_more)
                setNextNumber(res.data.next_number)
            })
        } catch(_err) {}
    }

    useEffect(() => {
        fetchData() // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     getMails('archive', setMails)
    // }, [])

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <>
            <Helmet>
                <title>Archive - Mail</title>

                <meta name="Access all your archived mails here" content="Archive page" />
            </Helmet>

            <h3 className="main__name">Archive</h3>

            <InfiniteScroll
                dataLength={mails.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                    <div className="main__loading">
                        <Loader
                            type="Oval"
                            color="#fff"
                            height={40}
                            width={40}
                        />
                    </div>
                }
                endMessage={
                    <p className="main__mails-finished">
                        <b>No more mails in your archive mailbox</b>
                    </p>
                }
            >
                <Mailbox 
                    mailbox='archive'
                    mails={mails} 
                    setMails={setMails} 
                    onMarkClick={onMarkClick} 
                    onUnmarkClick={onUnmarkClick} 
                />
            </InfiniteScroll>
        </>
    )
}

Archive.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Archive)