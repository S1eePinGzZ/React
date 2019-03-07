import axios from 'axios'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REPLY = 'REPLY'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const REPLYSUCCESS = 'REPLYSUCCESS'
const LOGOUT ='LOGOUT'
const ReplymsgState = {
	isreply : false,				//isreply为true时是回复楼层
	reply_floor : null,
	reply_msg : '',
	reply_author : '',
	reply_title : '',
	infotext: ''
}

//和回复楼层共用同一个store，根据isreply判断
//reducer

export function reply (state=ReplymsgState,action){

      switch (action.type) {
        case REPLY:
          return Object.assign({}, state, {
                isreply: action.data.isreply,			//登路reduer
								reply_floor : action.data.reply_floor,
								reply_msg : action.data.reply_msg,
								reply_author : action.data.reply_author,
								reply_title : action.data.reply_title,
						})

        case REPLYSUCCESS:
          return Object.assign({},state,{    //登出reducer
						isreply : false,				//isreply为true时是回复楼层
						reply_floor : null,
						reply_msg : '',
						reply_author : '',
						reply_title : '',
          })
        default:
          return state;
      }
}

function replySuccess(obj){
	window.location.reload()
	const data = obj
	console.log(data);
	return {type:REPLYSUCCESS,data}
}
function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}


export function putreplySubmit (data) {
	console.log(data);
	return dispatch=> {
		axios.post('http://localhost:8089/putreply',data)
			.then(res=>{
				if(res.status == 200 ){
						console.log(res.data);
						dispatch(replySuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
