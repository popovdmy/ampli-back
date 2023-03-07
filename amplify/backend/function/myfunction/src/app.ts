/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




import 'reflect-metadata';
import http from "http";
import express from 'express';
import cors from 'cors';
import mikroConfig from './mikro-orm.config';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core"
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UserEntity } from './entities/UserEntity';
import { UserRouter } from './routes/UserRouter';

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

dotenv.config(); 

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<UserEntity>,
};

export const app = express();
const PORT = process.env.PORT || 4000;

// declare a new express app
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(bodyParser.json());
app.use(express.json());

export const main = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(mikroConfig);
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(UserEntity);
  
  app.use(bodyParser.json());
  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  const corsOptions = {
    origin: "http://localhost:4000",
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.json({ type: 'application/*+json' }));
  app.use('/users/', UserRouter);
  app.use((_req, res) => res.status(404).json({ message: 'Route not found'}));

  DI.server = app.listen(PORT, () => {
    console.log(`express server started on localhost:${PORT}`)
  })
})();


module.exports = app;