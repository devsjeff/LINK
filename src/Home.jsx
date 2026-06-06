import { useNavigate ,useParams } from "react-router-dom";

function Home (){
    const naviage = useNavigate()
    // naviage("/about")
    const params = useParams()


   return(

      <>

         <input ref={inputref} />

         <button
            onClick={()=>{
               inputref.current.focus()
            }}
         >
            Focus
         </button>

      </>

   )
}
export default Home