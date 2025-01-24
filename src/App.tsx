import CitySearchField from "./components/CitySearchField";
import Greeting from "./components/Greeting";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Greeting />
      <CitySearchField />
    </div>
  );
}

export default App;
