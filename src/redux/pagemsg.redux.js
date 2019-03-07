import axios from 'axios'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN =' LOGIN'
const REQUIREFLOOR = 'REQUIREFLOOR'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const pagefloorState = {
	floors: [
	],
}
//floor,author,date,hoter,isreply,replyfloormsg,replymsg
//reducer

export function pagemsg (state=pagefloorState,action){

      switch (action.type) {
				case REQUIREFLOOR:
					return Object.assign({}, state, {
		                floors: action.data,			//登路reduer
		            })
        default:
          return state;
      }
}


function requireSuccess(obj){
	const data = obj
	console.log(data);
	return {type:REQUIREFLOOR,data}
}
function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}

export function requireFloor (msg) {
	console.log(msg);
	return dispatch=> {
		axios.post('http://localhost:8089/requirefloor',msg)
			.then(res=>{
				if(res.status == 200 ){
						console.log(res.data);
						dispatch(requireSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
