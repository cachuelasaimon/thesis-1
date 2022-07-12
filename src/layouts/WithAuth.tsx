import { FC, useEffect } from "react";
import { useLogin } from "utils";

export const WithAuth: FC = ({ children }) => {
  const { checkState, isLoading } = useLogin();

  useEffect(() => checkState(), []);

  return <>{!isLoading && children}</>;
};
