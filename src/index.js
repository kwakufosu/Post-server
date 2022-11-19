const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const http = require('http');
const mongoose= require('mongoose')

require('dotenv').config();
const typeDefs= require('./schema/schema.graphql')
const resolvers= require('./resolvers/resolvers')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { json } = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);





const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  await mongoose.connect(process.env.MONGODB,{useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>{
        if (err){
            console.log("error in connection",error)
        }else{
            console.log("mongodb is connected")
        }
    })
  app.use('/graphql', json(), expressMiddleware(server));
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
