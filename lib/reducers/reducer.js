// function counter(state = 0, action) {
//   switch (action.type) {
//   case 'INCREMENT':
//     return state + 1;
//   case 'DECREMENT':
//     return state - 1;
//   default:
//     return state;
//   }
// }

// export default counter;

// export const reducer = (state=false,action)=>{
// 	switch(action.type){
// 		case 'CHANGE' : 
// 			return !state;
// 		default : 
// 			return state;
// 	}
// }


export default function reducer(state,action){
	switch(action.type){
		case 'CHANGE' : 
			return !state;
		default : 
			return state;
	}
}