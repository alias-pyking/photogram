const initialState = {
    posts:'not loaded'
}
const reducer = (state = initialState, action) =>{
    if(action.type === 'LOADPOSTS'){
        return {
            ...state,
            posts:'Loaded',
        }
    }
    return state;
};

export default reducer;