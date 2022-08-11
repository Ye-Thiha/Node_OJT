"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
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
});
