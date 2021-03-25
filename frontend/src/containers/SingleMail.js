import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

const SingleMail = (props) => {
    const id = props.match.params.id
    const mailbox = props.match.params.mailbox

    const [email, setEmail] = useState({})

    useEffect(() => {
        const fetchEmail = () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            try {
                axios.get(`http://127.0.0.1:5000/api/emails/email/${id}`, config)
                .then(res => {
                    setEmail(res.data)
                })
            } catch(_err) {}
        }

        fetchEmail()
    }, [id])

    return (
        <>
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
                            <Link className="main__commands__icon" title="Delete" to={`/${mailbox}`}>
                                <i className="material-icons main__commands__icon__inner">delete</i>
                            </Link>
                            <Link className="main__commands__icon" title="Mark as unread" to={`/${mailbox}`}>
                                <i className="material-icons main__commands__icon__inner">mark_email_unread</i>
                            </Link>
                            <Link className="main__commands__icon" title="Archive" to={`/${mailbox}`}>
                                <i className="material-icons main__commands__icon__inner">archive</i>
                            </Link>
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
        </>
    )
}

export default SingleMail