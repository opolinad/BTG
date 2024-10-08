
export const addCancelSuscription = async ( userId:string, fundId: string, action: 'add' | 'cancel') => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}fund/${fundId}/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        body: JSON.stringify({ user_id: userId })
    });

    let data = {
        status: 'success',
        error: { message: '' }
    };

    if (res.status !== 204) {
        data = await res.json();
    }

   return data;
};
