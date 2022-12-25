import { GETDATA, POSTDATA, SIDEDATA, SINGLEDELETE, SINGLEGET } from "./blogpost.types"






const initial={
    wholedata:[],
    data:[],
    category:[],
    message:"",
    postdata:[]

}
 export const blogReducer=(state=initial,{type,payload})=>{
    switch(type){
        case GETDATA:{
           console.log("whole",payload)
            return{
                ...state,wholedata:payload,message:""
            }
        }
        case SINGLEGET:{
            console.log("reducer",payload)
            return{
                ...state,data:payload,message:""
            }
        }
        case SIDEDATA:{
            console.log("category",payload)
             return{
                 ...state,category:payload
             }
         }
         case POSTDATA:{
            console.log(payload,"reducer");
             return{
                 ...state,message:payload.message,postdata:payload.post
             }
         }
         case SINGLEDELETE:{

            return{
                ...state,message:payload
            }
         }
        default :return state

    }
 }