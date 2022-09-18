import styled from "styled-components";

const LOCAL_STORAGE_PRIMARY_KEY = "ROUTES_REPO";

export const Separator = styled.div`
  margin-top: ${(props) => props.height};
`;

export const localStorageSet = (value) => {
  try {
    let dbData = window.localStorage.getItem(LOCAL_STORAGE_PRIMARY_KEY);

    if (dbData) {
      const data = JSON.parse(dbData);
      dbData = [...data, value];
    } else {
      dbData = [value];
    }

    window.localStorage.setItem(
      LOCAL_STORAGE_PRIMARY_KEY,
      JSON.stringify(dbData)
    );

    return true;
  } catch (e) {
    return false;
  }
};

export const localStorageGet = (key) => {
  try {
    let dbData = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_PRIMARY_KEY)
    );
    return dbData;
  } catch (e) {
    return null;
  }
};
