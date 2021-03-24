import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Archive = () => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('archive', setMails)
    }, [])

    return (
        <>
            <Helmet>
                <title>Archive - Mail</title>

                <meta name="Access all your archived mails here" content="Archive page" />
            </Helmet>

            <h3 className="main__name">Archive</h3>

            <Mailbox 
                mailbox='archive'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

export default Archive