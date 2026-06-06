function Setter ({vvalue , setvvalue}){
    return(
    <>
   <input type="text" onMouseLeave={(e)=>{setvvalue(e.target.value)}} /> 
   <button type="submit" >submit</button>

    </>)
}
function View({vvalue}){
    return(
        <h1>{vvalue}</h1>

    )
}
export {Setter , View}