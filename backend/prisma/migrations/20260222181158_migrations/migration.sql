-- CreateTable
CREATE TABLE "tb_psychologists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tb_patients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tb_appointments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "psychologist_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tb_appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "tb_patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tb_appointments_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "tb_psychologists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
