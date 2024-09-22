
export const getProducts = ()=>async(dispatch)=>{
    try{
        const data = await fetch('/getProducts',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const res = await data.json();
        console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS", payload: res}) 
    }catch(error){
        dispatch({type:"FAILED_GET_PRODUCTS", payload: error.response})
    }
}