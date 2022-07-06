function findAccountById(accounts, id) {
  return accounts.find((user)=> user.id.includes(id));
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((user1, user2)=>user1.name.last.toLowerCase()>user2.name.last.toLowerCase() ? 1:-1)
}

function getTotalNumberOfBorrows(account, books) {
    const {
        id: accountId
    } = account;
    return books.reduce((accumulator, book) => {
    return (
            accumulator +
            book.borrows.filter(borrow => borrow.id === accountId)
            .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
        );
    }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  const accoundId = account.id;
  books.forEach((book) => {
    const borrowed = book.borrows;
    const authorId = book.authorId;
    borrowed.forEach((borrow) => {
      if (borrow.id === accoundId && !borrow.returned){
        authors.forEach ((author) => {
          if (author.id === authorId) {
            const allInfo = {
              ...book, author : author }
            result.push(allInfo);
            }
          });
        }
      });
  });
  return result;
}




module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
