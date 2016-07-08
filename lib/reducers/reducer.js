const MgInitState = {
	LOADINGTIP: {Loading:false},
	LOGINFAILURE: false,
	LOANCONFIG:{}
};


export const reducer = (state=false,action)=>{
    switch(action.type){
        case 'CHANGE' : 
            return !state;
        case "LOADING"://loading提示
        	state = state.mergeIn(['LOADINGTIP'],action.data);
        	return state;
        default : 
            return state;
    }
}

export default reducer;
