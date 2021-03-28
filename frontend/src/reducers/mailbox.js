import { MAILBOX_LOADING, MAILBOX_LOAD_SUCCESS, MAILBOX_LOAD_FAIL } from '../actions/types'

const initialState = {
    mailboxLoading: true,
    isMailboxSwitched: false
}

// eslint-disable-next-line
export default function(state=initialState, action) {
    const { type, mailsLength } = action

    switch(type) {
        case MAILBOX_LOADING:
            return {
                ...state,
                mailboxLoading: true,
                isMailboxSwitched: false
            }
        case MAILBOX_LOAD_SUCCESS:
            return {
                ...state,
                mailboxLoading: false,
                isMailboxSwitched: mailsLength === 0
            }
        case MAILBOX_LOAD_FAIL:
            return {
                ...state,
                mailboxLoading: false,
                isMailboxSwitched: false
            }
        default:
            return state
    }
}