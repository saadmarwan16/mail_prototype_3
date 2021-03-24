import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Inbox = () => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('inbox', setMails)
    }, [])

    // const onMouseEnter = (e) => {
    //     e.target.querySelector('.main__mail__content__timestamp').style.display = 'none'
    //     e.target.querySelector('.main__mail__content__icons').style.display = 'flex'
    // }

    // const onMouseLeave = (e) => {
    //     e.target.querySelector('.main__mail__content__icons').style.display = 'none'
    //     e.target.querySelector('.main__mail__content__timestamp').style.display = 'block'
    // }

    // const onDeleteClick = (e, id, mails, setMails)

    return (
        <>
            <Helmet>
                <title>Inbox - Mail</title>

                <meta name="Access all your inbox mails here" content="Inbox page" />
            </Helmet>

            <h3 className="main__name">Inbox</h3>

            <Mailbox 
                mailbox='inbox'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

export default Inbox