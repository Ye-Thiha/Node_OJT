import { Request, Response, NextFunction } from "express";
import Sale from '../models';
import { validationResult } from "express-validator";

/**
 * get post service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getSaleService = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: any = _req.query.page || 0;
    const salesPerPage: any = _req.query.pageSize || 5;

    const userType = _req.headers['userType'];
    const userId = _req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
      condition.updated_user_id = userId;
    }
    const sales = await Sale.find(condition).skip(page * salesPerPage).limit(salesPerPage);
    res.json({ data: sales, status: 1 });
  } catch (err) {
    next(err);
  }
};

/**
 * create post service
 * @param req 
 * @param res 
 * @param next 
 */
 export const createSaleService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }
    const saleList = req.body; 
    const result: any = await Sale.insertMany(saleList);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findSaleService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ data: sale, status: 1 });
  } catch (err) {
    next(err);
  }
}

export const updateSaleService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }
    const sale: any = await Sale.findById(req.params.id);
    if (!sale) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    sale.customer_name = req.body.customer_name;
    sale.date = req.body.date;
    sale.time = req.body.time;
    sale.seat_id = req.body.seat_id;
    sale.cinema_id = req.body.cinema_id;
    sale.created_user_id = req.body.created_user_id;
    sale.updated_user_id = req.body.updated_user_id;
    const result = await sale.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deleteSaleService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const sale: any = await Sale.findByIdAndRemove(req.params.id);
    if (!sale) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    sale.deleted_at = new Date();
    await sale.save();
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
};

export const findByIdService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: any = req.query.page || 0;
    const salesPerPage: any = req.query.ppp || 5;

    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    const sales = await Sale.find(condition).skip(page * salesPerPage).limit(salesPerPage);
    res.json({ data: sales, status: 1 });
  } catch (err) {
    next(err);
  }
}