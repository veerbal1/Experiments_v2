import "./App.css";
import ButtonWrapper from "./components/Button";
import InputWrapper from "./components/Input";
import List from "./components/List";

function App() {
  return (
    <div className="main w-screen h-screen bg-cover bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start">
      {/* Top section */}
      <div className="container mx-auto flex items-center justify-center">
        <InputWrapper />
        <ButtonWrapper>Add</ButtonWrapper>
      </div>
      {/* Bottom section */}
      <div className="container mx-auto flex items-center justify-center">
        <List />
      </div>
    </div>
  );
}

export default App;
