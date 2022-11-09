import React from "react";
import { Route, Switch } from "wouter";
import Addresses from "../components/Addresses/Adresses";
import EmprendimientoDetail from "../components/Business";
import Business from "../components/Business/Business";
import UserEmprendimientos from "../components/Emprendimientos/UserEmprendimientos";
import HomePage from "../components/HomePage/HomePage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Settings from "../components/Settings/Settings";
import UserProfile from "../components/UserProfile";

const UserRoutes = () => {
  return (
    <>
      <Switch>
        <Route path='/registro' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={HomePage} />
        <Route path='/settings' component={Settings} />
        <Route path='/emprendimientos' component={UserEmprendimientos} />
        <Route path='/perfil' component={UserProfile} />
        <Route path='/emprendimiento/:id' component={EmprendimientoDetail} />
        <Route path='/business' component={Business} />
        <Route path='/direcciones' component={Addresses} />
        <Route path='/:rest*'>
          {(params) => `404, Sorry the page ${params.rest} does not exist!`}
        </Route>
      </Switch>
    </>
  );
};

export default UserRoutes;
