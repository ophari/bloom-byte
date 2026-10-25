(() => {
  const $ = (id) => document.getElementById(id);

  const LABELS = { text: "Text", binary: "Binary", ascii: "ASCII" };
  const SAMPLES = {
    text: "Halo Dunia! 🌸",
    binary: "01001000 01100001 01101100 01101111 00100000 01000100 01110101 01101110 01101001 01100001",
    ascii: "72 97 108 111 32 68 117 110 105 97",
  };
  const HINTS = {
    text: "Ketik teks bebas — huruf, angka, simbol, bahkan emoji.",
    binary: "Pisahkan tiap 8 bit dengan spasi, atau tulis menyambung.",
    ascii: "Masukkan kode desimal dipisah spasi atau koma, contoh: 72 105",
  };
  const PLACEHOLDERS = {
    text: "Ketik sesuatu di sini…",
    binary: "01001000 01100001 01101100 01101111",
    ascii: "72 97 108 111",
  };

  const SEPARATORS = { space: " ", none: "", comma: ", ", newline: "\n" };

  const state = { source: "binary", target: "text", separator: "space" };

  const input = $("input");
  const output = $("output");
  const errorBox = $("error");
  const grid = $("char-grid");
  const sepPicker = $("sep-picker");

  let timer = null;

  // ---------- UI helpers ----------
  function setActive(groupEl, value) {
    groupEl.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.value === value;
      b.classList.toggle("active", on);
      if (b.hasAttribute("role")) b.setAttribute("aria-checked", on);
    });
  }

  function refreshModeUI() {
    setActive($("source-group"), state.source);
    setActive($("target-group"), state.target);
    setActive(sepPicker, state.separator);
    $("input-label").textContent = LABELS[state.source];
    $("output-label").textContent = LABELS[state.target];
    $("input-hint").textContent = HINTS[state.source];
    input.placeholder = PLACEHOLDERS[state.source];
    sepPicker.classList.toggle("disabled", state.target === "text");
  }

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function setStat(id, value) {
    const el = $(id);
    const str = value.toLocaleString("id-ID");
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove("bump");
      void el.offsetWidth; // restart animasi
      el.classList.add("bump");
    }
  }

  function renderStats(stats) {
    setStat("stat-chars", stats.chars);
    setStat("stat-bytes", stats.bytes);
    setStat("stat-bits", stats.bits);
    setStat("stat-words", stats.words);
  }

  function renderGrid(items, truncated) {
    grid.innerHTML = "";
    if (!items.length) {
      grid.innerHTML = '<p class="empty">Belum ada karakter. Mulai ketik di kolom input ✨</p>';
      $("truncated").hidden = true;
      return;
    }
    const frag = document.createDocumentFragment();
    items.forEach((it, i) => {
      const tile = document.createElement("div");
      tile.className = "char-tile";
      tile.style.animationDelay = `${Math.min(i * 18, 400)}ms`;

      const ch = document.createElement("div");
      const special = ["SPACE", "LF", "TAB", "CR"].includes(it.char) || it.dec < 32;
      ch.className = "ch" + (special ? " special" : "");
      const named = ["SPACE", "LF", "TAB", "CR"].includes(it.char);
      ch.textContent = it.dec < 32 && !named ? `0x${it.hex}` : it.char;

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<span class="dec">${it.dec}</span><span class="hex">0x${it.hex}</span>`;

      const bin = document.createElement("div");
      bin.className = "bin";
      bin.textContent = it.bin;

      tile.append(ch, meta, bin);
      tile.title = `Klik untuk salin "${it.char}"`;
      tile.addEventListener("click", () => copy(it.char === "SPACE" ? " " : it.char, `Karakter "${it.char}" disalin`));
      frag.appendChild(tile);
    });
    grid.appendChild(frag);
    $("truncated").hidden = !truncated;
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = !msg;
  }

  // ---------- Logika Konversi Client-Side (Kompatibel GitHub Pages & Offline) ----------
  function binaryToText(data) {
    const cleaned = data.trim();
    if (!cleaned) return "";

    const invalid = cleaned.match(/[^01\s,]/);
    if (invalid) {
      throw new Error(`Karakter '${invalid[0]}' tidak valid. Binary hanya boleh berisi 0 dan 1.`);
    }

    let tokens = cleaned.split(/[\s,]+/).filter(Boolean);
    if (tokens.length === 1 && tokens[0].length > 8) {
      const bits = tokens[0];
      if (bits.length % 8 !== 0) {
        throw new Error(`Panjang binary (${bits.length} bit) bukan kelipatan 8. Periksa lagi input kamu.`);
      }
      tokens = [];
      for (let i = 0; i < bits.length; i += 8) {
        tokens.push(bits.slice(i, i + 8));
      }
    }

    for (const t of tokens) {
      if (t.length > 8) {
        throw new Error(`Grup '${t}' lebih dari 8 bit.`);
      }
    }

    const bytes = new Uint8Array(tokens.map((t) => parseInt(t, 2)));
    try {
      const decoder = new TextDecoder("utf-8", { fatal: true });
      return decoder.decode(bytes);
    } catch {
      return Array.from(bytes, (b) => String.fromCharCode(b)).join("");
    }
  }

  function asciiToText(data) {
    const cleaned = data.trim();
    if (!cleaned) return "";

    const tokens = cleaned.split(/[\s,;]+/).filter(Boolean);
    const chars = [];
    for (const t of tokens) {
      if (!/^\d+$/.test(t)) {
        throw new Error(`'${t}' bukan kode ASCII. Gunakan angka desimal, contoh: 72 101 108 108 111`);
      }
      const code = parseInt(t, 10);
      if (code > 0x10FFFF) {
        throw new Error(`Kode ${code} di luar jangkauan karakter.`);
      }
      chars.push(String.fromCodePoint(code));
    }
    return chars.join("");
  }

  function textToBinary(text, sep = " ") {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    return Array.from(bytes, (b) => b.toString(2).padStart(8, "0")).join(sep);
  }

  function textToAscii(text, sep = " ") {
    return Array.from(text).map((c) => c.codePointAt(0)).join(sep);
  }

  const PARSERS = {
    text: (s) => s,
    binary: binaryToText,
    ascii: asciiToText,
  };

  const ENCODERS = {
    text: (s, sep) => s,
    binary: textToBinary,
    ascii: textToAscii,
  };

  function describeChar(c) {
    const code = c.codePointAt(0);
    const names = { " ": "SPACE", "\n": "LF", "\t": "TAB", "\r": "CR" };
    const encoder = new TextEncoder();
    const bytes = encoder.encode(c);
    const binStr = Array.from(bytes, (b) => b.toString(2).padStart(8, "0")).join(" ");
    return {
      char: names[c] || c,
      dec: code,
      hex: code.toString(16).toUpperCase().padStart(2, "0"),
      bin: binStr,
    };
  }

  function convertLocal(data, source, target, sepKey) {
    const sep = SEPARATORS[sepKey] !== undefined ? SEPARATORS[sepKey] : " ";
    const parse = PARSERS[source];
    const encode = ENCODERS[target];
    if (!parse || !encode) throw new Error("Format tidak dikenal.");

    const text = parse(data || "");
    const outputText = encode(text, sep);

    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(text);
    const charsArray = Array.from(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    return {
      output: outputText,
      text: text,
      breakdown: charsArray.slice(0, 120).map(describeChar),
      truncated: charsArray.length > 120,
      stats: {
        chars: charsArray.length,
        bytes: utf8Bytes.length,
        bits: utf8Bytes.length * 8,
        words: words,
      },
    };
  }

  // ---------- Eksekusi Konversi (Instant Client-Side dengan fallback API) ----------
  function runConvert() {
    try {
      const data = convertLocal(input.value, state.source, state.target, state.separator);
      showError("");
      output.value = data.output;
      renderStats(data.stats);
      renderGrid(data.breakdown, data.truncated);
    } catch (err) {
      showError(err.message || "Gagal melakukan konversi.");
      output.value = "";
      renderStats({ chars: 0, bytes: 0, bits: 0, words: 0 });
      renderGrid([], false);
    }
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(runConvert, 100);
  }

  // ---------- Clipboard ----------
  async function copy(text, msg = "Disalin ke clipboard") {
    if (!text) return toast("Tidak ada yang bisa disalin");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const tmp = document.createElement("textarea");
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
    }
    toast(msg + " ✓");
  }

  // ---------- Events ----------
  function bindGroup(groupId, key, otherKey) {
    $(groupId).addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-value]");
      if (!btn) return;
      const value = btn.dataset.value;
      if (value === state[key]) return;
      // Jika sama dengan sisi lain, tukar otomatis agar tidak Text -> Text
      if (value === state[otherKey]) state[otherKey] = state[key];
      state[key] = value;
      refreshModeUI();
      schedule();
    });
  }
  bindGroup("source-group", "source", "target");
  bindGroup("target-group", "target", "source");

  sepPicker.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-value]");
    if (!btn) return;
    state.separator = btn.dataset.value;
    refreshModeUI();
    schedule();
  });

  $("swap-btn").addEventListener("click", () => {
    const prevOutput = output.value;
    [state.source, state.target] = [state.target, state.source];
    if (prevOutput && errorBox.hidden) input.value = prevOutput;
    refreshModeUI();
    runConvert();
  });

  input.addEventListener("input", schedule);

  $("sample-btn").addEventListener("click", () => {
    input.value = SAMPLES[state.source];
    runConvert();
    input.focus();
  });

  $("clear-btn").addEventListener("click", () => {
    input.value = "";
    runConvert();
    input.focus();
  });

  $("paste-btn").addEventListener("click", async () => {
    try {
      input.value = await navigator.clipboard.readText();
      runConvert();
    } catch {
      toast("Izin clipboard ditolak — gunakan Ctrl+V");
      input.focus();
    }
  });

  $("copy-btn").addEventListener("click", () => copy(output.value));

  $("download-btn").addEventListener("click", () => {
    if (!output.value) return toast("Output masih kosong");
    const blob = new Blob([output.value], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bloombyte-${state.source}-to-${state.target}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("File diunduh ✓");
  });

  // ---------- Init ----------
  refreshModeUI();
  input.value = SAMPLES[state.source];
  runConvert();
})();
