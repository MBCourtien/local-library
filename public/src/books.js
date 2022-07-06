function findAuthorById(authors, id) {
  return authors.find((author)=>author.id===id)
}

function findBookById(books, id) {
  return books.find((book)=>book.id===id)
}

function partitionBooksByBorrowedStatus(books) {
  
  const returned = books.filter((book) => book.borrows[0].returned);
  const borrowed = books.filter((book)=> 
    !book.borrows[0].returned)
  return [borrowed,returned]
}

function getBorrowersForBook(book, accounts) {
const { borrows } = book;
const renters = borrows.map(({ id, returned })=> {
const account = accounts.find(account => account.id === id);
return {
        ...account,
        returned,
      };
    });
    return renters.sort((borrowA, borrowB) => {
        const companyA = borrowA.company;
        const companyB = borrowB.company;
        return companyA.localeCompare(companyB);
      })
      .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
