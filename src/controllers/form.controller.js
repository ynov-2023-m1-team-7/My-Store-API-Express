

const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');
const fs = require('fs');
const { promisify } = require('util');
const prisma = new PrismaClient();


exports.getForms = async (req, res, next) => {
    try {
        console.log("getForms");
        const forms = await prisma.form.findMany({
            where: { active: true },
            take: req.query.take ? Number(req.query.take) : 8,
        });
        if (!forms) {
            const err = throwError('No forms found', 404);
            return next(err);
        }
        return res.send(
            {
                success: true,
                data: forms,
            },
        );
    } catch (err) {
        return next(err);
    }
}

exports.getForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError('No form id provided', 404);
            next(err);
        }
        const form = await prisma.form.findUnique({
            where: { id: Number(id) },
        });
        if (!form) {
            const err = throwError('Form not found', 404);
            return next(err);
        }
        return res.json(
            {
                data: form,
                sucess: true,
            },
        );
    } catch (err) {
        return next(err);
    }
};

exports.createForm = async (req, res, next) => {
    try {
        const { firstName, lastName, email, productId } = req.body;
        if (!firstName || !lastName || !email || !productId) {
            console.log("Missing required fields" + req.body);
            const err = throwError('Missing required fields', 400);
            return next(err);
        }
        const form = await prisma.form.create({
            data: {
                firstName,
                lastName,
                email,
                productId: Number(productId),
            },
        });
        return res.json(
            {
                data: form,
                success: true,
            },
        );
    } catch (err) {
        return next(err);
    }
};

