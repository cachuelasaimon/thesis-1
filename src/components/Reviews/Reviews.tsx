import { FC } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// Custom
import { StyledRating } from "components";
import { IReview } from "types";

interface IReviewProps {
  reviews: IReview[];
}

const Reviews: FC<IReviewProps> = ({ reviews }) => {
  const rating =
    reviews.reduce((acc: number, curr: IReview) => acc + curr.rating, 0) /
    reviews.length;
  return (
    <Accordion elevation={0} sx={{ padding: "0" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Reviews ({reviews.length})</Typography>
          <StyledRating readOnly precision={0.5} value={rating} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {reviews.map((review: IReview) => (
            <Grid item xs={12}>
              <Typography variant="body1">{review.title}</Typography>
              <StyledRating size="small" readOnly value={review.rating} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Reviews;
