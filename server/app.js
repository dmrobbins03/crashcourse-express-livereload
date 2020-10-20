import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { createServer } from "livereload"; // server-side
import liveReloadMiddleware from "connect-livereload"; // client-side

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();
const liveReloadServer = createServer();

// 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// live reloading

liveReloadServer.watch(path.join(__dirname, "../public"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(liveReloadMiddleware());

// routing

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
