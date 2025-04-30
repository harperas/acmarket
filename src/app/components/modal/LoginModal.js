"use client";

import { useRef, useState } from "react";
import { Button, Form, Modal, Schema } from "rsuite";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@/app/context/ToastProvider";

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

  const { login } = useAuth();

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
          <Button onClick={() => handleLoginSubmit()} appearance="primary">
            Confirm
          </Button>
          <Button onClick={() => setLoginModalShow(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;
