import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServiceMultiple } from "../domain/user-cases/checks/check-service-multiple.use-case";
import { CheckService } from "../domain/user-cases/checks/check-service.use-case";
import { SendEmailLogs } from "../domain/user-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {
  // The "static" word means that you can use a method without creating an instance of the class, otherwise you need to create an instance of the class to use a no static method.
  public static async start() {
    console.log("Server started...");

    // Mandar email
    // emailService.sendEmailWithFileSystemLogs([
    //   "victorcolina2202@gmail.com",
    //   "victorcolina2202@gmail.com",
    // ]);
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "victorcolina2202@gmail.com",
    //   "victorcolina2202@gmail.com",
    // ]);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}

Server.start();
