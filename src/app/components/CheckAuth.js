"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastProvider";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const CheckAuth = ({ children }) => {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state to delay checks

  useEffect(() => {
    // Make sure user state is initialized before doing any redirection logic
    if (user !== null) {
      setLoading(false); // Set loading to false once user state is initialized
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("user is logged in");
      } else {
        console.log("user is logged out");
        toast.error("Login is required to access this page");
        toast.error(
          "In a few seconds, you will be redirected to the home page"
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    }
  }, [user, toast, loading, router]);

  // Prevent rendering the children while user state is still being initialized
  if (loading) {
    return (
      <div>
        <Placeholder.Grid rows={20} active />
        <Loader center content="Loading" />
      </div>
    ); // Or a loading spinner
  }

  if (!user) {
    return <div>Redirecting...</div>; // Optional: can show another loading state here
  }

  return <>{children}</>; // Render the children when the user is authenticated
};

export default CheckAuth;
