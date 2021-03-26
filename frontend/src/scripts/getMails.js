import axios from 'axios'

export default function getMails(mailbox, mails, setMails, morePages, setMorePages) {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    try {
        axios.get(`http://127.0.0.1:5000/api/emails/mailbox/${mailbox}/${morePages.nextNumber}`, config)
        .then(res => {
            setMails([...mails, ...res.data.body])
            setMorePages({...morePages, [morePages.hasMore]: res.data.has_more})
            setMorePages({...morePages, [morePages.nextNumber]: res.data.next_number})
        })
    } catch(_err) {}
}