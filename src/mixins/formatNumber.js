export const formatNumber = {
  toCurrency(n) {
      return ('$' + (n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace('-', ''); 
    }
}