// @author piercer
(() => {
  const KEY = "piercer_win_err_v1";
  const $ = (id) => document.getElementById(id);

  const DB = {
    "0xC0000005": { name: "STATUS_ACCESS_VIOLATION", desc: "Tentativa de leitura/escrita em endereço de memória inválido (null pointer ou ponteiro liberado)." },
    "0xC0000034": { name: "STATUS_OBJECT_NAME_NOT_FOUND", desc: "Arquivo, chave de registro ou objeto não encontrado." },
    "0xC0000135": { name: "STATUS_DLL_NOT_FOUND", desc: "DLL dependente não encontrada ao iniciar o executável." },
    "0xC0000409": { name: "STATUS_STACK_BUFFER_OVERRUN", desc: "Corrupção de buffer na stack / falha de cookie /GS ou fail-fast." },
    "0x80070005": { name: "E_ACCESSDENIED", desc: "Acesso negado (permissão insuficiente ou bloqueio de ACL/UAC)." },
    "0x80004005": { name: "E_FAIL", desc: "Erro genérico não especificado (COM/Win32)." },
    "0xC00000FD": { name: "STATUS_STACK_OVERFLOW", desc: "Estouro de pilha (recursão infinita ou alocação grande na stack)." },
    "0xC0000022": { name: "STATUS_ACCESS_DENIED", desc: "Acesso negado em nível de kernel/objeto NT." },
    "5": { name: "ERROR_ACCESS_DENIED (Win32)", desc: "Acesso negado." },
    "2": { name: "ERROR_FILE_NOT_FOUND (Win32)", desc: "O sistema não pode encontrar o arquivo especificado." },
  };

  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (s.errCode) $("errCode").value = s.errCode;
    if (s.windbgLog) $("windbgLog").value = s.windbgLog;
  } catch {}

  function decode() {
    localStorage.setItem(KEY, JSON.stringify({ errCode: $("errCode").value, windbgLog: $("windbgLog").value }));
    const raw = $("errCode").value.trim().toUpperCase();
    const norm = raw.startsWith("0X") ? "0x" + raw.slice(2).padStart(8, "0") : raw;
    const hit = DB[norm] || DB[raw];
    if (hit) {
      $("codeOut").textContent = `${hit.name}\n\n${hit.desc}`;
    } else {
      const n = parseInt(raw, raw.startsWith("0X") ? 16 : 10);
      $("codeOut").textContent = isNaN(n)
        ? "Formato inválido."
        : `Hex: 0x${(n >>> 0).toString(16).toUpperCase().padStart(8, "0")} | Dec: ${n >>> 0}\n(Código não está no catálogo rápido; verifique Winerror.h / ntstatus.h)`;
    }

    const log = $("windbgLog").value;
    const mod = (log.match(/MODULE_NAME:\s*(\S+)/i) || [])[1] || "-";
    const img = (log.match(/IMAGE_NAME:\s*(\S+)/i) || [])[1] || "-";
    const proc = (log.match(/PROCESS_NAME:\s*(\S+)/i) || [])[1] || "-";
    const exc = (log.match(/EXCEPTION_CODE:[^\r\n]*/i) || [])[0] || "-";
    $("windbgOut").textContent = [
      `Processo : ${proc}`,
      `Módulo   : ${mod}`,
      `Imagem   : ${img}`,
      `Exceção  : ${exc}`,
    ].join("\n");
  }

  document.querySelectorAll(".q-code").forEach((b) => b.addEventListener("click", () => {
    $("errCode").value = b.dataset.c;
    decode();
  }));
  $("errCode").addEventListener("input", decode);
  $("windbgLog").addEventListener("input", decode);
  decode();
})();
