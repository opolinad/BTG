"use client";

import React from "react";
import styles from "./FundList.module.scss";
import { formatMoney } from "../../utils/format";

type Fund = {
  name: string;
  capital: number;
  category: string;
  id: string;
};

type FundListProps = {
  funds: Fund[];
  userFunds: string[];
  modifyFundSuscription: (fundId: string, action: "add" | "cancel") => void;
};

const FundList: React.FC<FundListProps> = ({
  funds,
  userFunds,
  modifyFundSuscription,
}) => {
  const isUserFund = (fundId: string): boolean => {
    return userFunds.includes(fundId);
  };

  return (
    <table className={styles["fund-list"]}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Capital</th>
          <th>Categoria</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {funds.map((fund) => (
          <tr key={fund.name} className={styles["fund-list__row"]}>
            <td>{fund.name}</td>
            <td>{formatMoney(fund.capital)}</td>
            <td>{fund.category}</td>
            <td>
              <button
                className={`${styles["fund-list__cta-button"]} ${
                  isUserFund(fund.id)
                    ? styles["fund-list__cta-button--cancel"]
                    : styles["fund-list__cta-button--add"]
                }`}
                onClick={() =>
                  modifyFundSuscription(
                    fund.id,
                    isUserFund(fund.id) ? "cancel" : "add"
                  )
                }
              >
                {isUserFund(fund.id) ? "Desvincularse" : "Vincularse"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FundList;
