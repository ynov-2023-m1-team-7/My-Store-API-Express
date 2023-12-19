const Redis = require('ioredis');
const { PrismaClient } = require('@prisma/client');
const { redisOptions } = require('../config/redis');

const prisma = new PrismaClient();
const redis = new Redis(redisOptions);


// Function to duplicate all data to Redis at launch
const duplicateAllDataToRedis = async () => {
    try {
        const allData = await prisma.product.findMany();
        // duplicate all data to Redis
        await redis.set('products', JSON.stringify(allData));


        console.log('Data duplicated to Redis at launch.');
    } catch (error) {
        console.error('Error duplicating data to Redis:', error);
    }
}

module.exports = duplicateAllDataToRedis;  