//declaring imports required for the server
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();


//importing our graphql typeDefs and resolvers to use for server && importing db connection
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

//telling server to connect to either localhost port or the environment port in production
const PORT = process.env.PORT || 3001;
const app = express();

//function to set up apollo server, pass in its schema, start the server, and let express know about the server
const startServer = async () => {
    //create new Apollo server and pass in the schema data
    const server = new ApolloServer({
        typeDefs, 
        resolvers, 
        //context authentication middleware
        context: authMiddleware
    });

    await server.start();

    server.applyMiddleware({ app })

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

//initialize the Apollo server
startServer();


//app middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//tell app where to pull files from when in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

// This is a wildcard route that if any route is sent to the server that is not a DB / server recognized route, it will server assets from the react front end
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });