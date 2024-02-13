import "dotenv/config";

import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  const prisma = new PrismaClient();
  // -- Crear log --
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "MEDIUM",
  //     message: "Test message prisma",
  //     origin: "app.ts",
  //   },
  // });

  // -- Ver todos los logs --
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });

  // Crear colección
  // const newLog = await LogModel.create({
  //   message: "Test message desde mongo",
  //   origin: "app.ts",
  //   level: "low",
  // });
  // await newLog.save();

  // Leer colecciones
  // const logs = await LogModel.find();

  Server.start();
}
