import * as React from "react";
import { Stack, Box, Toolbar, AppBar} from "@mui/material";
import CustomButton from "../../ui/CustomButton";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import AvatarMenu from "./AvatarMenu";

const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const settings = ["Outfits", "Items", "Account", "Logout"];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Logo />
        {!auth ? (
          <Stack spacing={3} direction="row">
            <CustomButton backgroundColor="#CBD5E1" color="black" buttonText="SIGN UP" breakpointWidth="3dvw" breakpointHeight="3dvh" />
            <CustomButton backgroundColor="#0EA5E9" color="black" buttonText="SIGN IN" breakpointWidth="3dvw" breakpointHeight="3dvh" />
          </Stack>
        ) : (
          <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" sx={{ flexGrow: 0.1 }}>
            <Searchbar/>
            <AvatarMenu settings={settings}/>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
