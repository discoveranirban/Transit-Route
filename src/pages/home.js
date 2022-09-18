import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "../components/map";
import { Separator } from "../utils";
import styled from "styled-components";
import { localStorageGet } from "../utils";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.text`
  font-size: 30px;
  font-weight: bold;
`;

const SubHeader = styled.text`
  font-size: 10px;
`;

const RouteBlock = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const RouteName = styled.div`
  color: ${(props) => (props.active ? "green" : "red")};
  font-weight: ${(props) => (props.viewing ? 800 : "normal")};
`;

const RouteDiv = styled.div`
  width: 80%;
  margin: 0 auto;
`;

function Home() {
  const [routeList, setRouteList] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    setRouteList(localStorageGet());
  }, []);

  return (
    <div>
      <Separator height="20px" />
      <RouteDiv>
        <HeaderDiv>
          <Header>Route List</Header>
          <SubHeader>Click on the route to view</SubHeader>
        </HeaderDiv>
        <Separator height="10px" />
        <>
          {routeList &&
            routeList.map((route) => {
              return (
                <RouteBlock
                  onClick={() => {
                    setCurrentRoute(route.name);
                  }}
                >
                  <RouteName
                    viewing={currentRoute && route.name === currentRoute}
                    active={route.status === "ACTIVE"}
                  >
                    {route.name}({route.status})
                  </RouteName>
                </RouteBlock>
              );
            })}
        </>
      </RouteDiv>
      <Separator height="20px" />
      {currentRoute && (
        <Map
          routeList={routeList}
          currentRoute={currentRoute}
          key={currentRoute}
        />
      )}
    </div>
  );
}

export default Home;
