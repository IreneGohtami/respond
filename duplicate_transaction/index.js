'use strict';

function findDuplicateTransaction(transactions = []) {
	if (!transactions) {
		return [];
	}

	let duplicateTransactions = transactions.filter(
    (value, index, self) =>
      index === self.findIndex((t) => (
        t.sourceAccount === value.sourceAccount && 
        t.targetAccount === value.targetAccount && 
        t.amount === value.amount &&
        t.category === value.category
      )
    )
	);

  let newArr = [];
  duplicateTransactions.forEach((dup, index) => {
    const filtered = transactions.filter(trans => {
      return trans.category === dup.category;
    });
    newArr.push(filtered);
  });

  // Sort based on time ASC
  const filteredArr = newArr.map(value => {
    const sorted = value.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .filter((a, b, c) => {
      if (b == 0) {
        return true;
      }
      const prevTrans = c[b - 1];

      const timeDiff = (Math.abs(new Date(a.time).getTime() - new Date(prevTrans.time).getTime())) / 60000;
      return timeDiff < 1; // Less than 1 minute difference
    });
    return sorted;
  });

  return filteredArr;
}

module.exports = {
	findDuplicateTransaction
};