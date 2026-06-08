import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

// ─── Quick Review markdown ────────────────────────────────────────────────────
const quickReviewMD = `# ⚛️ React — Quick Review Notes
> Cover all 30 topics. Read in ~10 min.

---

## 🟢 BASICS (Topics 1–9)

### 1. What is React & SPA
- React is a UI library. Page **never fully reloads** — only components swap. This is called an **SPA (Single Page Application)**.
- Benefit: **Reusability** — write \`<Card/>\` once, use it 100 times.

### 2. Component
- A **reusable UI code block**. Just a JS function that returns JSX.
- Example: \`<Header/>\`, \`<Card/>\`, \`<Sidebar/>\`
- Rules: name must start with **Capital letter**. Must **return JSX**.

### 3. JSX
- **HTML-like syntax** written inside JavaScript.
- Uses \`{}\` to embed any JS expression: \`<p>{name}</p>\`
- Use \`className\` not \`class\`. Self-close tags: \`<img />\`.

### 4. Props
- Used to make components **dynamic**.
- Props = **object** passed from parent to child: \`<Card title="Hi" age={22} />\`
- Inside child: \`function Card({ title, age }) {}\`
- Props are **read-only** — never modify them.

### 5. useState
- Stores **state-changing data** inside a component.
- \`const [count, setCount] = useState(0)\`
- Always use the **setter** to update: \`setCount(count + 1)\`
- Can store anything: number, string, boolean, array, object.

### 6. Events
- Run a function when the user **does something**.
- Always **camelCase**: \`onClick\`, \`onChange\`, \`onSubmit\`
- Always **pass the function**, never call it: \`onClick={handleClick}\` ✅ NOT \`onClick={handleClick()}\` ❌

### 7. Conditional Rendering
- Show UI **based on a condition**.
- \`? :\` → two choices (if / else)
- \`&&\` → show or hide (if only)

### 8. List / Map
- Render **multiple items** using \`.map()\`:
  \`users.map(u => <p key={u.id}>{u.name}</p>)\`
- Every list item **needs a key** — use a unique id, not index.
- Key helps React **track** what changed.

### 9. Styling
- \`className="box"\` → external CSS file
- Inline style uses a JS **object**: \`style={{ color: "red", fontSize: 16 }}\`
- camelCase for CSS properties: \`backgroundColor\`, not \`background-color\`.

---

## 🟡 INTERMEDIATE (Topics 10–18)

### 10. useEffect
- Run **side effects** (fetch, timer, DOM changes) in a controlled way.
- \`useEffect(() => {}, [])\` → runs **once** on mount
- \`useEffect(() => {}, [x])\` → runs on mount **+ when x changes**
- \`useEffect(() => {})\` → runs on **every render** (usually avoid)
- Return a cleanup function to cancel timers/listeners on unmount.

### 11. Forms (Controlled Components)
- Input **controlled by React state**: \`value={text} onChange={(e) => setText(e.target.value)}\`
- Input goes → React reads it → React updates state → React re-renders input.
- Use \`e.preventDefault()\` on submit to stop page reload.
- One handler for all fields using \`e.target.name\`.

### 12. Lifting State Up
- If the **same data** is needed by multiple components → move state to their **common parent**.
- Parent holds useState, passes state + setter down as props.
- Children call the setter (passed as prop) to update parent state.

### 13. Composition
- **Component inside component** — build complex UI from simple pieces.
- \`props.children\` = whatever is between the opening and closing tags.
- Example: \`<Card><p>anything here</p></Card>\`

### 14. React Router
- Changes **page without reload**. Install: \`npm install react-router-dom\`
- \`<BrowserRouter>\` wraps the whole app.
- \`<Link to="/about">\` — changes URL on click (no reload).
- \`<Routes><Route path="/about" element={<About/>}/></Routes>\` — Router checks path → renders matching component.
- \`useNavigate()\` → navigate programmatically. \`useParams()\` → read URL params.

### 15. useRef
- **Direct connection/reference** to a DOM element or any value.
- Unlike state: changing ref does **NOT re-render** the component.
- \`const x = useRef(null)\` → \`<input ref={x}/>\` → access via \`x.current.value\`
- Also used to store interval IDs, previous values — anything without triggering re-render.

### 16. useContext
- **Share data without prop drilling** — pass data to any component without threading props through every level.
- Steps: \`createContext()\` → wrap in \`<Context.Provider value={...}>\` → read with \`useContext(Context)\` anywhere inside.
- Think of it as a **pipeline** — data flows directly from provider to any consumer.

### 17. Custom Hooks
- A **function with name starting with \`use\`** that contains custom logic using other hooks.
- Lets you **reuse stateful logic** across components.
- Each component gets its own **independent copy** of the state.
- Example: \`useFetch\`, \`useToggle\`, \`useWindowSize\`

### 18. Error Boundary
- **Catches render errors** in child components and shows a fallback UI instead of crashing the whole app.
- Like try/catch but for React rendering.
- Must be a **class component** with \`getDerivedStateFromError()\` and \`componentDidCatch()\`.
- Wrap risky sections: \`<ErrorBoundary><BuggyComponent/></ErrorBoundary>\`

---

## 🔴 ADVANCED (Topics 19–30)

### 19. useReducer
- Alternative to useState for **complex state logic**.
- \`const [state, dispatch] = useReducer(reducer, initialState)\`
- You **dispatch actions** → reducer function decides how state changes.
- Action = plain object with a \`type\` field: \`dispatch({ type: "INCREMENT" })\`
- Use when state has multiple values or complex update logic.

### 20. useMemo & useCallback
- **useMemo** — caches result of expensive calculation. Recalculates only when deps change.
  \`const result = useMemo(() => heavyCalc(x), [x])\`
- **useCallback** — caches a **function reference** so it doesn't get recreated every render.
  \`const fn = useCallback(() => doSomething(), [dep])\`
- Only use when you've identified a real performance problem.

### 21. React.memo
- Wraps a component — **skips re-render** if props didn't change.
- \`const MemoChild = React.memo(ChildComponent)\`
- Shallow comparison of props. Pair with \`useCallback\` for function props to work correctly.

### 22. Code Splitting & Lazy Loading
- Split the bundle — load component code **only when needed**.
- \`const Page = lazy(() => import('./Page'))\`
- Wrap in \`<Suspense fallback={<Spinner/>}>\` to show loader while loading.
- Best used at **route level** — load each page's code only when user visits it.

### 23. Portals
- Render a component **outside the parent DOM node** (e.g. directly in \`document.body\`).
- \`createPortal(children, document.body)\` from \`react-dom\`
- Used for modals, tooltips, dropdowns — so parent CSS can't clip them.
- Events still bubble through the **React tree** normally.

### 24. Compound Components
- Group of components that **share implicit state** via Context — no prop drilling.
- Parent holds state, sub-components consume it via Context.
- Sub-components attached as properties: \`Tabs.Tab\`, \`Tabs.Panel\`
- Consumer has full control over structure and layout.

### 25. Render Props
- Share logic via a **prop that is a function**.
- \`<Tracker render={(data) => <UI data={data}/>}/>\`
- Component calls the function and passes internal state to it.
- Mostly replaced by **custom hooks** today — hooks are simpler.

### 26. State Management (Zustand / Redux Toolkit)
- For **global state** that many components need — better than Context for complex apps.
- **Zustand** — \`npm install zustand\`. Create store with \`create()\`, use anywhere with a hook. No Provider needed.
- **Redux Toolkit** — \`npm install @reduxjs/toolkit react-redux\`. \`createSlice()\` + \`configureStore()\`. Wrap app in \`<Provider>\`.
- New projects → Zustand. Large existing Redux apps → Redux Toolkit.

### 27. Data Fetching (TanStack Query)
- \`npm install @tanstack/react-query\`
- Handles: **caching, loading, error, background refetch** — all automatically.
- \`useQuery({ queryKey: ['user'], queryFn: fetchUser })\` → returns \`{ data, isLoading, error }\`
- \`useMutation()\` for POST/PUT/DELETE operations.
- Much better than manually writing useEffect + useState for every fetch.

### 28. TypeScript with React
- Adds **static types** — catch errors before runtime.
- \`npm create vite@latest my-app -- --template react-ts\`
- Type props: \`interface Props { name: string; age?: number }\`
- Type state: \`useState<User | null>(null)\`
- Type events: \`React.ChangeEvent<HTMLInputElement>\`

### 29. Testing
- \`npm install --save-dev @testing-library/react @testing-library/jest-dom\`
- \`render(<Component/>)\` → renders into virtual DOM.
- Find elements: \`screen.getByText()\`, \`screen.getByRole()\`
- Simulate: \`userEvent.click()\`, \`userEvent.type()\`
- Assert: \`expect(el).toBeInTheDocument()\`
- Test what the **user sees and does**, not internal implementation.

### 30. Next.js
- \`npx create-next-app@latest my-app\`
- React **framework** — adds SSR, file-based routing, API routes on top of React.
- File \`app/about/page.jsx\` → route \`/about\` — no router config needed.
- **Server Components** (default) — run on server, fetch data directly, zero JS to browser.
- **Client Components** — add \`"use client"\` at top — needed for useState, events.
- \`<Link>\` for navigation. \`next/image\` for optimized images. \`app/api/route.js\` for API endpoints.

---

## 📌 IMPORTANT THEORY (from your notes)

| Concept | Meaning |
|---|---|
| **Virtual DOM** | React uses a lightweight copy of the DOM. useState, useRef, useEffect all use VDom. React tracks changes, updates only what changed. |
| **Re-render** | Component function runs again when useState/useRef/useEffect changes trigger it. |
| **Hooks** | Concepts like useState, useEffect etc. Only usable inside component functions. Give components: memory, side-effect control, lifecycle. |
| **Fragment** | \`<> </>\` — return multiple elements without adding an extra \`<div>\` to the DOM. |
| **Controlled Component** | Input controlled by React state. \`value={text}\` — React owns the value. |
| **Prop Drilling** | Passing props through many layers just to reach a deep child. Solution: useContext. |
| **Callback** | A function passed as an argument to another function. e.g. \`<Button onClick={hello}/>\` |
| **State vs Props** | State = internal data the component owns. Props = external data passed from parent. |
| **Mount** | Component renders for the first time. Page opens → component renders → mounted. |
| **Unmount** | Component is removed. Page change, condition becomes false → component unmounts. |

---

*Topics 1–18 = your notes ✅ | Topics 19–30 = add these to your review ⚠️*
`;

// ─── Topics 1–9 data ─────────────────────────────────────────────────────────
const topics = [
  {
    id: 1,
    emoji: "⚛️",
    title: "What is React & Why It Exists",
    color: "#61DAFB",
    theory: [
      "React is a JavaScript library (not a framework) for building user interfaces.",
      "Before React, every time data changed, the whole HTML page had to re-render — slow and messy.",
      "React introduced the Virtual DOM: a lightweight copy of the real DOM. When data changes, React updates only the parts that actually changed.",
      "Think of it like this: instead of repainting the whole wall, React only repaints the scratch.",
    ],
    notes: [
      "React was made by Facebook (Meta) in 2013.",
      "React is just the UI layer — it doesn't care about routing, data fetching, etc. (you add those separately).",
      "Virtual DOM → React figures out what changed → updates only that in the real DOM. This is called Reconciliation.",
    ],
    code: `// Without React (vanilla JS — painful):
document.getElementById("name").innerHTML = "Devendra";

// With React — you just describe WHAT the UI should look like,
// React figures out HOW to update the DOM.
function App() {
  return <h1>Hello, Devendra!</h1>;
}`,
  },
  {
    id: 2,
    emoji: "📝",
    title: "JSX",
    color: "#F7DF1E",
    theory: [
      "JSX = JavaScript XML. It lets you write HTML-like syntax directly inside JavaScript.",
      "JSX is NOT HTML. It looks like HTML but gets compiled to regular JavaScript by a tool called Babel.",
      "Every JSX element compiles down to React.createElement() calls under the hood.",
    ],
    notes: [
      "Use className instead of class (because class is a reserved JS keyword).",
      "Use htmlFor instead of for (same reason).",
      "Every JSX expression must return ONE parent element. Wrap in a <div> or empty <> fragment if needed.",
      "JavaScript expressions inside JSX go in curly braces {}.",
      "Self-closing tags must have a slash: <img /> not <img>.",
    ],
    code: `// JSX example
function App() {
  const name = "Devendra";
  const age = 22;

  return (
    <>
      <h1 className="title">Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>In 5 years: {age + 5}</p>
      <img src="photo.jpg" alt="profile" />
    </>
  );
}

// What JSX compiles to (you never write this manually):
// React.createElement("h1", { className: "title" }, "Hello, Devendra!")`,
  },
  {
    id: 3,
    emoji: "🧩",
    title: "Components",
    color: "#FF6B6B",
    theory: [
      "A component is just a JavaScript function that returns JSX.",
      "Components are the building blocks of React apps — like LEGO pieces you combine together.",
      "Think of a webpage: Header, Sidebar, Card, Footer — each is a component.",
      "Components can be reused anywhere in your app. Write once, use many times.",
    ],
    notes: [
      "Component names MUST start with a capital letter. <button> is an HTML tag, <Button> is your component.",
      "Keep components small and focused — one component should do one thing.",
      "Components can be nested inside other components.",
      "The top-level component is usually called App.",
    ],
    code: `// A simple component
function Greeting() {
  return <h2>Hello from Greeting component!</h2>;
}

// A reusable Card component
function Card() {
  return (
    <div className="card">
      <h3>Card Title</h3>
      <p>Some content here.</p>
    </div>
  );
}

// App uses both — components nest inside components
function App() {
  return (
    <div>
      <Greeting />
      <Card />
      <Card />  {/* reused! */}
    </div>
  );
}`,
  },
  {
    id: 4,
    emoji: "📦",
    title: "Props",
    color: "#A78BFA",
    theory: [
      "Props (short for properties) are how you pass data from a parent component to a child component.",
      "Props flow in ONE direction only: parent → child. Never the other way.",
      "Props make components reusable — the same component can render different content based on props.",
      "Think of props like arguments to a function — you pass them in, the component uses them.",
    ],
    notes: [
      "Props are read-only inside the child. Never modify props.",
      "You can pass any data type as a prop: string, number, array, object, function, even JSX.",
      "Non-string props use curly braces: age={22}, not age='22'.",
      "You can set default values for props using default parameters.",
    ],
    code: `// Child component receives props as a parameter
function UserCard({ name, age, role }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Parent passes props to child
function App() {
  return (
    <div>
      <UserCard name="Devendra" age={22} role="Developer" />
      <UserCard name="Arjun" age={25} role="Designer" />
      <UserCard name="Priya" age={28} role="Manager" />
    </div>
  );
}

// Default props example
function Button({ label = "Click Me", color = "blue" }) {
  return <button style={{ background: color }}>{label}</button>;
}`,
  },
  {
    id: 5,
    emoji: "⚡",
    title: "State (useState)",
    color: "#34D399",
    theory: [
      "State is data that belongs to a component and can change over time.",
      "When state changes, React automatically re-renders the component with the new data.",
      "Props come from outside (parent). State lives inside the component itself.",
      "useState is a React Hook — a special function that adds state to a functional component.",
    ],
    notes: [
      "useState returns an array with two things: [currentValue, setterFunction].",
      "NEVER directly modify state like count = count + 1. Always use the setter: setCount(count + 1).",
      "State updates may be batched — React is smart about when to re-render.",
      "Each component instance has its own state — two <Counter /> components don't share state.",
      "State can be any type: number, string, boolean, array, object.",
    ],
    code: `import { useState } from "react";

function Counter() {
  // Declare state: initial value is 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Boolean state example
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? "ON 🟢" : "OFF 🔴"}
    </button>
  );
}`,
  },
  {
    id: 6,
    emoji: "🖱️",
    title: "Event Handling",
    color: "#FB923C",
    theory: [
      "React handles events similarly to HTML but with a few key differences.",
      "In React, event names are camelCase (onClick, not onclick).",
      "You pass a function reference, not a function call, as the event handler.",
      "React uses Synthetic Events — wrappers around native browser events, so they work consistently across all browsers.",
    ],
    notes: [
      "onClick={() => doSomething()} ✅ — passes a function.",
      "onClick={doSomething()} ❌ — calls the function immediately on render!",
      "Common events: onClick, onChange, onSubmit, onKeyDown, onMouseOver, onFocus.",
      "Event object (e) is automatically passed to handlers — use e.target.value to get input value.",
      "Use e.preventDefault() to stop default browser behavior (like form submission).",
    ],
    code: `import { useState } from "react";

function EventDemo() {
  const [text, setText] = useState("");

  // Handler functions defined separately — clean approach
  function handleClick() {
    alert("Button clicked!");
  }

  function handleChange(e) {
    setText(e.target.value); // e.target.value = what user typed
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops page from reloading
    alert("Submitted: " + text);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <button type="button" onClick={handleClick}>
        Alert
      </button>
      <button type="submit">Submit</button>
      <p>You typed: {text}</p>
    </form>
  );
}`,
  },
  {
    id: 7,
    emoji: "🔀",
    title: "Conditional Rendering",
    color: "#F472B6",
    theory: [
      "Conditional rendering means showing different UI based on certain conditions.",
      "Since JSX is just JavaScript, you can use normal JS logic (if, ternary, &&) to decide what to render.",
      "React renders nothing for null, undefined, and false — useful for hiding elements.",
    ],
    notes: [
      "Ternary (condition ? A : B) — use when you need to show one thing OR another.",
      "&& operator — use when you want to show something OR nothing.",
      "Avoid putting 0 before && (0 && <X/> will render 0!). Convert to boolean: {count > 0 && <X/>}.",
      "For complex logic, use a regular if/else before the return statement.",
    ],
    code: `import { useState } from "react";

function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(75);

  return (
    <div>
      {/* Method 1: Ternary — show one OR the other */}
      {isLoggedIn ? (
        <h2>Welcome back, Devendra! 👋</h2>
      ) : (
        <h2>Please log in.</h2>
      )}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle Login
      </button>

      {/* Method 2: && — show something OR nothing */}
      {score >= 60 && <p>✅ You passed!</p>}
      {score < 60 && <p>❌ You failed.</p>}

      {/* Method 3: if/else before return (for complex logic) */}
      <Grade score={score} />
    </div>
  );
}

function Grade({ score }) {
  let message;
  if (score >= 90) message = "A — Excellent!";
  else if (score >= 75) message = "B — Good job!";
  else if (score >= 60) message = "C — Pass";
  else message = "F — Try again";

  return <p>Grade: {message}</p>;
}`,
  },
  {
    id: 8,
    emoji: "📋",
    title: "Lists & Keys",
    color: "#38BDF8",
    theory: [
      "To render a list of items in React, you use the .map() array method.",
      ".map() transforms each item in an array into a JSX element.",
      "React needs a key prop on each list item so it can track which items changed, were added, or removed.",
      "Keys help React's reconciliation algorithm be efficient — without keys, React re-renders everything.",
    ],
    notes: [
      "Key must be unique among siblings — not globally unique.",
      "Use a unique ID from your data as the key. Avoid using index as key (it causes bugs when list order changes).",
      "Keys are not passed as props — you can't access props.key inside the child.",
      "The key goes on the outermost element returned in the .map().",
    ],
    code: `import { useState } from "react";

const users = [
  { id: 1, name: "Devendra", city: "Mumbai" },
  { id: 2, name: "Arjun", city: "Delhi" },
  { id: 3, name: "Priya", city: "Bangalore" },
];

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

// Dynamic list with state
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
}`,
  },
  {
    id: 9,
    emoji: "🎨",
    title: "Basic Styling",
    color: "#FBBF24",
    theory: [
      "React gives you multiple ways to style components — each with different tradeoffs.",
      "Inline styles: written as JS objects directly in JSX. Good for dynamic styles.",
      "CSS files: import a .css file and use className. Most familiar, works globally.",
      "CSS Modules: scoped CSS — styles only apply to the component that imports them (no clashes).",
    ],
    notes: [
      "In JSX, use className instead of class.",
      "Inline styles use camelCase: backgroundColor not background-color.",
      "Inline style values are strings or numbers: { fontSize: 16 } not { fontSize: '16px' } (px is auto-added for numbers).",
      "CSS Modules give you locally scoped class names — best for large apps.",
      "Popular alternatives: Tailwind CSS, styled-components, Emotion.",
    ],
    code: `// METHOD 1: Inline styles (JS object)
function InlineStyleDemo() {
  const isActive = true;

  const boxStyle = {
    backgroundColor: isActive ? "green" : "gray",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
  };

  return <div style={boxStyle}>I am {isActive ? "active" : "inactive"}</div>;
}

// METHOD 2: External CSS file
// In App.css:
// .title { font-size: 24px; color: navy; }
// .card { border: 1px solid #ccc; padding: 16px; }

import "./App.css";
function CSSDemo() {
  return (
    <div className="card">
      <h1 className="title">Styled with CSS file</h1>
    </div>
  );
}

// METHOD 3: Dynamic className
function DynamicClass({ isError }) {
  return (
    <p className={isError ? "error-text" : "normal-text"}>
      {isError ? "Something went wrong!" : "All good!"}
    </p>
  );
}`,
  },
];

// ─── Topics 10–18 data ───────────────────────────────────────────────────────
const topics1018 = [
  {
    id: 10,
    emoji: "🔁",
    title: "useEffect",
    color: "#61DAFB",
    theory: [
      "useEffect is a Hook that lets you run side effects in a functional component.",
      "A side effect is anything that reaches outside the component: fetching data, setting a timer, manually changing the DOM, subscribing to events.",
      "useEffect runs AFTER React renders the component to the screen — not during render.",
      "It takes two arguments: a callback function (the effect) and a dependency array that controls WHEN the effect runs.",
    ],
    notes: [
      "useEffect(() => {}, []) — runs ONCE after the first render (like componentDidMount).",
      "useEffect(() => {}) — no dependency array → runs after EVERY render. Usually not what you want.",
      "useEffect(() => {}, [count]) — runs after first render AND whenever count changes.",
      "Return a cleanup function to cancel subscriptions, timers, etc. when the component unmounts.",
      "Never put async directly inside useEffect. Define async function inside and call it.",
    ],
    code: `import { useState, useEffect } from "react";

// [] = run only once after first render
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;
  return <h2>Hello, {user.name}!</h2>;
}

// [query] = re-run whenever query changes
function SearchBox({ query }) {
  useEffect(() => {
    if (!query) return;
    console.log("Searching:", query);
  }, [query]);

  return <div>Search box</div>;
}

// Cleanup example — clear timer on unmount
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup!
  }, []);

  return <p>Timer: {seconds}s</p>;
}`,
  },
  {
    id: 11,
    emoji: "📋",
    title: "Forms & Controlled Components",
    color: "#F7DF1E",
    theory: [
      "In React, a controlled component is one where React controls the form input's value via state.",
      "Every keystroke updates state, and the input's value is always driven by that state — React is the single source of truth.",
      "This is the opposite of uncontrolled components, where the DOM itself holds the value.",
      "Controlled components give you full control: validation, formatting, conditional disabling — all easy.",
    ],
    notes: [
      "Always pair value={state} with onChange={handler} on an input. Without onChange, the input becomes read-only.",
      "For checkboxes use checked={bool} instead of value.",
      "For select elements, put value on the select tag, not on option tags.",
      "e.preventDefault() in onSubmit stops page reload.",
      "Use a single state object for multi-field forms with one shared handler using e.target.name.",
    ],
    code: `import { useState } from "react";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    alert("Submitted: " + form.email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

// Checkbox + Select
function Preferences() {
  const [agreed, setAgreed] = useState(false);
  const [country, setCountry] = useState("india");

  return (
    <div>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <label> I agree to terms</label>
      <br />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="india">India</option>
        <option value="usa">USA</option>
        <option value="uk">UK</option>
      </select>
    </div>
  );
}`,
  },
  {
    id: 12,
    emoji: "🏋️",
    title: "Lifting State Up",
    color: "#FF6B6B",
    theory: [
      "When two sibling components need to share the same state, you lift that state up to their closest common parent.",
      "The parent holds the state and passes it down as props to both children.",
      "The parent also passes down handler functions so children can request state changes — since props are read-only.",
      "Data flows down (props), events flow up (callbacks). This is the core of React's one-way data flow.",
    ],
    notes: [
      "If two components need the same data, their state belongs in their closest common ancestor.",
      "The child never modifies state directly — it calls a function passed down from the parent.",
      "This pattern scales well but can get tedious with many levels — that's when Context or state managers help.",
      "The parent is the single source of truth for shared state.",
    ],
    code: `import { useState } from "react";

function TemperatureInput({ unit, temp, onTempChange }) {
  return (
    <div>
      <label>Temperature in {unit}: </label>
      <input
        type="number"
        value={temp}
        onChange={(e) => onTempChange(e.target.value)}
      />
    </div>
  );
}

function BoilingResult({ celsius }) {
  return (
    <p>
      {celsius >= 100 ? "🔥 Water would boil!" : "💧 Water would NOT boil."}
    </p>
  );
}

// Parent holds ALL shared state
function TemperatureCalculator() {
  const [celsius, setCelsius] = useState(0);
  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <div>
      <TemperatureInput
        unit="Celsius"
        temp={celsius}
        onTempChange={(val) => setCelsius(Number(val))}
      />
      <TemperatureInput
        unit="Fahrenheit"
        temp={fahrenheit}
        onTempChange={(val) => setCelsius(((Number(val) - 32) * 5) / 9)}
      />
      <BoilingResult celsius={celsius} />
    </div>
  );
}`,
  },
  {
    id: 13,
    emoji: "🧱",
    title: "Component Composition",
    color: "#A78BFA",
    theory: [
      "Composition is the pattern of building complex UIs by combining simple, reusable components.",
      "The children prop is a special prop React automatically passes — it contains whatever you put between a component's opening and closing tags.",
      "Think of it like HTML div tags that wrap their children — you can do the same with your own components.",
      "Composition is preferred over inheritance in React — you rarely need class-based inheritance.",
    ],
    notes: [
      "props.children contains everything between the component's opening and closing tags.",
      "Use composition to build layout wrappers: Card, Modal, Panel — generic shells that wrap any content.",
      "You can pass JSX as any prop, not just children — this is called the slot pattern.",
      "Composition avoids prop drilling for UI structure — children flow naturally without extra props.",
    ],
    code: `import { useState } from "react";

// Generic Card wrapper
function Card({ title, children, color = "#61DAFB" }) {
  return (
    <div style={{
      border: \`2px solid \${color}\`,
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px",
    }}>
      {title && <h3 style={{ color }}>{title}</h3>}
      {children}
    </div>
  );
}

// Button with children
function FancyButton({ children, onClick, variant = "primary" }) {
  const bg = variant === "danger" ? "#FF6B6B" : "#61DAFB";
  const fg = variant === "danger" ? "#fff" : "#000";
  return (
    <button onClick={onClick}
      style={{ background: bg, color: fg, border: "none",
               padding: "8px 14px", borderRadius: 6, cursor: "pointer" }}>
      {children}
    </button>
  );
}

// Slot pattern — named children via props
function Layout({ sidebar, content }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <aside style={{ width: "150px", background: "#21262d", padding: 8, borderRadius: 6 }}>
        {sidebar}
      </aside>
      <main style={{ flex: 1 }}>{content}</main>
    </div>
  );
}

function App() {
  return (
    <div>
      <Card title="User Info" color="#34D399">
        <p>Name: Devendra</p>
        <FancyButton>Edit</FancyButton>{" "}
        <FancyButton variant="danger">Delete</FancyButton>
      </Card>
      <Layout
        sidebar={<p>Nav links</p>}
        content={<p>Main content area</p>}
      />
    </div>
  );
}`,
  },
  {
    id: 14,
    emoji: "🗺️",
    title: "React Router",
    color: "#34D399",
    theory: [
      "React Router is the standard library for adding navigation to a React app. Install it with: npm install react-router-dom",
      "React apps are Single Page Applications (SPAs) — the browser never loads a new HTML page. React Router fakes navigation by swapping components based on the URL.",
      "The URL changes, but the page never fully reloads. React Router intercepts browser navigation and renders the matching component.",
      "Below is a live simulation of routing using useState so you can understand the concept. In your real project, use the actual library as shown in the Notes tab.",
    ],
    notes: [
      "BrowserRouter — wraps your entire app and provides routing context.",
      "Routes + Route — Route path='/about' element={About} renders About when URL is /about.",
      "Link — use instead of anchor tags for internal navigation (no page reload).",
      "useNavigate() — navigate programmatically, e.g. after a form submit.",
      "useParams() — read dynamic URL segments: path='/users/:id' → const { id } = useParams().",
      "Route path='*' — catch-all 404 route, always put it last inside Routes.",
    ],
    code: `// Live simulation of routing using only useState.
// In your real Vite project, replace this with actual react-router-dom.

import { useState } from "react";

// Page components
function HomePage()    { return <h2>🏠 Home Page</h2>; }
function AboutPage()   { return <h2>ℹ️ About Page</h2>; }
function UserPage({ id }) { return <h2>👤 User Profile — ID: {id}</h2>; }
function NotFound()    { return <h2>❌ 404 — Not Found</h2>; }

// Simulated router
function App() {
  const [route, setRoute] = useState("home");

  function navigate(to) { setRoute(to); }

  function renderPage() {
    if (route === "home")    return <HomePage />;
    if (route === "about")   return <AboutPage />;
    if (route === "user-42") return <UserPage id="42" />;
    return <NotFound />;
  }

  return (
    <div>
      {/* Simulated <Link> buttons */}
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Home",     to: "home" },
          { label: "About",    to: "about" },
          { label: "User 42",  to: "user-42" },
          { label: "Bad URL",  to: "xyz" },
        ].map(({ label, to }) => (
          <button key={to} onClick={() => navigate(to)}
            style={{
              padding: "6px 14px", borderRadius: 6, cursor: "pointer",
              background: route === to ? "#34D399" : "#21262d",
              color: "#fff", border: "none",
            }}>
            {label}
          </button>
        ))}
      </nav>

      {/* Simulated <Routes> */}
      {renderPage()}

      <p style={{ color: "#8b949e", fontSize: 12, marginTop: 16 }}>
        ↑ Concept demo only. Real setup uses BrowserRouter + Routes + Route + Link.
      </p>
    </div>
  );
}`,
  },
  {
    id: 15,
    emoji: "📌",
    title: "useRef",
    color: "#FB923C",
    theory: [
      "useRef returns a mutable object with a .current property that persists across renders.",
      "Unlike state, changing ref.current does NOT trigger a re-render.",
      "The two main uses: 1) Accessing a DOM element directly. 2) Storing a value that persists between renders without causing re-renders.",
      "Think of useRef as a box you can put anything in — React won't touch it or re-render because of it.",
    ],
    notes: [
      "Attach ref={myRef} to a JSX element, then myRef.current gives you the actual DOM node.",
      "Common DOM uses: focus an input, scroll to element, measure element size.",
      "For storing interval IDs, previous values, or any mutable data without triggering re-renders.",
      "useRef vs useState: state change causes re-render. Ref change does not.",
      "Don't read or write refs during rendering — only inside event handlers or useEffect.",
    ],
    code: `import { useState, useRef, useEffect } from "react";

// USE CASE 1: Direct DOM access — focus an input
function AutoFocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me!" />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </div>
  );
}

// USE CASE 2: Store interval ID without triggering re-renders
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }

  function stop() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={start} disabled={running}>Start</button>{" "}
      <button onClick={stop} disabled={!running}>Stop</button>
    </div>
  );
}

// USE CASE 3: Track previous state value
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    prevRef.current = count; // runs after render
  });

  return (
    <div>
      <p>Current: {count} | Previous: {prevRef.current}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}`,
  },
  {
    id: 16,
    emoji: "🌐",
    title: "useContext",
    color: "#F472B6",
    theory: [
      "Context solves prop drilling — when you have to pass props through many intermediate components just to reach a deeply nested child.",
      "useContext lets any component in the tree read a shared value without explicitly passing it as a prop at every level.",
      "Think of it like a global variable for a component tree — but safe and React-aware.",
      "Context has two parts: a Provider (holds and broadcasts the value) and consumers (components that read it with useContext).",
    ],
    notes: [
      "createContext(defaultValue) — creates the context object.",
      "ThemeContext.Provider value={...} — wraps the subtree; all descendants can now read the value.",
      "useContext(ThemeContext) — reads the nearest Provider's value inside any child component.",
      "When the Provider's value changes, all consumers automatically re-render.",
      "Best for truly global data: theme, auth user, language. Don't use it for everything.",
      "For complex state, combine Context with useReducer instead of useState.",
    ],
    code: `import { useState, useContext, createContext } from "react";

// Step 1: Create the context
const ThemeContext = createContext("light");

// Step 2: Custom hook — wraps useContext for convenience
function useTheme() {
  return useContext(ThemeContext);
}

// Deep child — zero prop drilling needed
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{
      background: theme === "dark" ? "#333" : "#eee",
      color:      theme === "dark" ? "#fff" : "#333",
      border: "1px solid currentColor",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
    }}>
      Theme: {theme} — click to toggle
    </button>
  );
}

function ThemeLabel() {
  const { theme } = useTheme();
  return <p>App is in <strong>{theme}</strong> mode</p>;
}

// Intermediate — doesn't touch theme at all
function Toolbar() {
  return <div><ThemedButton /><ThemeLabel /></div>;
}

// Step 3: Provider owns the state and wraps the tree
function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <h2>useContext Demo</h2>
      <Toolbar />
    </ThemeContext.Provider>
  );
}`,
  },
  {
    id: 17,
    emoji: "🪝",
    title: "Custom Hooks",
    color: "#38BDF8",
    theory: [
      "A custom hook is just a JavaScript function whose name starts with 'use' and can call other hooks inside it.",
      "Custom hooks let you extract reusable stateful logic out of components and share it across the app.",
      "They do not share state — each component that calls a custom hook gets its own isolated copy.",
      "Think of them as building your own hook library, tailored to your app's specific needs.",
    ],
    notes: [
      "Name must start with 'use' — this is how React enforces hook rules on your function.",
      "Can use any built-in hooks inside: useState, useEffect, useRef, useContext, etc.",
      "Each component calling the same custom hook gets fully independent state.",
      "Great use cases: data fetching, form handling, local storage, window size, debouncing.",
      "Extract into a custom hook when you find the same useState + useEffect combo in multiple places.",
    ],
    code: `import { useState, useEffect } from "react";

// ---- useFetch: reusable data fetching ----
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false); })
      .catch((err) => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Component stays clean — no fetch logic inside
function UserCard() {
  const { data: user, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error!</p>;
  return <h3>{user?.name}</h3>;
}

// ---- useToggle: reusable boolean flip ----
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

function ToggleDemo() {
  const [isOpen, toggle] = useToggle(false);
  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close ▲" : "Open ▼"}</button>
      {isOpen && <p>Panel content!</p>}
    </div>
  );
}

// ---- useWindowSize: track browser dimensions ----
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}`,
  },
  {
    id: 18,
    emoji: "🛡️",
    title: "Error Boundaries",
    color: "#FBBF24",
    theory: [
      "Error boundaries catch JavaScript errors anywhere in their child component tree and show a fallback UI instead of crashing the whole app.",
      "Without error boundaries, one broken component crashes your entire app — error boundaries contain the damage to just that section.",
      "Think of them like try/catch, but for React component rendering.",
      "Error boundaries must be class components — it's one of the few remaining cases you need a class in modern React.",
    ],
    notes: [
      "Error boundaries catch errors during: rendering, lifecycle methods, and constructors of child components.",
      "They do NOT catch: errors in event handlers (use regular try/catch there) or async code.",
      "getDerivedStateFromError — update state here to show the fallback UI when a child throws.",
      "componentDidCatch — called after the error; good place to log errors to a reporting service.",
      "Place boundaries around individual sections, not just one at the very top of the app.",
      "Click Try Again in the demo below to reset the boundary after a crash.",
    ],
    code: `import { Component, useState } from "react";

// Class-based Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Boundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: "#2d1515",
                      border: "1px solid #FF6B6B", borderRadius: 8 }}>
          <h3>😵 Something went wrong.</h3>
          <p style={{ color: "#FF6B6B" }}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Intentionally buggy component
function BuggyCounter() {
  const [count, setCount] = useState(0);
  if (count === 3) throw new Error("Crashed at count 3!");
  return (
    <div>
      <p>Count: {count} — crashes at 3</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

// App — boundary contains the crash to one section
function App() {
  return (
    <div>
      <h2>Error Boundary Demo</h2>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <p style={{ color: "#34D399", marginTop: 12 }}>
        This line is outside the boundary — still works even when above crashes.
      </p>
    </div>
  );
}`,
  },
];

// ─── Topics 19–30 data ───────────────────────────────────────────────────────
const topics1930 = [
  {
    id: 19,
    emoji: "⚙️",
    title: "useReducer",
    color: "#61DAFB",
    theory: [
      "useReducer is an alternative to useState for managing complex state logic inside a component.",
      "Instead of calling a setter directly, you dispatch an action object, and a reducer function decides how state changes based on that action.",
      "This is the same pattern Redux uses — useReducer is basically a built-in mini-Redux.",
      "Use useReducer when state has multiple sub-values, or when the next state depends on the previous one in complex ways.",
    ],
    notes: [
      "useReducer(reducer, initialState) returns [state, dispatch].",
      "reducer is a pure function: (state, action) => newState. Never mutate state directly inside it.",
      "dispatch({ type: 'INCREMENT' }) — you send an action, the reducer decides the outcome.",
      "Actions usually have a type string and optionally a payload: { type: 'ADD', payload: 'text' }.",
      "Rule of thumb: 3+ related state values or complex transitions → prefer useReducer over useState.",
    ],
    code: `import { useReducer, useState } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    case "RESET":     return { count: 0 };
    case "SET":       return { count: action.payload };
    default:          return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>Set 100</button>
    </div>
  );
}

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  function add() {
    if (!input.trim()) return;
    dispatch({ type: "ADD", payload: input });
    setInput("");
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
            {t.text}
            <button onClick={() => dispatch({ type: "TOGGLE", payload: t.id })}>✓</button>
            <button onClick={() => dispatch({ type: "DELETE", payload: t.id })}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  {
    id: 20,
    emoji: "⚡",
    title: "useMemo & useCallback",
    color: "#F7DF1E",
    theory: [
      "useMemo and useCallback are performance optimization hooks that prevent expensive recalculations and function recreation on every render.",
      "useMemo memoizes a computed value — only recalculates when its dependencies change.",
      "useCallback memoizes a function reference — only creates a new function when its dependencies change.",
      "Important: do not use these everywhere. Memoization has its own cost. Only add them after identifying a real performance problem.",
    ],
    notes: [
      "useMemo(() => expensiveCalc(), [dep]) — recalculates only when dep changes.",
      "useCallback(() => myFn(), [dep]) — returns the same function reference unless dep changes.",
      "Main use for useCallback: pass stable functions to children wrapped in React.memo.",
      "Main use for useMemo: expensive computations like filtering or sorting large arrays.",
      "If your app feels fast without them — skip them. Premature optimization is the root of all evil.",
    ],
    code: `import { useState, useMemo, useCallback, memo } from "react";

// --- useMemo: skip expensive recomputation ---
function FilteredList({ items, filter }) {
  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return <ul>{filtered.map((x, i) => <li key={i}>{x}</li>)}</ul>;
}

// --- useCallback: stable function reference ---
const ChildButton = memo(function ChildButton({ onClick, label }) {
  console.log("Child rendered:", label);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count} | Other: {other}</p>
      <ChildButton onClick={handleIncrement} label="Increment" />
      <button onClick={() => setOther((o) => o + 1)}>
        Change Other (child stays the same)
      </button>
    </div>
  );
}`,
  },
  {
    id: 21,
    emoji: "🧠",
    title: "React.memo",
    color: "#FF6B6B",
    theory: [
      "React.memo is a higher-order component that prevents a component from re-rendering if its props have not changed.",
      "By default React re-renders a child whenever its parent re-renders — even if the child receives the exact same props.",
      "React.memo does a shallow comparison of props. If references are the same, the render is skipped entirely.",
      "memo only blocks re-renders caused by the parent. If the component's own state or context changes, it still re-renders.",
    ],
    notes: [
      "Wrap a component: const MyComp = memo(function MyComp(props) { ... })",
      "Shallow comparison checks object and function references — not deep equality.",
      "For object or array props, memoize the value with useMemo. For function props, use useCallback.",
      "Most useful when a component renders often, receives the same props often, and is expensive to render.",
      "Do not wrap every component — the comparison itself costs something. Use where re-renders are provably wasteful.",
    ],
    code: `import { useState, memo } from "react";

// Without memo — re-renders on every parent render
function RegularChild({ name }) {
  console.log("RegularChild rendered");
  return <p>Regular: {name}</p>;
}

// With memo — only re-renders when name prop actually changes
const MemoizedChild = memo(function MemoizedChild({ name }) {
  console.log("MemoizedChild rendered");
  return <p>Memoized: {name}</p>;
});

// Custom comparison — full control over when to re-render
const SmartChild = memo(
  function SmartChild({ id }) {
    console.log("SmartChild rendered, id:", id);
    return <p>Smart ID: {id}</p>;
  },
  (prev, next) => prev.id === next.id
  // return true  -> skip re-render
  // return false -> allow re-render
);

function Parent() {
  const [count, setCount] = useState(0);
  const [name] = useState("Devendra");

  return (
    <div>
      <p>Parent count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Re-render Parent</button>
      <hr />
      <RegularChild name={name} />   {/* always re-renders */}
      <MemoizedChild name={name} />  {/* skips — name unchanged */}
      <SmartChild id={42} />         {/* skips — id unchanged */}
    </div>
  );
}`,
  },
  {
    id: 22,
    emoji: "✂️",
    title: "Code Splitting & Lazy Loading",
    color: "#A78BFA",
    theory: [
      "Code splitting breaks your app bundle into smaller chunks that download only when needed, rather than loading everything upfront.",
      "React.lazy lets you dynamically import a component — its JS chunk is only fetched when the component first renders.",
      "Suspense is the wrapper that shows a fallback UI while the lazy component chunk is downloading.",
      "This massively improves initial load time — users only download the code for pages they actually visit.",
    ],
    notes: [
      "const MyComp = lazy(() => import('./MyComp')) — dynamic import, loads the file on demand.",
      "Always wrap lazy components in a Suspense boundary with a fallback prop.",
      "Best split points: route-level pages, heavy feature sections, modals, data visualizations.",
      "React.lazy only works with default exports from the imported module.",
      "In production, Vite and Webpack automatically create separate .js chunk files per lazy import.",
    ],
    code: `import { useState, lazy, Suspense } from "react";

// In a real project these live in separate files:
// const HeavyChart   = lazy(() => import('./HeavyChart'));
// const AdminPanel   = lazy(() => import('./AdminPanel'));

// Simulated heavy components for this demo
function HeavyChart()   { return <div>📊 Heavy Chart — loaded on demand</div>; }
function AdminPanel()   { return <div>🔒 Admin Panel — loaded on demand</div>; }
function UserSettings() { return <div>⚙️  Settings  — loaded on demand</div>; }

function App() {
  const [page, setPage] = useState(null);

  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setPage("chart")}>Chart</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => setPage("settings")}>Settings</button>
      </nav>

      <Suspense fallback={<p>Loading component...</p>}>
        {page === "chart"    && <HeavyChart />}
        {page === "admin"    && <AdminPanel />}
        {page === "settings" && <UserSettings />}
      </Suspense>

      {!page && (
        <p style={{ color: "#8b949e" }}>
          Click a button. In a real app each section is a
          separate JS chunk — downloaded only on first visit.
        </p>
      )}
    </div>
  );
}`,
  },
  {
    id: 23,
    emoji: "🌀",
    title: "Portals",
    color: "#34D399",
    theory: [
      "A Portal renders a component's output into a different DOM node than its parent, escaping the normal component hierarchy.",
      "Normally a component renders inside its parent's DOM node. With a portal you can target any node — like document.body.",
      "Most common use cases: modals, tooltips, and dropdowns that need to escape overflow:hidden or z-index stacking on a parent.",
      "Even though a portal renders elsewhere in the DOM, it still behaves like a normal React child — events bubble through the React tree as expected.",
    ],
    notes: [
      "createPortal(children, domNode) is a function from the core React library that renders children into domNode.",
      "The target DOM node must exist first — usually document.body or a dedicated div in index.html.",
      "Event bubbling follows the React component tree, NOT the real DOM tree — React events still work normally.",
      "State and Context work fine inside portals — they remain part of the React component tree.",
      "The demo below simulates portal behaviour with fixed positioning so you can see the concept live.",
    ],
    code: `import { useState } from "react";

// Portal API (for your real project):
//   createPortal(<YourModal />, document.body)
// Renders YourModal into document.body instead of inside
// the parent component — escaping overflow:hidden or z-index.

// Working modal demo — simulates portal visual result
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#161b22",
        border: "1px solid #30363d",
        borderRadius: 12, padding: 24, minWidth: 280,
      }}>
        {children}
        <button onClick={onClose} style={{
          marginTop: 16, padding: "8px 16px",
          background: "#FF6B6B", color: "#fff",
          border: "none", borderRadius: 6, cursor: "pointer",
        }}>
          Close
        </button>
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      overflow: "hidden",
      border: "2px solid #FF6B6B",
      padding: 16, borderRadius: 8,
    }}>
      <p>Parent has overflow:hidden — a real portal escapes it.</p>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h3>Modal via Portal</h3>
        <p>In production: wrap this JSX in createPortal and it
           renders directly into document.body.</p>
      </Modal>
    </div>
  );
}`,
  },
  {
    id: 24,
    emoji: "🔗",
    title: "Compound Components",
    color: "#FB923C",
    theory: [
      "Compound Components let a group of components share implicit state through Context — no prop threading required.",
      "Think of HTML select and option tags — they work together without you wiring them. Compound components do the same in React.",
      "A parent component owns the state and provides it via Context. Child components consume that context automatically.",
      "This gives consumers a clean expressive API with no prop drilling and no awkward config objects.",
    ],
    notes: [
      "The parent creates a Context and wraps children in a Provider.",
      "Sub-components (Tab, Panel, Item) read shared state from Context instead of receiving it as props.",
      "Attach sub-components to the parent as properties: Tabs.Tab, Tabs.Panel — one clean import for everything.",
      "This is how popular headless UI libraries are built under the hood.",
      "Best for: Tabs, Accordion, Select, Dropdown, Stepper — any set of components that logically belong together.",
    ],
    code: `import { useState, useContext, createContext } from "react";

const TabsCtx = createContext(null);

function Tabs({ children, defaultTab = 0 }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsCtx.Provider>
  );
}

function TabList({ children }) {
  return (
    <div style={{
      display: "flex", gap: 4,
      borderBottom: "2px solid #30363d", marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function Tab({ children, index }) {
  const { active, setActive } = useContext(TabsCtx);
  const on = active === index;
  return (
    <button onClick={() => setActive(index)} style={{
      padding: "8px 16px", cursor: "pointer", fontFamily: "inherit",
      background: on ? "#FB923C22" : "transparent",
      color: on ? "#FB923C" : "#8b949e",
      border: "none",
      borderBottom: on ? "2px solid #FB923C" : "2px solid transparent",
    }}>
      {children}
    </button>
  );
}

function TabPanel({ children, index }) {
  const { active } = useContext(TabsCtx);
  return active === index ? <div>{children}</div> : null;
}

Tabs.TabList  = TabList;
Tabs.Tab      = Tab;
Tabs.TabPanel = TabPanel;

function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.TabList>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
        <Tabs.Tab index={2}>Billing</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel index={0}><p>Profile content</p></Tabs.TabPanel>
      <Tabs.TabPanel index={1}><p>Settings content</p></Tabs.TabPanel>
      <Tabs.TabPanel index={2}><p>Billing content</p></Tabs.TabPanel>
    </Tabs>
  );
}`,
  },
  {
    id: 25,
    emoji: "🎭",
    title: "Render Props",
    color: "#F472B6",
    theory: [
      "The Render Props pattern is when a component receives a function as a prop and calls it to decide what to render.",
      "This lets you share stateful logic while giving the consumer full control over the UI output.",
      "The component with the logic calls props.render(state) and passes its internal state as arguments.",
      "Custom hooks have largely replaced render props — but the pattern still appears in many libraries and older codebases.",
    ],
    notes: [
      "The render prop can be named anything: render, children, or any custom name.",
      "Using children as the render prop is called the 'function as children' pattern.",
      "Custom hooks are now preferred — same result, cleaner syntax, no extra nesting.",
      "Both render props and custom hooks solve the same problem: sharing stateful logic between components.",
      "You will encounter this pattern reading library source code, so knowing it is still valuable.",
    ],
    code: `import { useState } from "react";

// MouseTracker owns the tracking logic.
// The consumer decides what to display with that data.
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      style={{ height: 90, border: "1px dashed #30363d", borderRadius: 8 }}
    >
      {render(pos)}
    </div>
  );
}

// Counter shares logic — consumer controls the UI shape
function SharedCounter({ children }) {
  const [count, setCount] = useState(0);
  return children({
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset:     () => setCount(0),
  });
}

function App() {
  return (
    <div>
      <MouseTracker
        render={({ x, y }) => (
          <p style={{ padding: 12 }}>Mouse position: ({x}, {y})</p>
        )}
      />

      <br />

      <SharedCounter>
        {({ count, increment, decrement, reset }) => (
          <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>{" "}
            <button onClick={decrement}>-</button>{" "}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </SharedCounter>
    </div>
  );
}`,
  },
  {
    id: 26,
    emoji: "🗃️",
    title: "State Management Libraries",
    color: "#38BDF8",
    theory: [
      "For large apps, passing state via props or Context alone gets unwieldy. Dedicated state libraries provide a structured global store.",
      "Zustand is the modern lightweight choice — minimal boilerplate, hooks-based API, no Provider setup needed.",
      "Redux Toolkit is the official modern Redux — far simpler than classic Redux, dominant in enterprise projects.",
      "Both solve the same core problem: a single global source of truth that any component can read and update.",
    ],
    notes: [
      "Zustand: create a store with create(), then call it as a custom hook anywhere. No Provider required.",
      "Redux Toolkit: createSlice bundles your reducer and actions. configureStore wires them. Wrap app in Provider.",
      "useSelector reads from the Redux store. useDispatch sends actions to it.",
      "Zustand is simpler and great for most projects. Use Redux Toolkit when the team already has it.",
      "Other options worth knowing: Jotai (atomic state), MobX (reactive OOP style), Recoil (also atomic).",
    ],
    code: `// ── ZUSTAND ──────────────────────────────────
// Create a store — call outside any component

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset:     () => set({ count: 0 }),
}));

// Use the hook in any component — no Provider needed!
function ZustandCounter() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


// ── REDUX TOOLKIT ─────────────────────────────
// createSlice bundles reducer + actions together

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    setTo:     (state, action) => { state.value = action.payload; },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

function RTKCounter() {
  const count    = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <RTKCounter />
    </Provider>
  );
}`,
  },
  {
    id: 27,
    emoji: "📡",
    title: "Data Fetching Libraries",
    color: "#FBBF24",
    theory: [
      "TanStack Query (also called React Query) is the gold standard for server state — it handles fetching, caching, background refetching, and sync automatically.",
      "Server state is different from UI state — it can go stale, needs periodic sync, and is often shared across many components.",
      "Without a library you write useEffect plus useState for every fetch and manage caching manually. TanStack Query does all of that in one hook.",
      "SWR by Vercel is a lighter alternative with a similar API — a great fit for Next.js projects.",
    ],
    notes: [
      "Install TanStack Query via npm, then wrap your app once in QueryClientProvider.",
      "useQuery({ queryKey: ['users'], queryFn: fetchUsers }) — auto-handles loading, error, data, and caching.",
      "queryKey is the cache identifier — same key anywhere in the app shares the same cached data.",
      "useMutation handles POST/PUT/DELETE. Invalidate a queryKey after success to trigger a refetch.",
      "By default data is cached and reused. Background refetch fires when the browser tab regains focus.",
      "The DevTools package lets you inspect the full query cache visually in the browser.",
    ],
    code: `// TanStack Query setup (done once at app root):
//   const qc = new QueryClient()
//   <QueryClientProvider client={qc}><App /></QueryClientProvider>

// Plain fetch helpers — no library required
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

async function addUser(data) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// useQuery: one hook replaces useEffect + useState + caching
function UsersList() {
  const client = useQueryClient();

  const { data: users, isLoading, isError } = useQuery({
    queryKey:  ["users"],    // unique cache key
    queryFn:   fetchUsers,   // must return a promise
    staleTime: 60 * 1000,    // data stays fresh for 60 s
  });

  // useMutation: handles write operations cleanly
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Mark users cache stale -> background refetch fires
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)   return <p>Error loading users</p>;

  return (
    <div>
      <ul>
        {users.slice(0, 3).map((u) => <li key={u.id}>{u.name}</li>)}
      </ul>
      <button onClick={() => mutation.mutate({ name: "New User" })}>
        Add User
      </button>
    </div>
  );
}`,
  },
  {
    id: 28,
    emoji: "🔷",
    title: "TypeScript with React",
    color: "#61DAFB",
    theory: [
      "TypeScript adds static types to JavaScript — you describe the shape of your data and TypeScript catches mistakes at compile time before they become runtime bugs.",
      "With React and TypeScript you type props, state, event handlers, and refs — getting autocomplete and editor errors for free.",
      "TypeScript does not change how React works — it just adds a type layer on top. Your .jsx files become .tsx files.",
      "Create a typed project: npm create vite@latest my-app -- --template react-ts",
    ],
    notes: [
      "Type props with an interface: interface Props { name: string; age: number }",
      "useState with a generic: const [count, setCount] = useState<number>(0)",
      "Optional props use ?: interface Props { label?: string }",
      "Event types: React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>",
      "Children: React.ReactNode covers any valid JSX content passed between tags.",
      "Refs: useRef<HTMLInputElement>(null) — always pass null as the initial value for DOM refs.",
    ],
    code: `// TypeScript React files use the .tsx extension

// ── Typing Props ──
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
}

function Button({ label, onClick, variant = "primary", disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// ── Typing useState ──
const [count, setCount] = useState<number>(0);
const [user,  setUser]  = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// ── Typing a data model ──
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email} — {user.role}</p>
    </div>
  );
}

// ── Typing event handlers ──
function SearchInput() {
  const [query, setQuery] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Query:", query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}

// ── Typing children ──
interface CardProps {
  title: string;
  children: React.ReactNode;
}
function Card({ title, children }: CardProps) {
  return <div><h2>{title}</h2>{children}</div>;
}

// ── Typing useRef ──
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();`,
  },
  {
    id: 29,
    emoji: "🧪",
    title: "Testing React",
    color: "#34D399",
    theory: [
      "React Testing Library (RTL) is the standard for testing React components — it tests from the user's perspective, not implementation details.",
      "Core philosophy: test what the user sees and interacts with, not how internal state is structured.",
      "Jest or Vitest acts as the test runner and assertion library. RTL provides render utilities and DOM queries on top.",
      "Install the RTL packages as dev dependencies, then write test files alongside your components.",
    ],
    notes: [
      "render(<Component />) — mounts the component into a virtual DOM for testing.",
      "screen.getByText(), getByRole(), getByPlaceholderText() — query elements the way a real user would.",
      "userEvent.click(), userEvent.type() — simulate realistic browser interactions.",
      "Prefer userEvent over fireEvent — it fires all intermediate events like a real browser does.",
      "screen.findBy* functions are async — they wait for elements to appear after async operations.",
      "Never test internal state variables — test the visible output the user actually sees.",
    ],
    code: `// Tests live in files named ComponentName.test.jsx

// ── Basic render test ──
test("renders initial count of 0", () => {
  render(<Counter />);
  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

// ── Interaction test ──
test("increments when + button is clicked", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const btn = screen.getByRole("button", { name: "+" });
  await user.click(btn);
  await user.click(btn);

  expect(screen.getByText("Count: 2")).toBeInTheDocument();
});

// ── Form validation test ──
test("shows error when submitted empty", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.click(screen.getByRole("button", { name: "Login" }));
  expect(screen.getByText("Both fields are required.")).toBeInTheDocument();
});

// ── Mock function test ──
test("calls onLogin with the entered credentials", async () => {
  const user      = userEvent.setup();
  const mockFn    = jest.fn();

  render(<LoginForm onLogin={mockFn} />);

  await user.type(screen.getByPlaceholderText("Email"),    "dev@email.com");
  await user.type(screen.getByPlaceholderText("Password"), "secret123");
  await user.click(screen.getByRole("button", { name: "Login" }));

  expect(mockFn).toHaveBeenCalledWith({
    email: "dev@email.com",
    password: "secret123",
  });
});

// ── Async data test ──
test("shows user name after fetch completes", async () => {
  render(<UserProfile userId={1} />);
  const name = await screen.findByText("Leanne Graham");
  expect(name).toBeInTheDocument();
});`,
  },
  {
    id: 30,
    emoji: "▲",
    title: "Next.js",
    color: "#ffffff",
    theory: [
      "Next.js is a React framework that adds server-side rendering, file-based routing, API routes, and built-in optimisations on top of React.",
      "With plain React (Vite), all rendering happens in the browser — the server sends an empty HTML shell. Next.js can render pages on the server for faster loads and better SEO.",
      "The App Router (Next.js 13+) uses a folder-based routing system in the app/ directory — each folder maps to a URL segment automatically.",
      "Create a project: npx create-next-app@latest my-app",
    ],
    notes: [
      "app/page.jsx = /   |   app/about/page.jsx = /about   |   app/blog/[id]/page.jsx = /blog/42",
      "Server Components (default) — run on the server, no useState or useEffect allowed inside.",
      "Client Components — add 'use client' at the very top of the file to enable hooks and browser APIs.",
      "Next.js provides a Link component for client-side navigation without a full page reload.",
      "Next.js provides an Image component with automatic optimisation, lazy loading, and responsive sizing.",
      "API routes: app/api/users/route.js — export GET and POST functions to build backend endpoints.",
    ],
    code: `// Create project: npx create-next-app@latest my-app

// ── Folder structure ──────────────────────────
// app/
//   layout.jsx           root layout (wraps all pages)
//   page.jsx             route: /
//   about/
//     page.jsx           route: /about
//   blog/
//     [id]/
//       page.jsx         route: /blog/42
//   api/
//     users/
//       route.js         API endpoint: /api/users

// ── app/layout.jsx ────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// ── app/page.jsx (Server Component) ───────────
// async function — runs on the server, fetches directly
export default async function HomePage() {
  const res  = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();
  return <h1>Hello, {user.name}</h1>;
}

// ── app/blog/[id]/page.jsx (dynamic route) ────
export default async function BlogPost({ params }) {
  const { id } = params;
  const res  = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const post = await res.json();
  return <article><h1>{post.title}</h1><p>{post.body}</p></article>;
}

// ── Client Component (needs hooks) ────────────
"use client";  // must be the very first line

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      {/* The Next.js Link component — no full page reload */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <button onClick={() => setOpen(!open)}>Menu</button>
    </nav>
  );
}

// ── app/api/users/route.js ─────────────────────
export async function GET() {
  return Response.json([{ id: 1, name: "Devendra" }]);
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ created: true, data: body });
}`,
  },
];

// ─── Interview Definitions data ──────────────────────────────────────────────
const interviewCategories = [
  {
    label: "Core Concepts",
    color: "#61DAFB",
    emoji: "⚛️",
    terms: [
      {
        term: "React",
        simple: "A JavaScript library made by Meta for building user interfaces faster and more efficiently.",
        technical: "React is a declarative, component-based JavaScript library for building UIs. It uses a Virtual DOM to minimize expensive real DOM operations by diffing changes and applying only what's needed. It follows a unidirectional data flow and separates UI into reusable components.",
        tip: "Don't call it a framework — it's a library. Frameworks like Angular are opinionated and come with everything. React only handles the View layer.",
      },
      {
        term: "SPA (Single Page Application)",
        simple: "A web app that loads once and updates the content dynamically without refreshing the browser.",
        technical: "An SPA loads a single HTML file on the first request. After that, JavaScript intercepts navigation, updates the URL via the History API, and re-renders components without a full page reload. React with React Router is a classic SPA setup.",
        tip: "Downside of SPAs: poor SEO and slow initial load. That's why Next.js (SSR) was created.",
      },
      {
        term: "Virtual DOM",
        simple: "A lightweight copy of the real DOM that React uses to figure out what changed before updating the browser.",
        technical: "The Virtual DOM is an in-memory JavaScript object tree that mirrors the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the previous one (reconciliation), and batches only the minimal real DOM updates needed. This is far faster than re-rendering the entire page.",
        tip: "Key interview answer: 'React never touches the real DOM directly — it updates the Virtual DOM first, calculates the diff, then commits the minimum changes.'",
      },
      {
        term: "Reconciliation",
        simple: "The process React uses to compare the old and new Virtual DOM and decide what to update.",
        technical: "When state or props change, React calls render to produce a new Virtual DOM tree. React then diffs this against the previous tree using its reconciliation algorithm. It uses keys to track list items, bails out on subtrees that haven't changed, and batches DOM mutations for performance.",
        tip: "This is why the key prop matters in lists — without it React can't correctly identify which item changed.",
      },
      {
        term: "Component",
        simple: "A reusable, self-contained piece of UI — like a LEGO block for your web page.",
        technical: "A React component is a JavaScript function (or class) that accepts props as input and returns JSX describing what to render. Components encapsulate their own logic and UI, can hold local state, and can be composed together to build complex interfaces.",
        tip: "Always start component names with a capital letter. React treats lowercase names as native HTML elements.",
      },
      {
        term: "JSX",
        simple: "A syntax that lets you write HTML-like code inside JavaScript.",
        technical: "JSX (JavaScript XML) is syntactic sugar that gets compiled by Babel into React.createElement() calls. It is not HTML — it uses className instead of class, htmlFor instead of for, and all tags must be closed. JavaScript expressions go inside curly braces {}.",
        tip: "JSX is optional — you could write React.createElement() manually — but nobody does.",
      },
      {
        term: "Props",
        simple: "Data passed from a parent component to a child component, like arguments to a function.",
        technical: "Props (properties) are read-only inputs passed down the component tree. They enforce one-way data flow — data flows from parent to child only. A child component must never mutate its props. For two-way communication, parents pass callback functions as props.",
        tip: "Props are immutable. If a child needs to change something, it should call a function prop passed from the parent.",
      },
      {
        term: "State",
        simple: "Data that belongs to a component and can change over time, triggering a re-render.",
        technical: "State is mutable data managed inside a component using the useState hook. When state is updated via the setter function, React schedules a re-render of that component and its children. State updates may be batched for performance. Unlike props, state is private to the component.",
        tip: "Props come from outside (parent). State lives inside the component itself. This is a very common interview question.",
      },
      {
        term: "Reusability",
        simple: "Writing a component once and using it in multiple places without rewriting the code.",
        technical: "Reusability is achieved by building components that accept props to control their output, keeping them generic and composable. Custom hooks extend this to logic reuse. A well-designed reusable component has a clear API (props), no side effects hidden inside, and a single responsibility.",
        tip: "Example: a Button component that accepts label, onClick, and variant props can be reused everywhere instead of rewriting button markup each time.",
      },
    ],
  },
  {
    label: "Hooks",
    color: "#F7DF1E",
    emoji: "🪝",
    terms: [
      {
        term: "Hooks",
        simple: "Special functions that let you add React features like state and side effects to functional components.",
        technical: "Hooks are functions prefixed with 'use' that allow functional components to opt into React features previously only available in class components. Introduced in React 16.8. They must be called at the top level of a component (not inside loops, conditions, or nested functions) to preserve call order between renders.",
        tip: "The two rules of hooks: 1) Only call hooks at the top level. 2) Only call hooks from React functions.",
      },
      {
        term: "useState",
        simple: "A hook that adds a state variable to a component.",
        technical: "useState(initialValue) returns a tuple [state, setState]. The state persists across renders. Calling setState schedules a re-render with the new value. State updates are asynchronous and may be batched. For updates based on previous state, use the functional form: setState(prev => prev + 1).",
        tip: "Never mutate state directly (e.g. state.push()). Always use the setter function — otherwise React won't know to re-render.",
      },
      {
        term: "useEffect",
        simple: "A hook for running side effects like fetching data, setting timers, or subscribing to events.",
        technical: "useEffect(fn, deps) runs fn after the component renders. The dependency array controls when it re-runs: [] runs once on mount, [val] runs when val changes, and no array runs after every render. Return a cleanup function to cancel subscriptions or timers when the component unmounts.",
        tip: "Common mistake: putting an async function directly inside useEffect. Define the async function inside and call it instead.",
      },
      {
        term: "useRef",
        simple: "A hook that stores a mutable value that does NOT cause a re-render when changed.",
        technical: "useRef returns a mutable ref object { current: value } that persists across renders. Unlike state, mutating .current does not trigger a re-render. Two main uses: 1) Accessing a DOM element directly (ref={myRef} on JSX). 2) Storing mutable values like interval IDs or previous state values.",
        tip: "useRef vs useState: state change = re-render. Ref change = no re-render. Use ref for things React doesn't need to 'know about'.",
      },
      {
        term: "useContext",
        simple: "A hook that lets any component read shared data without passing props through every level.",
        technical: "useContext(MyContext) subscribes a component to the nearest matching Context Provider above it in the tree. When the Provider's value changes, all consuming components re-render. It solves prop drilling but shouldn't be overused — best for truly global data like theme, auth user, or locale.",
        tip: "Context is not a state manager — it's a way to broadcast a value. For complex state, pair it with useReducer.",
      },
      {
        term: "useReducer",
        simple: "A hook for managing complex state using a reducer function, similar to how Redux works.",
        technical: "useReducer(reducer, initialState) returns [state, dispatch]. You dispatch action objects ({ type, payload }) and the reducer — a pure function (state, action) => newState — computes the next state. Preferred over useState when state logic is complex, has multiple sub-values, or transitions depend on the previous state.",
        tip: "useReducer is useState under the hood. Choose useReducer when your state logic has more than 2-3 related transitions.",
      },
      {
        term: "useMemo",
        simple: "A hook that caches the result of an expensive calculation so it isn't recalculated on every render.",
        technical: "useMemo(() => compute(), deps) memoizes the return value of a function. React reuses the cached result across renders and only calls compute() again when one of the deps changes. Used to avoid expensive operations like sorting or filtering large arrays on every render.",
        tip: "Don't overuse it. useMemo itself has overhead. Only use it when profiling shows an actual performance problem.",
      },
      {
        term: "useCallback",
        simple: "A hook that caches a function so it doesn't get recreated on every render.",
        technical: "useCallback(fn, deps) returns a memoized version of fn. Without it, a new function reference is created on every render. This matters when passing callbacks to child components wrapped in React.memo — a new reference would force the child to re-render even if nothing changed.",
        tip: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Both memoize — one for values, one for functions.",
      },
      {
        term: "Custom Hooks",
        simple: "Your own reusable hooks that extract stateful logic out of components.",
        technical: "A custom hook is a JavaScript function whose name starts with 'use' that calls other hooks inside. Each component that calls a custom hook gets its own isolated state — hooks don't share state between callers. They allow logic reuse without changing component hierarchy.",
        tip: "The 'use' prefix is required — it signals to React (and linters) that hook rules apply to this function.",
      },
    ],
  },
  {
    label: "Rendering & Performance",
    color: "#FF6B6B",
    emoji: "🚀",
    terms: [
      {
        term: "Re-render",
        simple: "When React calls a component function again to produce an updated UI.",
        technical: "A component re-renders when: 1) Its own state changes. 2) Its parent re-renders (even with same props). 3) A Context it subscribes to changes. React batches multiple state updates in the same event handler into a single re-render. Re-renders are cheap — only the Virtual DOM diff + minimal real DOM update.",
        tip: "Re-renders are not bad by default. The real cost is unnecessary re-renders in expensive components.",
      },
      {
        term: "React.memo",
        simple: "A wrapper that skips re-rendering a component if its props haven't changed.",
        technical: "React.memo is a higher-order component that performs a shallow comparison of the component's props between renders. If all props are reference-equal, React reuses the last render output and skips calling the component function. A custom comparison function can be passed as the second argument.",
        tip: "memo only prevents re-renders from the parent. The component still re-renders if its own state or context changes.",
      },
      {
        term: "Lazy Loading",
        simple: "Loading a component's code only when it's actually needed, not upfront.",
        technical: "React.lazy(() => import('./Component')) creates a lazily loaded component. Its JavaScript bundle is only downloaded when the component first renders. Must be wrapped in a Suspense boundary that shows a fallback UI during loading. Dramatically reduces initial bundle size.",
        tip: "Best used at the route level — each page loads only when the user navigates to it.",
      },
      {
        term: "Code Splitting",
        simple: "Breaking your app's JavaScript into smaller files that load on demand.",
        technical: "Code splitting uses dynamic import() to split a bundle into chunks. Vite and Webpack do this automatically for React.lazy imports. Instead of one large bundle, users download only the code needed for the current view. Reduces Time to Interactive (TTI) significantly for large apps.",
        tip: "Code splitting and lazy loading go hand in hand. lazy() is how you trigger a split point in React.",
      },
      {
        term: "Batching",
        simple: "React grouping multiple state updates together and doing one re-render instead of many.",
        technical: "React 18 introduced automatic batching — multiple setState calls inside event handlers, setTimeout, Promises, and native event listeners are all batched into a single re-render. Previously, only React event handlers were batched. Batching reduces render cycles and improves performance.",
        tip: "Batching is automatic in React 18. In React 17 and earlier, updates inside async functions were NOT batched.",
      },
    ],
  },
  {
    label: "Patterns & Architecture",
    color: "#A78BFA",
    emoji: "🏗️",
    terms: [
      {
        term: "Lifting State Up",
        simple: "Moving shared state to the closest common parent so sibling components can both access it.",
        technical: "When two sibling components need to share state, the state is lifted to their nearest common ancestor. The parent owns the state and passes it down as props. Children communicate back up via callback functions passed as props. This maintains unidirectional data flow.",
        tip: "This is the answer to: 'How do you share data between two sibling components?' in an interview.",
      },
      {
        term: "Prop Drilling",
        simple: "Passing props through many intermediate components just to reach a deeply nested child.",
        technical: "Prop drilling occurs when props are passed through multiple component layers that don't use them — they just pass them along to children. It makes components tightly coupled and hard to refactor. Solutions: Context API, state management libraries, or component composition.",
        tip: "Prop drilling 2-3 levels deep is fine. More than that — consider Context or state management.",
      },
      {
        term: "Component Composition",
        simple: "Building complex UIs by combining simple, reusable components instead of making one giant component.",
        technical: "Composition uses the children prop or named slot props to build flexible, reusable wrapper components. A Card component doesn't need to know what it wraps — it just renders {children}. This avoids the need for class inheritance and keeps components loosely coupled and highly reusable.",
        tip: "React favours composition over inheritance. You rarely need to extend components — compose them instead.",
      },
      {
        term: "Controlled Component",
        simple: "A form input whose value is controlled by React state, making React the single source of truth.",
        technical: "In a controlled component, the input's value is set by state and every change fires an onChange handler that updates state. The DOM never holds the data — React does. This enables real-time validation, conditional disabling, and formatted input. The opposite is an uncontrolled component, where the DOM manages the value.",
        tip: "Controlled: value={state} + onChange={handler}. Uncontrolled: uses useRef to read the value when needed.",
      },
      {
        term: "Higher-Order Component (HOC)",
        simple: "A function that takes a component and returns a new component with added behavior.",
        technical: "An HOC is a pattern where a function accepts a component as an argument and returns a new component that wraps it with additional props, logic, or behavior — without modifying the original. Examples: React.memo, connect() from Redux, withRouter. HOCs have largely been replaced by hooks in modern React.",
        tip: "HOCs were the old way to share logic. Custom hooks are now the preferred approach — simpler and more composable.",
      },
      {
        term: "Pure Component",
        simple: "A component that always produces the same output for the same input and has no side effects.",
        technical: "A pure component is referentially transparent — its render output depends only on its props and state, never on external mutable state or side effects. React.PureComponent (class) and React.memo (function) implement shallow prop comparison to skip re-renders when inputs haven't changed, leveraging the purity guarantee.",
        tip: "Pure components are predictable, easy to test, and easy to optimize. Always aim to keep components pure.",
      },
      {
        term: "Unidirectional Data Flow",
        simple: "Data always flows in one direction in React: from parent to child via props.",
        technical: "React enforces a single direction for data: parent components pass data down to children via props. Children cannot modify props — they communicate upward by calling callback functions received as props. This makes data flow predictable, debuggable, and easy to trace compared to two-way binding frameworks.",
        tip: "This is the fundamental architecture of React. Understanding it deeply is essential for senior-level interviews.",
      },
    ],
  },
  {
    label: "Advanced Concepts",
    color: "#34D399",
    emoji: "🔬",
    terms: [
      {
        term: "Context API",
        simple: "A built-in way to share data across the component tree without passing props at every level.",
        technical: "Context provides a way to pass data through the component tree without explicit prop threading. createContext creates a context object. A Provider component wraps the subtree and broadcasts a value. Any descendant can call useContext to read that value and will re-render when it changes.",
        tip: "Context is not a performance tool — every consumer re-renders on value change. For frequent updates, consider a dedicated state library.",
      },
      {
        term: "Portals",
        simple: "A way to render a component's output into a different part of the DOM outside its parent.",
        technical: "Portals render children into a DOM node that exists outside the parent component's DOM hierarchy. Despite the different DOM location, the component remains a child in the React tree — events bubble normally, Context works, and lifecycle hooks behave as expected. Primarily used for modals, tooltips, and dropdowns.",
        tip: "Portals solve the 'overflow:hidden parent trapping a modal' problem — the modal escapes the parent in the real DOM.",
      },
      {
        term: "Error Boundary",
        simple: "A component that catches JavaScript errors in its children and shows a fallback UI instead of crashing the app.",
        technical: "Error boundaries are class components that implement getDerivedStateFromError (to show fallback UI) and/or componentDidCatch (to log errors). They catch errors during rendering, lifecycle methods, and constructors of child components — but NOT in event handlers (use try/catch there) or async code.",
        tip: "Place error boundaries strategically around sections — not just one at the top — so one broken feature doesn't crash unrelated UI.",
      },
      {
        term: "Suspense",
        simple: "A component that shows a fallback UI while waiting for something — like a lazy-loaded component — to finish loading.",
        technical: "Suspense catches components that 'suspend' (throw a Promise) and renders a fallback until they resolve. Currently used with React.lazy for code splitting and with data fetching libraries that support Suspense. React 18 expanded Suspense support for concurrent features like startTransition.",
        tip: "Suspense is React's declarative way to handle async loading states — instead of writing isLoading checks manually.",
      },
      {
        term: "Keys",
        simple: "A unique identifier React uses to track items in a list across re-renders.",
        technical: "Keys help React's reconciliation algorithm identify which items in a list have changed, been added, or removed. They must be unique among siblings. Using array index as key causes bugs when list order changes — use stable unique IDs from your data instead. Keys are not passed as props to the child component.",
        tip: "Common bug: using index as key in sortable or filterable lists causes input values to appear on the wrong item after re-order.",
      },
      {
        term: "Strict Mode",
        simple: "A React tool that highlights potential problems in your app during development.",
        technical: "React.StrictMode wraps your app in development mode only and intentionally double-invokes render functions and effects to detect side effects. It also warns about deprecated APIs and unexpected side effects. Has zero impact on production builds.",
        tip: "Strict Mode is why useEffect seems to fire twice in development — it's intentional, to catch impure effects.",
      },
      {
        term: "Concurrent Mode / Concurrent Features",
        simple: "React's ability to work on multiple tasks at once and prioritize urgent updates over slower ones.",
        technical: "Concurrent rendering (React 18+) allows React to pause, interrupt, and resume rendering work. startTransition marks updates as non-urgent so React can prioritize urgent updates (like typing) over slow ones (like filtering a large list). This prevents UI from feeling janky under heavy render load.",
        tip: "useTransition and startTransition are the main APIs. If asked about React 18, mention concurrent features.",
      },
    ],
  },
];

// ─── Shared layout styles ────────────────────────────────────────────────────
const S = {
  shell: { fontFamily: "'Fira Code','Courier New',monospace", background:"#0d1117", minHeight:"100vh", color:"#e6edf3" },
  sidebar: { width:"220px", minWidth:"220px", background:"#161b22", borderRight:"1px solid #30363d", overflowY:"auto", padding:"16px 0" },
  sidebarBtn: (active, color) => ({
    display:"flex", alignItems:"center", gap:"10px", width:"100%",
    padding:"10px 16px", background: active?"#21262d":"transparent", border:"none",
    borderLeft: active?`3px solid ${color}`:"3px solid transparent",
    color: active?"#e6edf3":"#8b949e", cursor:"pointer", textAlign:"left",
    fontSize:"12px", transition:"all 0.15s",
  }),
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV = [
  { label:"🏠 Home",             path:"/" },
  { label:"⚡ Quick Review",      path:"/quick-review" },
  { label:"🟢 Basic 1–9",        path:"/basic" },
  { label:"🟡 Intermediate 10–18",path:"/intermediate" },
  { label:"🔴 Advanced 19–30",   path:"/advanced" },
  { label:"🎯 Interview Defs",   path:"/interview" },
];

function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position:"sticky",top:0,zIndex:200,background:"#161b22",
                   borderBottom:"1px solid #30363d" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 1rem",
                     height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <Link to="/" style={{ color:"#61DAFB",textDecoration:"none",fontWeight:700,
                                fontSize:"1.05rem",fontFamily:"'Fira Code',monospace" }}>
          ⚛️ ReactNotes
        </Link>
        <div style={{ display:"flex",alignItems:"center",gap:"2px",flexWrap:"wrap" }}>
          {NAV.map(({label,path})=>(
            <Link key={path} to={path} style={{
              color: loc.pathname===path?"#61DAFB":"#8b949e",
              textDecoration:"none", padding:"5px 10px", borderRadius:6,
              background: loc.pathname===path?"#21262d":"transparent",
              fontSize:"11px", transition:"all 0.15s", fontFamily:"'Fira Code',monospace",
            }}>{label}</Link>
          ))}
          <a href="https://github.com/devsjeff" target="_blank" rel="noopener noreferrer"
             style={{ marginLeft:8,color:"#0d1117",background:"#61DAFB",textDecoration:"none",
                        padding:"5px 12px",borderRadius:6,fontSize:"11px",fontWeight:700 }}>
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const cards = NAV.slice(1);
  const descs = [
    "All 30 topics at a glance — read in ~10 min",
    "Topics 1–9: JSX, Props, State, Events, Lists",
    "Topics 10–18: useEffect, Forms, Router, Context",
    "Topics 19–30: useReducer, Memo, Next.js & more",
    "Every React term explained simply + technically",
  ];
  return (
    <main style={{ maxWidth:900,margin:"3rem auto",padding:"0 1.5rem",
                     fontFamily:"'Fira Code',monospace" }}>
      <h1 style={{fontSize:"2rem",color:"#e6edf3",marginBottom:".4rem"}}>⚛️ React Study Notes</h1>
      <p style={{color:"#8b949e",marginBottom:"2.5rem"}}>30 topics · 5 sections · all in one place</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1rem"}}>
        {cards.map(({label,path},i)=>(
          <Link key={path} to={path} style={{
            display:"flex",flexDirection:"column",gap:8,
            background:"#161b22",border:"1px solid #30363d",
            borderRadius:10,padding:"1.2rem 1.4rem",
            color:"#e6edf3",textDecoration:"none",
            transition:"border-color .2s",
          }}>
            <span style={{fontWeight:700,fontSize:"0.9rem"}}>&nbsp;{label}</span>
            <span style={{color:"#8b949e",fontSize:"0.78rem",lineHeight:1.5}}>{descs[i]}</span>
            <span style={{color:"#61DAFB",fontSize:"1.1rem",alignSelf:"flex-end"}}>→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

// ─── Quick Review ─────────────────────────────────────────────────────────────
function QuickReview() {
  const lines = quickReviewMD.split("\n");
  return (
    <main style={{ maxWidth:820,margin:"2rem auto",padding:"0 1.5rem",
                     fontFamily:"'Fira Code',monospace",color:"#e6edf3" }}>
      {lines.map((line, i) => {
        if (line.startsWith("# "))  return <h1 key={i} style={{color:"#61DAFB",fontSize:"1.6rem"}}>&nbsp;{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} style={{color:"#F7DF1E",fontSize:"1.1rem",marginTop:"2rem",borderBottom:"1px solid #30363d",paddingBottom:6}}>&nbsp;{line.slice(3)}</h2>;
        if (line.startsWith("### "))return <h3 key={i} style={{color:"#FF6B6B",fontSize:"0.95rem",marginTop:"1.2rem"}}>&nbsp;{line.slice(4)}</h3>;
        if (line.startsWith("- ")) return <p key={i} style={{margin:"4px 0",color:"#c9d1d9",fontSize:"0.84rem",paddingLeft:12}}>→ {line.slice(2)}</p>;
        if (line.startsWith("|")) return <p key={i} style={{fontFamily:"monospace",fontSize:"0.78rem",color:"#8b949e",margin:"2px 0"}}>&nbsp;{line}</p>;
        if (line.trim()==="---") return <hr key={i} style={{borderColor:"#30363d",margin:"1rem 0"}}/>;
        if (line.trim()==="") return <br key={i}/>;
        return <p key={i} style={{color:"#c9d1d9",fontSize:"0.84rem",lineHeight:1.7,margin:"6px 0"}}>&nbsp;{line}</p>;
      })}
    </main>
  );
}

// ─── Basic Notes (1–9) ────────────────────────────────────────────────────────
export function BasicNotes() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("theory");

  const topic = topics[selected];

  return (
    <div style={{
      fontFamily: "'Fira Code', 'Courier New', monospace",
      background: "#0d1117",
      minHeight: "100vh",
      display: "flex",
      color: "#e6edf3",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "220px",
        minWidth: "220px",
        background: "#161b22",
        borderRight: "1px solid #30363d",
        overflowY: "auto",
        padding: "16px 0",
      }}>
        <div style={{
          padding: "0 16px 16px",
          borderBottom: "1px solid #30363d",
          marginBottom: "8px",
        }}>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "2px", textTransform: "uppercase" }}>React Basics</div>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#61DAFB", marginTop: "4px" }}>Topics 1–9</div>
        </div>
        {topics.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setSelected(i); setTab("theory"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 16px",
              background: selected === i ? "#21262d" : "transparent",
              border: "none",
              borderLeft: selected === i ? `3px solid ${t.color}` : "3px solid transparent",
              color: selected === i ? "#e6edf3" : "#8b949e",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "12px",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: "16px" }}>{t.emoji}</span>
            <span style={{ lineHeight: "1.3" }}>{t.id}. {t.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{
          padding: "28px 32px 20px",
          borderBottom: "1px solid #30363d",
          background: "#0d1117",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>{topic.emoji}</span>
            <div>
              <span style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px" }}>TOPIC {topic.id} OF 9</span>
              <h1 style={{ margin: 0, fontSize: "22px", color: topic.color }}>{topic.title}</h1>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px" }}>
            {["theory", "notes", "code"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: tab === t ? topic.color : "#30363d",
                  background: tab === t ? topic.color + "22" : "transparent",
                  color: tab === t ? topic.color : "#8b949e",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
              >
                {t === "theory" ? "📖 Theory" : t === "notes" ? "📌 Notes" : "💻 Code"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: "28px 32px" }}>
          {tab === "theory" && (
            <div>
              {topic.theory.map((point, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "14px",
                  marginBottom: "16px",
                  padding: "16px",
                  background: "#161b22",
                  borderRadius: "10px",
                  border: "1px solid #30363d",
                  borderLeft: `3px solid ${topic.color}`,
                }}>
                  <span style={{ color: topic.color, fontWeight: "bold", fontSize: "14px", minWidth: "20px" }}>{i + 1}.</span>
                  <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{point}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div>
              <div style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "10px",
                padding: "20px",
              }}>
                {topic.notes.map((note, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "10px",
                    padding: "10px 0",
                    borderBottom: i < topic.notes.length - 1 ? "1px solid #21262d" : "none",
                  }}>
                    <span style={{ color: topic.color, fontSize: "16px" }}>→</span>
                    <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "code" && (
            <div>
              <div style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "10px",
                overflow: "hidden",
              }}>
                <div style={{
                  background: "#21262d",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderBottom: "1px solid #30363d",
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", color: "#8b949e", marginLeft: "8px" }}>example.jsx</span>
                </div>
                <pre style={{
                  margin: 0,
                  padding: "20px",
                  overflowX: "auto",
                  fontSize: "13px",
                  lineHeight: "1.8",
                  color: "#e6edf3",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  <code>{topic.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 32px 32px",
          gap: "12px",
        }}>
          <button
            onClick={() => { setSelected(Math.max(0, selected - 1)); setTab("theory"); }}
            disabled={selected === 0}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #30363d",
              background: selected === 0 ? "#161b22" : "#21262d",
              color: selected === 0 ? "#484f58" : "#c9d1d9",
              cursor: selected === 0 ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontFamily: "inherit",
            }}
          >
            ← Previous
          </button>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {topics.map((_, i) => (
              <div
                key={i}
                onClick={() => { setSelected(i); setTab("theory"); }}
                style={{
                  width: selected === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: selected === i ? topic.color : "#30363d",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => { setSelected(Math.min(topics.length - 1, selected + 1)); setTab("theory"); }}
            disabled={selected === topics.length - 1}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #30363d",
              background: selected === topics.length - 1 ? "#161b22" : "#21262d",
              color: selected === topics.length - 1 ? "#484f58" : "#c9d1d9",
              cursor: selected === topics.length - 1 ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontFamily: "inherit",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Intermediate Notes (10–18) ───────────────────────────────────────────────
export function IntermediateNotes() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("theory");
  const topic = topics1018[selected];

  return (
    <div style={{
      fontFamily: "'Fira Code', 'Courier New', monospace",
      background: "#0d1117",
      minHeight: "100vh",
      display: "flex",
      color: "#e6edf3",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "220px", minWidth: "220px",
        background: "#161b22",
        borderRight: "1px solid #30363d",
        overflowY: "auto",
        padding: "16px 0",
      }}>
        <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #30363d", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "2px", textTransform: "uppercase" }}>React Intermediate</div>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#61DAFB", marginTop: "4px" }}>Topics 10–18</div>
        </div>
        {topics1018.map((t, i) => (
          <button key={t.id} onClick={() => { setSelected(i); setTab("theory"); }} style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "10px 16px",
            background: selected === i ? "#21262d" : "transparent",
            border: "none",
            borderLeft: selected === i ? `3px solid ${t.color}` : "3px solid transparent",
            color: selected === i ? "#e6edf3" : "#8b949e",
            cursor: "pointer", textAlign: "left", fontSize: "12px", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "16px" }}>{t.emoji}</span>
            <span style={{ lineHeight: "1.3" }}>{t.id}. {t.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{
          padding: "28px 32px 20px", borderBottom: "1px solid #30363d",
          background: "#0d1117", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>{topic.emoji}</span>
            <div>
              <span style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px" }}>TOPIC {topic.id} OF 18</span>
              <h1 style={{ margin: 0, fontSize: "22px", color: topic.color }}>{topic.title}</h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {["theory", "notes", "code"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "6px 16px", borderRadius: "6px", border: "1px solid",
                borderColor: tab === t ? topic.color : "#30363d",
                background: tab === t ? topic.color + "22" : "transparent",
                color: tab === t ? topic.color : "#8b949e",
                cursor: "pointer", fontSize: "12px", fontFamily: "inherit",
                textTransform: "capitalize", letterSpacing: "0.5px",
              }}>
                {t === "theory" ? "📖 Theory" : t === "notes" ? "📌 Notes" : "💻 Code"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px" }}>
          {tab === "theory" && (
            <div>
              {topic.theory.map((point, i) => (
                <div key={i} style={{
                  display: "flex", gap: "14px", marginBottom: "16px",
                  padding: "16px", background: "#161b22", borderRadius: "10px",
                  border: "1px solid #30363d", borderLeft: `3px solid ${topic.color}`,
                }}>
                  <span style={{ color: topic.color, fontWeight: "bold", fontSize: "14px", minWidth: "20px" }}>{i + 1}.</span>
                  <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{point}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "20px" }}>
              {topic.notes.map((note, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px", padding: "10px 0",
                  borderBottom: i < topic.notes.length - 1 ? "1px solid #21262d" : "none",
                }}>
                  <span style={{ color: topic.color, fontSize: "16px" }}>→</span>
                  <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{note}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "code" && (
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{
                background: "#21262d", padding: "10px 16px",
                display: "flex", alignItems: "center", gap: "8px",
                borderBottom: "1px solid #30363d",
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                <span style={{ fontSize: "12px", color: "#8b949e", marginLeft: "8px" }}>example.jsx</span>
              </div>
              <pre style={{
                margin: 0, padding: "20px", overflowX: "auto",
                fontSize: "13px", lineHeight: "1.8", color: "#e6edf3",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                <code>{topic.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 32px 32px", gap: "12px" }}>
          <button
            onClick={() => { setSelected(Math.max(0, selected - 1)); setTab("theory"); }}
            disabled={selected === 0}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #30363d",
              background: selected === 0 ? "#161b22" : "#21262d",
              color: selected === 0 ? "#484f58" : "#c9d1d9",
              cursor: selected === 0 ? "not-allowed" : "pointer",
              fontSize: "13px", fontFamily: "inherit",
            }}
          >← Previous</button>

          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {topics1018.map((_, i) => (
              <div key={i} onClick={() => { setSelected(i); setTab("theory"); }} style={{
                width: selected === i ? "20px" : "8px", height: "8px", borderRadius: "4px",
                background: selected === i ? topic.color : "#30363d",
                cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>

          <button
            onClick={() => { setSelected(Math.min(topics1018.length - 1, selected + 1)); setTab("theory"); }}
            disabled={selected === topics1018.length - 1}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #30363d",
              background: selected === topics1018.length - 1 ? "#161b22" : "#21262d",
              color: selected === topics1018.length - 1 ? "#484f58" : "#c9d1d9",
              cursor: selected === topics1018.length - 1 ? "not-allowed" : "pointer",
              fontSize: "13px", fontFamily: "inherit",
            }}
          >Next →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Advanced Notes (19–30) ───────────────────────────────────────────────────
export function AdvancedNotes() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("theory");
  const topic = topics1930[selected];

  return (
    <div style={{
      fontFamily: "'Fira Code', 'Courier New', monospace",
      background: "#0d1117", minHeight: "100vh",
      display: "flex", color: "#e6edf3",
    }}>
      <div style={{
        width: "220px", minWidth: "220px", background: "#161b22",
        borderRight: "1px solid #30363d", overflowY: "auto", padding: "16px 0",
      }}>
        <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #30363d", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "2px", textTransform: "uppercase" }}>React Advanced</div>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#61DAFB", marginTop: "4px" }}>Topics 19–30</div>
        </div>
        {topics1930.map((t, i) => (
          <button key={t.id} onClick={() => { setSelected(i); setTab("theory"); }} style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "10px 16px",
            background: selected === i ? "#21262d" : "transparent",
            border: "none",
            borderLeft: selected === i ? `3px solid ${t.color}` : "3px solid transparent",
            color: selected === i ? "#e6edf3" : "#8b949e",
            cursor: "pointer", textAlign: "left", fontSize: "12px", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "16px" }}>{t.emoji}</span>
            <span style={{ lineHeight: "1.3" }}>{t.id}. {t.title}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          padding: "28px 32px 20px", borderBottom: "1px solid #30363d",
          background: "#0d1117", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>{topic.emoji}</span>
            <div>
              <span style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px" }}>TOPIC {topic.id} OF 30</span>
              <h1 style={{ margin: 0, fontSize: "22px", color: topic.color }}>{topic.title}</h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {["theory", "notes", "code"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "6px 16px", borderRadius: "6px", border: "1px solid",
                borderColor: tab === t ? topic.color : "#30363d",
                background: tab === t ? topic.color + "22" : "transparent",
                color: tab === t ? topic.color : "#8b949e",
                cursor: "pointer", fontSize: "12px", fontFamily: "inherit",
                textTransform: "capitalize", letterSpacing: "0.5px",
              }}>
                {t === "theory" ? "📖 Theory" : t === "notes" ? "📌 Notes" : "💻 Code"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {tab === "theory" && (
            <div>
              {topic.theory.map((point, i) => (
                <div key={i} style={{
                  display: "flex", gap: "14px", marginBottom: "16px",
                  padding: "16px", background: "#161b22", borderRadius: "10px",
                  border: "1px solid #30363d", borderLeft: `3px solid ${topic.color}`,
                }}>
                  <span style={{ color: topic.color, fontWeight: "bold", fontSize: "14px", minWidth: "20px" }}>{i + 1}.</span>
                  <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{point}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "20px" }}>
              {topic.notes.map((note, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px", padding: "10px 0",
                  borderBottom: i < topic.notes.length - 1 ? "1px solid #21262d" : "none",
                }}>
                  <span style={{ color: topic.color, fontSize: "16px" }}>→</span>
                  <p style={{ margin: 0, color: "#c9d1d9", lineHeight: "1.7", fontSize: "14px" }}>{note}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "code" && (
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{
                background: "#21262d", padding: "10px 16px",
                display: "flex", alignItems: "center", gap: "8px",
                borderBottom: "1px solid #30363d",
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                <span style={{ fontSize: "12px", color: "#8b949e", marginLeft: "8px" }}>example.jsx</span>
              </div>
              <pre style={{
                margin: 0, padding: "20px", overflowX: "auto",
                fontSize: "13px", lineHeight: "1.8", color: "#e6edf3",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                <code>{topic.code}</code>
              </pre>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 32px 32px", gap: "12px" }}>
          <button
            onClick={() => { setSelected(Math.max(0, selected - 1)); setTab("theory"); }}
            disabled={selected === 0}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #30363d",
              background: selected === 0 ? "#161b22" : "#21262d",
              color: selected === 0 ? "#484f58" : "#c9d1d9",
              cursor: selected === 0 ? "not-allowed" : "pointer",
              fontSize: "13px", fontFamily: "inherit",
            }}
          >← Previous</button>

          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {topics1930.map((_, i) => (
              <div key={i} onClick={() => { setSelected(i); setTab("theory"); }} style={{
                width: selected === i ? "20px" : "8px", height: "8px", borderRadius: "4px",
                background: selected === i ? topic.color : "#30363d",
                cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>

          <button
            onClick={() => { setSelected(Math.min(topics1930.length - 1, selected + 1)); setTab("theory"); }}
            disabled={selected === topics1930.length - 1}
            style={{
              padding: "10px 20px", borderRadius: "8px", border: "1px solid #30363d",
              background: selected === topics1930.length - 1 ? "#161b22" : "#21262d",
              color: selected === topics1930.length - 1 ? "#484f58" : "#c9d1d9",
              cursor: selected === topics1930.length - 1 ? "not-allowed" : "pointer",
              fontSize: "13px", fontFamily: "inherit",
            }}
          >Next →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Interview Definitions ────────────────────────────────────────────────────
export function InterviewDefs() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTerm, setActiveTerm] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const cat  = interviewCategories[activeCat];
  const item = cat.terms[activeTerm];

  function goToTerm(idx) {
    setActiveTerm(idx);
    setShowTip(false);
  }

  function nextTerm() {
    if (activeTerm < cat.terms.length - 1) {
      goToTerm(activeTerm + 1);
    } else if (activeCat < interviewCategories.length - 1) {
      setActiveCat(activeCat + 1);
      setActiveTerm(0);
      setShowTip(false);
    }
  }

  function prevTerm() {
    if (activeTerm > 0) {
      goToTerm(activeTerm - 1);
    } else if (activeCat > 0) {
      const prevCat = activeCat - 1;
      setActiveCat(prevCat);
      setActiveTerm(interviewCategories[prevCat].terms.length - 1);
      setShowTip(false);
    }
  }

  const totalTerms   = interviewCategories.reduce((s, c) => s + c.terms.length, 0);
  const termsBeforeCat = interviewCategories.slice(0, activeCat).reduce((s, c) => s + c.terms.length, 0);
  const globalIndex  = termsBeforeCat + activeTerm + 1;

  return (
    <div style={{
      fontFamily: "'Fira Code', 'Courier New', monospace",
      background: "#0d1117", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      color: "#e6edf3",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#161b22", borderBottom: "1px solid #30363d",
        padding: "12px 24px", display: "flex", alignItems: "center",
        gap: 16, flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "2px", textTransform: "uppercase" }}>React Interview</div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#61DAFB" }}>All Definitions</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {interviewCategories.map((c, i) => (
            <button key={i} onClick={() => { setActiveCat(i); setActiveTerm(0); setShowTip(false); }} style={{
              padding: "5px 12px", borderRadius: 20, border: "1px solid",
              borderColor: activeCat === i ? c.color : "#30363d",
              background: activeCat === i ? c.color + "22" : "transparent",
              color: activeCat === i ? c.color : "#8b949e",
              cursor: "pointer", fontSize: "11px", fontFamily: "inherit",
            }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: "200px", minWidth: "200px", background: "#161b22",
          borderRight: "1px solid #30363d", overflowY: "auto", padding: "8px 0",
        }}>
          {cat.terms.map((t, i) => (
            <button key={i} onClick={() => goToTerm(i)} style={{
              display: "block", width: "100%", padding: "9px 14px",
              background: activeTerm === i ? "#21262d" : "transparent",
              border: "none",
              borderLeft: activeTerm === i ? `3px solid ${cat.color}` : "3px solid transparent",
              color: activeTerm === i ? "#e6edf3" : "#8b949e",
              cursor: "pointer", textAlign: "left", fontSize: "12px",
            }}>
              {t.term}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: "11px", color: "#8b949e" }}>{globalIndex} / {totalTerms}</span>
            <div style={{ flex: 1, height: 4, background: "#21262d", borderRadius: 2 }}>
              <div style={{
                height: 4, borderRadius: 2,
                background: cat.color,
                width: `${(globalIndex / totalTerms) * 100}%`,
                transition: "width 0.3s",
              }} />
            </div>
            <span style={{ fontSize: "11px", color: cat.color }}>{cat.label}</span>
          </div>

          {/* Term card */}
          <div style={{
            background: "#161b22", border: "1px solid #30363d",
            borderRadius: 12, padding: "24px 28px", marginBottom: 16,
            borderTop: `3px solid ${cat.color}`,
          }}>
            <h2 style={{ margin: "0 0 20px", fontSize: "24px", color: cat.color }}>{item.term}</h2>

            {/* Simple */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: "10px", letterSpacing: "2px", color: "#8b949e",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                🗣️ Simple Answer (1 sentence)
              </div>
              <p style={{
                margin: 0, color: "#c9d1d9", lineHeight: 1.7, fontSize: "14px",
                padding: "12px 16px", background: "#0d1117",
                borderRadius: 8, borderLeft: `3px solid ${cat.color}`,
              }}>
                {item.simple}
              </p>
            </div>

            {/* Technical */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: "10px", letterSpacing: "2px", color: "#8b949e",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                💻 Technical Answer (for experienced interviewers)
              </div>
              <p style={{
                margin: 0, color: "#c9d1d9", lineHeight: 1.7, fontSize: "14px",
                padding: "12px 16px", background: "#0d1117",
                borderRadius: 8, borderLeft: "3px solid #30363d",
              }}>
                {item.technical}
              </p>
            </div>

            {/* Tip toggle */}
            <button onClick={() => setShowTip(!showTip)} style={{
              padding: "8px 16px", borderRadius: 8,
              border: `1px solid ${showTip ? "#FBBF24" : "#30363d"}`,
              background: showTip ? "#FBBF2422" : "transparent",
              color: showTip ? "#FBBF24" : "#8b949e",
              cursor: "pointer", fontSize: "12px", fontFamily: "inherit",
            }}>
              {showTip ? "Hide" : "Show"} Interview Tip 💡
            </button>

            {showTip && (
              <div style={{
                marginTop: 12, padding: "12px 16px",
                background: "#FBBF2411", border: "1px solid #FBBF2444",
                borderRadius: 8, color: "#FBBF24",
                fontSize: "13px", lineHeight: 1.7,
              }}>
                💡 {item.tip}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <button onClick={prevTerm}
              disabled={activeCat === 0 && activeTerm === 0}
              style={{
                padding: "10px 20px", borderRadius: 8, border: "1px solid #30363d",
                background: "#21262d", color: "#c9d1d9",
                cursor: "pointer", fontSize: "13px", fontFamily: "inherit",
                opacity: activeCat === 0 && activeTerm === 0 ? 0.4 : 1,
              }}>
              ← Previous
            </button>

            <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {cat.terms.map((_, i) => (
                <div key={i} onClick={() => goToTerm(i)} style={{
                  width: activeTerm === i ? 18 : 7, height: 7,
                  borderRadius: 4,
                  background: activeTerm === i ? cat.color : "#30363d",
                  cursor: "pointer", transition: "all 0.2s",
                }} />
              ))}
            </div>

            <button onClick={nextTerm}
              disabled={activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1}
              style={{
                padding: "10px 20px", borderRadius: 8, border: "1px solid #30363d",
                background: "#21262d", color: "#c9d1d9",
                cursor: "pointer", fontSize: "13px", fontFamily: "inherit",
                opacity: activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1 ? 0.4 : 1,
              }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App with Router ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/quick-review" element={<QuickReview />} />
        <Route path="/basic"       element={<BasicNotes />} />
        <Route path="/intermediate" element={<IntermediateNotes />} />
        <Route path="/advanced"    element={<AdvancedNotes />} />
        <Route path="/interview"   element={<InterviewDefs />} />
      </Routes>
    </Router>
  );
}