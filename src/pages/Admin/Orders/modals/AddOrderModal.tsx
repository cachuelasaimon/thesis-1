import { FC, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField as MuiTextField,
  capitalize,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Field, Form } from "formik";
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-mui";
import { orderValidation, IUser, IProduct } from "types";
interface AddOrderModalProps {
  onClose: () => void;
  open: boolean;
  users: IUser[] | null;
  products: IProduct[] | null;
}

const AddOrderModal: FC<AddOrderModalProps> = ({
  open,
  onClose,
  users,
  products,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent>
        {" "}
        <Formik
          initialValues={
            {
              paymentMethod: "",
              paymentStatus: "",
              productId: null,
              userId: null,
              status: "",
              quantity: "",
            } as any
          }
          validationSchema={orderValidation}
          onSubmit={async (values, helpers) => {
            console.log(values);
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <Grid
                container
                spacing={2}
                sx={(theme) => ({
                  paddingTop: theme.spacing(2),
                  paddingBottom: theme.spacing(2),
                })}
              >
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="paymentMethod"
                    label="Payment Method"
                    component={Autocomplete}
                    options={["PayPal", "Debit/Credit"]}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched["paymentMethod"] && !!errors["paymentMethod"]
                        }
                        name="paymentMethod"
                        label="Payment Method"
                        helperText={
                          touched["paymentMethod"]
                            ? errors["paymentMethod"]
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="paymentStatus"
                    label="Payment Status"
                    component={Autocomplete}
                    options={["paid", "pending", "canceled", "invalid"]}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched["paymentStatus"] && !!errors["paymentStatus"]
                        }
                        name="paymentStatus"
                        label="Payment Status"
                        helperText={
                          touched["paymentStatus"]
                            ? errors["paymentStatus"]
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="userId"
                    label="User"
                    component={Autocomplete}
                    options={users}
                    getOptionLabel={(option: any) => option.email}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={touched["userId"] && !!errors["userId"]}
                        name="userId"
                        label="User"
                        helperText={touched["userId"] ? errors["userId"] : ""}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="productId"
                    label="Product"
                    component={Autocomplete}
                    options={products}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={touched["productId"] && !!errors["productId"]}
                        name="productId"
                        label="Product"
                        helperText={
                          touched["productId"] ? errors["productId"] : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="paymentStatus"
                    label="Payment Status"
                    component={Autocomplete}
                    options={["pending", "completed"]}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched["paymentStatus"] && !!errors["paymentStatus"]
                        }
                        name="paymentStatus"
                        label="Payment Status"
                        helperText={
                          touched["paymentStatus"]
                            ? errors["paymentStatus"]
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    component={TextField}
                    type="number"
                    inputProps={{
                      min: 1,
                    }}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderModal;
