import { TextField } from "@mui/material";
import React from "react";

export default function QuantitySelect({ value, setter }) {
  return <div>
    <TextField type="number" value={value} onChange={(e)=>{
      setter(e.target.value)
    }} fullWidth />
  </div>;
}
