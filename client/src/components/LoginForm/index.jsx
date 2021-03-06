import React from "react";
import "./login.css";
import {
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";

import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";

function LoginForm() {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input" id="loginEmailPlaceHolder">Email address</InputLabel>
        <Input
          type="username"
          id="my-input"
        />
        <InputLabel htmlFor="my-password" id="loginPasswordPlaceholder">Password</InputLabel>
        <Input
          type="password"
          id="my-password"
        />
        <a href="/auth/google">
          <img src={googleButton} alt="sign into Google Button" />
        </a>
      </FormControl>
    </div>
  );
}
export { LoginForm };
