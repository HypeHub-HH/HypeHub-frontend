import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main: "#0F172A",
            light: '#37476C'
        },
        secondary:{
            main: `#0EA5E9`,
            light: `#CBD5E1`
        },
        greySecondary:{
            main: `#CBD5E1`,
            light: `#CBD5E1`
        }
    },
    components: {
        MuiButton: {
          styleOverrides: {
            contained: {
              borderRadius: 5,
              fontWeight: "bold",
                
            },
          },
        },
    }
});

export default responsiveFontSizes(theme);