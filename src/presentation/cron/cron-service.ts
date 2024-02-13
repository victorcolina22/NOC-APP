import { CronJob } from "cron";

type CronTime = string | Date;
type Ontick = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: Ontick): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}
