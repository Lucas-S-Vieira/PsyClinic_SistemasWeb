-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_appointments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "psychologist_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tb_appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "tb_patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tb_appointments_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "tb_psychologists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tb_appointments" ("created_at", "date", "id", "patient_id", "psychologist_id", "updated_at") SELECT "created_at", "date", "id", "patient_id", "psychologist_id", "updated_at" FROM "tb_appointments";
DROP TABLE "tb_appointments";
ALTER TABLE "new_tb_appointments" RENAME TO "tb_appointments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
