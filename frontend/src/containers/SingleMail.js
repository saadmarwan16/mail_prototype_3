import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Layout from '../hocs/Layout'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsSingleMail'

const SingleMail = (props) => {
    const id = props.match.params.id
    const mailbox = props.match.params.mailbox

    const [email, setEmail] = useState({})
    const [isActionCompleted, setIsActionCompleted] = useState(false)

    const onIconClick = e => {
        if (e.target.innerText === 'delete') {
            onMarkClick(id, 'trashed')
        } else if (e.target.innerText === 'restore_from_trash') {
            onUnmarkClick(id, 'trashed')
        } else if (e.target.innerText === 'archive') {
            onMarkClick(id, 'archived')
        } else if (e.target.innerText === 'unarchive') {
            onUnmarkClick(id, 'archived')
        } else if (e.target.innerText === 'mark_email_unread') {
            onUnmarkClick(id, 'read')
        }

        setIsActionCompleted(true)
    }

    useEffect(() => {
        const fetchEmail = () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            try {
                axios.get(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/email/${id}`, config)
                .then(res => {
                    res.data.recipients = res.data.recipients.join()
                    res.data.recipients = res.data.recipients.replace(',', ', ')
                    setEmail(res.data)
                })
            } catch(_err) {}
        }

        fetchEmail()
    }, [id])

    if (isActionCompleted) return <Redirect to={`/${mailbox}`} />

    return (
        <Layout>
            <Helmet>
                <title>{`${email.subject} | ${mailbox.replace(/^\w/, (c) => c.toUpperCase())} - Mail`}</title>

                <meta name="Access a mail here" content="Single mail page" />
            </Helmet>

            <div className="container">
                <div>
                    <div className="row main__commands">
                        <div>
                            <Link className="main__commands__icon" title="Go back" to={`/${mailbox}`}>
                                <i className="material-icons main__commands__icon__inner">west</i>
                            </Link>

                            {mailbox === 'archive' || mailbox === 'trash' ? null : (
                                <button className="main__commands__icon" title="Delete" onClick={onIconClick}>
                                    <i className="material-icons main__commands__icon__inner">delete</i>
                                </button>
                            )}

                            {mailbox === 'trash' ? (
                                <button className="main__commands__icon" title="Restore from trash" onClick={onIconClick}>
                                    <i className="material-icons main__commands__icon__inner">restore_from_trash</i>
                                </button>
                            ) : null}
                            
                            
                            <button className="main__commands__icon" title="Mark as unread" onClick={onIconClick}>
                                <i className="material-icons main__commands__icon__inner">mark_email_unread</i>
                            </button>

                            {mailbox === 'trash' || mailbox === 'sent' || mailbox === 'archive' ? null : (
                                <button className="main__commands__icon" title="Archive" onClick={onIconClick}>
                                    <i className="material-icons main__commands__icon__inner">archive</i>
                                </button>
                            )}

                            {mailbox === 'archive' ? (
                                <button className="main__commands__icon" title="Unarchive" onClick={onIconClick}>
                                    <i className="material-icons main__commands__icon__inner">unarchive</i>
                                </button>
                            ) : null}
                        </div>
                    </div>
                    <div className="row main__subject-reply">
                        <h2>{email.subject}</h2>
                        <Link title="Reply" className="main__commands__icon" to="/compose">
                            <i className="material-icons main__commands__icon__inner">reply</i>
                        </Link>
                    </div>
                    <div className="main__meta">
                        <div className="main__meta__sender">Sender: {email.sender}</div>
                        <div className="main__meta__recipients">Recipient(s): {email.recipients}</div>
                        <div className="main__meta__timestamp">
                            <small>Timestamp: {email.timestamp}</small>
                        </div>
                    </div>
                    <div className="row main__body jumbotron">
                        <p className="main__body__content">{email.body}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleMail