export function change(){
	return {type: 'CHANGE'}
}

export const Loading = (loadingState) => {
	return {
		type: 'LOADING',
		loadingState
	}
}






