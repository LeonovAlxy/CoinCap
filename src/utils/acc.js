export const getCryptoAcc = () => {
  const data = localStorage.getItem('cryptoAcc');
  if (data === null) {
    const empty = [];
    localStorage.setItem('cryptoAcc', JSON.stringify(empty));
    return empty;
  }
  return JSON.parse(data);
};

export const buyCrypto = (crypto) => {
  const cryptoAcc = getCryptoAcc();
  const existing = cryptoAcc.find((item) => item.name === crypto.name);
  if (existing) {
    existing.quantity += crypto.quantity;
  } else {
    cryptoAcc.push({ ...crypto });
  }
  localStorage.setItem('cryptoAcc', JSON.stringify(cryptoAcc));
  const total = cryptoAcc.reduce((sum, item) => sum + Number(item.priceUsd) * item.quantity, 0);
  return total;
};

export const deleteCrypto = (index) => {
  const cryptoAcc = getCryptoAcc();
  cryptoAcc.splice(index, 1);
  localStorage.setItem('cryptoAcc', JSON.stringify(cryptoAcc));
  const total = cryptoAcc.reduce((sum, item) => sum + Number(item.priceUsd) * item.quantity, 0);
  return total;
};
