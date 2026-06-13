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
  cryptoAcc.push(crypto);
  localStorage.setItem('cryptoAcc', JSON.stringify(cryptoAcc));
};

export const deleteCrypto = (index) => {
  const cryptoAcc = getCryptoAcc();
  cryptoAcc.splice(index, 1);
  localStorage.setItem('cryptoAcc', JSON.stringify(cryptoAcc));
};
