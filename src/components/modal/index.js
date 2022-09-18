import { useState } from "react";
import { Separator } from "../../utils";
import styled from "styled-components";
import { localStorageSet } from "../../utils";
import { v4 as uuidv4 } from "uuid";

const Wrap = styled.div`
  padding: 10px;
`;

const Header = styled.text`
  font-size: 30px;
  font-weight: bold;
`;

const PlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Example = styled.div`
  color: grey;
  font-size: 10px;
`;

function Create() {
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [stops, setStops] = useState("");
  const [active, setActive] = useState(false);

  const handleSubmit = () => {
    const data = {
      name,
      direction,
      id: `${name}_${uuidv4()}`,
      status: "ACTIVE",
      stops,
    };

    // [{ "lat": 12.9764291706147, "lng": 77.5866347055324, id: "stop1" }, { "lat": 12.9766382674962, "lng": 77.5863986711483, id: "stop2" }, { "lat": 12.9771191896563, "lng": 77.5857120256672, id: "stop3" }]

    localStorageSet(data);
  };

  return (
    <Wrap>
      <Header>Add Route</Header>
      <form onSubmit={handleSubmit}>
        <PlaceHolder>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </PlaceHolder>
        <Separator height="5px" />
        <PlaceHolder>
          Direction:
          <div>
            <input
              type="text"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            />
            <Example>(UP/DOWN)</Example>
          </div>
        </PlaceHolder>
        <Separator height="5px" />
        <div className="topping">
          Active:
          <input
            type="checkbox"
            id="Active"
            name="Active"
            value="Paneer"
            checked={active}
            onChange={() => setActive((state) => !state)}
          />
        </div>
        <Separator height="5px" />
        <PlaceHolder>
          Stops:
          <input
            type="text"
            value={stops}
            onChange={(e) => setStops(e.target.value)}
          />
          <Example>
            EXAMPLE FORMAT:{" "}
            {`[
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
      ]`}
          </Example>
        </PlaceHolder>
        <Separator height="5px" />
        <input type="submit" value="Add" />
      </form>
    </Wrap>
  );
}

export default Create;
