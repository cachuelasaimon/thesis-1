import { FC, useEffect } from "react";
import { useLogin } from "utils";

interface IWithAuthProps {
  Component: any;
}

export const WithAuth: FC<IWithAuthProps> = ({ Component }) => {
  const { checkState, isLoading, user } = useLogin();

  useEffect(() => checkState(), []);

  return <>{!isLoading && <Component user={user} />}</>;
};
