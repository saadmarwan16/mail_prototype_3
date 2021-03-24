import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Mailbox from '../components/Mailbox'
import getMails from '../scripts/getMails'
import { onMarkClick, onUnmarkClick } from '../scripts/interactionsMail'

const Trash = () => {
    const [mails, setMails] = useState([])

    useEffect(() => {
        getMails('trash', setMails)
    }, [])

    return (
        <>
            <Helmet>
                <title>Trash - Mail</title>

                <meta name="Access all your trashed mails here" content="Trash page" />
            </Helmet>

            <h3 className="main__name">Trash</h3>

            <Mailbox 
                mailbox='trash'
                mails={mails} 
                setMails={setMails} 
                onMarkClick={onMarkClick} 
                onUnmarkClick={onUnmarkClick} 
            />
        </>
    )
}

export default Trash