import "./App.css";
// import { EventLayout } from "./pages/event/components/layout/layout";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
const EventLayout = lazy(() =>
  import("./pages/event/components/layout/layout").then((module) => {
    return { default: module.EventLayout };
  })
);

function Counter() {
  let [count, setCount] = useState(0);
  console.log("Component Initialized");
  //   let i = 0;
  //   while (i < 1000000) {
  //     i++;
  //   }
  useEffect(() => {
    console.log("Component Mounted");
    let timer = setInterval(() => {
      console.log("count", count);
      setCount(count++);
    }, 1000);
    return () => {
      console.log("Component Unmounting ");
      clearInterval(timer);
    };
  }, []);

  return <h1>Counter: {count} </h1>;
}

function CountInputChanges() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);

  useEffect(() => {
    // setCount(count + 1);
  }, []);
  const onChange = ({ target }: any) => {
    import("./math")
      .then(({ default: add, createSubtract }) => {
        console.log(add, createSubtract);
      })
      .catch((err) => {
        console.log(err);
      });
    setValue("cds");
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e: any) => onChange(e.target)}
      />
      <div>Number of changes: {count}</div>
    </div>
  );
}

function App() {
  return (
    <Suspense>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<EventLayout />} /> */}
          <Route path="/event-manager" element={<EventLayout />} />
        </Routes>

        <Link to="/event-manager">Event Manager</Link>

        <CountInputChanges />
        {/* <EventLayout /> */}

        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    </Suspense>
  );
}

export default App;
