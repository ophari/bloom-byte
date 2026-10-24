"""
Logika konversi: Text <-> Binary <-> ASCII.

Semua konversi melewati bentuk tengah berupa string Python (teks),
jadi kombinasi apa pun (binary -> ascii, ascii -> binary, dst.) otomatis didukung.

- Binary memakai byte UTF-8 (8 bit per byte), sehingga emoji/karakter non-latin aman.
- ASCII memakai kode desimal karakter (code point), contoh: "A" -> 65.
"""

import re

FORMATS = ("text", "binary", "ascii")
MAX_BREAKDOWN = 120  # batas jumlah karakter yang ditampilkan di grid rincian


class ConversionError(ValueError):
    """Error input yang ramah ditampilkan ke pengguna."""


# ---------------------------------------------------------------------------
# Parsing: format sumber -> teks
# ---------------------------------------------------------------------------
def binary_to_text(data: str) -> str:
    cleaned = data.strip()
    if not cleaned:
        return ""

    invalid = re.search(r"[^01\s,]", cleaned)
    if invalid:
        raise ConversionError(
            f"Karakter '{invalid.group()}' tidak valid. Binary hanya boleh berisi 0 dan 1."
        )

    tokens = [t for t in re.split(r"[\s,]+", cleaned) if t]

    # Jika ditulis menyambung tanpa spasi, potong per 8 bit.
    if len(tokens) == 1 and len(tokens[0]) > 8:
        bits = tokens[0]
        if len(bits) % 8 != 0:
            raise ConversionError(
                f"Panjang binary ({len(bits)} bit) bukan kelipatan 8. Periksa lagi input kamu."
            )
        tokens = [bits[i : i + 8] for i in range(0, len(bits), 8)]

    for t in tokens:
        if len(t) > 8:
            raise ConversionError(f"Grup '{t}' lebih dari 8 bit.")

    raw = bytes(int(t, 2) for t in tokens)
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        # Fallback: perlakukan tiap byte sebagai satu karakter (Latin-1)
        return raw.decode("latin-1")


def ascii_to_text(data: str) -> str:
    cleaned = data.strip()
    if not cleaned:
        return ""

    tokens = [t for t in re.split(r"[\s,;]+", cleaned) if t]
    chars = []
    for t in tokens:
        if not t.isdigit():
            raise ConversionError(
                f"'{t}' bukan kode ASCII. Gunakan angka desimal, contoh: 72 101 108 108 111"
            )
        code = int(t)
        if code > 0x10FFFF:
            raise ConversionError(f"Kode {code} di luar jangkauan karakter.")
        chars.append(chr(code))
    return "".join(chars)


# ---------------------------------------------------------------------------
# Encoding: teks -> format tujuan
# ---------------------------------------------------------------------------
def text_to_binary(text: str, separator: str = " ") -> str:
    return separator.join(format(b, "08b") for b in text.encode("utf-8"))


def text_to_ascii(text: str, separator: str = " ") -> str:
    return separator.join(str(ord(c)) for c in text)


_PARSERS = {
    "text": lambda s: s,
    "binary": binary_to_text,
    "ascii": ascii_to_text,
}

_ENCODERS = {
    "text": lambda s, sep: s,
    "binary": text_to_binary,
    "ascii": text_to_ascii,
}


def describe_char(c: str) -> dict:
    code = ord(c)
    names = {" ": "SPACE", "\n": "LF", "\t": "TAB", "\r": "CR"}
    return {
        "char": names.get(c, c),
        "dec": code,
        "hex": format(code, "02X"),
        "bin": " ".join(format(b, "08b") for b in c.encode("utf-8")),
    }


def convert(data: str, source: str, target: str, separator: str = " ") -> dict:
    if source not in FORMATS or target not in FORMATS:
        raise ConversionError("Format tidak dikenal.")

    text = _PARSERS[source](data or "")
    output = _ENCODERS[target](text, separator)

    return {
        "output": output,
        "text": text,
        "breakdown": [describe_char(c) for c in text[:MAX_BREAKDOWN]],
        "truncated": len(text) > MAX_BREAKDOWN,
        "stats": {
            "chars": len(text),
            "bytes": len(text.encode("utf-8")),
            "bits": len(text.encode("utf-8")) * 8,
            "words": len(text.split()),
        },
    }
