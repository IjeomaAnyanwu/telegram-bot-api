import { Request, Response } from 'express';
import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { config } from 'dotenv';
import messageModel from '../models/messageModel';
import botModel from '../models/botModel';

config();
const apiId: number = parseInt(process.env.API_ID || '', 10);
const apiHash: string = process.env.API_HASH || '';
const stringSessionValue: string = process.env.stringSession || '';
const botToken: string = process.env.BOT_TOKEN || ''; 

export const createBot = async (req: Request, res: Response) => {
  try {
    const stringSession = new StringSession(stringSessionValue);

    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.start({
      botAuthToken: botToken,
    });

    console.log('connected successfully.');
    console.log(client.session.save()); 
     const createdBot = await botModel.create({
      token: botToken,
    });

    console.log('Bot created successfully:', createdBot);

    res.status(200).json({ botToken , message: "Bot created successfully"});
  } catch (error) {
    console.error('Error creating bot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUsersInfo = async (req: Request, res: Response) => {
  try {
    const session = new StringSession(stringSessionValue || '');

    const client = new TelegramClient(session, apiId, apiHash || '', {});

    await client.connect();

    const { username } = req.params;

    const result = await client.invoke(
      new Api.users.GetUsers({
        id: [username],
      })
    );

    if (Array.isArray(result) && result.length > 0) {
      const formattedUserInfo = result.map((user) => {
        if ('id' in user && 'firstName' in user && 'lastName' in user && 'username' in user) {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          }
        } else {
          return {
            id: user.id,
            firstName: 'N/A',
            lastName: 'N/A',
            username: 'N/A',
          };
        }
      });

      res.status(200).json(formattedUserInfo);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessagesList = async (req: Request, res: Response) => {
  try {
    const session = new StringSession(stringSessionValue || '');

    const client = new TelegramClient(session, apiId, apiHash || '', {});

    await client.connect();

    const result = await client.invoke(
      new Api.messages.GetMessages({
        id: [new Api.InputMessageID({id: 1})],
      })
    );
  
    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ error: 'Bad Request - Missing user identifier or message text' });
    }

    const session = new StringSession(stringSessionValue || '');

    const client = new TelegramClient(session, apiId, apiHash || '', {});

    await client.connect();

    const result = await client.invoke(
      new Api.messages.SendMessage({
        peer: userId.toString(),
        message: text,
        
      })
    );

    try {
      const savedMessage = await messageModel.create({
        userId,
        text,
      });

      console.log('Message successfully saved to the database:', savedMessage);
    } catch (dbError) {
      console.error('Error saving message to the database:', dbError);
    }
    res.status(200).json({ message: 'Message successfully sent to the user', result });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
