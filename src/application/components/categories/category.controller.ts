import { Request, Response } from 'express';
import { createCategorySchema } from './category.schemas';
import { CategoryService } from './category.service';
import { ResponseHandler } from '@/infrastructure/handlers/response.handler';
import { HttpStatusCode } from '@/infrastructure/utils/constants';

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body);

  const category = await categoryService.create(data);

  return ResponseHandler.success(res, category, HttpStatusCode.CREATED);
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAll();

  return ResponseHandler.success(res, categories, HttpStatusCode.OK);
};
