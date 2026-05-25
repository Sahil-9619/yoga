"use client";

import { useEffect, useState } from "react";
import { CustomerService } from "../services/customer.service";
import { LogoutButton } from "./LogoutButton";

export const UserLogout = () => {
  const [show, setShow] = useState(false);

  const update = () => setShow(!!CustomerService.getCurrentUser());

  useEffect(() => {
    update();
    window.addEventListener("storage", update);
    window.addEventListener("loginChange", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("loginChange", update);
    };
  }, []);

  return show ? <LogoutButton /> : null;
};
