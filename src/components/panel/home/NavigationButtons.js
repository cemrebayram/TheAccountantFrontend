import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavigationButtons({ links }) {
  return (
    <Box>
      <Grid mt={5} container spacing={2}>
        {links.map((link) => (
          <Grid key={link.color + link.title} item xs={6} md={4}>
            <Button
              LinkComponent={Link}
              fullWidth
              sx={{
                height: "200px",
              }}
              to={link.to}
              variant="contained"
              color={link.color}
            >
              {link.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
