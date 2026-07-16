import React, { useState } from "react";
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  Layers, 
  ShoppingBag, 
  Megaphone, 
  Target, 
  Settings, 
  HelpCircle, 
  Plus, 
  Minus, 
  Search, 
  Trash2, 
  Eye, 
  MapPin, 
  RotateCcw, 
  Clock, 
  X, 
  Check, 
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Interface for simulated sales
interface Sale {
  id: string;
  date: string;
  product: string;
  paymentMethod: string;
  value: number;
  margin: number;
  breakdown: {
    luc: number;
    ads: number;
    for: number;
    del: number;
  };
  status: "Entregue" | "Pendente";
  zone?: string;
}

export default function InteractiveAppMockup() {
  const [activeTab, setActiveTab] = useState<"painel" | "roi" | "vendas" | "pockets" | "campanhas" | "metas" | "custos">("painel");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const currency = "MT";
  
  // Simulated stats state
  const [salesList, setSalesList] = useState<Sale[]>([
    {
      id: "7a9713ab",
      date: "2026-07-14",
      product: "Compressor de Ar Digital",
      paymentMethod: "M-Pesa",
      value: 999,
      margin: 899,
      breakdown: { luc: 349, ads: 300, for: 100, del: 250 },
      status: "Entregue"
    },
    {
      id: "588c3b85",
      date: "2026-07-14",
      product: "Compressor de Ar Digital",
      paymentMethod: "e-Mola",
      value: 699,
      margin: 599,
      breakdown: { luc: 49, ads: 300, for: 100, del: 250 },
      status: "Entregue",
      zone: "Beira"
    },
    {
      id: "351faf03",
      date: "2026-07-14",
      product: "Compressor de Ar Digital",
      paymentMethod: "M-Pesa",
      value: 999,
      margin: 899,
      breakdown: { luc: 267.37, ads: 47.18, for: 100, del: 200 },
      status: "Entregue"
    },
    {
      id: "5501a704",
      date: "2026-07-13",
      product: "Organizador de Maquilhagem Giratório",
      paymentMethod: "M-Pesa",
      value: 3000,
      margin: 2550,
      breakdown: { luc: 864, ads: 216, for: 450, del: 150 },
      status: "Entregue"
    },
    {
      id: "6b6e6bf3",
      date: "2026-07-13",
      product: "Organizador de Maquilhagem Giratório",
      paymentMethod: "M-Pesa",
      value: 1800,
      margin: 1530,
      breakdown: { luc: 403.2, ads: 172.8, for: 270, del: 250 },
      status: "Entregue"
    }
  ]);

  // Form state to add new sales interactively!
  const [newProduct, setNewProduct] = useState("Compressor de Ar Digital");
  const [newValue, setNewValue] = useState("1200");
  const [newPayment, setNewPayment] = useState("M-Pesa");
  const [showAddModal, setShowAddModal] = useState(false);

  // Celebration & Confetti state
  const [celebrations, setCelebrations] = useState<any[]>([]);
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);
  const [lastAddedSale, setLastAddedSale] = useState<any>(null);

  // New detailed state variables to support screenshot features!
  const [selectedZone, setSelectedZone] = useState("Maputo Cidade");
  const [newSaleNotes, setNewSaleNotes] = useState("");
  const [newSaleDate, setNewSaleDate] = useState("2026-07-16");
  const [productList, setProductList] = useState([
    "Compressor de Ar Digital",
    "Organizador de Maquilhagem Giratório",
    "Desentupidor profissional",
    "Kit de Limpeza Automotivo"
  ]);
  const [zonesList, setZonesList] = useState([
    "Maputo Cidade",
    "Maputo Província (Matola)",
    "Beira / Sofala",
    "Nampula",
    "Zambézia (Quelimane)",
    "Gaza (Xai-Xai)",
    "Tete"
  ]);
  const [quickProductInput, setQuickProductInput] = useState("");
  const [quickZoneInput, setQuickZoneInput] = useState("");
  const [showQuickProductForm, setShowQuickProductForm] = useState(false);
  const [showQuickZoneForm, setShowQuickZoneForm] = useState(false);

  // Form state to add new outflows interactively!
  const [showOutflowModal, setShowOutflowModal] = useState(false);
  const [outflowValue, setOutflowValue] = useState("200");
  const [outflowPocket, setOutflowPocket] = useState("Anúncios");
  const [outflowCategory, setOutflowCategory] = useState("Anúncios (Facebook Ads/Google Ads)");
  const [outflowDescription, setOutflowDescription] = useState("");
  const [outflowDate, setOutflowDate] = useState("2026-07-15");
  const [outflowList, setOutflowList] = useState<any[]>([
    { name: "Wifi Semanal", category: "Wifi", value: 1800, date: "2026-07-14", pocket: "Wifi" }
  ]);

  const addOutflow = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(outflowValue) || 0;
    const newOutflow = {
      name: outflowDescription || outflowCategory,
      category: outflowCategory,
      value: val,
      date: outflowDate,
      pocket: outflowPocket
    };
    setOutflowList([newOutflow, ...outflowList]);
    setShowOutflowModal(false);
  };

  const addSale = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newValue) || 0;
    
    // Exact proportional calculations as described in the screenshot:
    // Fornecedor (Custo de Produto) = 15% of total
    const forCost = Math.round(val * 0.15);
    // Delivery (Entrega) based on selected zone
    let delCost = 200;
    if (selectedZone === "Maputo Cidade") delCost = 150;
    else if (selectedZone === "Maputo Província (Matola)") delCost = 250;
    else if (selectedZone === "Beira / Sofala") delCost = 350;
    else if (selectedZone === "Nampula") delCost = 300;
    else if (selectedZone === "Zambézia (Quelimane)") delCost = 350;
    else if (selectedZone === "Gaza (Xai-Xai)") delCost = 250;
    else if (selectedZone === "Tete") delCost = 400;

    const margemLiquidaRestante = Math.max(0, val - forCost - delCost);
    // 20% to Ads pocket, 80% to Lucro pocket
    const adsCost = Math.round(margemLiquidaRestante * 0.20);
    const lucVal = margemLiquidaRestante - adsCost;

    const newSaleItem: Sale = {
      id: Math.random().toString(36).substring(2, 10),
      date: newSaleDate,
      product: newProduct,
      paymentMethod: newPayment,
      value: val,
      margin: Math.round(margemLiquidaRestante),
      breakdown: {
        luc: parseFloat(lucVal.toFixed(2)),
        ads: adsCost,
        for: forCost,
        del: delCost
      },
      status: "Entregue",
      zone: selectedZone
    };

    setSalesList([newSaleItem, ...salesList]);
    setShowAddModal(false);
    
    // Save last added sale for celebration modal details
    setLastAddedSale({
      product: newProduct,
      value: val,
      luc: lucVal,
      ads: adsCost,
      for: forCost,
      del: delCost
    });

    // Generate physical confetti celebration particles
    const colors = ["#25D366", "#10B981", "#34D399", "#fbbf24", "#f59e0b", "#6366f1", "#f43f5e", "#38bdf8", "#ec4899"];
    const shapes = ["circle", "square", "triangle"];
    const particles = Array.from({ length: 80 }).map((_, i) => {
      // Starts around the bottom area of the application viewport
      const startX = Math.random() * 100; // 0% to 100% of container width
      const startY = 100; // bottom edge
      
      return {
        id: `${Math.random()}-${i}`,
        startX,
        startY,
        // Shoots left or right depending on starting side, and climbs upwards with high initial velocity
        tx: (Math.random() - 0.5) * 450 + (startX > 50 ? -80 : 80),
        ty: -250 - Math.random() * 320,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6, // 6px to 14px
        delay: Math.random() * 0.25, // staggered entrance
        rotate: Math.random() * 360,
        rotateSpeed: Math.random() * 900 - 450,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      };
    });

    setCelebrations(particles);
    setShowCelebrationBadge(true);

    // Auto-dismiss the celebration details card after 4.5 seconds
    const badgeTimeout = setTimeout(() => {
      setShowCelebrationBadge(false);
    }, 4500);

    // Clean particles from DOM after 5.5 seconds to free browser threads
    const particlesTimeout = setTimeout(() => {
      setCelebrations([]);
    }, 5500);
    
    // Reset secondary fields
    setNewSaleNotes("");
  };

  // Live dynamic calculations for the Registar Venda form preview
  const currentVal = parseFloat(newValue) || 0;
  const previewFornecedor = Math.round(currentVal * 0.15);
  let previewDelivery = 200;
  if (selectedZone === "Maputo Cidade") previewDelivery = 150;
  else if (selectedZone === "Maputo Província (Matola)") previewDelivery = 250;
  else if (selectedZone === "Beira / Sofala") previewDelivery = 350;
  else if (selectedZone === "Nampula") previewDelivery = 300;
  else if (selectedZone === "Zambézia (Quelimane)") previewDelivery = 350;
  else if (selectedZone === "Gaza (Xai-Xai)") previewDelivery = 250;
  else if (selectedZone === "Tete") previewDelivery = 400;

  const previewRestante = Math.max(0, currentVal - previewFornecedor - previewDelivery);
  const previewAds = Math.round(previewRestante * 0.20);
  const previewLucro = previewRestante - previewAds;

  // Calculations based on list
  const totalBilling = salesList.reduce((sum, item) => sum + item.value, 18730); // Base cumulative offset
  const todayBilling = salesList.filter(s => s.date === "2026-07-14" || s.date === new Date().toISOString().split('T')[0]).reduce((sum, item) => sum + item.value, 0) + 4002;
  const totalSalesCount = salesList.length + 16; // Base sales offset
  const averageTicket = Math.round(totalBilling / totalSalesCount);

  return (
    <div id="interactive-demo" className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Top Simulated App Header bar */}
      <div className="bg-[#0e0e0e] border-b border-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white tracking-tight uppercase">Droop<span className="text-emerald-400">Flow</span></span>
            <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">DEMO INTERATIVA</span>
          </div>
        </div>

        {/* Currency Indicator */}
        <div className="flex items-center gap-2 bg-[#050505] px-3.5 py-1.5 rounded-xl border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-gray-300">Moeda: MT (Metical)</span>
        </div>
      </div>

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row min-h-[620px]">
        
        {/* Sidebar Simulator */}
        <div className="w-full lg:w-64 bg-[#0a0a0a] border-r border-white/5 p-4 flex flex-col justify-between gap-6 shrink-0">
          <div className="space-y-6">
            <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase px-2">PAINEL DO USUÁRIO</div>
            
            <nav className="space-y-1.5">
              {[
                { id: "painel", label: "Painel Geral", icon: TrendingUp },
                { id: "roi", label: "Retorno Real & ROI", icon: Calendar },
                { id: "pockets", label: "Pockets & Caixinhas", icon: Wallet },
                { id: "vendas", label: "Lista de Vendas", icon: ShoppingBag },
                { id: "campanhas", label: "Tráfego & Campanhas", icon: Megaphone },
                { id: "metas", label: "Metas de Vendas", icon: Target },
                { id: "custos", label: "Zonas & Recorrentes", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive 
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/15" 
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-emerald-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-400 font-bold">CONEXÃO SEGURA</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">Simulação sincronizada com os gateways Shopify, M-Pesa e Facebook Ads.</p>
            <button 
              onClick={() => setShowAddModal(true)} 
              className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 hover:border-transparent rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Venda Teste
            </button>
          </div>
        </div>

        {/* Content Panel Simulator */}
        <div className="flex-1 bg-[#0b0f19] p-6 lg:p-8 overflow-y-auto">
          
          <AnimatePresence mode="wait">
            {activeTab === "painel" && (
              <motion.div
                key="painel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Greeting Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/40 pb-5">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">Olá, Shelton Sam!</h3>
                    <p className="text-sm text-slate-400">Plano <span className="text-emerald-400 font-semibold">DroopFlow Pro</span> Ativo • Dashboard Consolidado</p>
                  </div>
                  <button 
                    onClick={() => setShowHistoryModal(true)}
                    className="flex items-center gap-2 bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    <Clock className="w-4 h-4" /> Ver Histórico Geral (Acumulado)
                  </button>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Faturamento Diário */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> DIÁRIO
                    </div>
                    <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">FATURAMENTO DIÁRIO</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-display font-extrabold text-white">
                        {todayBilling.toLocaleString("pt-PT")}
                      </span>
                      <span className="text-emerald-500 font-mono font-bold text-sm">{currency}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between text-xs">
                      <div>
                        <span className="text-slate-500">VENDAS HOJE</span>
                        <p className="text-white font-mono font-bold mt-0.5">{salesList.length}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500">BALANÇO ESTIMADO</span>
                        <p className="text-emerald-400 font-mono font-bold mt-0.5">+{Math.round(todayBilling * 0.68).toLocaleString("pt-PT")} {currency}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => setShowHistoryModal(true)}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-medium flex items-center gap-1 transition-all"
                      >
                        Vendas registradas. <span className="underline font-semibold">Clique para ver histórico completo.</span>
                      </button>
                    </div>
                  </div>

                  {/* Saldo Total Disponível */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                    <div className="absolute top-4 right-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                      BALANÇO
                    </div>
                    <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">SALDO DISPONÍVEL (COFRES)</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-display font-extrabold text-white">13.689,39</span>
                      <span className="text-emerald-500 font-mono font-bold text-sm">{currency}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between text-xs">
                      <div>
                        <span className="text-slate-500">CAIXINHAS ATIVAS</span>
                        <p className="text-white font-mono font-bold mt-0.5">9 caixas</p>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500">MÉDIA POR CAIXA</span>
                        <p className="text-emerald-400 font-mono font-bold mt-0.5">1.521 {currency}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => setActiveTab("pockets")}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-medium flex items-center gap-1 transition-all"
                      >
                        Soma total em caixa. <span className="underline font-semibold">Clique para gerir as caixinhas.</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions buttons row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowAddModal(true)} 
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:scale-[1.01]"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" /> Adicionar Venda
                  </button>
                  <button 
                    onClick={() => setShowOutflowModal(true)} 
                    className="flex items-center justify-center gap-2 bg-transparent hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all"
                  >
                    <Minus className="w-5 h-5 text-rose-500 stroke-[2.5]" /> Registar Saída
                  </button>
                </div>

                {/* Net Profit Trend Block */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" /> Tendência de Lucro Líquido
                      </h4>
                      <p className="text-xs text-slate-400">Evolução dos lucros líquidos nos últimos 30 dias</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold">Últimos 30 dias</span>
                  </div>
                  
                  {/* Visual Chart Bars Representation */}
                  <div className="h-44 flex items-end justify-between gap-1 md:gap-3 pt-6 border-b border-slate-800 font-mono">
                    {[35, 45, 20, 60, 55, 75, 40, 95, 65, 80, 70, 110, 90, 120, 140].map((height, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full relative rounded-t-md overflow-hidden bg-slate-800 h-32 flex items-end">
                          <div 
                            className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md group-hover:from-emerald-500 group-hover:to-teal-300 transition-all cursor-pointer" 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] text-slate-500">{9 + idx}/07</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "roi" && (
              <motion.div
                key="roi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800/40 pb-5">
                  <h3 className="text-2xl font-display font-black text-white flex items-center gap-2">
                    Controlo Periódico <Info className="w-4 h-4 text-slate-500 cursor-help" />
                  </h3>
                  <p className="text-sm text-slate-400">Exibindo Métricas da Semana do Carrossel (<span className="text-emerald-400 font-semibold">9 de Julho a Hoje</span>)</p>
                </div>

                {/* Week days selector carousel */}
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                  <button className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex-1 grid grid-cols-7 gap-2 text-center text-xs">
                    {[
                      { day: "QUI 9", active: false, dots: "redgreen" },
                      { day: "SEX 10", active: false, dots: "redgreen" },
                      { day: "SÁB 11", active: false, dots: "redgreen" },
                      { day: "DOM 12", active: false, dots: "green" },
                      { day: "SEG 13", active: false, dots: "redgreen" },
                      { day: "TER 14", active: true, dots: "green" },
                      { day: "QUA 15", active: false, dots: "none" },
                    ].map((d, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                          d.active 
                            ? "bg-emerald-500 text-slate-950 font-bold shadow-lg" 
                            : "bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-900"
                        }`}
                      >
                        <div>{d.day}</div>
                        <div className="flex justify-center gap-1 mt-1">
                          {d.dots.includes("green") && <span className={`w-1.5 h-1.5 rounded-full ${d.active ? "bg-slate-950" : "bg-emerald-500"}`}></span>}
                          {d.dots.includes("red") && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Periodic Stats (Vendido, Gastos, Balanço) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Vendido</span>
                    <h4 className="text-2xl font-display font-extrabold text-white mt-1">19.036 {currency}</h4>
                    <span className="text-xs text-slate-400 block mt-1">14 vendas</span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md mt-2 inline-block">↑ 165% vs ontem</span>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Gastos</span>
                    <h4 className="text-2xl font-display font-extrabold text-rose-500 mt-1">12.241 {currency}</h4>
                    <span className="text-xs text-slate-400 block mt-1">7 saídas</span>
                    <span className="text-xs text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-md mt-2 inline-block">↑ 107% vs ontem</span>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Balanço</span>
                    <h4 className="text-2xl font-display font-extrabold text-emerald-400 mt-1">+6.795 {currency}</h4>
                    <span className="text-xs text-slate-400 block mt-1">fluxo de caixa</span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md mt-2 inline-block">Superávit</span>
                  </div>
                </div>

                {/* ROI Real Card */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-6 pb-6 border-b border-slate-800/60">
                    <div>
                      <h4 className="text-lg font-display font-extrabold text-white">Análise de Retorno Real (ROI)</h4>
                      <p className="text-xs text-slate-400">Verdadeiro retorno ponderando todos os custos diretos da operação</p>
                    </div>
                    <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">PROPORCIONAL AOS CUSTOS</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    <div className="text-center lg:text-left">
                      <span className="text-xs text-slate-500">ROI PROPORCIONAL</span>
                      <h5 className="text-4xl font-display font-black text-emerald-500 mt-1">+158%</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">Fórmula: (Vendas - Custos de Venda) / Custos de Venda</p>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 text-xs block">CUSTO PRODUTO</span>
                        <span className="text-lg font-mono font-bold text-white mt-1 block">2.570 {currency}</span>
                      </div>
                      
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 text-xs block">CUSTO ENTREGA</span>
                        <span className="text-lg font-mono font-bold text-white mt-1 block">2.800 {currency}</span>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 text-xs block">CUSTO ANÚNCIOS</span>
                        <span className="text-lg font-mono font-bold text-white mt-1 block">2.011,78 {currency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "vendas" && (
              <motion.div
                key="vendas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/40 pb-5">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">Lista de Vendas</h3>
                    <p className="text-sm text-slate-400">Verificação granular de produtos, formas de pagamento e caixinhas</p>
                  </div>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Registar Nova Venda
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 w-full max-w-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar vendas..." 
                      className="bg-transparent border-none text-xs text-white focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex gap-1.5 text-xs">
                    {["Tudo", "Hoje", "Últimos 7 dias", "Últimos 30 dias"].map((f, i) => (
                      <button key={i} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${i === 0 ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sales Table Representation */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/70 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                        <th className="p-4">DATA</th>
                        <th className="p-4">PRODUTO</th>
                        <th className="p-4">FORMA PAG.</th>
                        <th className="p-4 text-right">VALOR</th>
                        <th className="p-4 text-right text-emerald-400">MARGEM</th>
                        <th className="p-4">BREAKDOWN (CAIXINHAS)</th>
                        <th className="p-4">STATUS</th>
                        <th className="p-4 text-center">AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {salesList.map((sale) => (
                        <tr key={sale.id} className="hover:bg-slate-900/40 transition-all">
                          <td className="p-4 font-mono text-slate-400 whitespace-nowrap">{sale.date}</td>
                          <td className="p-4">
                            <span className="font-bold text-white block">{sale.product}</span>
                            {sale.zone && <span className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-0.5"><MapPin className="w-3 h-3 text-indigo-400" /> {sale.zone}</span>}
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-lg font-mono text-[11px] font-semibold">{sale.paymentMethod}</span>
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-white whitespace-nowrap">{sale.value.toLocaleString("pt-PT")} {currency}</td>
                          <td className="p-4 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">{sale.margin.toLocaleString("pt-PT")} {currency}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 font-mono text-[9px] font-bold">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Luc: {sale.breakdown.luc}</span>
                              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">Ads: {sale.breakdown.ads}</span>
                              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">For: {sale.breakdown.for}</span>
                              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded">Del: {sale.breakdown.del}</span>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                              <Check className="w-3 h-3 text-emerald-400" /> {sale.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => {
                                setSalesList(salesList.filter(s => s.id !== sale.id));
                              }}
                              className="text-slate-500 hover:text-rose-500 transition-all p-1"
                              title="Remover venda (Simulação)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "pockets" && (
              <motion.div
                key="pockets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800/40 pb-5">
                  <h3 className="text-2xl font-display font-black text-white">As Minhas Caixinhas (Pockets)</h3>
                  <p className="text-sm text-slate-400">Distribuição automática de faturamento bruto em cofres financeiros protegidos</p>
                </div>

                {/* Monthly summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">FATURAMENTO MENSAL ACUMULADO</span>
                    <h4 className="text-2xl font-display font-extrabold text-white mt-1">26.226 {currency}</h4>
                    <div className="mt-3 text-xs flex justify-between">
                      <span className="text-slate-400">Vendas Registadas: <b className="text-white font-mono">21</b></span>
                      <span className="text-rose-400">Gastos do Mês: <b className="font-mono">18.160 {currency}</b></span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">INDICADORES AUXILIARES</span>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">TICKET MÉDIO</span>
                        <span className="text-xs font-mono font-bold text-white">1.249 {currency}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">BALANÇO LÍQUIDO</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">8.066 {currency}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">ROI MENSAL EST.</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">+44%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Pockets Grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cofres Inteligentes Ativos</h4>
                    <span className="text-xs text-emerald-400 font-semibold underline cursor-pointer">Ver todas as 9 caixinhas</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Renda", value: "1.886,26", type: "aluguer", border: "border-slate-800" },
                      { name: "Diarista", value: "628,75", type: "outros", border: "border-slate-800" },
                      { name: "Shopify", value: "565,88", type: "plataforma", border: "border-slate-800" },
                      { name: "Anúncios", value: "362,03", type: "trafego", border: "border-indigo-500/50 bg-indigo-950/20", icon: Megaphone },
                    ].map((box, i) => (
                      <div key={i} className={`p-5 rounded-2xl border ${box.border} transition-all hover:scale-[1.02] flex flex-col justify-between min-h-[140px]`}>
                        <div className="flex justify-between items-start">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                            {box.icon ? <box.icon className="w-4 h-4 text-indigo-400" /> : <Wallet className="w-4 h-4 text-emerald-400" />}
                          </div>
                          <span className="text-[9px] bg-slate-900 px-2 py-0.5 rounded-full font-mono text-slate-500 uppercase tracking-wider">{box.type}</span>
                        </div>
                        
                        <div className="mt-4">
                          <span className="text-xs text-slate-500 block">{box.name}</span>
                          <span className="text-lg font-mono font-black text-white mt-1 block">{box.value} <span className="text-emerald-400 text-xs">{currency}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "campanhas" && (
              <motion.div
                key="campanhas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800/40 pb-5">
                  <h3 className="text-2xl font-display font-black text-white">Campanhas de Anúncios</h3>
                  <p className="text-sm text-slate-400">Otimização de ROI real com desconto automático do custo de tráfego pago</p>
                </div>

                {/* Ads Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Orçamento Total</span>
                    <h5 className="text-xl font-display font-black text-white mt-1">12 {currency}</h5>
                    <span className="text-[10px] text-indigo-400 font-mono">$12 USD</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Gasto Realizado</span>
                    <h5 className="text-xl font-display font-black text-rose-500 mt-1">7.998 {currency}</h5>
                    <span className="text-[10px] text-rose-400 font-mono">$7 USD</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Retorno Vendas</span>
                    <h5 className="text-xl font-display font-black text-emerald-400 mt-1">+47.799 {currency}</h5>
                    <span className="text-[10px] text-emerald-400 font-mono">+$60 USD</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">ROAS Geral</span>
                    <h5 className="text-xl font-display font-black text-emerald-400 mt-1">6.11x</h5>
                    <span className="text-[10px] text-slate-500">CPA Médio: 615,2</span>
                  </div>
                </div>

                {/* Info Tip */}
                <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl flex items-center gap-3 text-xs text-indigo-300">
                  <Info className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                  <span>Use estas métricas para otimizar os canais de tráfego pago no fim do dia! Filtro por Plataforma: <b>Todas</b></span>
                </div>

                {/* Campaigns Table */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/70 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="p-4">CAMPANHA</th>
                        <th className="p-4">PLATAFORMA</th>
                        <th className="p-4 text-right">ORÇAMENTO / GASTO</th>
                        <th className="p-4 text-right">RETORNO VENDAS</th>
                        <th className="p-4">CONVERSÕES (CLIQUES)</th>
                        <th className="p-4 text-right text-emerald-400">LUCRO LÍQUIDO</th>
                        <th className="p-4 text-right">ROAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      <tr className="hover:bg-slate-900/30 transition-all">
                        <td className="p-4 font-bold text-white">teste de novos criativos ugc</td>
                        <td className="p-4"><span className="text-slate-300 font-medium">Facebook Ads</span></td>
                        <td className="p-4 text-right font-mono font-bold text-rose-400">7.998 {currency}</td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-400">+47.799 {currency}</td>
                        <td className="p-4 font-mono text-slate-400">0 Cliques (11 conv.)</td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-400">+39.801 {currency}</td>
                        <td className="p-4 text-right font-mono font-black text-white">5.98x</td>
                      </tr>
                      <tr className="hover:bg-slate-900/30 transition-all">
                        <td className="p-4 font-bold text-white">Compressor de Ar Digital, Organizador Giratório</td>
                        <td className="p-4"><span className="text-slate-300 font-medium">Facebook Ads</span></td>
                        <td className="p-4 text-right font-mono font-bold text-rose-400">2 $</td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-400">+60 $</td>
                        <td className="p-4 font-mono text-slate-400">10 Cliques (2 conv.)</td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-400">+58 $</td>
                        <td className="p-4 text-right font-mono font-black text-white">30.00x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "metas" && (
              <motion.div
                key="metas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800/40 pb-5">
                  <h3 className="text-2xl font-display font-black text-white">Controle de Metas</h3>
                  <p className="text-sm text-slate-400">Defina seus objetivos de vendas personalizados, escolha o período e acompanhe o progresso</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Meta Diária */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                          <Target className="w-5 h-5 text-indigo-400" />
                        </span>
                        <span className="text-[10px] bg-slate-950 text-indigo-400 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase">Ativa 📈</span>
                      </div>
                      <h4 className="font-bold text-white text-base">Meta Diária</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Progresso em Tempo Real</p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">PERÍODO: Hoje</span>
                        <span className="text-white font-bold">ALVO: 5.999 {currency}</span>
                      </div>
                      
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                        <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: "0%" }}></div>
                      </div>

                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">0% alcançado</span>
                        <span className="text-rose-400 font-bold">Faltam 5.999 {currency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta Semanal */}
                  <div className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-emerald-400" />
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase">BATIDA! 🎉</span>
                      </div>
                      <h4 className="font-bold text-white text-base">Meta Semanal</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Objetivo de Médio Prazo</p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">PERÍODO: 2 semanas</span>
                        <span className="text-white font-bold">ALVO: 18.000 {currency}</span>
                      </div>
                      
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: "100%" }}></div>
                      </div>

                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-emerald-400 font-bold">100% alcançado</span>
                        <span className="text-emerald-400 font-bold">Meta superada!</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta Mensal */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[250px]">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                          <Target className="w-5 h-5 text-purple-400" />
                        </span>
                        <span className="text-[10px] bg-slate-950 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase">Ativa 📈</span>
                      </div>
                      <h4 className="font-bold text-white text-base">Meta Mensal</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Faturamento e Escala</p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">PERÍODO: Este mês</span>
                        <span className="text-white font-bold">ALVO: 100.000 {currency}</span>
                      </div>
                      
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                        <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: "26%" }}></div>
                      </div>

                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">26% alcançado</span>
                        <span className="text-purple-400 font-bold">Faltam 73.774 {currency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "custos" && (
              <motion.div
                key="custos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800/40 pb-5">
                  <h3 className="text-2xl font-display font-black text-white">Custos Faturamento & Zonas</h3>
                  <p className="text-sm text-slate-400">Ajuste de frete por zona geográfica e provisionamento de saídas recorrentes</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Delivery Zones */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">Custos de Entrega / Envio</h4>
                      <span className="text-xs text-emerald-400 font-bold">+ Nova Zona</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "Cidade de Maputo", cost: "150 MT" },
                        { name: "Matola / Marracuene", cost: "300 MT" },
                        { name: "Fora da cidade", cost: "250 MT" },
                        { name: "Ao redor da cidade", cost: "200 MT" },
                      ].map((zone, i) => (
                        <div key={i} className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950 border border-slate-800/60 hover:border-slate-800 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-indigo-400" />
                            </span>
                            <div>
                              <span className="font-bold text-xs text-white block">{zone.name}</span>
                              <span className="text-[10px] text-slate-500">Dedução garantida para caixinha Delivery</span>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-black text-white">{zone.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recurring Outputs */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">Saídas e Custos Recorrentes</h4>
                      <span className="text-xs text-emerald-400 font-bold">+ Programar Saída</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "Renda", cost: "- 8.900 MT", day: "Dia 26 de cada mês", pocket: "Renda" },
                        { name: "Wifi", cost: "- 1.800 MT", day: "Dia 18 de cada mês", pocket: "Wifi" },
                        { name: "Credelec", cost: "- 200 MT", day: "Toda Sexta-feira", pocket: "Contas da Casa" },
                      ].map((outflow, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/60 hover:border-slate-800 transition-all space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                                <RotateCcw className="w-4 h-4 text-rose-400" />
                              </span>
                              <div>
                                <span className="font-bold text-xs text-white block">{outflow.name}</span>
                                <span className="text-[10px] text-slate-500">{outflow.day}</span>
                              </div>
                            </div>
                            <span className="font-mono text-sm font-black text-rose-500">{outflow.cost}</span>
                          </div>
                          
                          <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg text-[10px] border border-slate-800/40">
                            <span className="text-slate-400">Descontar de: <b className="text-indigo-400 font-semibold">{outflow.pocket}</b></span>
                            <button 
                              onClick={() => alert(`Dedução de ${outflow.cost} simulada na caixinha ${outflow.pocket}!`)}
                              className="text-emerald-400 font-bold hover:underline"
                            >
                              $ Pagar Agora
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* MODAL 1: Cumulative Billing History Modal (Screenshot 1) */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </span>
                  <div>
                    <h4 className="text-lg font-display font-black text-white">Histórico de Faturamento Acumulado</h4>
                    <p className="text-xs text-slate-400">Análise consolidada de faturamento e fluxo de vendas de todo o tempo</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Stats row in Modal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">FATURAMENTO TOTAL</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-mono font-black text-emerald-400">{totalBilling.toLocaleString("pt-PT")}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{currency}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">TOTAL DE VENDAS</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-mono font-black text-white">{totalSalesCount}</span>
                      <span className="text-slate-400 font-mono text-[10px]">vendas</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">TICKET MÉDIO GERAL</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-mono font-black text-white">{averageTicket.toLocaleString("pt-PT")}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{currency}</span>
                    </div>
                  </div>
                </div>

                {/* List inside Modal */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider">Lista de Todas as Vendas Registadas</span>
                    <span className="text-slate-500 font-mono">{totalSalesCount} no total</span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {salesList.map((sale) => (
                      <div key={sale.id} className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950 border border-slate-800/60 hover:border-slate-800 transition-all text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          </span>
                          <div>
                            <span className="font-bold text-white block">{sale.product}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{sale.date} • ID: {sale.id}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-400 block">+{sale.value.toLocaleString("pt-PT")} {currency}</span>
                          <span className="text-[10px] text-rose-400 font-mono">Desconto: -250 {currency}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add extra mock list rows from screenshot 1 */}
                    <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950 border border-slate-800/60 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </span>
                        <div>
                          <span className="font-bold text-white block">Organizador de Maquilhagem <b className="text-emerald-400 text-[10px] ml-1">5x</b></span>
                          <span className="text-[10px] text-slate-500 font-mono">12 de Julho • ID: 7a9713ab</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400 block">+3.000 {currency}</span>
                        <span className="text-[10px] text-rose-400 font-mono">Desconto: -750 {currency}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950 border border-slate-800/60 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </span>
                        <div>
                          <span className="font-bold text-white block">Desentupidor profissional</span>
                          <span className="text-[10px] text-slate-500 font-mono">10 de Julho • ID: 5501a704</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400 block">+647 {currency}</span>
                        <span className="text-[10px] text-rose-400 font-mono">Desconto: -50 {currency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={() => setShowHistoryModal(false)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all w-full md:w-auto text-center"
                  >
                    Fechar Histórico
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Interactive ADD Sale modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0f19] border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl my-auto"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-display font-black text-white text-base">Registar Nova venda</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Distribuição automática de fundos</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={addSale} className="p-5 space-y-4 text-xs text-left max-h-[75vh] overflow-y-auto">
                
                {/* 1. Valor Recebido (Total Pago) */}
                <div className="space-y-1 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Valor Recebido (Total Pago)</label>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">MT</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-white font-mono font-black text-xl focus:outline-none focus:border-emerald-500/80 transition-all"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs pointer-events-none">
                      Metical
                    </div>
                  </div>
                </div>

                {/* 2. Produto Vendido */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Produto Vendido</label>
                    <button 
                      type="button" 
                      onClick={() => setShowQuickProductForm(!showQuickProductForm)}
                      className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-all"
                    >
                      + Criar Produto Rápido
                    </button>
                  </div>

                  <AnimatePresence>
                    {showQuickProductForm && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 overflow-hidden"
                      >
                        <span className="text-[10px] text-slate-400 font-semibold block">Nome do Novo Produto</span>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={quickProductInput}
                            onChange={(e) => setQuickProductInput(e.target.value)}
                            placeholder="Ex: Mini Compressor Pro"
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              if (quickProductInput.trim()) {
                                setProductList([...productList, quickProductInput.trim()]);
                                setNewProduct(quickProductInput.trim());
                                setQuickProductInput("");
                                setShowQuickProductForm(false);
                              }
                            }}
                            className="bg-emerald-500 text-slate-950 px-3 rounded-lg font-bold hover:bg-emerald-400 transition-all text-[11px]"
                          >
                            Adicionar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <select 
                    value={newProduct} 
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-emerald-500 transition-all"
                  >
                    {productList.map((prod, idx) => (
                      <option key={idx} value={prod}>{prod}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Zona de Entrega / Envio */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Zona de Entrega / Envio</label>
                    <button 
                      type="button" 
                      onClick={() => setShowQuickZoneForm(!showQuickZoneForm)}
                      className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-all"
                    >
                      + Nova Zona Rápida
                    </button>
                  </div>

                  <AnimatePresence>
                    {showQuickZoneForm && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 overflow-hidden"
                      >
                        <span className="text-[10px] text-slate-400 font-semibold block">Nome da Nova Região / Província</span>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={quickZoneInput}
                            onChange={(e) => setQuickZoneInput(e.target.value)}
                            placeholder="Ex: Cabo Delgado (Pemba)"
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              if (quickZoneInput.trim()) {
                                setZonesList([...zonesList, quickZoneInput.trim()]);
                                setSelectedZone(quickZoneInput.trim());
                                setQuickZoneInput("");
                                setShowQuickZoneForm(false);
                              }
                            }}
                            className="bg-emerald-500 text-slate-950 px-3 rounded-lg font-bold hover:bg-emerald-400 transition-all text-[11px]"
                          >
                            Adicionar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <select 
                    value={selectedZone} 
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-emerald-500 transition-all"
                  >
                    {zonesList.map((zone, idx) => (
                      <option key={idx} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Pagamento e Data da Venda */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Pagamento</label>
                    <select 
                      value={newPayment} 
                      onChange={(e) => setNewPayment(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-emerald-500 transition-all"
                    >
                      <option value="M-Pesa">M-Pesa</option>
                      <option value="e-Mola">e-Mola</option>
                      <option value="Shopify Gateway">Shopify Gateway</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Data da Venda</label>
                    <input 
                      type="date" 
                      value={newSaleDate}
                      onChange={(e) => setNewSaleDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium font-mono focus:outline-none focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 5. Notas / Observações */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Notas / Observação (Opcional)</label>
                  <input 
                    type="text" 
                    value={newSaleNotes}
                    onChange={(e) => setNewSaleNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                    placeholder="Ex: Cliente pediu entrega à tarde"
                  />
                </div>

                {/* 6. Resumo da Distribuição (Screenshot dynamic feedback!) */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3.5">
                  <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                    <span className="text-[11px] font-bold text-white tracking-wide uppercase">Resumo da Distribuição</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">Pockets de destino</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-2">
                        <span>📦</span> Resgate Fornecedor (Custo):
                      </span>
                      <span className="font-mono font-bold text-amber-400">+{previewFornecedor.toLocaleString()} MT</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-2">
                        <span>🚚</span> Resgate Delivery (Entrega):
                      </span>
                      <span className="font-mono font-bold text-indigo-400">+{previewDelivery.toLocaleString()} MT</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-800/50 pt-2.5">
                      <span className="font-bold text-white text-xs uppercase">Margem Líquida Restante:</span>
                      <span className="font-mono font-black text-emerald-400 text-sm">+{previewRestante.toLocaleString()} MT</span>
                    </div>
                  </div>

                  {/* Sub distribution grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-left">
                      <div className="text-[9px] text-slate-500 font-bold uppercase">📢 Anúncios (20%)</div>
                      <div className="font-mono font-bold text-xs text-white mt-1">+{previewAds.toLocaleString()} MT</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-left">
                      <div className="text-[9px] text-slate-500 font-bold uppercase">💰 Lucro (80%)</div>
                      <div className="font-mono font-bold text-xs text-white mt-1">+{previewLucro.toLocaleString()} MT</div>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-3 bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800 rounded-xl font-bold transition-all text-center text-xs"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    className="w-1/2 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 text-center text-xs"
                  >
                    Gravar Venda
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Interactive Outflow / Despesa modal (Screenshot 2) */}
      <AnimatePresence>
        {showOutflowModal && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" transform="rotate(45 12 12)" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-display font-black text-white text-base">Registar Saída / Despesa</h4>
                    <p className="text-[10px] text-slate-400">Deduzir valor de uma caixinha</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowOutflowModal(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={addOutflow} className="p-6 space-y-4 text-xs text-left">
                <div className="space-y-1 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-500 font-bold uppercase tracking-wider block">Valor da Despesa</label>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">MT</span>
                  </div>
                  <input 
                    type="number" 
                    value={outflowValue}
                    onChange={(e) => setOutflowValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Pagar com dinheiro de qual Pocket?</label>
                  <select 
                    value={outflowPocket} 
                    onChange={(e) => setOutflowPocket(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Anúncios">Anúncios (20%)</option>
                    <option value="Fornecedor">Fornecedor (Custo)</option>
                    <option value="Delivery">Delivery (Entrega)</option>
                    <option value="Lucro">Lucro (80%)</option>
                    <option value="Wifi">Wifi</option>
                    <option value="Renda">Renda</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Categoria da Despesa</label>
                  <select 
                    value={outflowCategory} 
                    onChange={(e) => setOutflowCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Anúncios (Facebook Ads/Google Ads)">Anúncios (Facebook Ads/Google Ads)</option>
                    <option value="Custo do Fornecedor">Custo do Fornecedor (Custo de Produto)</option>
                    <option value="Envio / Frete">Envio / Frete de Entrega</option>
                    <option value="Software / Apps">Software / Apps</option>
                    <option value="Aluguer / Renda">Aluguer / Renda</option>
                    <option value="Outros">Outros custos operacionais</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Descrição / Nota</label>
                  <input 
                    type="text" 
                    value={outflowDescription}
                    onChange={(e) => setOutflowDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Ex: Campanha de criativos do Compressor de Ar, Apps adicionais"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Data do Pagamento</label>
                  <input 
                    type="date" 
                    value={outflowDate}
                    onChange={(e) => setOutflowDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                    required
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowOutflowModal(false)}
                    className="w-1/2 py-3 bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-800 rounded-xl font-bold transition-all text-center"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    className="w-1/2 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-600/10 text-center"
                  >
                    Gravar Saída
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confetti Particle Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {celebrations.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              left: `${p.startX}%`, 
              top: `${p.startY}%`, 
              opacity: 1, 
              scale: 0,
              rotate: p.rotate 
            }}
            animate={{ 
              left: `calc(${p.startX}% + ${p.tx}px)`, 
              top: `calc(${p.startY}% + ${p.ty}px)`, 
              opacity: [1, 1, 0.7, 0], 
              scale: [0, 1.3, 1, 0.4],
              rotate: p.rotate + p.rotateSpeed,
              y: [0, -100, 120, 350]
            }}
            transition={{ 
              duration: 3.2 + Math.random() * 1.6, 
              delay: p.delay, 
              ease: "easeOut" 
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "triangle" ? "0%" : "2px",
              clipPath: p.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            }}
          />
        ))}
      </div>

      {/* Celebration Notification Toast */}
      <AnimatePresence>
        {showCelebrationBadge && lastAddedSale && (
          <div className="absolute inset-0 flex items-center justify-center p-4 z-50 bg-slate-950/40 backdrop-blur-[2px] pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-[#0b0f19] border border-emerald-500/30 p-6 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative text-center"
            >
              {/* Confetti graphic rays in bg */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
              
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-3xl animate-bounce">
                🎉
              </div>

              <h5 className="font-display font-black text-white text-lg tracking-tight uppercase">Venda Registada!</h5>
              <p className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase mt-1">O DroopFlow rateou com sucesso</p>
              
              {/* Receipt details */}
              <div className="mt-4 bg-slate-950/80 rounded-2xl p-4 border border-slate-900 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-sans font-medium text-[10px] uppercase">Produto</span>
                  <span className="text-white font-sans font-bold truncate max-w-[140px]">{lastAddedSale.product}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-sans font-medium text-[10px] uppercase">Total Pago</span>
                  <span className="text-emerald-400 font-black text-sm">{lastAddedSale.value.toLocaleString()} MT</span>
                </div>

                <div className="border-t border-slate-900/80 my-2 pt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-400 text-[10px]">
                    <span className="font-sans font-medium">📦 Fornecedor (Custo):</span>
                    <span className="text-amber-400 font-bold">+{Math.round(lastAddedSale.for).toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-[10px]">
                    <span className="font-sans font-medium">🚚 Entrega (Delivery):</span>
                    <span className="text-indigo-400 font-bold">+{Math.round(lastAddedSale.del).toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-[10px]">
                    <span className="font-sans font-medium">📢 Anúncios (Tráfego):</span>
                    <span className="text-sky-400 font-bold">+{Math.round(lastAddedSale.ads).toLocaleString()} MT</span>
                  </div>
                </div>

                <div className="border-t border-emerald-500/20 pt-2.5 flex justify-between items-center font-sans">
                  <span className="font-black text-white text-[11px] uppercase tracking-wider">💰 Lucro Líquido:</span>
                  <span className="font-mono font-black text-emerald-400 text-base">+{Math.round(lastAddedSale.luc).toLocaleString()} MT</span>
                </div>
              </div>

              <div className="mt-5">
                <button 
                  onClick={() => setShowCelebrationBadge(false)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/15 cursor-pointer"
                >
                  Continuar Simulação
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
