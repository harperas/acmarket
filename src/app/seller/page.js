"use client";

import CheckAuth from "../components/CheckAuth";
import SellerDashboard from "../dashboard/sellerDashboard/SellerDashboard";

export default function SellerPage() {
  return (
    <>
      <CheckAuth>
        <div>
          <h2>Seller Page</h2>
        </div>
        <div>
          <SellerDashboard />
        </div>
      </CheckAuth>
    </>
  );
}
