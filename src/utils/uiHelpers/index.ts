import { useSnackbar } from "notistack";

export const useErrorNotif = () => {
  const { enqueueSnackbar } = useSnackbar();
  const renderError = (err?: any) => {
    if (err) {
      enqueueSnackbar(err, { variant: "error" });
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return renderError;
};