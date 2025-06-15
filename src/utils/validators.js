import Joi from "joi";

// Define allowed categories as constants
const TRANSACTION_CATEGORIES = [
    'income',
    'expense'
    // 'food',
    // 'transportation',
    // 'entertainment',
    // 'shopping',
    // 'utilities',
    // 'healthcare',
    // 'education',
    // 'travel',
    // 'investment',
    // 'other'
  ];

// Transaction validation schema
const transactionSchema = Joi.object({
  // id is auto-generated (SERIAL), so not required for creation
  id: Joi.number().integer().positive().optional(),

  // user_id - required string, max 255 characters
  user_id: Joi.string().max(255).required().messages({
    "string.empty": "User ID is required",
    "string.max": "User ID must not exceed 255 characters",
    "any.required": "User ID is required",
  }),

  // title - required string, max 255 characters
  title: Joi.string().max(255).trim().required().messages({
    "string.empty": "Title is required",
    "string.max": "Title must not exceed 255 characters",
    "any.required": "Title is required",
  }),

  // amount - required decimal number with 2 decimal places
  amount: Joi.number().precision(2).positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "any.required": "Amount is required",
  }),

  // category - required string, max 255 characters
  category: Joi.string().valid(...TRANSACTION_CATEGORIES).max(255).trim().required().messages({
    "string.empty": "Category is required",
    "string.max": "Category must not exceed 255 characters",
    "any.required": "Category is required",
  }),

  // created_at - optional date (defaults to current date in DB)
  created_at: Joi.date().iso().optional().messages({
    "date.base": "Created at must be a valid date",
    "date.format": "Created at must be in ISO format (YYYY-MM-DD)",
  }),
});

// Validation schema for creating a new transaction (excludes id and created_at)
const createTransactionSchema = transactionSchema.fork(
  ["id", "created_at"],
  (schema) => schema.forbidden()
);

// Validation schema for updating a transaction (all fields optional except id)
const updateTransactionSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  user_id: Joi.string().max(255).optional(),
  title: Joi.string().max(255).trim().optional(),
  amount: Joi.number().precision(2).positive().optional(),
  category: Joi.string().max(255).trim().optional(),
  created_at: Joi.date().iso().optional(),
});

// Validation schema for query parameters (filtering, pagination)
const queryTransactionSchema = Joi.object({
  user_id: Joi.string().max(255).optional(),
  category: Joi.string().max(255).optional(),
  min_amount: Joi.number().precision(2).positive().optional(),
  max_amount: Joi.number().precision(2).positive().optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().min(Joi.ref("start_date")).optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// Example usage functions
export function validateCreateTransaction(data) {
  return createTransactionSchema.validate(data, { abortEarly: false });
}

export function validateUpdateTransaction(data) {
  return updateTransactionSchema.validate(data, { abortEarly: false });
}

export function validateTransactionQuery(query) {
  return queryTransactionSchema.validate(query, { abortEarly: false });
}

// Example middleware for Express.js
export function validateTransaction(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorMessages,
      });
    }

    req.validatedData = value;
    next();
  };
}

// module.exports = {
//   transactionSchema,
//   createTransactionSchema,
//   updateTransactionSchema,
//   queryTransactionSchema,
//   validateCreateTransaction,
//   validateUpdateTransaction,
//   validateTransactionQuery,
//   validateTransaction,
// };

// Usage examples:

// 1. Validate new transaction data
/*
const newTransaction = {
  user_id: "user123",
  title: "Grocery Shopping",
  amount: 45.67,
  category: "Food"
};

const { error, value } = validateCreateTransaction(newTransaction);
if (error) {
  console.log('Validation errors:', error.details);
} else {
  console.log('Valid transaction data:', value);
}
*/

// 2. Express.js route with validation middleware
/*
const express = require('express');
const app = express();

app.post('/transactions', 
  validateTransaction(createTransactionSchema), 
  (req, res) => {
    // req.validatedData contains the validated transaction data
    // Insert into database logic here
    res.json({ success: true, data: req.validatedData });
  }
);

app.put('/transactions/:id', 
  validateTransaction(updateTransactionSchema), 
  (req, res) => {
    // Update transaction logic here
    res.json({ success: true, data: req.validatedData });
  }
);
*/
