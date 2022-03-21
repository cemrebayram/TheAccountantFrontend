import React, {useState} from "react";
import OfferInputForm from "../../components/panel/offer/OfferInputForm";
import { Button, Container, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createOffer, fetchOffers } from "../../store/slices/offerSlice";
import OffersTable from "../../components/panel/offer/OffersTable";
import Notification from "../../components/panel/common/Notification";
export default function Offser() {
  const newOffer = useSelector((state) => state.offer.newOffer);
  const offers = useSelector((state) => state.offer.offers);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchOffers());
  }, []);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const showAlert = (message, severity) => {
    setAlertData({
      severity,
      open: true,
      message,
    });
  };
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "5em",
      paddingBottom: "5em",
    }} >
      <Notification open={alertData.open} severity={alertData.severity} message={alertData.message} />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="50px" src="/../../offer.png"></img>
      </Divider>
      <Typography variant="h6">Create Offer</Typography>
      <OfferInputForm />
      <br />
      <br />
      <Button
        onClick={async () => {
          await dispatch(createOffer(newOffer));
          dispatch(fetchOffers());
          showAlert("Offer created successfully", "success");
        }}
        sx={{ marginTop: "10px" }}
        fullWidth
        variant="contained"
        color="secondary"
      >
        Create Offer
      </Button>
      <OffersTable offers={offers} />
    </Container>
  );
}
