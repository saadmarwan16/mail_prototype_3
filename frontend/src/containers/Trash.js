import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import Mailbox from '../components/Mailbox'
import Layout from '../hocs/Layout'
import { loadMailbox } from '../actions/mailbox'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Trash = ({ isAuthenticated, logout, loadMailbox, mailboxLoading, isMailboxSwitched }) => {
    const [mails, setMails] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [nextNumber, setNextNumber] = useState(1)

    useEffect(() => {
        loadMailbox(mails, setMails, setHasMore, nextNumber, setNextNumber, 'trash')
        // eslint-disable-next-line
    }, [])

    if (!isAuthenticated) {
        logout()
        return <Redirect to="/logout" />
    }

    return (
        <Layout>
            <Helmet>
                <title>Trash - Mail</title>

                <meta name="Access all your trashed mails here" content="Trash page" />
            </Helmet>

            <h3 className="main__name">Trash</h3>

            {!mailboxLoading && isMailboxSwitched && mails.length === 0 ? (
                <div className="main__empty">Your trash mailbox is empty</div>
            ) : (
                <InfiniteScroll
                    dataLength={mails.length}
                    next={() => loadMailbox(mails, setMails, setHasMore, nextNumber, setNextNumber, 'trash')}
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
                            <b>No more mails in your trash mailbox</b>
                        </p>
                    }
                >
                    <Mailbox 
                        mailbox='trash'
                        mails={mails} 
                        setMails={setMails} 
                        onMarkClick={onMarkClick} 
                        onUnmarkClick={onUnmarkClick} 
                    />
                </InfiniteScroll>
            )}
        </Layout>
    )
}

Trash.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    loadMailbox: PropTypes.func.isRequired,
    mailboxLoading: PropTypes.bool.isRequired,
    isMailboxSwitched: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    mailboxLoading: state.mailbox.mailboxLoading,
    isMailboxSwitched: state.mailbox.isMailboxSwitched
})

export default connect(mapStateToProps, { logout, loadMailbox })(Trash)