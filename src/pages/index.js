import { lazy } from "react";

const Login = lazy(() => import("./Login"));
const Inicio = lazy(() => import("./Inicio"));
const NotFound = lazy(() => import("./NotFound"));

export default {
  Login,
  Inicio,
  NotFound,
};
