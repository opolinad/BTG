/* eslint-disable @next/next/no-async-client-component */
import { getHistoryTransactions } from "../services/historyTransaction.services";
import { History } from "../components/MainComponent/MainComponent";
import MainComponent from "../components/MainComponent/MainComponent";

const Home: React.FC = async () => {
  const funds = [
    {
      name: "Recaudadora",
      capital: 75000,
      category: "FPV",
      id: "6703e8b7807052129e2e2606",
    },
    {
      name: "Ecopetrol",
      capital: 125000,
      category: "FPV",
      id: "6703e901807052129e2e2608",
    },
    {
      name: "Deuda Privada",
      capital: 50000,
      category: "FIC",
      id: "6703e918807052129e2e2609",
    },
    {
      name: "FDO Acciones",
      capital: 250000,
      category: "FIC",
      id: "6703e931807052129e2e260a",
    },
    {
      name: "Dinámica",
      capital: 100000,
      category: "FPV",
      id: "6703e93f807052129e2e260b",
    },
  ];
  const userId = "6703e838807052129e2e2605";
  const history: History[] = await getHistoryTransactions(userId);

  const getUserActiveFunds = (history: History[]): string[] => {
    const latestRecords: { [fundId: string]: History } = {};

    history.forEach((record) => {
      if (
        !latestRecords[record.fund_id] ||
        new Date(record.created) >
          new Date(latestRecords[record.fund_id].created)
      ) {
        latestRecords[record.fund_id] = record;
        if (record.transaction_type === "cancel") {
          delete latestRecords[record.fund_id];
        }
      }
    });

    return Object.keys(latestRecords);
  };

  const userFunds = getUserActiveFunds(history);

  return (
    <MainComponent
      userId={userId}
      funds={funds}
      userFunds={userFunds}
      history={history}
    />
  );
};

export default Home;
