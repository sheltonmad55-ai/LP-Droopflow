import React, { useState, useRef } from "react";
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  Layers, 
  ShoppingBag, 
  Megaphone, 
  Target, 
  Settings, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Lock, 
  X,
  Play,
  FileSpreadsheet,
  Zap,
  BarChart3,
  Flame
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import InteractiveAppMockup from "./components/InteractiveAppMockup";

// High-fidelity AppLogo representing the white squircle, green drop, and dark arrow
export function AppLogo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon: White Squircle with Green Drop and Upward Arrow */}
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/5 overflow-hidden border border-white/10 shrink-0 relative">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <defs>
            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Green Drop (water/droplet shape) */}
          <path
            d="M50,15 C32,45 32,75 50,85 C68,75 68,45 50,15 Z"
            fill="url(#dropGrad)"
            transform="translate(-10, 5) scale(0.9) rotate(-15 50 50)"
          />
          {/* Ascending Arrow - trending up line */}
          <path
            d="M20,75 L45,50 L65,65 L85,25"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrow head */}
          <path
            d="M70,25 L85,25 L85,40"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-display font-black text-xl tracking-tight text-white uppercase">
        Droop<span className="text-emerald-500 italic">Flow</span>
      </span>
    </div>
  );
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBuyClick = (planName: string) => {
    setSelectedPlanName(planName);
    setShowCheckoutSuccess(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Conversions pricing - strictly 297 MT / month (Plano Pro)
  const priceProMT = "297 MT";

  // Refs and parallax offsets for 'Diferenciais' and 'Comparativo' sections
  const diferenciaisRef = useRef<HTMLElement>(null);
  const { scrollYProgress: scrollYDef } = useScroll({
    target: diferenciaisRef,
    offset: ["start end", "end start"]
  });
  const defBgY1 = useTransform(scrollYDef, [0, 1], [-60, 60]);
  const defBgY2 = useTransform(scrollYDef, [0, 1], [40, -40]);
  const defBgRotate = useTransform(scrollYDef, [0, 1], [0, 15]);

  const comparativoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: scrollYComp } = useScroll({
    target: comparativoRef,
    offset: ["start end", "end start"]
  });
  const compBgY1 = useTransform(scrollYComp, [0, 1], [-80, 80]);
  const compBgY2 = useTransform(scrollYComp, [0, 1], [50, -50]);
  const compBgRotate = useTransform(scrollYComp, [0, 1], [-10, 10]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden antialiased">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[800px] left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <AppLogo />
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-24 max-w-7xl mx-auto px-6">
        
        {/* Promotional Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVO PARA QUEM VENDE NA SHOPIFY, NO WHATSAPP OU DROP NACIONAL</span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-[0.95] uppercase">
            Podes faturar maning, mas no final paras, olhas e <br />
            <span className="text-emerald-500 italic">
              não vês onde foi o dinheiro?
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-normal leading-relaxed max-w-3xl mx-auto">
            Fazer tudo de cabeça e só controlar faturamento é o caminho mais rápido para quebrar. Se vendes na <span className="text-white font-semibold">Shopify</span>, tens operação de <span className="text-white font-semibold">dropnacional</span> ou fechas encomendas diretamente <span className="text-white font-semibold">no WhatsApp</span>, para de vacilar! Sem planilhas ou sistemas reais, tu confundes faturamento bruto com lucro, gastas o que não deves, e acabas apenas <span className="text-emerald-400 font-semibold">devolvendo o teu dinheiro para o tio Zuck</span> sem meter nenhum lucro de verdade no bolso.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <a 
            href="https://checkout.escalepay.com/9729350"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            Começar a Lucrar de Verdade <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </a>
          <button 
            onClick={() => handleScrollToId("demo")}
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-base px-10 py-5 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-emerald-400" /> Ver Demonstração Interativa
          </button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-12 text-gray-500 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            INTEGRAÇÃO EXPRESS SHOPIFY
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            CÁLCULO AUTOMÁTICO DE ROI POR CAMPANHA
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            RATEIO EM POCKETS (CAIXINHAS PROTEGIDAS)
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            CONEXÃO SEGURA M-PESA & E-MOLA
          </div>
        </div>

      </section>

      {/* CENTERPIECE: INTERACTIVE APP DEMO SECTION */}
      <section id="demo" className="py-16 bg-white/[0.01] border-t border-b border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
              EXPERIMENTAÇÃO EM TEMPO REAL
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              Toque no painel e veja o DroopFlow em ação
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Diferente de capturas estáticas, abaixo você tem o nosso <b>aplicativo simulado de ponta a ponta</b>. 
              Clique nas guias da barra lateral (Painel Geral, ROI, Pockets, Vendas), teste o <b>simulador de venda real</b> e o <b>simulador de saída</b>, e veja os cofres e cálculos atualizarem instantaneamente!
            </p>
            <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl text-amber-400 text-xs sm:text-sm max-w-2xl mx-auto flex items-start gap-3 text-left">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <span>
                <b>Nota Importante:</b> Isto é apenas uma <b>simulação demonstrativa</b> para veres como funciona o nosso fluxo real de rateio. Este protótipo <b>não é nem um terço do que a aplicação real pode fazer</b> pela tua operação! Usa o <b>simulador de venda real</b> (botão Adicionar Venda) e o <b>simulador de saída</b> (botão Registar Saída) para veres o poder do DroopFlow em ação.
              </span>
            </div>
          </div>

          {/* Simulated App Embed */}
          <InteractiveAppMockup />

        </div>
      </section>

      {/* FEATURES SECTION: OS DIFERENCIAIS ÚNICOS */}
      <section id="diferenciais" ref={diferenciaisRef} className="relative overflow-hidden py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: defBgY1 }}
          className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        />
        <motion.div 
          style={{ y: defBgY2, rotate: defBgRotate }}
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        />
        {/* Floating geometric wireframes that translate as you scroll */}
        <motion.div 
          style={{ y: defBgY1, rotate: defBgRotate }}
          className="absolute right-12 top-20 w-16 h-16 border border-emerald-500/10 rounded-2xl pointer-events-none -z-10 opacity-30"
        />
        <motion.div 
          style={{ y: defBgY2 }}
          className="absolute left-8 bottom-24 w-24 h-24 border border-emerald-500/5 rounded-full pointer-events-none -z-10 opacity-30"
        />
        {/* Subtle grid pattern */}
        <motion.div 
          style={{ y: defBgY1 }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10"
        />

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
          <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">ENGENHARIA FINANCEIRA MODERNA</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Desenvolvido especificamente para quem vende em Moçambique.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Esqueça planilhas complicadas que quebram a cada clique ou softwares estrangeiros que não conhecem a realidade das entregas e despesas locais.
          </p>
        </div>

        {/* Bento Grid of Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ROI Proporcional */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">ROI Proporcional Verdadeiro</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pare de olhar apenas para o faturamento bruto ou ROAS fantasioso do Facebook Ads. O DroopFlow calcula o lucro líquido verdadeiro, ponderando as taxas do M-Pesa, o frete regional e o custo real de cada produto vendido.
            </p>
          </motion.div>

          {/* Caixinhas Inteligentes */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Wallet className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">Sistema de Caixinhas (Pockets)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Distribua automaticamente todo o faturamento recebido em cofres financeiros protegidos. Separe na hora a Margem de Segurança, Capital de Giro e orçamento para novos anúncios. Nunca mais queime dinheiro de tráfego!
            </p>
          </motion.div>

          {/* Calendário Periódico */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">Controlo Periódico Avançado</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Analise métricas e tendências por períodos específicos com um único clique. Monitore a variação percentual de gastos e receitas diárias, semanais ou mensais para tomar decisões de escala com máxima segurança.
            </p>
          </motion.div>

          {/* Zonas de Entrega */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Settings className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">Custos de Entrega sob Medida</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              O dropshipping nacional exige cálculos precisos de entrega. Defina taxas de entrega fixas para regiões geográficas específicas e o sistema desconta automaticamente cada frete conforme o local de destino de cada venda.
            </p>
          </motion.div>

          {/* Mobile-First */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">Design Mobile-First Ultra-Rápido</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Como você passa a maior parte do tempo gerindo a operação na rua, o DroopFlow foi desenhado para ser leve e extremamente amigável no celular. Registre vendas e controle seus cofres onde estiver.
            </p>
          </motion.div>

          {/* Campanhas de Anúncios */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:border-emerald-500/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Megaphone className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-white mb-3">Gestão de Tráfego & CPA</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Controle os custos do Facebook Ads com clareza matemática. Insira os orçamentos gastos por criativo de anúncio e saiba instantaneamente qual produto ou criativo está performando com lucro real de verdade.
            </p>
          </motion.div>

        </div>

      </section>

      {/* SPREADSHEETS VS DROPFLOW */}
      <section id="comparativo" ref={comparativoRef} className="relative overflow-hidden py-20 bg-transparent border-t border-white/5 scroll-mt-20">
        
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: compBgY1 }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        />
        <motion.div 
          style={{ y: compBgY2, rotate: compBgRotate }}
          className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        />
        {/* Subtle grid pattern for texture */}
        <motion.div 
          style={{ y: compBgY1 }}
          className="absolute inset-0 bg-[radial-gradient(#ffffff02_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">CONFRONTANDO A REALIDADE</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              Por que gerir tudo na cabeça ou insistir em planilhas está a queimar as tuas vendas?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Fazer tudo de cabeça é pura ilusão. Tu só controlas o faturamento bruto que brada no WhatsApp ou na Shopify, achas que tens maning de dinheiro, mas no final do dia estás apenas a devolver tudo para os anúncios do Facebook Ads (tio Zuck) sem reter margem real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* The spreadsheet side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <FileSpreadsheet className="w-5.5 h-5.5 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Gerir na Cabeça ou Planilhas Chatas</h4>
                  <p className="text-xs text-rose-400 font-semibold uppercase font-mono tracking-wider">Caminho mais rápido para quebrar</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span><b>Tudo de Cabeça:</b> Tu não usas planilhas, controlas tudo no feeling. No final, confundes faturamento bruto com lucro real e não sabes o que podes mexer para uso pessoal ou o que não pode ser mexido de forma alguma.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span><b>O "Tio Zuck" Devora Tudo:</b> Tu vês maning de notificações de vendas Shopify ou pedidos no WhatsApp, mas o custo por anúncio está tão alto que tu apenas estás a devolver dinheiro ao Facebook Ads sem veres lucro líquido.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span><b>Cadê o Dinheiro?:</b> Podes faturar tanto, mas quando paras e olhas para a tua conta, não vês onde foi o dinheiro por causa de taxas operacionais, comissão de entrega e custos invisíveis.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span><b>Dinheiro Misturado:</b> Misturas a verba do fornecedor, o frete regional e o teu dinheiro de anúncios. Quando dás por ti, gastaste o capital de giro achando que já estavas a lucrar maning.</span>
                </li>
              </ul>
            </motion.div>

            {/* The DroopFlow side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-emerald-950/10 border border-emerald-500/20 rounded-3xl p-8 space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-5.5 h-5.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Dashboard Automatizado DroopFlow</h4>
                  <p className="text-xs text-emerald-400 font-bold uppercase font-mono tracking-wider">Controle Total & Lucratividade Blindada</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>Lançamento Prático em Segundos:</b> Registre suas vendas online, canais de recebimento (M-Pesa/e-Mola) e custos de produtos de forma amigável.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>Cálculo de Margem Preciso:</b> O sistema desconta automaticamente taxas operacionais, publicidade e o custo exato do fornecedor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>Rateio em Caixinhas (Pockets):</b> Separação automática do caixa em cofres inteligentes para anúncios, fornecedores e lucro. Dinheiro blindado contra impulsos!</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>Saúde do Negócio no Celular:</b> Interface mobile ultraleve para você acompanhar as métricas fundamentais do seu negócio na rua ou em qualquer lugar.</span>
                </li>
              </ul>
            </motion.div>

          </div>



        </div>
      </section>

      {/* PRICING SECTION: OFERTA IRRECUSÁVEL */}
      <section id="precos" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">INVESTIMENTO RETORNÁVEL</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Acesso ilimitado e imediato à inteligência financeira
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Economizar <b>uma única entrega falhada</b> ou identificar um criativo que só queima dinheiro já paga o DroopFlow Pro por meses. Assine hoje com risco zero.
          </p>
        </div>

        {/* Pricing Card - Single Pro Plan */}
        <div className="max-w-xl mx-auto">
          
          {/* Plan: DroopFlow Pro */}
          <div className="bg-white/[0.04] border-2 border-emerald-500/30 p-8 sm:p-10 rounded-3xl flex flex-col justify-between hover:border-emerald-500/50 transition-all relative shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg">
              PLANO PROFISSIONAL COMPLETO 🔥
            </div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display font-black text-2xl text-white">Plano Pro</h3>
                  <p className="text-gray-400 text-xs mt-1">Sua estrutura financeira blindada com todos os recursos inclusos</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold uppercase border border-emerald-500/20">PRO</span>
              </div>

              {/* Price display */}
              <div className="space-y-1 py-4 border-t border-b border-white/5 my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-black text-white">
                    {priceProMT}
                  </span>
                  <span className="text-gray-500 text-sm font-semibold">/ mês</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono font-semibold">
                  Exclusivo para Moçambique • Sem taxas adicionais ou fidelidade
                </p>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Pockets (Caixinhas) ilimitados</b> para rateio financeiro</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Cálculo de ROI Proporcional</b> em tempo real</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Zonas de entrega customizadas</b> (Maputo, Matola, Beira, etc.)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Gestão de Campanhas de Anúncios</b> (Facebook & Instagram Ads)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Suporte VIP Dedicado</b> via WhatsApp nacional</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><b>Acesso Mobile Completo</b> 100% responsivo e otimizado</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a 
                href="https://checkout.escalepay.com/9729350"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.01] text-base cursor-pointer text-center"
              >
                Ativar Minha Assinatura Pro
              </a>
            </div>
          </div>

        </div>

        {/* Guarantee and security badges */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-9 h-9 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Garantia Blindada de 7 Dias</h4>
              <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
                Risco Zero absoluto. Se por qualquer motivo você achar que o DroopFlow não facilitou a gestão de seu caixa ou clareza de lucros do seu e-commerce, basta pedir reembolso de 100% em até 7 dias. Sem burocracia.
              </p>
            </div>
          </div>
          <div className="flex gap-4 shrink-0 font-mono text-[10px] font-bold text-gray-500">
            <div className="text-center bg-[#141414] px-3 py-2 rounded-xl border border-white/5">
              <span className="text-white block text-xs">SSL</span> SECURE
            </div>
            <div className="text-center bg-[#141414] px-3 py-2 rounded-xl border border-white/5">
              <span className="text-white block text-xs">AES</span> 256 BIT
            </div>
          </div>
        </div>

      </section>

      {/* FAQ SECTION (PERGUNTAS FREQUENTES) */}
      <section id="faq" className="py-20 bg-transparent border-t border-white/5 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              Ainda tem dúvidas? Veja como o DroopFlow simplifica tudo.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como o DroopFlow calcula o ROI Proporcional Verdadeiro?",
                a: "A maioria dos dashboards calcula o ROI ponderando apenas faturamento e o custo do produto cadastrado na plataforma de anúncios. O DroopFlow vai além: ele cruza a venda em tempo real com o custo exato do fornecedor, o custo de frete configurado para aquela zona de entrega específica e a distribuição automática proporcional do gasto em tráfego pago daquele dia. Isso gera a margem de segurança limpa."
              },
              {
                q: "As caixinhas (pockets) salvam meu dinheiro de verdade?",
                a: "Sim! O sistema de caixinhas (pockets) é o coração financeiro do DroopFlow. Cada venda faturada é fracionada em percentuais parametrizáveis criados por você (por exemplo: 15% para compras do fornecedor, 25% para reinvestir em tráfego, 10% para capital de giro e o restante como lucro). Assim, você nunca corre o risco de gastar o dinheiro destinado aos seus anúncios no dia seguinte."
              },
              {
                q: "Preciso baixar algum programa ou posso usar pelo celular?",
                a: "O DroopFlow é um SaaS 100% na nuvem e responsivo. Não há necessidade de baixar nenhum arquivo executável. Você acessa direto de qualquer navegador pelo computador, tablet ou celular, podendo registrar vendas e saídas de onde estiver com sincronização instantânea."
              },
              {
                q: "Consigo cadastrar taxas e taxas de entrega por zona?",
                a: "Com certeza. O DroopFlow foi desenhado sob medida para quem trabalha com envios regionais complexos. Você pode definir áreas de frete geográficas personalizadas (ex: Cidade de Maputo, Matola, etc.) e atribuir custos fixos para cada uma. Quando uma venda for lançada, o sistema desconta a taxa de entrega correspondente da caixinha destinada para Delivery automaticamente."
              },
              {
                q: "Como funciona a garantia de 7 dias?",
                a: "O processo é simples e transparente. Se você assinar qualquer um dos planos (Mensal ou Anual) e nas primeiras 168 horas achar que o sistema não entrega o valor que você esperava, basta enviar uma mensagem pelo suporte para receber o estorno completo e imediato de cada centavo pago."
              }
            ].map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/8 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-white">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CTA ACTION BLOCK */}
      <section className="py-20 relative max-w-7xl mx-auto px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none -z-10" />
        
        <div className="bg-white/5 border border-white/10 rounded-3.5xl p-8 md:p-16 max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              Para de devolver o teu dinheiro para o Tio Zuck!
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Chega de fazer contas de cabeça no WhatsApp ou Shopify. Junte-se a centenas de dropshippers focados em lucro líquido de verdade e domine a sua operação hoje mesmo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://checkout.escalepay.com/9729350"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg px-8 py-4 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
            >
              Começar com Risco Zero Agora
            </a>
            <button 
              onClick={() => handleScrollToId("demo")}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold text-base px-8 py-4 rounded-full border border-white/10 transition-all cursor-pointer"
            >
              Testar Demo Interativa
            </button>
          </div>

          <p className="text-gray-500 font-mono text-[10px] uppercase">
            GARANTIA DE REEMBOLSO INCONDICIONAL DE 100% • SUPORTE 24 HORAS
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-white uppercase">DroopFlow</span>
          </div>

          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} DroopFlow. Todos os direitos reservados. Gestão Financeira Inteligente para Dropshipping.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-white transition-colors cursor-pointer">Políticas de Privacidade</span>
          </div>

        </div>
      </footer>

      {/* SUCCESS SIMULATED PURCHASE MODAL */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0e0e0e] border border-indigo-500/20 max-w-md w-full rounded-3xl p-6 text-center space-y-6 shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-black text-2xl text-white uppercase">Pedido Recebido com Sucesso!</h4>
                <p className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold w-fit mx-auto">
                  {selectedPlanName.toUpperCase()} ATIVADO
                </p>
                <p className="text-sm text-gray-400 leading-relaxed px-2">
                  Parabéns! Sua assinatura fictícia para o <b>{selectedPlanName}</b> foi ativada na nossa simulação. Suas credenciais de login para o app seriam enviadas em menos de 1 minuto para o seu e-mail.
                </p>
              </div>

              <div className="bg-[#050505] p-4 rounded-2xl border border-white/5 text-left space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Produto:</span>
                  <span className="text-white font-bold">{selectedPlanName}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Ciclo de Faturamento:</span>
                  <span className="text-white font-bold">Mensal</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                  <span className="text-emerald-400 font-bold">Valor Simulado:</span>
                  <span className="text-emerald-400 font-bold">
                    {priceProMT}/mês
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleScrollToId("demo")}
                  className="w-1/2 bg-[#050505] hover:bg-[#101010] text-gray-400 hover:text-white border border-white/10 rounded-xl py-3 text-xs font-bold transition-all"
                >
                  Ir Para o Painel Demo
                </button>
                <button 
                  onClick={() => setShowCheckoutSuccess(false)}
                  className="w-1/2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl py-3 text-xs transition-all"
                >
                  Continuar Navegando
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        {/* Help Bubble text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
          className="hidden sm:flex items-center gap-1.5 bg-[#0a0a0a]/90 backdrop-blur-md border border-emerald-500/30 text-white py-2 px-4 rounded-full text-xs font-medium shadow-2xl shadow-emerald-500/5 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Dúvidas? Fale Connosco</span>
        </motion.div>

        {/* Real WhatsApp Button with brand color */}
        <motion.a
          href="https://wa.me/258847404158?text=Olá! Gostaria de saber mais sobre o DroopFlow, vim da Landing Page."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-colors duration-300 group cursor-pointer"
          title="Falar no WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping scale-110 pointer-events-none" />

          {/* Official WhatsApp SVG Logo */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-white drop-shadow-md"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.024-5.123-2.887-6.989C16.484 1.888 14.004 1.03 11.4 1.03c-5.44 0-9.866 4.414-9.868 9.866-.001 1.702.451 3.361 1.309 4.814L1.751 21.05l5.525-1.449-.629-.447zM17.41 14.33c-.318-.16-1.882-.93-2.172-1.036-.29-.107-.5-.16-.71.16-.21.32-.81.103-.993.318s-.363.21-.681.05c-.318-.16-1.343-.495-2.558-1.579-.945-.844-1.583-1.886-1.768-2.204-.185-.318-.02-.49.139-.648.143-.142.318-.371.477-.557.16-.186.213-.318.318-.53.106-.213.053-.4-.027-.557-.08-.16-.71-1.714-.972-2.344-.256-.615-.517-.531-.71-.541-.183-.01-.393-.012-.602-.012s-.549.078-.836.393c-.287.318-1.099 1.075-1.099 2.622 0 1.547 1.129 3.038 1.286 3.25.158.213 2.222 3.393 5.385 4.757.753.324 1.341.518 1.8.662.756.24 1.444.207 1.989.126.607-.09 1.882-.77 2.144-1.474.262-.705.262-1.31.183-1.438-.078-.128-.29-.21-.607-.37z"/>
          </svg>
        </motion.a>
      </motion.div>

    </div>
  );
}
