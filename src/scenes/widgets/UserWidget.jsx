import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Paper, InputBase, IconButton } from "@mui/material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingOccupation, setIsEditingOccupation] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [newOccupation, setNewOccupation] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`https://back-94n1.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = async (field) => {
    if (field === "location") {
      setIsEditingLocation(true);
    } else if (field === "occupation") {
      setIsEditingOccupation(true);
    }
  };

  const handleSaveClick = async (key) => {
    const apiUrl = `https://back-94n1.onrender.com/users/${userId}`;
  
    let updateField = {};
    let newValue = "";
  
    if (key === "location") {
      updateField = { location: newLocation };
      newValue = newLocation;
      setIsEditingLocation(false);
    } else if (key === "occupation") {
      updateField = { occupation: newOccupation };
      newValue = newOccupation;
      setIsEditingOccupation(false);
    }
  
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateField),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${key}`);
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      // Handle error
    }
  };
  

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      <Box p="1rem 0">
  <FlexBetween gap="1rem" mb="0.5rem">
    <FlexBetween gap="1rem" alignItems="center">
      <LocationOnOutlined fontSize="large" />
      {isEditingLocation ? (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
          <InputBase
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            fullWidth
            placeholder="Edit Location"
            inputProps={{ 'aria-label': 'edit location' }}
          />
          <IconButton onClick={() => handleSaveClick("location")}>
            <EditOutlined />
          </IconButton>
        </Paper>
      ) : (
        <Typography
          onClick={() => handleEditClick("location")}
          sx={{ cursor: "pointer" }}
        >
          {location}
        </Typography>
      )}
    </FlexBetween>
  </FlexBetween>

  <FlexBetween gap="1rem" mb="0.5rem">
    <FlexBetween gap="1rem" alignItems="center">
      <WorkOutlineOutlined fontSize="large" />
      {isEditingOccupation ? (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
          <InputBase
            value={newOccupation}
            onChange={(e) => setNewOccupation(e.target.value)}
            fullWidth
            placeholder="Edit Occupation"
            inputProps={{ 'aria-label': 'edit occupation' }}
          />
          <IconButton onClick={() => handleSaveClick("occupation")}>
            <EditOutlined />
          </IconButton>
        </Paper>
      ) : (
        <Typography
          onClick={() => handleEditClick("occupation")}
          sx={{ cursor: "pointer" }}
        >
          {occupation}
        </Typography>
      )}
    </FlexBetween>
  </FlexBetween>
</Box>


      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Likes</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Reach</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

    </WidgetWrapper>
  );
};

export default UserWidget;
