import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return setAuthenticated(true);
      } else {
        return setAuthenticated(false);
      }
    });
    setLoading(false);
  }, []);
  return { authenticated, loading, setAuthenticated };
};

export default useAuthStatus;
