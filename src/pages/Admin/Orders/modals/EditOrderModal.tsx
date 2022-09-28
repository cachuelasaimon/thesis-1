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
import { useErrorNotif, collections, database } from "utils";
import { runTransaction, doc } from "firebase/firestore";

interface EditOrderModalProps {
  onClose: () => void;
  open: boolean;
  users: IUser[] | null;
  products: IProduct[] | null;
  order: any;
  setRows?: any;
}

const EditOrderModal: FC<EditOrderModalProps> = ({
  open,
  onClose,
  users,
  products,
  order,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showError = useErrorNotif();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await runTransaction(database, async (transaction) => {
        const productDoc = await transaction.get(
          doc(database, `${collections.products.string}/${values.productId.id}`)
        );
        const orderDoc = await transaction.get(
          doc(database, `${collections.orders.string}/${order.id}`)
        );

        console.log(productDoc.data());
        if (
          productDoc.exists() &&
          orderDoc.exists() &&
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
              stocks:
                orderDoc.data().quantity - values.quantity > 0
                  ? productDoc.data().stocks +
                    (orderDoc.data().quantity - values.quantity)
                  : productDoc.data().stocks -
                    (orderDoc.data().quantity - values.quantity),
            }
          );

          const { doc: test, ...rest } = values;

          // Ilipat sa order
          await transaction.update(
            doc(database, `${collections.orders.string}/${order.id}`),
            {
              ...rest,
              productId: rest.productId.id,
              userId: rest.userId.id,
            }
          );
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
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={order}
          validationSchema={orderValidation}
          onSubmit={async (values, helpers) => {}}
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
                          (touched as any)["paymentMethod"] &&
                          !!(errors as any)["paymentMethod"]
                        }
                        name="paymentMethod"
                        label="Payment Method"
                        helperText={
                          (touched as any)["paymentMethod"]
                            ? (errors as any)["paymentMethod"]
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
                          (touched as any)["paymentStatus"] &&
                          !!(errors as any)["paymentStatus"]
                        }
                        name="paymentStatus"
                        label="Payment Status"
                        helperText={
                          (touched as any)["paymentStatus"]
                            ? (errors as any)["paymentStatus"]
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
                        error={
                          (touched as any)["userId"] &&
                          !!(errors as any)["userId"]
                        }
                        name="userId"
                        label="User"
                        helperText={
                          (touched as any)["userId"]
                            ? (errors as any)["userId"]
                            : ""
                        }
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
                        error={
                          (touched as any)["productId"] &&
                          !!(errors as any)["productId"]
                        }
                        name="productId"
                        label="Product"
                        helperText={
                          (touched as any)["productId"]
                            ? (errors as any)["productId"]
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
                    options={["pending", "complete"]}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          (touched as any)["paymentStatus"] &&
                          !!(errors as any)["paymentStatus"]
                        }
                        name="paymentStatus"
                        label="Payment Status"
                        helperText={
                          (touched as any)["paymentStatus"]
                            ? (errors as any)["paymentStatus"]
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

export default EditOrderModal;
