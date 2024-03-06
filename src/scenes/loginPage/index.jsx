import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

// Custom logo component
const CustomLogo = () => (
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
    marginBottom="1rem"
  >
    CN
  </Box>
);

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isNonMobileScreens ? "flex-start" : "center"} // Align items to the left for non-mobile screens, center for mobile screens
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign={isNonMobileScreens ? "left" : "center"} // Align left for non-mobile screens, center for mobile screens
      >
        <CustomLogo />
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ChatNet
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          boxShadow: `0px 0px 10px 0px ${theme.palette.primary.dark}`,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Let the conversation begin
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
