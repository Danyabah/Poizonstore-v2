import { Switch, styled } from "@mui/material";

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 34,
  padding: 0,
  boxShadow: " 0px 0px 10px 0px #00000026",
  borderRadius: 34 / 2,

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 26,
    height: 26,
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    color: "#121212",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#0FFFFF ",
      "& + .MuiSwitch-track": {
        backgroundColor: "#121212",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },

  "& .MuiSwitch-track": {
    borderRadius: 34 / 2,
    backgroundColor: "white",

    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
