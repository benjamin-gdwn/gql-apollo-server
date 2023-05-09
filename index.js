// importing the server
const { ApolloServer } = require("apollo-server");
// importing the server playground
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageGraphQLPlaygroundOptions,
} = require("apollo-server-core");
// using the built in file system api
const { readFileSync } = require("fs");
// importing the resolvers file
const resolvers = require("./resolvers");
// importing the type definitions
const typeDefs = readFileSync("./schema.graphql", "utf-8");
// creating a server with the type definitions,
// resolvers and the playground to local server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});
// set up the server to listen on the provided url
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
