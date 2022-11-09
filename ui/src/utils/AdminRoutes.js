import React from "react";
import { Route, Switch } from "wouter";
import Approvals from "../components/Approvals/Approvals";
import Login from "../components/Login/Login";

const AdminRoutes = () => {
  return (
    <>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Approvals} />
        <Route path='/:rest*'>
          {(params) => `404, Sorry the page ${params.rest} does not exist!`}
        </Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
