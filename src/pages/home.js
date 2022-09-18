import { useState, useEffect } from "react";
import Map from "../components/map";
import { Separator } from "../utils";
import styled from "styled-components";
import { localStorageGet, localStorageSet } from "../utils";
import Modal from "react-modal";
import RouteDetails from "../components/modal";

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
  display: flex;
  align-items: center;
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

// const Edit = styled.text`
//   color: black;
//   font-weight: normal;
//   font-size: 12px;
// `;

const Del = styled.text`
  color: red;
  font-weight: normal;
  font-size: 12px;
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
  //   const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setRouteList(localStorageGet());
  }, []);

  useEffect(() => {
    if (routeList && routeList.length) {
      setCurrentRoute(routeList[0].name);
    }
  }, [routeList]);

  function closeModal() {
    setIsOpen(false);
    // setIsEdit(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //   function edit() {
  //     openModal();
  //     setIsEdit(true);
  //   }

  function handleDelete(itemName) {
    localStorage.clear();
    const modified = routeList.filter((item) => item.name !== itemName);
    if (modified && modified.length) {
      localStorageSet(...modified);
      setRouteList(localStorageGet());
    } else {
      localStorage.clear();
      setCurrentRoute(null);
      setRouteList(null);
    }
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
            routeList.length &&
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
                    {route.name}-{route.direction}({route.status})&nbsp;
                    {/* <Edit onClick={() => edit()}>edit</Edit>&nbsp; */}
                    <Del onClick={() => handleDelete(route.name)}>Delete</Del>
                  </RouteName>
                </RouteBlock>
              );
            })}
        </>
      </RouteDiv>
      <Separator height="20px" />
      {routeList && routeList.length && (
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
      >
        <RouteDetails />
      </Modal>
    </div>
  );
}

export default Home;
