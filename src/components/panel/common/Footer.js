import React from "react";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Typography variant="overline">
        The Accountant &copy; 2022 All Rights Reserved -{" "}
        <a
          href="https://www.flaticon.com/de/kostenlose-icons/open-source"
          title="open source Icons"
        >
          Open source Icons erstellt von Pixel perfect - Flaticon
        </a>
      </Typography>
    </footer>
  );
}
