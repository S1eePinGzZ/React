import axios from 'axios'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const NEWPAGE = 'NEWPAGE'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const newpageState = {
	author : '',
  title : '',
  class : '',
  text : '',
	date : ''
}

//reducer

export function newpage (state=newpageState,action){

      switch (action.type) {
        case NEWPAGE:
          return Object.assign({}, state, {
                author: action.pagemsg.author,			//登路reduer
                title: action.pagemsg.title,
                class : action.pagemsg.class,
                text : action.pagemsg.text,
								date : action.pagemsg.date,
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

function putSuccess(obj){
	alert(obj);

	const data = obj
	return {type:NEWPAGE,data}
}


export function newpageSubmit(pagemsg){

	return dispatch=>{
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
}
