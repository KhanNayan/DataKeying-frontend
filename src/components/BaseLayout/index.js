import React from "react";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";
import Menu from "./../Menu/Menu";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <>
      <Header />
      <Menu />

      <div className="content-wrapper">{children}</div>

      <Footer />
    </>
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  console.log(isLoggedIn);
  return isLoggedIn ? (
    <Route
      {...rest}
      render={(props) => (
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default DashboardLayoutRoute;
