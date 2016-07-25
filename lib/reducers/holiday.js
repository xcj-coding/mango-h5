import Immutable,{List,Map,fromJS} from 'immutable';

const MgInitState = fromJS({
    XXX: false,
	YYY: true,
});

const Holiday = (state = MgInitState,action)=>{
    switch(action.type){
        case "XXX" :
            state = state.mergeIn(['XXX'],action.data);
            return state;
        case "YYY" :
            state = state.mergeIn(['YYY'],action.data);
        	return state;
        default : 
            return state;
    }
}

export default Holiday;
