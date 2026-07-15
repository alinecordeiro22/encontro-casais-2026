-- CreateTable
CREATE TABLE "Inscricao" (
    "id" TEXT NOT NULL,
    "nomeEsposo" TEXT NOT NULL,
    "nomeEsposa" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "igreja" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("id")
);
