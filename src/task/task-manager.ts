import { Client } from "discord.js";
import { sendReservePostTask } from "./send-reserve-post-task";
var cron = require('node-cron');

export const RunTask = (client: Client) => {
  cron.schedule('* * * * *', () => {
    console.log('aaa')
    sendReservePostTask(client)
  }
  );
}
