import { logout } from "@/redux/slices/authSlice.js";
import { selectIsAuth } from "@/redux/selectors/authSelectors.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./HeaderMobileNavigation.module.scss";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

export const HeaderMobileNavigation = ({ onClose }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      onClose();
    }
  };

  return (
    <div className={styles.root}>
      <List
        sx={{
          width: 260,
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        {isAuth ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={onClose}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={onClose}>
                <ListItemText primary="My profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/add-post" onClick={onClose}>
                <ListItemText primary="Write an article" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton
                sx={{ color: "error.main" }}
                onClick={onClickLogout}
              >
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login" onClick={onClose}>
                <ListItemText primary="Sign in" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register" onClick={onClose}>
                <ListItemText primary="Create account" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};
