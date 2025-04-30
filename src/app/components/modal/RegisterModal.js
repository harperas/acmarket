"use client";

import { useRef, useState } from "react";
import { Button, Form, Modal, Schema } from "rsuite";
import { useToast } from "../../context/ToastProvider";

const registerFormInitialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// model schema to check required data to be fill in form
const { StringType } = Schema.Types;

const registerModel = Schema.Model({
  name: StringType().isRequired("Name is required"),
  email: StringType()
    .isEmail("Enter a valid email")
    .isRequired("Email is required"),
  password: StringType()
    .minLength(6, "Password should be atleast six character long")
    .isRequired("Password is required"),
  confirmPassword: StringType()
    .minLength(6, "Password should be atleast six character long")
    .isRequired("Password is required"),
});

const RegisterModal = ({ registerModalShow, setRegisterModalShow }) => {
  const toast = useToast();

  const registerRef = useRef();

  const [registerForm, setRegisterForm] = useState(registerFormInitialValue);

  const handleRegisterSubmit = async () => {
    // Perform registration logic here (e.g., API call)
    console.log("Register:", registerForm);

    //check form schema model has and any error
    if (registerRef.current.check()) {
      // check password and confirm password
      if (registerForm.password !== registerForm.confirmPassword) {
        toast.error("Password and Confirm Password must be same");

        return;
      }

      try {
        const res = await fetch(
          "http://localhost/acmarket/api/auth/register.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerForm),
          }
        );
        const data = await res.json();
        console.log("Response:", data);
        if (res.ok) {
          toast.success("Registration successful!");
          // alert('Registration successful!');
          setRegisterForm(registerFormInitialValue);
          setRegisterModalShow(false); // Close the modal on successful registration
        } else {
          toast.error(data.message || "Registration failed");
          // alert(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("Fill all the required data");
    }
  };

  return (
    <div>
      <Modal
        open={registerModalShow}
        size="xs"
        onClose={() => setRegisterModalShow(false)}
      >
        <Modal.Header>
          <Modal.Title className=" text-center text-5xl font-bold ">
            Register
          </Modal.Title>
          <Modal.Body>
            <Form
              fluid
              onChange={setRegisterForm}
              formValue={registerForm}
              model={registerModel}
              ref={registerRef}
            >
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group controlId="email-2">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="password-3">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword-4">
                <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleRegisterSubmit()} appearance="primary">
              Register
            </Button>
            <Button
              onClick={() => setRegisterModalShow(false)}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default RegisterModal;
