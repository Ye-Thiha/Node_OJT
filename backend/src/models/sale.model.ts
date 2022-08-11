import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  customer_name: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seat_id: {
    type: Number,
    required: true
  },
  cinema_id: {
    type: Number,
    required: true
  },
})