import React from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

const Cancel = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Sorry didn't complete transaction</h2>
        <p className="email-msg">Something went wrong.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href={"/"}>
          <button type="button" style={{width: 300}} className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
