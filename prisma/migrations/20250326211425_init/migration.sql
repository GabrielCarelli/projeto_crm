/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Vendedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vendedor_email_key" ON "Vendedor"("email");
