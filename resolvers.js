const authors = [
  { id: "1", name: "Author 1" },
  { id: "2", name: "Author 2" },
];

const books = [
  { id: "1", title: "Book 1", authorId: "1" },
  { id: "2", title: "Book 2", authorId: "1" },
  { id: "3", title: "Book 3", authorId: "2" },
];
// generic function to find by ID
function findById(array, id) {
  return array.findIndex((item) => item.id === id);
}
// generic function to conditionally check id
function indexCheck(type, id) {
  if (type === -1) {
    throw new Error(`Item at id:${id} does not exist`);
  }
}

// defining the resolvers
const resolvers = {
  // for the queries
  Query: {
    // books query returns books
    books: () => books,
    // authors query returns authors
    authors: () => authors,
  },
  // defining a resolver for the Book function
  // if a book query contains an author find the book that matches the authorId
  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },
  // defining a resolver for the Author function
  // if an author query contains a book find the author that matches the book.authorId
  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
  Mutation: {
    // name the mutation and pass in the arg
    addAuthor: (_, { name }) => {
      // store the new data as a newAuthor object
      const newAuthor = { id: `${authors.length + 1}`, name };
      // push that object to the authors array
      authors.push(newAuthor);
      // return the object
      return newAuthor;
    },
    // addBook function pass title and authorId args
    addBook: (_, { title, authorId }) => {
      // store the new data as a newBook object
      const newBook = { id: `${books.length + 1}`, title, authorId };
      // add it the the array
      books.push(newBook);
      // return the object
      return newBook;
    },
    // ----------------------------------------------------
    // update author name using the id of the author to identify them
    // ----------------------------------------------------

    updateAuthor: (_, { id, name }) => {
      // find the author based on its id
      const authorIndex = findById(authors, id);
      // error handling
      indexCheck(authorIndex, id);
      // store the updated author at the index of its place in the authors array with the updated name
      const updatedAuthor = { ...authors[authorIndex], name };
      // in the authors array at the index of the current author
      // replace with updatedAuthor
      authors[authorIndex] = updatedAuthor;
      // return the updated Author
      return updatedAuthor;
    },
    // ----------------------------------------------------

    // update book using the id of the book to identify it
    // and being able to update the authorId or title
    // ----------------------------------------------------

    updateBook: (_, { id, title, authorId }) => {
      // find the index of book in the array of books by matching ids
      const bookIndex = findById(books, id);
      // error handling
      indexCheck(bookIndex, id);
      // update the book
      const updatedBook = { ...books[bookIndex], title, authorId };
      // put the updated book in place of the book
      books[bookIndex] = updatedBook;
      // return updated item
      return updatedBook;
    },
    // ----------------------------------------------------
    // delete author using the id of the author to identify it
    // ----------------------------------------------------

    deleteAuthor: (_, { id }) => {
      // find the author based on its id
      const authorIndex = findById(authors, id);
      // error handling
      indexCheck(authorIndex, id);
      // store the new deleted author, provide the index of the author and position of this author in the new array
      const deletedAuthor = authors.splice(authorIndex, 1)[0];
      // return a list of the remaining authors
      return { authors };
    },
    deleteBook: (_, { id }) => {
      // find the author based on its id
      const bookIndex = findById(books, id);
      // error handling
      indexCheck(bookIndex, id);
      // store the new deleted book, provide the index of the book and position of this book in the new array
      const deletedbook = books.splice(bookIndex, 1)[0];
      // return a list of the remaining books
      return { books };
    },
  },
};
module.exports = resolvers;
