import { useSnackbar } from "notistack";

export const useErrorNotif = () => {
  const firebaseErrors = [
    { firebaseErr: "auth/wrong-password", message: "Wrong Password" },
    { firebaseErr: "auth/user-not-found", message: "User not found" },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const renderError = (err?: any) => {
    if (err) {
      const message = firebaseErrors.some(({ firebaseErr }) =>
        err.includes(firebaseErr)
      )
        ? firebaseErrors.find(({ firebaseErr }) => err.includes(firebaseErr))
            ?.message
        : "Something went wrong";

      enqueueSnackbar(message, { variant: "error" });
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return renderError;
};

export const altImageName: (imgName: string) => string = (imgName) =>
  imgName.toLowerCase().split(" ").join("-");
