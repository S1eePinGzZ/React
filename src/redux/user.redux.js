import axios from 'axios'
let username = sessionStorage.getItem('username')?sessionStorage.getItem('username'):'';
let pagenum = sessionStorage.getItem('pagenum')?sessionStorage.getItem('pagenum'):'';
let sign = sessionStorage.getItem('sign')?sessionStorage.getItem('sign'):'';
let register_date = sessionStorage.getItem('register_date')?sessionStorage.getItem('register_date'):'';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const CHANGENUM = 'CHANGENUM'
const LOGIN =' LOGIN'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const PUTPAGE ='PUTPAGE'
const REGISTER = 'REGISTER'
const CHANGECARD = 'CHANGECARD'
let userState = {
	infotext : '',
	username,
	pagenum,
	sign,//userimg路径需要改变
	register_date
}

//reducer

export function user (state=userState,action){

      switch (action.type) {
        case LOGIN:
					sessionStorage.setItem('username', action.data.username);
					sessionStorage.setItem('pagenum', action.data.pagenum);
					sessionStorage.setItem('sign', action.data.sign);
					sessionStorage.setItem('register_date', action.data.register_date);
          return Object.assign({}, state, {
                username: action.data.username,			//登路reduer
								infotext : '登录成功',
								pagenum : action.data.pagenum,
								sign: action.data.sign,
								register_date: action.data.register_date
						})

        case LOGOUT:
				sessionStorage.setItem('username', '');
				sessionStorage.setItem('pagenum', '');
				sessionStorage.setItem('sign', '');
				sessionStorage.setItem('register_date', '');
          return Object.assign({},state,{    //登出reducer
                username: "",
								pwd:'',
								sign:'',
								hoter:'',
								register_date:'',
          })

					case CHANGENUM:
	          return Object.assign({}, state, {
	                pagenum: action.num,			//登路reduer
	            })

				case REGISTER:
					return Object.assign({},state,{
								infotext : action.data,
					})

				case PUTPAGE:
					return Object.assign({},state,{
								infotext : action.data,
					})

				case CHANGECARD:
					return Object.assign({},state,{
								infotext : action.data,
					})

					case ERROR_MSG:
						return Object.assign({},state,{
									infotext : action.msg,
						})
        default:
          return state;
      }
}


function errorMsg(msg){
	return {msg,type:ERROR_MSG}
}

function authSuccess(obj){
	alert(obj.infotext);
	if(obj.infotext == '登录成功'){
		window.location.href="http://127.0.0.1:3000"
	}
	console.log(obj);
	const data = obj;
	return {type:LOGIN,data}
}

function registerSuccess(obj){
	alert(obj);
	if(obj=='登录成功'){
		window.location.href="http://127.0.0.1:3000"
	}
	const data = obj;
	return {type:REGISTER,data}
}

function putSuccess(obj){
	window.location.reload()
	const data = obj;
	return {type:PUTPAGE,data}
}

function cardSuccess(obj){
	window.location.reload()
	const data = obj;
	return {type:CHANGECARD,data}
}



export function changenumSubmit (num){
	console.log(num);
	return {
		type:CHANGENUM,
		num
	}
}

export function registerSubmit(usermsg){
	return dispatch=>{
		axios.post('http://localhost:8089/register',usermsg)
			.then(res=>{
				if(res.status == 200 ){
						console.log(res.data);
						dispatch(registerSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}

}

export function loginSubmit(usermsg){
	return dispatch=>{
		axios.post('http://localhost:8089/login',usermsg)
			.then(res=>{

				if(res.status == 200 ){
						console.log(res.data);
						dispatch(authSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function newpageSubmit(pagemsg){

	return dispatch=>{
		if(pagemsg.author!='')
		{
			axios.post('http://localhost:8089/newpage',pagemsg)
				.then(res=>{
					if(res.status == 200 ){
							console.log(res.data);
							dispatch(putSuccess(res.data))
					}else{
							dispatch(errorMsg(res.data.msg))
					}
				})
		}
		else{
			dispatch(errorMsg('请先登录'))
		}
	}
}

export function changecardSubmit(cardmsg){
	return dispatch=>{
		axios.post('http://localhost:8089/changecard',cardmsg)
			.then(res=>{
				if(res.status == 200 ){
						console.log(res.data);
						dispatch(cardSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function logoutSubmit ()  {
  return {
    type: LOGOUT
  }
}
