"use client";

import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      value: "contato@studyconnect.com.br",
      link: "mailto:contato@studyconnect.com.br",
      description: "Envie-nos um email e responderemos em até 24h úteis",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
    },
    {
      icon: PhoneIcon,
      title: "Telefone",
      value: "(12) 3456-7890",
      link: "tel:+551234567890",
      description: "Atendimento de segunda a sexta, 9h às 18h",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
    },
    {
      icon: MapPinIcon,
      title: "Endereço",
      value: "Cachoeira Paulista, SP",
      link: null,
      description: "Nossa sede fica no interior de São Paulo",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-600",
    },
  ];

  const faqs = [
    {
      question: "Como posso sugerir uma nova instituição?",
      answer:
        "Entre em contato conosco por email informando o nome da instituição e incluiremos na plataforma após análise.",
    },
    {
      question: "Posso reportar informações incorretas?",
      answer:
        "Sim! Envie um email detalhando a informação incorreta e faremos a correção o mais breve possível.",
    },
    {
      question: "Como faço para ser uma instituição parceira?",
      answer:
        "Entre em contato através do telefone ou email e nossa equipe apresentará as opções de parceria.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.15,
          }}
          className="relative max-w-4xl mx-auto px-6 py-20 md:py-28 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wide">
              Entre em Contato
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Estamos aqui para{" "}
            <span className="text-blue-400">ajudar você</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Tem dúvidas, sugestões ou quer fazer parte do projeto? Entre em
            contato através de qualquer um dos canais abaixo.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Cards de Contato */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={`group relative bg-white rounded-2xl border-2 ${info.borderColor} p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="mb-6">
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${info.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <info.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {info.title}
                </h3>

                {info.link ? (
                  <a
                    href={info.link}
                    className={`block text-xl font-bold ${info.textColor} hover:underline mb-3 transition-colors`}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-xl font-bold text-slate-900 mb-3">
                    {info.value}
                  </p>
                )}

                <p className="text-sm text-slate-600 leading-relaxed">
                  {info.description}
                </p>
              </div>

              <div
                className={`absolute top-4 right-4 w-12 h-12 ${info.bgColor} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Horário de Atendimento */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                <ClockIcon className="h-10 w-10 text-blue-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Horário de Atendimento
                </h3>
                <p className="text-slate-400 mb-3">
                  Estamos disponíveis nos seguintes horários:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-300">
                      <strong className="text-white">Segunda a Sexta:</strong>{" "}
                      9h às 18h
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-slate-300">
                      <strong className="text-white">Finais de Semana:</strong>{" "}
                      Fechado
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-center">
                <div className="px-6 py-3 bg-blue-600 rounded-lg border border-blue-500">
                  <div className="text-sm text-blue-200 mb-1">
                    Tempo de resposta
                  </div>
                  <div className="text-2xl font-bold text-white">24h</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Rápido */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
              <QuestionMarkCircleIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900 tracking-wide">
                Dúvidas Frequentes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Perguntas Comuns
            </h2>
            <p className="text-slate-600">
              Confira se sua dúvida já foi respondida abaixo
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed ml-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 text-center border border-blue-500">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Não hesite em nos contatar. Estamos aqui para ajudar você a
              encontrar o curso ideal para sua jornada acadêmica.
            </p>
            <a
              href="mailto:contato@studyconnect.com.br"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              <EnvelopeIcon className="h-5 w-5" />
              Enviar Email Agora
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
