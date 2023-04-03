const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen({ port: PORT }, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
            console.log(`API server running on port ${PORT}!`);
            });
        });
};


startApolloServer(typeDefs, resolvers);