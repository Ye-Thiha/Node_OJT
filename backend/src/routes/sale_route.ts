import express from "express";
import { getSale, createSale, findSale, updateSale, deleteSale } from '../controllers/SaleController';
import { body } from 'express-validator';
import { findByIdService } from "../services/sale.service";

const router = express.Router();

router
  .route("/")
  .get(getSale)
  .post(
    [
      body("customer_name").notEmpty().withMessage("customer_name must not be empty"),
      body("time").notEmpty().withMessage("time must not be empty"),
      body("date").notEmpty().withMessage("date must not be empty"),
      body("seat_id").notEmpty().withMessage("seat_id must not be empty"),
      body("cinema_id").notEmpty().withMessage("cinema_id must not be empty"),
    ],
    createSale);

router
  .route("/search")
  .post(findByIdService)
    
router
  .route("/:id")
  .get(findSale)
  .put(
    [
      body("customer_name").notEmpty().withMessage("customer_name must not be empty"),
      body("time").notEmpty().withMessage("time must not be empty"),
      body("date").notEmpty().withMessage("date must not be empty"),
      body("seat_id").notEmpty().withMessage("seat_id must not be empty"),
      body("cinema_id").notEmpty().withMessage("cinema_id must not be empty"),
    ],
    updateSale)
  .delete(deleteSale)
export default router;