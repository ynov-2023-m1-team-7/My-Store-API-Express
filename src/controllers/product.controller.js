const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');
const { request } = require('../app');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const prisma = new PrismaClient();

exports.getProducts = async (req, res, next) => {
    try {
        console.log("getProducts");
        const products = await prisma.product.findMany({
            where: { active: true },
            take: req.query.take ? Number(req.query.take) : 8,
        });
        if (!products) {
            const err = throwError('No products found', 404);
            return next(err);
        }
        return res.send(
            {
                success: true,
                data: products,
            },
        );
    } catch (err) {
        return next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError('No product id provided', 404);
            next(err);
        }
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            const err = throwError('Product not found', 404);
            return next(err);
        }
        return res.json(
            {
                data: product,
                sucess: true,
            },
        );
    } catch (err) {
        return next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, thumbnail_base64, thumbnail_name } = req.body;
        console.log(req.body);
        if (!name || !description || !price || !thumbnail_base64 || !thumbnail_name) {
            const err = throwError('Missing required fields', 400);
            return next(err);
        }

        uploadImage(thumbnail_base64, thumbnail_name).then(({ success, url }) => {
            const thumbnail = url;
            const active = true;
            const packshot = url;
            if (!success) {
                const err = throwError('Error uploading image', 500);
                return next(err);
            }
            prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    thumbnail,
                    active,
                    packshot
                },
            }).then((product) => {
                return res.json(
                    {
                        data: product,
                        success: true,
                    },
                );
            }).catch((err) => {
                console.log(err);
                return next(err);
            });
        }).catch((err) => {
            console.log(err);
            return next(err);
        });
    } catch (err) {
        return next(err);
    }
};

exports.updateAllProductsImages = async (req, res, next) => {
    try {
        // Mettre à jour toutes les entrées dans la base de données
        const products = await prisma.product.findMany();


        // Mettre à jour chaque produit
        for (const product of products) {
            const { thumbnail } = product;

            // Vérifier si le champ thumbnail est un lien vers une image stockée sur l'API
            if (thumbnail.includes('uploads/')) {
                // Récupérer le chemin de l'image locale dans le dossier public
                const imagePath = path.join(process.cwd() + '/src/public/' + thumbnail)
                console.log(imagePath);
                // Lire le contenu de l'image en base64
                const imageBase64 = await readFileAsync(imagePath, { encoding: 'base64' });

                // uploader l'image en base64 sur l'API
                const { success, url } = await uploadImage(imageBase64, thumbnail);
                if (!success) {
                    const err = throwError('Error uploading image', 500);
                    return next(err);
                }

                // Mettre à jour le produit dans la base de données avec l'image en base64
                await prisma.product.update({
                    where: { id: product.id },
                    data: { thumbnail: url, packshot: url },
                });

            }
        }

        return res.json({ success: true, message: 'Images updated for all products' });
    } catch (err) {
        console.error(err);
        return next(err);
    };
}


const uploadImage = async (base64, name) => {
    try {
        const response = await fetch(process.env.FILE_UPLOAD_URL, {
            method: 'POST',
            body: JSON.stringify({
                file_name: name,
                file_content_base64: base64,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return { success: true, url: data.url };
    } catch (err) {
        throw new Error(err);
    }
};


