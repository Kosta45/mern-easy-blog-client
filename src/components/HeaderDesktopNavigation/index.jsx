import { logout } from "@/redux/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "@/redux/selectors/authSelectors.js";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./HeaderDesktopNavigation.module.scss";

export const HeaderDesktopNavigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.buttons}>
      {isAuth ? (
        <>
          <Link to="/">
            <Button variant="contained">My profile</Button>
          </Link>
          <Link to="/add-post">
            <Button variant="contained">Write an article</Button>
          </Link>
          <Button onClick={onClickLogout} variant="contained" color="error">
            Log out
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outlined">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained">Create account</Button>
          </Link>
        </>
      )}
    </div>
  );
};
