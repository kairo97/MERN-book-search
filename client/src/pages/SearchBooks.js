
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchBooksQuery, SaveBookMutation } from '../utils/queries';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [searchBooks, { loading, error, data }] = useLazyQuery(SearchBooksQuery);
 const [saveBook] = useMutation(SaveBookMutation);



 const handleFormSubmit = async (event) => {
   event.preventDefault();
 
   if (!searchInput) {
     return false;
   }
 
   try {
     await searchBooks({ variables: { searchTerm: searchInput } });
   } catch (err) {
     console.error(err);
   }
 };
 
  
  const handleSaveBook = async (bookId) => {
    const bookToSave = data.searchBooks.find((book) => book.bookId === bookId);
    try {
      const { data } = await saveBook({
        variables: { input: bookToSave }
      });
      setSavedBookIds([...savedBookIds, data.saveBook.bookId]);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        {loading ? (
  <div>Loading...</div>
) : data ? (
  <CardColumns>
    {data.searchBooks.map((book) => {
      return (
        <Card key={book.bookId} border='dark'>
          {book.image ? (
            <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <p className='small'>Authors: {book.authors}</p>
            <Card.Text>{book.description}</Card.Text>
            {Auth.loggedIn() && (
              <Button
                disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                className='btn-block btn-info'
                onClick={() => handleSaveBook(book.bookId)}>
                {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                  ? 'This book has already been saved!'
                  : 'Save this Book!'}
              </Button>
            )}
          </Card.Body>
        </Card>
      );
    })}
  </CardColumns>
) : (
  <div>No books found.</div>
)}

      </Container>
    </>
  );
};

export default SearchBooks;
