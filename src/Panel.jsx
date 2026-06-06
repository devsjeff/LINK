import {createElement, useState} from "react"
import colors from "tailwindcss/colors";
// we are going to make a panel for lets say showing  product 

function ProductPanel({url , img_Alt , Product_name , price , description}){
    return(
        <div className="container" >
        <div className="card">
        <img src={url} alt={img_Alt} />
        <h3> {Product_name}</h3>
        <h5>price : {price} </h5>
        <p> product details : {description} </p>
        </div> 
        <div className="card" >
        <img src={url} alt={img_Alt} />
        <h3> {Product_name}</h3>
        <h5>price : {price} </h5>
        <p> product details : {description} </p>
        </div> 
        <div className="card" >
        <img src={url} alt={img_Alt} />
        <h3> {Product_name}</h3>
        <h5>price : {price} </h5>
        <p> product details : {description} </p>
        </div> 
        </div>

    )

}
function ProductPanelMobile({url , img_Alt , Product_name , price , description}){
    return(
        <div className="container" >
        <div className="card">
        <img src={url} alt={img_Alt} />
        <h3> {Product_name}</h3>
        <h5>price : {price} </h5>
        <p> product details : {description} </p>
        </div> 
        <div className="card" >
        <img src={url} alt={img_Alt} />
        <h3> {Product_name}</h3>
        <h5>price : {price} </h5>
        <p> product details : {description} </p>
        </div> 
        </div>
    )
}


const users = [
  { id: 1, name: "Devendra", city: "Mumbai" },
  { id: 2, name: "Arjun", city: "Delhi" },
  { id: 3, name: "Priya", city: "Bangalore" },
];
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
  ]);

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}


function Todolistt (){

const lidy =[
  {id : 34 , names: "x"} , {id : 4 , names: "j"}
]
let [now , setnow] = useState(lidy)

function update (id){ 
  setnow(now.filter((x) => x.id !== id))
 }

 return (
  <>
    {now.map((item) => (
      <ul>
        <li style={{color:"yellow"}} >{item.id} and {item.names}</li>
        <button onClick={() => {update(item.id); color() ;}}>delete</button>
      </ul>
    ))}
  </>
)
}


let textColors = ["red", "blue", "green", "yellow"]
let bgColors = ["purple", "orange", "teal", "hotpink"]
let colorcount = 0
let back = 0
function color(){
  if (colorcount === 5){
    colorcount = 0
  }
  document.body.style.color = textColors[colorcount]
  colorcount += 1

}
setInterval(color,1000)
// function colorr(){
//   if (back === 5){
//     back = 0
//   }
//   document.body.style.backgroundColor = bgColors[back]
//   back += 1

// }
// setInterval(colorr,3600)

function Ccard({ children }) {
  return (
    <div style={{
      border: "1px solid gray",
      padding: "20px"
    }}>
      {children}
    </div>
  );
}

function AApp() {
  return (
    <>
      <Ccard>
        <h1>Hello</h1>
      </Ccard>

      <Ccard>
        <button>Buy</button>
      </Ccard>
    </>
  );
}

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        // key goes here — on the element returned from .map()
        <li key={user.id}>
          {user.name} — {user.city}
        </li>
      ))}
    </ul>
  );
}
function windoww (){
    return `your window width is ${window.innerWidth} and i also know you are using
    ${navigator.userAgent.includes("sodg")
    ? "edge"
    : "crome" }` 
}
function CodeBox({data = windoww()}) {
    let [start , update] = useState("")
  return ( <> <h3 style={{color : "red" ,fontSize : "9px" }} >{start}</h3>

    <div className="codebox">
    

      <div className="topbar">


        <p>CSS styles </p>
        
        

        <button
  onMouseEnter={() => {

    document.body.innerHTML = ""

    document.body.style.backgroundColor = "white"

    document.body.style.display = "flex"

    document.body.style.justifyContent = "center"

    document.body.style.alignItems = "center"

    document.body.style.height = "100vh"

    let el = document.createElement("p")

    el.innerText = "you are hacked"

    el.style.color = "white"

    el.style.textShadow = `
    1px 1px 0 #999,
    2px 2px 0 #888,
    3px 3px 0 #777,
    4px 4px 0 #666,
    5px 5px 10px black
    `

    el.style.fontSize = "80px"

    document.body.append(el)

    // el.animate(

    //   [
    //     { transform: "scale(1)" },

    //     { transform: "scale(2)" }

    //   ],

    //   {
    //     duration: 1000,

    //     iterations: Infinity,

    //     direction: "alternate",

    //     easing: "ease-in-out"
    //   }

    // )

  }}
>
  Hover me 😈
</button>
       

      </div>

      <code>
        copy this code by click on that button 
      </code>
      

    </div> 
    
    
    <UserList/> <TodoList/>   <Todolistt/>
    <AApp/><AApp/><AApp/>
    </>

  );
}


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Appp() {
  return (
    <BrowserRouter>

      <Link to="/">Home</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </BrowserRouter>
  );
}



export {ProductPanel , CodeBox};
