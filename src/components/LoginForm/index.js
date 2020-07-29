import React, { useState } from "react";
import styled from "styled-components";
import { withNoStack } from "@nostack/no-stack";
import {
  Button,
  TextField,
  Checkbox,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ForgotPasswordButton from "../ForgotPasswordButton";

const Wrapper = styled.div`
  width: 250px;

  padding: 1em 0;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 10px 10px 8px -1px rgba(0, 0, 0, 0.6);
`;

const Row = styled.div`
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;

  input {
    display: block;
    margin: 0.5em auto;
    width: 80%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  & {
    flex-grow: 1;
    margin: 2px;
  }
`;

const CustomtextField = styled(TextField)`
  && {
    margin-top: 1rem;
  }
`;

const CustomDiv = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CustomWrapper = styled.div`
  && {
    align-items: center;
    display: flex;
    align-items: center;
  }
`;

const CustomCheckBox = styled(Checkbox)`
  margin-left: -14px;
`;

const CustomButton = styled(Button)`
  && {
    border-radius: 25px;
    background-color: black;
    color: white;
    margin-top: 1rem;
    width: 100%;
    &:hover: {
      background-color: black;
      color: white;
    }
    .span {
      color: white;
    }
  }
`;

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  if (loading || currentUser) {
    return null;
  }

  const handleSubmit = async (e) => {
    // <-- This is where the toggle button
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      setError(
        error.message ||
          (error.graphQLErrors &&
            error.graphQLErrors.length &&
            error.graphQLErrors[0]) ||
          error
      );
      setIsSubmitting(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TextField
          fullWidth
          label="Username"
          name="username"
          disabled={isSubmitting}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <CustomtextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          disabled={isSubmitting}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
      <CustomDiv>
        <ForgotPasswordButton />

        <CustomWrapper>
          <CustomCheckBox color="primary" name="rememberMe" />
          <Typography color="textSecondary" variant="body1">
            Remember Me{" "}
          </Typography>
        </CustomWrapper>
      </CustomDiv>

      <CustomButton
        size="large"
        type="submit"
        disabled={isSubmitting || !username || !password}
        variant="contained"
      >
        Login
      </CustomButton>
      {error && <Row>{error}</Row>}
    </form>
  );
};

export default withNoStack(LoginForm);
