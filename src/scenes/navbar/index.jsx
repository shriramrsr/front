import React, { useState } from "react";
import {
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Drawer,
} from "@mui/material";
import { Button } from "@mui/material";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
import TagIcon from '@mui/icons-material/Tag';
import TextsmsIcon from '@mui/icons-material/Textsms';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import {
  Search,
  Notifications,
  Help,
  Menu,
  Close,
  Message,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import SearchResults from "./Searchresults";
import UserWidget from "scenes/widgets/UserWidget";
// Custom logo component
const CustomLogo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <Button onClick={handleLogoClick}>
      <Box
        width="50px"
        height="50px"
        borderRadius="50%"
        bgcolor="primary.main"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        fontWeight="bold"
      >
        CN
      </Box>
    </Button>
  );
};


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  const background = theme.palette.background.default; // Define background here

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    if (input !== "") {
      handleSearch(input);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearch = async (searchInput) => {
    try {
      const results = await searchUsers(searchInput);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const searchUsers = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://back-94n1.onrender.com/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  };

  const handleResultClick = (result) => {
    console.log(result);
    // Handle the click event, for example, navigate to the user's profile
    // navigate(`/profile/${result._id}`);

    navigate(`/profile/${result._id}`);
    // Reset search input and results
    setSearchInput("");
    setSearchResults([]);
  };

  return (
    <>
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={alt}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        alignItems="center" // Align items to center
        justifyContent="center" // Justify content to center
      >
        <FlexBetween gap="1.75rem">
          <CustomLogo />
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
              position="relative"
            >
              <InputBase
                placeholder="Search..."
                value={searchInput}
                onChange={handleInputChange}
                sx={{ textAlign: "center" }} // Align input text to center
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
              {searchInput && searchResults.length > 0 && (
                <SearchResults
                  results={searchResults}
                  onClick={handleResultClick}
                />
              )}
            </FlexBetween>
          )}
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <TagIcon sx={{ fontSize: "25px" }} />
            <TextsmsIcon sx={{ fontSize: "25px" }} />
            <CallOutlinedIcon sx={{ fontSize: "25px" }} />
            <DuoOutlinedIcon sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <IconButton
                variant="contained"
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                }}
                onClick={() => dispatch(setLogout())}
              >
                <LogoutOutlinedIcon />
              </IconButton>
            </FormControl>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Drawer
            anchor="right"
            open={isMobileMenuToggled}
            onClose={() => setIsMobileMenuToggled(false)}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
              width="250px"
              padding="1rem"
              backgroundColor={background}
            >
              <TagIcon sx={{ fontSize: "25px" }} />
              <TextsmsIcon sx={{ fontSize: "25px" }} />
              <CallOutlinedIcon sx={{ fontSize: "25px" }} />
              <DuoOutlinedIcon sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <IconButton
                  variant="contained"
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                  }}
                  onClick={() => dispatch(setLogout())}
                >
                <LogoutOutlinedIcon sx={{ fontSize: "25px" }}/>
                <Typography variant="body1" sx={{ marginLeft: "0.5rem" }}>
    Log Out
  </Typography>
                </IconButton>
              </FormControl>
            </Box>
          </Drawer>
        )}
      </FlexBetween>
    </>
  );
};
export default Navbar;
