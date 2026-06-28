import { Widget } from "./components/Widget/Widget";
import "./index.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {" "}
      <Widget />
    </div>
  );
}

export default App;
