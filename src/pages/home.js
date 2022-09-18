import { useState, useEffect } from "react";
import Map from "../components/map";
import { Separator } from "../utils";
import styled from "styled-components";
import { localStorageGet } from "../utils";
import Modal from "react-modal";
import Create from "../components/modal";

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

const Button = styled.div`
  text-decoration: underline;
  font-weight: 500;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
};

function Home() {
  const [routeList, setRouteList] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRouteList(localStorageGet());
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Separator height="20px" />
      <RouteDiv>
        <HeaderDiv>
          <Header>Route List</Header>
          <SubHeader>Click on the route to view</SubHeader>
        </HeaderDiv>
        <Button onClick={() => openModal()}>add route</Button>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Create />
      </Modal>
    </div>
  );
}

export default Home;
