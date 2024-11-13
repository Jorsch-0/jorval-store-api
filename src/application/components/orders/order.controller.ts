import { Request, Response } from 'express';
import { ResponseHandler } from '@/infrastructure/handlers/response.handler';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { OrderService } from './order.service';

const orderService = new OrderService();

export const getOrders = async (req: Request, res: Response) => {
  const { email } = req.body.user;

  const orders = (await orderService.getAll(email)).map((order) => order.toSafeObject);

  return ResponseHandler.success(res, orders, HttpStatusCode.OK);
};
