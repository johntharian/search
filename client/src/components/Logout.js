import { googleLogout } from "@react-oauth/google";

function Logout({ setCode, setProfile }) {
  const signout = () => {
    googleLogout();
    setCode(null);
    setProfile(null);
  };

  return <button onClick={() => signout()}>Sign out</button>;
}

export default Logout;
