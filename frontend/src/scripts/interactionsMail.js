import axios from 'axios'

export function onMarkClick(target, id, action, mails, setMails) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    } 
    
    const body = JSON.stringify({
        [action]: true
    })

    try {
        axios.put(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/email/${id}`, body, config)
        .then(_res => {
            if (action === 'read') {
                for (let i = 0; i < mails.length; i++) {
                    if (mails[i].id === id) {
                        const newMails = [...mails]
                        newMails[i] = {...newMails[i], read: true}
                        setMails(newMails)
                        return
                    }
                }
            }

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
        [action]: false
    })

    try {
        axios.put(`${process.env.REACT_APP_API_ROOT_URL}/api/emails/email/${id}`, body, config)
        .then(_res => {
            if (action === 'read') {
                for (let i = 0; i < mails.length; i++) {
                    if (mails[i].id === id) {
                        const newMails = [...mails]
                        newMails[i] = {...newMails[i], read: false}
                        setMails(newMails)
                        return
                    }
                }
            }

            target.style.animationPlayState = 'running'
            target.addEventListener('animationend', () => {
                setMails(mails.filter((mail) => mail.id !== id))
            })
        })
    } catch(_err) {}
}