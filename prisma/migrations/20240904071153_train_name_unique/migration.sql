/*
  Warnings:

  - A unique constraint covering the columns `[trainname]` on the table `Train` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Train_trainname_key" ON "Train"("trainname");
