import { ContextProvider } from "./Context/context";
import Main from "./Components/Main";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Main/>
      </ContextProvider>
    </div>
  );
}

export default App;