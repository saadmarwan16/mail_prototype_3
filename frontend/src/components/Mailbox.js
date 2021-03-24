import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Mailbox = ({ mailbox, mails, setMails, onMarkClick, onUnmarkClick }) => {
    return (
        <div className="list-group">
            {mails.map((item, index) => {
                return (

                    <Link className="main__mail" key={index} to={`/${mailbox}/${item.id}`} mailbox={mailbox}>
                        <div className="main__mail__sender">{item.sender}</div>

                        <div className="main__mail__content">
                            <div>
                                <span className="main__mail__content__subject">{item.subject}</span>
                                <span className="main__mail__content__dash"> - </span>
                                <span className="main__mail__content__body">{item.body}</span>
                            </div>

                            <div>
                                <div className="main__mail__content__timestamp">
                                    <small>{item.timestamp}</small>
                                </div>

                                <div className="main__mail__content__icons">
                                    <i title="Delete" 
                                        className="material-icons main__mail__content__icons__icon" 
                                        onClick={(e) => onMarkClick(e, item.id, 'trashed', mails, setMails)}>
                                            delete
                                    </i>
                                    <i title="Archive" 
                                        className="material-icons main__mail__content__icons__icon" 
                                        onClick={(e) => onMarkClick(e, item.id, 'archived', mails, setMails)}>
                                            archive
                                    </i>
                                    <i title="Mark as read" 
                                        className={`material-icons main__mail__content__icons__icon 
                                        ${item.read ? 'hide' : ''}`} 
                                        onClick={(e) => onMarkClick(e, item.id, 'read', mails, setMails)}>
                                            mark_email_read
                                    </i>
                                    <i title="Mark as unread" 
                                        className={`material-icons main__mail__content__icons__icon 
                                        ${item.read ? '' : 'hide'}`} 
                                        onClick={(e) => onUnmarkClick(e, item.id, 'read', mails, setMails)}>
                                            mark_email_unread
                                    </i>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

Mailbox.propTypes = {
    mailbox: PropTypes.string.isRequired,
    mails: PropTypes.array.isRequired,
    setMails: PropTypes.func.isRequired,
    onMarkClick: PropTypes.func.isRequired,
    onUnmarkClick: PropTypes.func.isRequired
}

export default Mailbox