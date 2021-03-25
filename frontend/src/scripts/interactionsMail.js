import axios from 'axios'

export function onMarkClick(target, id, action, mails, setMails) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const body = JSON.stringify({
        action: true
    })

    try {
        axios.put(`http://127.0.0.1:5000/api/emails/email/${id}`, body, config)
        .then(_res => {
            if (action === 'read') return

            target.style.animationPlayState = 'running'
            target.addEventListener('animationend', () => {
                setMails(mails.filter((mail) => mail.id !== id))
            })
        })
    } catch(_err) {}
}

export function onUnmarkClick(target, id, action, mails, setMails) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const body = JSON.stringify({
        action: false
    })

    try {
        axios.put(`http://127.0.0.1:5000/api/emails/email/${id}`, body, config)
        .then(_res => {
            if (action === 'read') return

            target.style.animationPlayState = 'running'
            target.addEventListener('animationend', () => {
                setMails(mails.filter((mail) => mail.id !== id))
            })
        })
    } catch(_err) {}
}