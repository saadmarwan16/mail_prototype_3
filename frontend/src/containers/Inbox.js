import React, { useState, useEffect} from 'react'
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

const Inbox = ({ isAuthenticated, logout }) => {
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
            axios.get(`http://127.0.0.1:5000/api/emails/mailbox/inbox/${nextNumber}`, config)
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

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <>
            <Helmet>
                <title>Inbox - Mail</title>

                <meta name="Access all your inbox mails here" content="Inbox page" />
            </Helmet>

            <h3 className="main__name">Inbox</h3>

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
                        <b>No more mails in your inbox</b>
                    </p>
                }
            >
                <Mailbox 
                    mailbox='inbox'
                    mails={mails} 
                    setMails={setMails} 
                    onMarkClick={onMarkClick} 
                    onUnmarkClick={onUnmarkClick} 
                />
            </InfiniteScroll>
        </>
    )
}

Inbox.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Inbox)