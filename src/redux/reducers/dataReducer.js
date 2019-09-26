import { 
    SET_SCREAMS,
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM, 
    POST_SCREAM,
    SUBMIT_COMMENT,
} from "../types";

const initialState = {
    screams: [],
    scream:[],
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case SET_SCREAMS:
            console.log(action.payload)
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LOADING_DATA:
            return{
                ...state,
                loading:true
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let uindex = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId)
            state.screams[uindex] = action.payload
            console.log(action.payload)
            if(state.scream.screamId === action.payload.screamId){
                let com = state.scream.comments
                console.log(com)
                state.scream = action.payload
                if(com){
                state.scream.comments = com}
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            let dindex = state.screams.findIndex(scream=>scream.screamId === action.payload)
            state.screams.splice(dindex,1)
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case SUBMIT_COMMENT:
            let commentCount = state.scream.commentCount
            commentCount += 1
            return{
                ...state,
                scream:{
                    ...state.scream,
                    comments:[action.payload,...state.scream.comments],
                    commentCount:commentCount
                }
            }
        default:
            return state
    }
}