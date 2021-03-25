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

            // switch(e.target.innerText) {
            //     case 'delete':
            //         onMarkClick(target, id, 'trashed', mails, setMails)
            //         return
            //     case 'restore_from_trash':
            //         onUnmarkClick(target, id, 'trashed', mails, setMails)
            //         return
            //     case 'archive':
            //         onMarkClick(target, id, 'archived', mails, setMails)
            //         return
            //     case 'unarchive':
            //         onUnmarkClick(target, id, 'archived', mails, setMails)
            //         return
            //     case 'mark_email_read':
            //         onMarkClick(target, id, 'read', mails, setMails)
            //         return
            //     case 'mark_email_unread':
            //         onUnmarkClick(target, id, 'read', mails, setMails)
            //         return
            //     default:
            //         return
            // }
        }
    }

    return (
        <div className="list-group">
            {mails.map(item => {
                return (

                    <Link className="main__mail" key={item.id} to={`/${mailbox}/${item.id}`} 
                        onClick={(e) => onIconClick(e, item.id)}>
                        <div className="main__mail__sender-timestamp">
                            <div className="main__mail__sender-timestamp__sender">{item.sender}</div>
                            <div className="main__mail__sender-timestamp__timestamp">
                                <small>{item.timestamp}</small>
                            </div>
                        </div>

                        <div className="main__mail__content">
                            <div>
                                <span className="main__mail__content__subject">{item.subject}</span>
                                <span className="main__mail__content__dash"> - </span>
                                <span className="main__mail__content__body">{item.body}</span>
                            </div>

                            <div>
                                {/* <div className="main__mail__content__timestamp">
                                    <small>{item.timestamp}</small>
                                </div> */}

                                <div className="main__mail__content__icons">
                                    <i title="Delete" 
                                        className="material-icons main__mail__content__icons__icon" 
                                    >
                                        delete
                                    </i>
                                    <i title="Archive" 
                                        className="material-icons main__mail__content__icons__icon" 
                                    >
                                        archive
                                    </i>
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