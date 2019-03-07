import axios from 'axios'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN =' LOGIN'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const MASTER_SUCCESS = 'MASTER_SUCCESS'
const masterState = {
	mastername:'',
  allpagenum : '',
	sign:'',
  userimg:'./../../img/head.jpg', 	//userimg路径需要改变
	register_date:''
}

//reducer

export function master (state=masterState,action){

      switch (action.type) {
        case MASTER_SUCCESS:
          return Object.assign({}, state, {
                mastername : action.data.name,			//登路reduer
								allpagenum : action.data.pagenum,
								sign : action.data.sign,
								register_date : action.data.register_date
						})

        case LOGOUT:
          return Object.assign({},state,{    //登出reducer
                username: "",
								pwd:'',
								sign:'',
								hoter:'',
								register_date:'',
          })
        default:
          return state;
      }
}


function errorMsg(msg){
	return {msg,type:ERROR_MSG}//return {type:ERROR_MSG,msg:msg}
}
function getmasterSuccess(obj){
	//过滤密码
	console.log(obj);
	const data = obj;
	return {type:MASTER_SUCCESS,data}
}


export function requiremaster(mastermsg){
	return dispatch=>{
		axios.post('http://localhost:8089/requiremaster',mastermsg)
			.then(res=>{

				if(res.status == 200 ){
						console.log(res.data);
						dispatch(getmasterSuccess(res.data))
				}else{
						dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
