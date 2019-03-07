import axios from 'axios'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN =' LOGIN'
const REQUIREPAGE = 'REQUIREPAGE'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const pagelistState = {
	pagelist:[],
	pagenum : null
}

//reducer

export function pagelist (state=pagelistState,action){

      switch (action.type) {

				case REQUIREPAGE:
					return Object.assign({}, state, {
                pagelist: action.data,			//登路reduer
            })

        default:
          return state;
      }
}

function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}

function requireSuccess(obj){
	const data = obj
	console.log(data);
	return {type:REQUIREPAGE,data}
}


export function requiremasterpage (msg) {
	console.log(msg);
	return dispatch=> {
		axios.post('http://localhost:8089/requiremasterpage',msg)
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

export function requirereplypage (msg) {
	console.log(msg);
	return dispatch=> {
		axios.post('http://localhost:8089/requirereplypage',msg)
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


export function requirePagelist (msg) {
	console.log(msg);
	if(msg.page == '0')
	{
		msg.page =1;
	}
	console.log(msg);
	return dispatch=> {
		axios.post('http://localhost:8089/requirepage',msg)
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
