import { useState, useEffect, useRef, createRef } from "react";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import axios from "axios";

import ProfileBanner from "../commons/ProfileBanner";

const baseSearchURL =
  "https://placeholder-backend.herokuapp.com/user/searchUser";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#F5F5F5",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  borderRadius: "12px",
  display: "flex",
  textAlign: "center",
  justifyContent: "space-around",

  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 0, 1, 0),
  height: "100%",
  position: "right",
  pointerEvents: "none",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#808080",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const GetSimilarConnections = (input, user_id, setResults) => {
  axios
    .get(baseSearchURL, {
      params: {
        query: input,
        current_user_id: user_id,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        // success
        const connectedUsers = response.data?.connectedUsers;
        const nonConnectedUsers = response.data?.nonConnectedUsers;
        const allUsers = connectedUsers.concat(nonConnectedUsers);
        setResults(allUsers);
      } else {
        setResults([]);
      }
    })
    .catch((error) => console.log(error));
};

export default function SearchBar() {
  const [inputKey, setInputKey] = useState("");
  const [results, setResults] = useState([]);

  const searchBarRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Esc" || event.key === "Escape") {
        setResults([]);
        setInputKey("");
      }
    })
  }, [])

  const handleClickOutside = (event) => {
    if (searchBarRef && !searchBarRef?.current?.contains(event.target)) {
      setResults([]);
    }
  }

  const handleInputChange = (event) => {
    setInputKey(event.target.value);
  }

  // TODO!!!!!! USER ID
  useEffect(() => {
    if (inputKey.length > 0) {
      GetSimilarConnections(inputKey, 100, setResults);
    }
  }, [inputKey]);

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexFlow: "column",
        justifyContent: "flex-start",
        marginTop: "3.5%",
        height: "100%",
      }}
      ref={searchBarRef}
    >
      <Search sx={{ width: "400px" }}>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ fontFamily: "Poppins" }}
          onChange={handleInputChange}
          value={inputKey}
        />
        <SearchIconWrapper>
          <SearchIcon htmlColor="#808080" sx={{ transform: "rotate(90deg)" }} />
        </SearchIconWrapper>
      </Search>
      {results.length > 0 && (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {results.map((user_elem) => {
            return (
              <ProfileBanner
                withoutName={false}
                isChatBanner={false}
                user={user_elem}
                isPostBanner={false}
                key={user_elem.id}
              />
            );
          })}
        </Box>
      )}
    </div>
  );
}
