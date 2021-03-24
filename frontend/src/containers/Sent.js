import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Sent = () => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('sent', setMails)
    }, [])

    return (
        <>
            <Helmet>
                <title>Sent - Mail</title>

                <meta name="Access all your sents mails here" content="Sent page" />
            </Helmet>

            <h3 className="main__name">Sent</h3>

            <Mailbox 
                mailbox='sent'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

export default Sent