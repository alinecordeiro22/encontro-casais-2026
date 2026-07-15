import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nomeEsposo || !body.nomeEsposa || !body.email || !body.telefone) {
      return NextResponse.json(
        { erro: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    const inscricao = await prisma.inscricao.create({
      data: {
        nomeEsposo: body.nomeEsposo,
        nomeEsposa: body.nomeEsposa,
        email: body.email,
        telefone: body.telefone,
        igreja: body.igreja || null,
      },
    });

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: "Inscrição recebida com sucesso!",
        dados: inscricao,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro na inscrição:", error);
    return NextResponse.json(
      { erro: "Erro ao processar inscrição" },
      { status: 500 }
    );
  }
}
