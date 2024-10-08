export const getHistoryTransactions = async (userId: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}user/${userId}/history`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();

    if (data.status === "success") {
        return data.data;
    } else {
        return [];
    }
};
