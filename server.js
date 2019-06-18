const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

require("dotenv").config({ path: "variables.env" });

const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        "Your session has expired. Please log in again."
      );
    }
  }
};
const server = new ApolloServer({
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { User, Post, currentUser: await getUser(token) };
  },
  resolvers,
  formatError: error => ({
    name: error.name,
    message: error.message.replace("Context creation failed:", "")
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
