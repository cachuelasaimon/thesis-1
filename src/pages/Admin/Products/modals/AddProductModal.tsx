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
import { orderValidation, IUser, IProduct, IOrder } from "types";
import { useErrorNotif, collections, database, Add } from "utils";
import { runTransaction, doc } from "firebase/firestore";
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
  const showError = useErrorNotif();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await runTransaction(database, async (transaction) => {
        const productDoc = await transaction.get(
          doc(database, `${collections.products.string}/${values.productId.id}`)
        );

        console.log("testerer", values);
        console.log(productDoc.data());
        if (
          productDoc.exists() &&
          productDoc.data().stocks >= values.quantity
        ) {
          //  Bawasan stocl
          await transaction.update(
            doc(
              database,
              `${collections.products.string}/${values.productId.id}`
            ),
            {
              ...productDoc.data(),
              stocks: productDoc.data().stocks - values.quantity,
            }
          );

          console.log("testerer", values);

          await Add<IOrder>({
            collectionRef: collections.orders.ref,
            data: {
              ...values,
              userId: values.userId.id,
              productId: values.productId.id,
            },
          });
        } else {
          console.log("failed");
        }
      });
    } catch (err) {
      showError(err);
    } finally {
      setIsLoading(false);
    }
  };

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
          {({ touched, errors, values }) => (
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
                    name="status"
                    label="Order Status"
                    component={Autocomplete}
                    options={["pending", "completed"]}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={touched["status"] && !!errors["status"]}
                        name="status"
                        label="Order Status"
                        helperText={touched["status"] ? errors["status"] : ""}
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

              <LoadingButton
                fullWidth
                variant="contained"
                onClick={() => handleSubmit(values)}
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default AddOrderModal;
