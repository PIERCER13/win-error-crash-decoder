// @author piercer
(() => {
  if (document.getElementById("langToggle") || document.getElementById("piercerLangBtn")) return;

  const KEY = "piercer_lang_v1";
  const LANGS = ["pt", "en", "es"];
  const LABELS = { pt: "PT", en: "EN", es: "ES" };
  let current = localStorage.getItem(KEY) || "pt";
  if (!LANGS.includes(current)) current = "pt";

  // Exact phrases: [pt, en, es]
  const PAIRS = [
    ["Todas", "All", "Todas"],
    ["Todas as Tarefas", "All Tasks", "Todas las Tareas"],
    ["Abrir ferramenta", "Open tool", "Abrir herramienta"],
    ["Salvar", "Save", "Guardar"],
    ["Salvar Alterações", "Save Changes", "Guardar Cambios"],
    ["Cancelar", "Cancel", "Cancelar"],
    ["Excluir", "Delete", "Eliminar"],
    ["Excluir Tarefa", "Delete Task", "Eliminar Tarea"],
    ["Remover", "Remove", "Quitar"],
    ["Editar", "Edit", "Editar"],
    ["Adicionar", "Add", "Agregar"],
    ["Novo", "New", "Nuevo"],
    ["Copiar", "Copy", "Copiar"],
    ["Copiar resumo", "Copy summary", "Copiar resumen"],
    ["Copiar JSON", "Copy JSON", "Copiar JSON"],
    ["Copiar Script", "Copy Script", "Copiar Script"],
    ["Copiar Markdown", "Copy Markdown", "Copiar Markdown"],
    ["Copiar Código", "Copy Code", "Copiar Código"],
    ["Exportar JSON", "Export JSON", "Exportar JSON"],
    ["Exportar CSV", "Export CSV", "Exportar CSV"],
    ["Importar JSON", "Import JSON", "Importar JSON"],
    ["Importar CSV", "Import CSV", "Importar CSV"],
    ["Resetar", "Reset", "Restablecer"],
    ["Limpar", "Clear", "Limpiar"],
    ["Limpar Histórico", "Clear History", "Limpiar Historial"],
    ["Buscar", "Search", "Buscar"],
    ["Filtrar", "Filter", "Filtrar"],
    ["Iniciar", "Start", "Iniciar"],
    ["Pausar", "Pause", "Pausar"],
    ["Retomar", "Resume", "Reanudar"],
    ["Conectar", "Connect", "Conectar"],
    ["Desconectar", "Disconnect", "Desconectar"],
    ["Desconectado", "Disconnected", "Desconectado"],
    ["Concluir Agora", "Complete Now", "Completar Ahora"],
    ["PDF / Imprimir", "PDF / Print", "PDF / Imprimir"],
    ["Imprimir / Salvar PDF (A4)", "Print / Save PDF (A4)", "Imprimir / Guardar PDF (A4)"],
    ["Baixar .ahk", "Download .ahk", "Descargar .ahk"],
    ["Baixar Widget OBS (.html)", "Download OBS Widget (.html)", "Descargar Widget OBS (.html)"],
    ["Baixar Script PowerShell (.ps1)", "Download PowerShell Script (.ps1)", "Descargar Script PowerShell (.ps1)"],
    ["Baixar Script Bash (.sh)", "Download Bash Script (.sh)", "Descargar Script Bash (.sh)"],
    ["Aplicar na Pasta Aberta", "Apply to Open Folder", "Aplicar en Carpeta Abierta"],
    ["Abrir Pasta (Direto)", "Open Folder (Direct)", "Abrir Carpeta (Directo)"],
    ["Selecionar Arquivos", "Select Files", "Seleccionar Archivos"],
    ["Configurações", "Settings", "Configuración"],
    ["Detalhes", "Details", "Detalles"],
    ["Resultado", "Result", "Resultado"],
    ["Status", "Status", "Estado"],
    ["Descrição", "Description", "Descripción"],
    ["Título", "Title", "Título"],
    ["Categoria", "Category", "Categoría"],
    ["Prioridade", "Priority", "Prioridad"],
    ["Vencimento", "Due Date", "Vencimiento"],
    ["Etiquetas", "Tags", "Etiquetas"],
    ["Piercer — Ferramentas Web", "Piercer — Web Tools", "Piercer — Herramientas Web"],
    ["Utilitários que desenvolvi para jogos (Steam, CS2, Roblox, FiveM/RedM), criadores e uso diário.", "Utilities I built for games (Steam, CS2, Roblox, FiveM/RedM), creators, and daily use.", "Utilidades que desarrollé para juegos (Steam, CS2, Roblox, FiveM/RedM), creadores y uso diario."],
    ["Dia a dia & Vendas", "Daily & Sales", "Día a día y Ventas"],
    ["Jogos", "Games", "Juegos"],
    ["Caixa de Entrada", "Inbox", "Bandeja de Entrada"],
    ["Hoje", "Today", "Hoy"],
    ["Em Breve (7d)", "Upcoming (7d)", "Próximos (7d)"],
    ["Atrasadas", "Overdue", "Atrasadas"],
    ["Projetos / Boards", "Projects / Boards", "Proyectos / Tableros"],
    ["Meta Diária", "Daily Goal", "Meta Diaria"],
    ["Ajustar meta", "Adjust goal", "Ajustar meta"],
    ["Mostrar concluídas", "Show completed", "Mostrar completadas"],
    ["Lista", "List", "Lista"],
    ["Agenda", "Schedule", "Agenda"],
    ["Calendário", "Calendar", "Calendario"],
    ["A Fazer", "To Do", "Por Hacer"],
    ["Em Progresso", "In Progress", "En Progreso"],
    ["Concluído", "Done", "Hecho"],
    ["Todas Prioridades", "All Priorities", "Todas las Prioridades"],
    ["Pendentes na Visão", "Pending in View", "Pendientes en Vista"],
    ["Urgentes (P1)", "Urgent (P1)", "Urgentes (P1)"],
    ["Total Concluídas", "Total Completed", "Total Completadas"],
    ["Detalhes da Tarefa", "Task Details", "Detalles de la Tarea"],
    ["Buscar (Ctrl+K)", "Search (Ctrl+K)", "Buscar (Ctrl+K)"],
    ["Backup Global (.json)", "Global Backup (.json)", "Respaldo Global (.json)"],
    ["Restaurar Backup", "Restore Backup", "Restaurar Respaldo"],
    ["Atualizar Cotações", "Refresh Prices", "Actualizar Cotizaciones"],
    ["Exportar Etiquetas A4", "Export A4 Labels", "Exportar Etiquetas A4"],
    ["Escanear Código", "Scan Barcode", "Escanear Código"],
    ["Enviar Requisição", "Send Request", "Enviar Petición"],
    ["Comparar Agora", "Compare Now", "Comparar Ahora"],
    ["Gerar Recibo / Orçamento (PDF)", "Generate Receipt / Quote (PDF)", "Generar Recibo / Presupuesto (PDF)"],
    ["Gerar Link UTM & QR", "Generate UTM Link & QR", "Generar Enlace UTM y QR"],
  ];

  // Multi-word phrases & words for automatic fallback translation
  const PHRASES_EN = [
    ["preço médio", "average price"], ["preço ideal", "ideal price"], ["preço de venda", "sale price"],
    ["preço do produto", "product price"], ["lucro líquido", "net profit"], ["lucro bruto", "gross profit"],
    ["faturamento bruto", "gross revenue"], ["renda mensal", "monthly income"], ["renda passiva", "passive income"],
    ["taxa fixa", "fixed fee"], ["taxa da plataforma", "platform fee"], ["comissão afiliado", "affiliate commission"],
    ["frete grátis", "free shipping"], ["sem juros", "interest-free"], ["em lote", "in batch"],
    ["lado a lado", "side by side"], ["tempo real", "real time"], ["código de barras", "barcode"],
    ["marca d'água", "watermark"], ["juros compostos", "compound interest"], ["renda fixa", "fixed income"],
    ["independência financeira", "financial independence"], ["salário mínimo", "minimum wage"],
    ["salário líquido", "net salary"], ["quanto quer receber", "target net amount"],
    ["quanto cobrar", "how much to charge"], ["valor bruto", "gross amount"], ["valor líquido", "net amount"],
    ["valor total", "total amount"], ["data de vencimento", "due date"], ["sem data", "no date"],
    ["em voz alta", "read aloud"], ["palavra-chave", "keyword"], ["comentários", "comments"],
    ["participantes", "participants"], ["ganhadores", "winners"], ["sorteio", "giveaway"],
    ["cartelas", "cards"], ["imposto", "tax"], ["impostos", "taxes"], ["estoque", "stock"],
    ["vendas", "sales"], ["venda", "sale"], ["custo", "cost"], ["preço", "price"],
    ["taxa", "fee"], ["taxas", "fees"], ["lucro", "profit"], ["margem", "margin"],
    ["receita", "revenue"], ["despesa", "expense"], ["despesas", "expenses"],
    ["mensal", "monthly"], ["anual", "annual"], ["diária", "daily"], ["semanal", "weekly"],
    ["arquivo", "file"], ["arquivos", "files"], ["pasta", "folder"], ["pastas", "folders"],
    ["gerar", "generate"], ["gerador", "generator"], ["gerado", "generated"],
    ["calcular", "calculate"], ["calculadora", "calculator"], ["simulador", "simulator"],
    ["simule", "simulate"], ["comparador", "comparator"], ["comparar", "compare"],
    ["conversor", "converter"], ["converter", "convert"], ["adicionar", "add"],
    ["remover", "remove"], ["excluir", "delete"], ["editar", "edit"], ["salvar", "save"],
    ["copiar", "copy"], ["exportar", "export"], ["importar", "import"], ["baixar", "download"],
    ["imprimir", "print"], ["atualizar", "refresh"], ["limpar", "clear"], ["buscar", "search"],
    ["filtrar", "filter"], ["conectar", "connect"], ["enviar", "send"], ["configurar", "configure"],
    ["configurações", "settings"], ["título", "title"], ["descrição", "description"],
    ["nome", "name"], ["cliente", "client"], ["produto", "product"], ["produtos", "products"],
    ["serviço", "service"], ["serviços", "services"], ["contrato", "contract"], ["contratos", "contracts"],
    ["orçamento", "quote"], ["orçamentos", "quotes"], ["recibo", "receipt"], ["recibos", "receipts"],
    ["tabela", "table"], ["tabelas", "tables"], ["coluna", "column"], ["colunas", "columns"],
    ["linha", "line"], ["linhas", "lines"], ["página", "page"], ["páginas", "pages"],
    ["carteira", "wallet"], ["carteiras", "wallets"], ["moeda", "currency"], ["ações", "stocks"],
    ["ação", "stock"], ["patrimônio", "equity"], ["meta", "goal"], ["metas", "goals"],
    ["prazo", "deadline"], ["tarefa", "task"], ["tarefas", "tasks"], ["projeto", "project"],
    ["projetos", "projects"], ["subtarefa", "subtask"], ["subtarefas", "subtasks"],
    ["etiqueta", "tag"], ["etiquetas", "tags"], ["histórico", "history"], ["resumo", "summary"],
    ["detalhes", "details"], ["resultado", "result"], ["resultados", "results"],
    ["mês", "month"], ["meses", "months"], ["ano", "year"], ["anos", "years"],
    ["dia", "day"], ["dias", "days"], ["hora", "hour"], ["horas", "hours"],
    ["opcional", "optional"], ["obrigatório", "required"], ["padrão", "default"],
    ["atual", "current"], ["inicial", "initial"], ["final", "final"], ["novo", "new"],
    ["nova", "new"], ["todas", "all"], ["todos", "all"], ["nenhum", "none"], ["nenhuma", "none"],
    ["sem", "without"], ["com", "with"], ["para", "for"], ["por", "per"], ["até", "up to"],
    ["após", "after"], ["antes", "before"], ["depois", "after"], ["entre", "between"],
    ["sobre", "about"], ["você", "you"], ["seu", "your"], ["sua", "your"],
    ["de", "of"], ["do", "of"], ["da", "of"], ["dos", "of"], ["das", "of"],
    ["em", "in"], ["no", "in"], ["na", "in"], ["e", "and"], ["ou", "or"],
  ];

  const PHRASES_ES = [
    ["preço médio", "precio promedio"], ["preço ideal", "precio ideal"], ["preço de venda", "precio de venta"],
    ["lucro líquido", "beneficio neto"], ["lucro bruto", "beneficio bruto"], ["faturamento bruto", "ingresos brutos"],
    ["taxa fixa", "tarifa fija"], ["frete grátis", "envío gratis"], ["sem juros", "sin intereses"],
    ["em lote", "por lotes"], ["lado a lado", "lado a lado"], ["tempo real", "tiempo real"],
    ["código de barras", "código de barras"], ["marca d'água", "marca de agua"],
    ["juros compostos", "interés compuesto"], ["renda fixa", "renta fija"],
    ["salário mínimo", "salario mínimo"], ["salário líquido", "salario neto"],
    ["quanto cobrar", "cuánto cobrar"], ["valor total", "valor total"], ["data de vencimento", "fecha de vencimiento"],
    ["palavra-chave", "palabra clave"], ["comentários", "comentarios"], ["participantes", "participantes"],
    ["ganhadores", "ganadores"], ["cartelas", "cartones"], ["imposto", "impuesto"], ["impostos", "impuestos"],
    ["estoque", "inventario"], ["vendas", "ventas"], ["venda", "venta"], ["custo", "costo"],
    ["preço", "precio"], ["taxa", "tarifa"], ["taxas", "tarifas"], ["lucro", "beneficio"],
    ["margem", "margen"], ["receita", "ingreso"], ["despesa", "gasto"], ["despesas", "gastos"],
    ["mensal", "mensual"], ["anual", "anual"], ["diária", "diaria"], ["semanal", "semanal"],
    ["arquivo", "archivo"], ["arquivos", "archivos"], ["pasta", "carpeta"], ["pastas", "carpetas"],
    ["gerar", "generar"], ["gerador", "generador"], ["calcular", "calcular"], ["calculadora", "calculadora"],
    ["simulador", "simulador"], ["simule", "simula"], ["comparador", "comparador"], ["comparar", "comparar"],
    ["conversor", "conversor"], ["converter", "convertir"], ["adicionar", "agregar"],
    ["remover", "quitar"], ["excluir", "eliminar"], ["editar", "editar"], ["salvar", "guardar"],
    ["copiar", "copiar"], ["exportar", "exportar"], ["importar", "importar"], ["baixar", "descargar"],
    ["imprimir", "imprimir"], ["atualizar", "actualizar"], ["limpar", "limpiar"], ["buscar", "buscar"],
    ["filtrar", "filtrar"], ["conectar", "conectar"], ["enviar", "enviar"], ["configurar", "configurar"],
    ["configurações", "configuración"], ["título", "título"], ["descrição", "descripción"],
    ["nome", "nombre"], ["cliente", "cliente"], ["produto", "producto"], ["produtos", "productos"],
    ["serviço", "servicio"], ["serviços", "servicios"], ["contrato", "contrato"], ["contratos", "contratos"],
    ["orçamento", "presupuesto"], ["recibo", "recibo"], ["tabela", "tabla"], ["coluna", "columna"],
    ["linha", "línea"], ["página", "página"], ["páginas", "páginas"], ["carteira", "billetera"],
    ["moeda", "moneda"], ["ações", "acciones"], ["patrimônio", "patrimonio"], ["meta", "meta"],
    ["prazo", "plazo"], ["tarefa", "tarea"], ["tarefas", "tareas"], ["projeto", "proyecto"],
    ["subtarefa", "subtarea"], ["histórico", "historial"], ["resumo", "resumen"],
    ["detalhes", "detalles"], ["resultado", "resultado"], ["mês", "mes"], ["meses", "meses"],
    ["ano", "año"], ["anos", "años"], ["dia", "día"], ["dias", "días"], ["hora", "hora"], ["horas", "horas"],
    ["opcional", "opcional"], ["padrão", "predeterminado"], ["atual", "actual"], ["novo", "nuevo"],
    ["todas", "todas"], ["todos", "todos"], ["nenhum", "ninguno"], ["sem", "sin"], ["com", "con"],
    ["para", "para"], ["por", "por"], ["até", "hasta"], ["de", "de"], ["do", "del"], ["da", "de la"],
    ["em", "en"], ["no", "en el"], ["na", "en la"], ["e", "y"], ["ou", "o"],
  ];

  const MAP = { en: new Map(), es: new Map() };
  PAIRS.forEach(([pt, en, es]) => {
    MAP.en.set(pt, en);
    MAP.es.set(pt, es);
  });

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function buildRegexList(pairs) {
    return pairs.map(([src, dst]) => ({
      re: new RegExp(`(^|[^a-zA-ZÀ-ÿ0-9_])${escapeRe(src)}(?=$|[^a-zA-ZÀ-ÿ0-9_])`, "gi"),
      dst,
    }));
  }

  const RE_EN = buildRegexList(PHRASES_EN);
  const RE_ES = buildRegexList(PHRASES_ES);

  const ORIGINALS = new WeakMap();
  const ATTR_ORIGINALS = new WeakMap();

  function translateString(str, lang) {
    if (lang === "pt" || !str) return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    const map = MAP[lang];
    if (map.has(trimmed)) return str.replace(trimmed, map.get(trimmed));

    for (const [k, v] of map.entries()) {
      if (trimmed.startsWith(k + " (") || trimmed.startsWith(k + ":")) {
        return str.replace(k, v);
      }
    }

    let out = trimmed;
    const rules = lang === "en" ? RE_EN : RE_ES;
    for (const { re, dst } of rules) {
      out = out.replace(re, (_, pre) => pre + dst);
    }
    if (out !== trimmed && /^[A-ZÀ-Ÿ]/.test(trimmed)) {
      out = out.charAt(0).toUpperCase() + out.slice(1);
    }
    return str.replace(trimmed, out);
  }

  function applyLanguage(lang) {
    current = lang;
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang === "en" ? "en" : lang === "es" ? "es" : "pt-BR";

    const btn = document.getElementById("piercerLangBtn");
    if (btn) btn.textContent = `🌐 ${LABELS[lang]}`;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/i.test(parent.tagName)) continue;
      if (parent.id === "piercerLangBtn") continue;
      if (!ORIGINALS.has(node)) ORIGINALS.set(node, node.nodeValue);
      const orig = ORIGINALS.get(node);
      node.nodeValue = lang === "pt" ? orig : translateString(orig, lang);
    }

    document.querySelectorAll("[placeholder], [title]").forEach((el) => {
      if (!ATTR_ORIGINALS.has(el)) {
        ATTR_ORIGINALS.set(el, {
          placeholder: el.getAttribute("placeholder"),
          title: el.getAttribute("title"),
        });
      }
      const orig = ATTR_ORIGINALS.get(el);
      if (orig.placeholder) {
        el.setAttribute("placeholder", lang === "pt" ? orig.placeholder : translateString(orig.placeholder, lang));
      }
      if (orig.title) {
        el.setAttribute("title", lang === "pt" ? orig.title : translateString(orig.title, lang));
      }
    });
  }

  function mountButton() {
    if (document.getElementById("piercerLangBtn")) return;
    const btn = document.createElement("button");
    btn.id = "piercerLangBtn";
    btn.type = "button";
    btn.title = "Switch language (PT / EN / ES)";
    btn.textContent = `🌐 ${LABELS[current]}`;
    btn.style.cssText = [
      "position:fixed",
      "bottom:16px",
      "left:16px",
      "z-index:9999",
      "background:#141418",
      "color:#f4f4f5",
      "border:1px solid #ef4444",
      "border-radius:999px",
      "padding:7px 13px",
      "font-size:12px",
      "font-weight:700",
      "cursor:pointer",
      "box-shadow:0 6px 20px rgba(0,0,0,0.45)",
      "font-family:system-ui,-apple-system,sans-serif",
    ].join(";");

    const style = document.createElement("style");
    style.textContent = "@media print { #piercerLangBtn { display: none !important; } }";
    document.head.appendChild(style);

    btn.addEventListener("click", () => {
      const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];
      applyLanguage(next);
    });
    document.body.appendChild(btn);
  }

  let obsTimer = null;
  const observer = new MutationObserver(() => {
    if (current === "pt") return;
    clearTimeout(obsTimer);
    obsTimer = setTimeout(() => applyLanguage(current), 60);
  });

  function init() {
    mountButton();
    if (current !== "pt") applyLanguage(current);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
