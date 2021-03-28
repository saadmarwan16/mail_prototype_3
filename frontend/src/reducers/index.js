import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import mailbox from './mailbox'

export default combineReducers({
    alert,
    auth,
    mailbox
})