import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuth, fetchRegister } from "@/redux/slices/authSlice.js";
import { selectIsAuth } from "@/redux/selectors/authSelectors.js";

import styles from "./Login.module.scss";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      console.log("Navigate resended on main page");
    }
  }, [isAuth, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "Jack",
      lastName: "Man",
      email: "newmanjack2@test.com",
      password: "newmanjackss12222",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Authorization is failed");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account creation
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="First name"
          fullWidth
          error={Boolean(errors.firstName?.message)}
          helperText={errors.firstName?.message}
          type="text"
          {...register("firstName", { required: "The first name is required" })}
        />
        <TextField
          className={styles.field}
          label="Last name"
          fullWidth
          error={Boolean(errors.lastName?.message)}
          helperText={errors.lastName?.message}
          type="text"
          {...register("lastName", { required: "The last name is required" })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "The email is required" })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "The password is required" })}
        />
        <Button
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};
