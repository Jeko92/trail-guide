import type { Request, Response, NextFunction } from 'express';
import { access, appendFile, mkdir, writeFile } from 'fs/promises';
import { constants } from 'node:fs/promises';

const LOG_DIR = process.env['LOG_DIR'];
const LOG_FILE = process.env['LOG_FILE'];

const addLogMessages = async ( message: string ) => {
  try {
    if ( LOG_FILE ) {
      await appendFile(LOG_FILE, `${message} \n`);
    } else {
      console.error('Please define log file variable in your environment');
    }
  } catch ( err ) {
    console.error(`Error: ${err}`);
  }
};

const fileExists = async (): Promise<boolean> => {
  try {
    if ( LOG_DIR && LOG_FILE ) {
      await mkdir(LOG_DIR, { recursive: true });
      await access(LOG_FILE, constants.F_OK);
    } else {
      console.error('Please define log directory and log file variable in your environment');
    }
    return true;
  } catch ( err ) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    return false;
  }
};

const createLogFile = async () => {
  try {
    if ( LOG_FILE ) {
      await writeFile(LOG_FILE, '', { encoding: 'utf-8' });
    } else {
      console.error('Please define log file variable in your environment');
    }
  } catch ( err ) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
  }
};

fileExists()
  .then(async ( fileExists: boolean ) => {
    if ( !fileExists ) await createLogFile();
  }).catch(err => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`Error: ${message}`);
});


export async function logger ( req: Request, _res: Response, next: NextFunction ) {
  const { ip, method, originalUrl: url } = req;
  const timestamp = new Date().toISOString();

  // console.log(`Basic logger: ${method} ${ip} ${url} ${timestamp}`);
  await addLogMessages([ method, ip, url, timestamp ].join(' '));
  next();
}
