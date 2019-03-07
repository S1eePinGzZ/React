//合并所有的reducer ，并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { pagelist } from './redux/pagelist.redux'
import { pagemsg } from './redux/pagemsg.redux'
import { reply } from './redux/reply.redux'
import { master } from './redux/master.redux'
import { newpage } from './redux/newpage.redux'

export default combineReducers({newpage,user,pagelist,pagemsg,reply,master})
