"use client";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

async function postInscricao(payload: any) {
  const res = await fetch("/api/inscricoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data?.erro || "Erro ao enviar inscrição");
    return data;
  } catch (e) {
    // Se não for JSON, lança texto cru para diagnóstico
    throw new Error(text || "Erro inesperado do servidor");
  }
}

export default function Home() {
  const [form, setForm] = useState({
    nomeEsposo: "",
    nomeEsposa: "",
    email: "",
    telefone: "",
    igreja: "",
  });

  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const mutation = useMutation(postInscricao, {
    onSuccess: (data) => {
      setMensagemSucesso(data?.mensagem || "Sua inscrição foi recebida com sucesso!");
      setForm({ nomeEsposo: "", nomeEsposa: "", email: "", telefone: "", igreja: "" });
      setTimeout(() => setMensagemSucesso(""), 5000);
    },
    onError: (err: any) => {
      setErro(err?.message || "Erro ao processar inscrição");
    },
    retry: 1,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagemSucesso("");
    mutation.mutate(form);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        {/* Cabeçalho */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-600">💒 Encontro de Casais</h1>
          <p className="mt-2 text-gray-600">Inscreva-se para o evento</p>
        </header>

        {/* Mensagem de Sucesso */}
        {mensagemSucesso && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
            ✅ {mensagemSucesso}
          </div>
        )}

        {/* Mensagem de Erro */}
        {erro && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            ❌ {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Linha 1: Nomes */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do Esposo *
              </label>
              <input
                type="text"
                name="nomeEsposo"
                value={form.nomeEsposo}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
                placeholder="João Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome da Esposa *
              </label>
              <input
                type="text"
                name="nomeEsposa"
                value={form.nomeEsposa}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
                placeholder="Maria Silva"
              />
            </div>
          </div>

          {/* Linha 2: Email e Telefone */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
                placeholder="(11) 9 9999-9999"
              />
            </div>
          </div>

          {/* Linha 3: Igreja */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Igreja (opcional)
            </label>
            <input
              type="text"
              name="igreja"
              value={form.igreja}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:outline-none"
              placeholder="Sua Igreja"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full rounded-lg bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
          >
            {mutation.isLoading ? "Enviando..." : "Enviar Inscrição"}
          </button>
        </form>
      </div>
    </main>
  );
}



    

