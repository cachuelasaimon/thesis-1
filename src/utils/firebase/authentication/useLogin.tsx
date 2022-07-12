import { useEffect, useState } from "react";
import { auth } from "utils";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { useErrorNotif } from "utils";

export const useLogin = () => {
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showError = useErrorNotif();
  const navigate = useNavigate();

  const checkState = () => setIsLoading(false);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            // console.log("logged in", user);
            setUser(user);
            setIsLoggedIn(true);
          } else {
            navigate("/");
          }
        });
      } catch (err) {
        showError((err as any).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) checkIfUserIsLoggedIn();
  }, [isLoading]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("logged in", user);
  //     setUser(user);
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/");
  //   }
  // });

  return { loggedIn, user, isLoading, checkState };
};
