import { IOSSwitch } from "../../../utils/IosSwitch";
import st from "./BasicSwitch.module.scss";
import { FormControlLabel, Typography } from "@mui/material";

export default function BasicSwitch({ label, checked, onChange }) {
  return (
    <div className={st.root}>
      <FormControlLabel
        checked={checked}
        onChange={onChange}
        control={<IOSSwitch sx={{ m: 1 }} />}
        label={<Typography className={st.label}>{label}</Typography>}
      />
    </div>
  );
}
