"use client";

import React, { useState } from "react";
import styles from "./MainComponent.module.scss";
import FundList from "../FundList/FundList";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { addCancelSuscription } from '../../services/fund.services';

export type Fund = {
  name: string;
  capital: number;
  category: string;
  id: string;
};

export type History = {
  user_id: string;
  fund_id: string;
  transaction_type: "add" | "cancel";
  created: string;
};

type MainComponentProps = {
  userId: string;
  funds: Fund[];
  userFunds: string[];
  history: History[];
};

const MainComponent: React.FC<MainComponentProps> = ({
  userId,
  funds,
  userFunds,
  history,
}) => {
  const [active, setActive] = useState("funds");

  const modifyFundSuscription = async (fundId: string, action: "add" | "cancel") => {
    const response = await addCancelSuscription(userId, fundId, action);

    if (response.status === 'error') {
      alert(response.error.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles["home"]}>
      <NavBar setActive={setActive} />
      <h1 className={styles["home__title"]}>
        {active === "funds"
          ? "Listado de fondos"
          : "Historial de transacciones"}
      </h1>
      {active === "funds" && <FundList funds={funds} userFunds={userFunds} modifyFundSuscription={modifyFundSuscription}/>}
      {active === "history" && (
        <TransactionHistory funds={funds} history={history} />
      )}
      <Footer />
    </div>
  );
};

export default MainComponent;
