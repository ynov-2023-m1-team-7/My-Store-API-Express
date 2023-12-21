

const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');
const { request } = require('../app');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

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
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            const err = throwError('No name, description, or price provided', 404);
            return next(err);
        }
        const form = await prisma.form.create({
            data: {
                name,
                description,
                price,
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

