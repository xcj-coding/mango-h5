export function change(){
	return {type: 'CHANGE'}
}

export const loadingTip = (loadingState=true) => {
	return {
		type: 'LOADING',
		loadingState
	}
}

// export const Loading = (loadingState) => {
// 	return {
// 		type: 'LOADING',
// 		loadingState
// 	}
// }





