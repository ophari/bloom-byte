/**
 * Bloom Byte — Logika konversi: Text <-> Binary <-> ASCII.
 *
 * Semua konversi melewati bentuk tengah berupa string (teks),
 * jadi kombinasi apa pun (binary -> ascii, ascii -> binary, dst.) otomatis didukung.
 *
 * - Binary memakai byte UTF-8 (8 bit per byte), sehingga emoji/karakter non-latin aman.
 * - ASCII memakai kode desimal karakter (code point), contoh: "A" -> 65.
 *
 * Berjalan 100% di browser (tanpa server), diekspos sebagai `window.BloomConverter`.
 */
(function (global) {
  "use strict";

  const FORMATS = ["text", "binary", "ascii"];
  const MAX_BREAKDOWN = 120; // batas jumlah karakter yang ditampilkan di grid rincian
  const MAX_INPUT = 20000; // batas panjang input
  const SEPARATORS = { space: " ", none: "", comma: ", ", newline: "\n" };

  const encoder = new TextEncoder();

  /** Error input yang ramah ditampilkan ke pengguna. */
  class ConversionError extends Error {
    constructor(message) {
      super(message);
      this.name = "ConversionError";
    }
  }

  const toBin8 = (b) => b.toString(2).padStart(8, "0");

  // -------------------------------------------------------------------------
  // Parsing: format sumber -> teks
  // -------------------------------------------------------------------------
  function binaryToText(data) {
    const cleaned = data.trim();
    if (!cleaned) return "";

    const invalid = cleaned.match(/[^01\s,]/);
    if (invalid) {
      throw new ConversionError(
        `Karakter '${invalid[0]}' tidak valid. Binary hanya boleh berisi 0 dan 1.`
      );
    }

    let tokens = cleaned.split(/[\s,]+/).filter(Boolean);

    // Jika ditulis menyambung tanpa spasi, potong per 8 bit.
    if (tokens.length === 1 && tokens[0].length > 8) {
      const bits = tokens[0];
      if (bits.length % 8 !== 0) {
        throw new ConversionError(
          `Panjang binary (${bits.length} bit) bukan kelipatan 8. Periksa lagi input kamu.`
        );
      }
      tokens = bits.match(/.{8}/g);
    }

    for (const t of tokens) {
      if (t.length > 8) throw new ConversionError(`Grup '${t}' lebih dari 8 bit.`);
    }

    const raw = new Uint8Array(tokens.map((t) => parseInt(t, 2)));
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(raw);
    } catch {
      // Fallback: perlakukan tiap byte sebagai satu karakter (Latin-1)
      return Array.from(raw, (b) => String.fromCharCode(b)).join("");
    }
  }

  function asciiToText(data) {
    const cleaned = data.trim();
    if (!cleaned) return "";

    const tokens = cleaned.split(/[\s,;]+/).filter(Boolean);
    return tokens
      .map((t) => {
        if (!/^\d+$/.test(t)) {
          throw new ConversionError(
            `'${t}' bukan kode ASCII. Gunakan angka desimal, contoh: 72 101 108 108 111`
          );
        }
        const code = Number(t);
        if (code > 0x10ffff) {
          throw new ConversionError(`Kode ${code} di luar jangkauan karakter.`);
        }
        return String.fromCodePoint(code);
      })
      .join("");
  }

  // -------------------------------------------------------------------------
  // Encoding: teks -> format tujuan
  // -------------------------------------------------------------------------
  function textToBinary(text, separator = " ") {
    return Array.from(encoder.encode(text), toBin8).join(separator);
  }

  function textToAscii(text, separator = " ") {
    return Array.from(text, (c) => c.codePointAt(0)).join(separator);
  }

  const PARSERS = { text: (s) => s, binary: binaryToText, ascii: asciiToText };
  const ENCODERS = { text: (s) => s, binary: textToBinary, ascii: textToAscii };

  function describeChar(c) {
    const code = c.codePointAt(0);
    const names = { " ": "SPACE", "\n": "LF", "\t": "TAB", "\r": "CR" };
    return {
      char: names[c] || c,
      dec: code,
      hex: code.toString(16).toUpperCase().padStart(2, "0"),
      bin: Array.from(encoder.encode(c), toBin8).join(" "),
    };
  }

  /**
   * Konversi utama.
   * @param {string} data       Input mentah
   * @param {string} source     "text" | "binary" | "ascii"
   * @param {string} target     "text" | "binary" | "ascii"
   * @param {string} separator  "space" | "none" | "comma" | "newline"
   */
  function convert(data, source, target, separator = "space") {
    if (!FORMATS.includes(source) || !FORMATS.includes(target)) {
      throw new ConversionError("Format tidak dikenal.");
    }
    const sep = SEPARATORS[separator] ?? " ";
    const input = String(data ?? "").slice(0, MAX_INPUT);

    const text = PARSERS[source](input);
    const output = ENCODERS[target](text, sep);

    const chars = Array.from(text); // aman untuk emoji (surrogate pair)
    const bytes = encoder.encode(text).length;

    return {
      output,
      text,
      breakdown: chars.slice(0, MAX_BREAKDOWN).map(describeChar),
      truncated: chars.length > MAX_BREAKDOWN,
      stats: {
        chars: chars.length,
        bytes,
        bits: bytes * 8,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
      },
    };
  }

  global.BloomConverter = {
    FORMATS,
    SEPARATORS,
    ConversionError,
    convert,
    binaryToText,
    asciiToText,
    textToBinary,
    textToAscii,
  };
})(typeof window !== "undefined" ? window : globalThis);
