import { useEffect } from "react";
import { localStorageGet, localStorageSet } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import Home from "./pages/home";

function App() {
  useEffect(() => {
    const dummyRoute = {
      name: "199",
      direction: "UP",
      id: `107_${uuidv4()}`,
      status: "ACTIVE",
      stops: [
        {
          lat: 12.9795865148043,
          lng: 77.5911622741734,
          id: "stop1",
        },
        {
          lat: 12.9801301594259,
          lng: 77.5919776656823,
          id: "stop2",
        },
        {
          lat: 12.9784155838887,
          lng: 77.5912481048586,
          id: "stop3",
        },
      ],
    };

    if (!localStorageGet()) {
      localStorageSet(dummyRoute);
    }
  }, []);

  return <Home />;
}

export default App;
