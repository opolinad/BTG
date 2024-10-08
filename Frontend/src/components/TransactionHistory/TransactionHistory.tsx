import React from "react";
import styles from "./TransactionHistory.module.scss";
import { Fund, History } from '../MainComponent/MainComponent';

type TransactionHistoryProps = {
  funds: Fund[];
  history: History[];
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ funds, history }) => {
  const getFundName = (fundId: string): string => {
    return funds.find((fund) => fund.id === fundId)?.name || "";
  }

  return (
    <table className={styles["history"]}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo transacción</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item.created} className={styles["history__row"]}>
            <td>{getFundName(item.fund_id)}</td>
            <td>{item.transaction_type === 'add' ? 'Vinculación' : 'Desvinculación'}</td>
            <td>{item.created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionHistory;
