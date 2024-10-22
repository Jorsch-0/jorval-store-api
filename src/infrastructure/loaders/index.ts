import { Application } from 'express';
import { expressLoader } from './express';

export async function baseLoader(app: Application) {
  await expressLoader(app);
}
