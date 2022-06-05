import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../reducers/userReducer";
import s from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
   <section className={s.dashboard}>   
     <div>dash</div>
     <button onClick={() => dispatch(logOut())}>exit</button>
   </section>
  );
};

export default Dashboard;