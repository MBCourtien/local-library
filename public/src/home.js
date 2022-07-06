function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let counter=0;
    books.filter((book)=>book.borrows.filter((item)=> {
        if(item.returned===false) {
            ++counter
        }
    }))
    return counter;
}

function limitResultToTopFive(array) {
  return array.slice(0,5)
}
function getMostCommonGenres(books) {
    const genres = books.map(book=> book.genre);
    let commonGenres = genres.reduce((acc, genre) => {
        if(!acc[genre]){
            acc[genre] = {name: genre, count: 0}
        } acc[genre].count++;
            return acc
    } , []);
    return limitResultToTopFive(Object.values(commonGenres).sort((genreA, genreB) => genreB.count - genreA.count))
}


function getMostPopularBooks(books) {
 let result = books.reduce((acc, book) => { 
   acc[book.title] = {name: book.title, count: book.borrows.length} 
   return acc 
 }, []);
  return limitResultToTopFive(Object.values(result).sort((countA, countB) => countB.count - countA.count)) 
}


function getMostPopularAuthors(books, authors) {
    const popularAuthors = books.reduce((acc, book) => {
        const { authorId, borrows } = book;
        const authorObj = authors.find(author => author.id === authorId);
        const name = `${authorObj.name.first} ${authorObj.name.last}`;
        console.log(name)
        const count = borrows.length;
        const authExists = acc.find(auth => auth.name === name);
        if(authExists) {
            authExists.count += count;
        } else {
            const newAuthEntry = { name, count };
            acc.push(newAuthEntry);
        } return acc;
    }, []);

    return limitResultToTopFive(popularAuthors.sort((a, b) => b.count - a.count));

}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
