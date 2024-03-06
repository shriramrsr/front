// Searchresults.js
import React from "react";
import { Box, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";


const Searchresults = ({ results, onClick }) => {
  console.log("searchresults",results);
  
  return (
    <Paper
      elevation={3}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 10,
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {
      results.length > 0 ? (
        <List>
          {results.map((result) => (
            <ListItem key={result._id} button onClick={() => onClick(result)}>
              <ListItemText primary={`${result.firstName} ${result.lastName}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box p={2}>
          <Typography variant="body2">No results found</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Searchresults;
