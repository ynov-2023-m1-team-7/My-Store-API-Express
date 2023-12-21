-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT NOT NULL,
    "packshot" TEXT NOT NULL DEFAULT '/uploads/',
    "price" DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "form" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "form_pkey" PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "form"
ADD CONSTRAINT "form_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
INSERT INTO "product"
VALUES (
        1,
        'W simple pant',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product1_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product1_packshot.webp',
        123
    ),
    (
        2,
        'Bib Overall Straight',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product2_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product2_packshot.webp',
        136
    ),
    (
        3,
        'W'' L/S Kyle Shirt',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product3_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product3_packshot.webp',
        89.499999999999999998
    ),
    (
        4,
        'W'' American Scr. High Neck Swt',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product4_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product4_packshot.webp',
        120.98999999999999488
    ),
    (
        5,
        'W'' L/S Seidler T-Shir',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product5_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product5_packshot.webp',
        70
    ),
    (
        6,
        'W'' OG Active Jacket',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product6_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product6_packshot.webp',
        90
    ),
    (
        7,
        'W'' Ace Vest',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product7_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product7_packshot.webp',
        78
    ),
    (
        8,
        'W'' L/S Craft Shirt ',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product8_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product8_packshot.webp',
        90
    ),
    (
        9,
        'W'' Skyler Liner',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        true,
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product9_packshot.webp',
        'https://my-store-files.s3.eu-west-3.amazonaws.com//uploads/product9_packshot.webp',
        370.49999999999999999
    );