import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import {config} from 'dotenv'

config()
const apiId: number = parseInt(process.env.API_ID || '', 10);
 const apiHash: string = process.env.API_HASH || '';
 const stringSession: string = process.env.stringSession || '';


(async () => {
  const client = new TelegramClient(
    new StringSession(stringSession),
    apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );
  //await client.start();
});