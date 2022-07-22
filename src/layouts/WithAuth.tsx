import { FC, useEffect, useState } from "react";
import { useLogin, Get, collections } from "utils";
import { ROLES, IUser } from "types";
import { useNavigate } from "react-router-dom";

interface IWithAuthProps {
  requireAdmin: boolean;
  Component: any;
}

export const WithAuth: FC<IWithAuthProps> = ({ Component, requireAdmin }) => {
  const { checkState, isLoading, user } = useLogin();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const navigate = useNavigate();

  useEffect(() => checkState(), []);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await Get<IUser>({
        docRef: `${collections.users.string}/${user?.uid}`,
      });

      setUserInfo(data);
    };

    if (!userInfo && user) getUserInfo();

    if (
      userInfo &&
      user &&
      !userInfo.roles.includes(ROLES.ADMIN) &&
      requireAdmin
    )
      navigate("/");
  }, [userInfo, user]);

  if (!requireAdmin) return <>{!isLoading && <Component user={user} />}</>;

  return (
    <>
      {userInfo &&
        user &&
        userInfo.roles.includes(ROLES.ADMIN) &&
        requireAdmin && <Component user={user} />}
    </>
  );
};
