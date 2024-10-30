import { Request, Response } from 'express';
import { ResponseHandler } from '@/infrastructure/handlers/response.handler';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { ProductService } from './product.service';
import { createProductSchema, getProductBySlugSchema, getProductsSchema } from './product.schemas';

const productService = new ProductService();

export const create = async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);

  const product = await productService.create(data);

  return ResponseHandler.success(res, product.toSafeObject, HttpStatusCode.CREATED);
};

export const getAll = async (req: Request, res: Response) => {
  const { query } = getProductsSchema.parse(req);

  const { products, total } = await productService.getAll(query);

  const data = products.map((product) => product.toSafeObject);

  const pagination = {
    page: query.page,
    total: Math.ceil(total / query.limit),
  };

  return ResponseHandler.success(res, data, HttpStatusCode.OK, pagination);
};

export const getBySlug = async (req: Request, res: Response) => {
  const { slug } = getProductBySlugSchema.parse(req.params);

  const product = await productService.getBySlug(slug);

  return ResponseHandler.success(res, product.toSafeObject, HttpStatusCode.OK);
};
