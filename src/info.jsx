import { useState , useEffect } from "react";

// function Heading(props) {
//   return (
//     <h1>
//       hello {props.name} your age is {props.age}
//     </h1>
//   );
// }

// function App() {

//   const [users, setUsers] = useState([
//     { name: "dev", age: 0 },
//     { name: "devan", age: 0 },
//     { name: "devil", age: 0 },
//     { name: "devesh", age: 0 }
//   ]);

//   function increaseAge(index) {

//     const copy = [...users];

//     copy[index].age += 1;

//     setUsers(copy);
//   }

//   return (
//     <>
//       {users.map((user, index) => (
//         <div key={index}>

//           <Heading
//             name={user.name}
//             age={user.age}
//           />

//           <button
//             onClick={() => increaseAge(index)}
//           >
//             increase Age
//           </button>

//         </div>
//       ))}
//     </>
//   );
// }

// export default App;