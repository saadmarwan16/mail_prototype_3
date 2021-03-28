import axios from 'axios'
import { MAILBOX_LOADING, MAILBOX_LOAD_SUCCESS, MAILBOX_LOAD_FAIL } from './types'

export const loadMailbox = (mails, setMails, setHasMore, nextNumber, setNextNumber, mailbox) => async dispatch => {
    dispatch({
        type: MAILBOX_LOADING,
        mailsLength: mails.length
    })

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_ROOT_URL}/api/emails/mailbox/${mailbox}/${nextNumber}`, 
            config
        )

        setMails([...mails, ...res.data.body])
        setHasMore(res.data.has_more)
        setNextNumber(res.data.next_number)

        dispatch({
            type: MAILBOX_LOAD_SUCCESS,
            mailsLength: mails.length
        })
    } catch(_err) {
        dispatch({
            type: MAILBOX_LOAD_FAIL,
            mailsLength: mails.length
        })
    }
}