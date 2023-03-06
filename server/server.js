const express = require('express');
const { graphqlHTTP} = require('express-graphql')
const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');
const {
  GraphQLSchema, GraphQLObjectType,
  GraphQLString,  GraphQLList, GraphQLInt, GraphQLNonNull
} = require('graphql')
const app = express();
const PORT = process.env.PORT || 3001;
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "this represents a Book",
  fields: () => ({
    id: { type: GraphQlNonNull(GraphQLInt) },
    name: {type: GraphQlNonNull(GraphQLString)},
    authorId: {type: GraphQlNonNull(GraphQLInt)}
  })
})
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "list of books",
      resolve: () => books
    }
  })
})
app.use('/graphql', graphqlHTTP({
  schema:schema,
  graphiql: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));

