from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ── Routes ────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/stats")
def stats():
    return jsonify({
        "users": 52000,
        "transactions": 15000,
        "uptime": 99.9,
        "networks": 8,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    # In production: send email / save to DB here
    print(f"[Contact] {name} <{email}>: {message}")
    return jsonify({"success": True, "message": "Thanks! We'll be in touch soon."})

@app.route("/api/waitlist", methods=["POST"])
def waitlist():
    data = request.get_json()
    email = data.get("email", "").strip()
    if not email or "@" not in email:
        return jsonify({"success": False, "error": "Valid email required."}), 400
    print(f"[Waitlist] {email}")
    return jsonify({"success": True, "message": "You're on the list!"})

@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "subtech-vtuapp"})

# ── Entry point ───────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") != "production"
    app.run(host="0.0.0.0", port=port, debug=debug)
