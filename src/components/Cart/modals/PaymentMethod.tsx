import { FC } from "react";
import { Paper, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Info } from "@mui/icons-material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Box } from "@mui/system";

const PaymentMethod: FC = () => {
  const theme = useTheme();
  return (
    <>
      <Alert
        sx={{ marginBottom: theme.spacing(3) }}
        icon={<Info />}
        severity="info"
      >
        We are only accepting <strong>PayPal</strong> and{" "}
        <strong>Debit or Credit Card</strong> payment as of the moment. Rest
        assured that we'll be integrating other payment methods like{" "}
        <strong>GCash</strong> in the next coming weeks.
      </Alert>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: theme.spacing(3),
          background: theme.palette.common.white,
        }}
      >
        <PayPalButtons />
      </Paper>
    </>
  );
};

export default PaymentMethod;
