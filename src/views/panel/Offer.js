import React from 'react'
import OfferInputForm from '../../components/panel/offer/OfferInputForm'
import { Button, Container, Typography, Divider } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { createOffer, fetchOffers } from '../../store/slices/offerSlice'
import OffersTable from '../../components/panel/offer/OffersTable'
export default function Offser() {
    const newOffer = useSelector(state => state.offer.newOffer)
    const offers = useSelector(state => state.offer.offers)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchOffers());
    }, [])
    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <Divider sx={{ margin: "30px 0"}}>
            <img width="50px" src="/../../offer.png"></img>
            </Divider>  
            <Typography variant="h6">Create Offer</Typography>
            <OfferInputForm/>
            <br/>
            <br/>
            <Button onClick={()=>{
                dispatch(createOffer(newOffer));
                dispatch(fetchOffers());
            }} sx={{marginTop:'10px'}} fullWidth variant="contained" color="secondary">Create Offer</Button>
            <OffersTable offers={offers} />

            <br/>
            <br/>
            <br/>
            <br/>

        </Container>
    )

    
}
