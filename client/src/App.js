import LineChart from "./components/LineChart";
import "./App.css";
import Machines from "./components/Machines";

function App() {
  return (
    <div className="App">
      <div
        style={{
          width: "60%",
          margin: "0 auto",
          paddingTop: "100px",
        }}
      >
        <Machines />
      </div>
    </div>
  );
}

export default App;
