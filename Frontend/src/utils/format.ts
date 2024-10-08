export const formatMoney = (amount: number): string => {
    return '$ ' + Math.round(amount).toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
}