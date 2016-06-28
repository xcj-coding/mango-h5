export const reducer = (state=false,action)=>{
	switch(action.type){
		case 'CHANGE' : 
			return !state;
		default : 
			return state;
	}
}
