"use client";

import { useRef, useState } from "react";
import { Button, Divider, Form, Modal, Schema } from "rsuite";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@/app/context/ToastProvider";
import { GoogleLogin } from "@react-oauth/google";

const loginFormInitialValue = {
  email: "",
  password: "",
};

// model schema to check required data to be fill in form
const { StringType } = Schema.Types;

const loginModel = Schema.Model({
  email: StringType()
    .isEmail("Enter a valid email")
    .isRequired("Email is required"),
  password: StringType()
    .minLength(4, "Password should be atleast six character long")
    .isRequired("Password is required"),
});

const LoginModal = ({ loginModalShow, setLoginModalShow }) => {
  const [loginFormValue, setLoginFormValue] = useState(loginFormInitialValue);

  const { login, loginWithGoogle } = useAuth();

  const toast = useToast();
  const loginRef = useRef();

  // console.log('loginFormValue', loginFormValue);

  const handleLoginSubmit = async () => {
    console.log("Login:", loginFormValue);

    if (loginRef.current.check()) {
      login(loginFormValue.email, loginFormValue.password).then((res) => {
        if (res) {
          setLoginFormValue(loginFormInitialValue);
          setLoginModalShow(false); // Close the modal on successful login
        }
      });
    } else {
      toast.error("Fill all the required data");
    }
  };

  return (
    <div>
      <Modal
        open={loginModalShow}
        onClose={() => {
          setLoginModalShow(false);
        }}
        size="xs"
      >
        <Modal.Header>
          <Modal.Title className=" text-center text-5xl font-bold ">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={setLoginFormValue}
            formValue={loginFormValue}
            model={loginModel}
            ref={loginRef}
          >
            <Form.Group controlId="email-9">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button onClick={() => handleLoginSubmit()} appearance="primary">
              Confirm
            </Button>
            <Button
              onClick={() => setLoginModalShow(false)}
              appearance="subtle"
            >
              Cancel
            </Button>
          </div>
          <Divider>Or</Divider>
          <div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginWithGoogle(credentialResponse.credential);
                setLoginModalShow(false);
              }}
              onError={() => {
                toast.error("Google Login Failed");
              }}
              auto_select={false}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;
