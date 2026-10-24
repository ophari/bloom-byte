from flask import Flask, jsonify, render_template, request

from converter import ConversionError, convert

app = Flask(__name__)

SEPARATORS = {"space": " ", "none": "", "comma": ", ", "newline": "\n"}


@app.route("/")
def index():
    return render_template("index.html")


@app.post("/api/convert")
def api_convert():
    payload = request.get_json(silent=True) or {}
    data = str(payload.get("input", ""))[:20000]
    source = payload.get("source", "text")
    target = payload.get("target", "binary")
    separator = SEPARATORS.get(payload.get("separator", "space"), " ")

    try:
        result = convert(data, source, target, separator)
        return jsonify(ok=True, **result)
    except ConversionError as exc:
        return jsonify(ok=False, error=str(exc)), 400


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() in ("true", "1")
    app.run(host="0.0.0.0", port=port, debug=debug)
