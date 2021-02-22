const express = require("express");
const helmet = require("helmet");
const cors =require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);


const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());



const config = {
    name:"sessionId",
    secret: "keep it secret, keep it safe",
    cookie:{
      maxAge: 1000 * 60 * 60,
      secure:false,
      httpOnly: true
    },
    resave:false,
    saveUnitialized:false,
    store: new KnexSessionStore({
      knex:require("../data/dbConfig"),
      tablename:"sessions",
      sidfieldname:"sid",
      createTable:true,
      clearInterval:1000 * 60 * 60
    })
  }

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

server.use(session(config))
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
    res.json({api: "up"})
});

module.exports = server;