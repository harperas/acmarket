"use client";

import { Button, ButtonToolbar, Dropdown } from "rsuite";
// import '../../styles/header.css'; // Adjust the path as necessary
import { useState } from "react";
import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";

const AHeader = () => {
  const { user, logout } = useAuth(); // Assuming you have a useAuth hook to get user info

  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/next.svg"
            alt="Company Logo"
            className="object-contain"
            height={50}
            width={90}
          />
          {/* <span className="text-xl font-bold text-gray-800">Accmarket</span> */}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  size="lg"
                  onClick={() => setLoginModalShow(true)}
                >
                  Login
                </Button>
                <Button
                  appearance="ghost"
                  size="lg"
                  onClick={() => setRegisterModalShow(true)}
                >
                  Sign Up
                </Button>
              </ButtonToolbar>
            </>
          ) : (
            <Dropdown
              title={
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-800">{user.name}</span>
                </div>
              }
              placement="bottomEnd"
              trigger="hover"
            >
              <Dropdown.Item>Orders</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </header>
      <section>
        <LoginModal
          loginModalShow={loginModalShow}
          setLoginModalShow={setLoginModalShow}
        />

        <RegisterModal
          registerModalShow={registerModalShow}
          setRegisterModalShow={setRegisterModalShow}
        />
      </section>
    </>
  );
};

export default AHeader;
