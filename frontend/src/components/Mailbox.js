import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Mailbox = ({ mailbox, mails, setMails }) => {
    const onIconClick = (e, id) => {
        if (e.target.classList.contains('main__mail__content__icons__icon')) {
            e.preventDefault()
            const target = e.target.parentNode.parentNode.parentNode.parentNode

            if (e.target.innerText === 'delete') {
                onMarkClick(target, id, 'trashed', mails, setMails)
            } else if (e.target.innerText === 'restore_from_trash') {
                onUnmarkClick(target, id, 'trashed', mails, setMails)
            } else if (e.target.innerText === 'archive') {
                onMarkClick(target, id, 'archived', mails, setMails)
            } else if (e.target.innerText === 'unarchive') {
                onUnmarkClick(target, id, 'archived', mails, setMails)
            } else if (e.target.innerText === 'mark_email_read') {
                onMarkClick(target, id, 'read', mails, setMails)
            } else if (e.target.innerText === 'mark_email_unread') {
                onUnmarkClick(target, id, 'read', mails, setMails)
            }
        }
    }

    return (
        <div className="list-group">
            {mails.map(item => {
                return (

                    <Link className={`main__mail ${item.read ? 'main__read' : ''}`} key={item.id} to={`/${mailbox}/${item.id}`} 
                        onClick={(e) => onIconClick(e, item.id)}>
                        <div className="main__mail__sender-timestamp">
                            <div className="main__mail__sender-timestamp__sender">{item.sender}</div>
                            <div className="main__mail__sender-timestamp__timestamp">
                                <small>{item.timestamp}</small>
                            </div>
                        </div>

                        <div className="main__mail__content">
                            <div className="main__mail__content__subject-body">
                                <span className="main__mail__content__subject-body__subject">{item.subject}</span>
                                <span className="main__mail__content__subject-body__dash"> - </span>
                                <span className="main__mail__content__subject-body__body">{item.body}</span>
                            </div>

                            <div>
                                <div className="main__mail__content__icons">
                                    {mailbox === 'archive' || mailbox === 'trash' ? null : (
                                        <i title="Delete" 
                                            className="material-icons main__mail__content__icons__icon" 
                                        >
                                            delete
                                        </i>
                                    )}

                                    {mailbox === 'trash' ? (
                                        <i title="Restore from trash" 
                                            className="material-icons main__mail__content__icons__icon"
                                        >
                                            restore_from_trash
                                        </i>
                                    ) : null}

                                    {mailbox === 'trash' || mailbox === 'sent' || mailbox === 'archive' ? null : (
                                        <i title="Archive" 
                                            className="material-icons main__mail__content__icons__icon" 
                                        >
                                            archive
                                        </i>
                                    )}

                                    {mailbox === 'archive' ? (
                                        <i title="Unarchive" 
                                            className="material-icons main__mail__content__icons__icon"
                                        >
                                            unarchive
                                        </i>
                                    ) : null}

                                    <i title="Mark as read" 
                                        className={`material-icons main__mail__content__icons__icon 
                                        ${item.read ? 'hide' : ''}`} 
                                    >
                                        mark_email_read
                                    </i>

                                    <i title="Mark as unread" 
                                        className={`material-icons main__mail__content__icons__icon 
                                        ${item.read ? '' : 'hide'}`} 
                                    >
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
}

export default Mailbox