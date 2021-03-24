import axios from 'axios'

export default function getMails(mailbox, setMails) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    try {
        axios.get(`http://127.0.0.1:5000/api/emails/mailbox/${mailbox}`, config)
        .then(res => {
            setMails(res.data)
        })
    } catch(_err) {}
}