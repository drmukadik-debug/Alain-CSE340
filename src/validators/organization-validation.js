import { body } from 'express-validator';

export const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters.')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters.')
        .escape(),

    body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail()
];