from pathlib import Path
import re

root = Path(r"d:\Bussiness Data\coding ground\HimEase")
files = list(root.rglob("*.html")) + list(root.rglob("*.js"))

for file in files:
    text = file.read_text(encoding="utf-8", errors="ignore")

    # Normalize every mixed WhatsApp phone form and stray suffixes.
    text = text.replace("https://wa.me/918894101001mileesonwh2317", "https://wa.me/918894101001")
    text = text.replace("https://wa.me/918894101001sanglaonwheels", "https://wa.me/918894101001")
    text = text.replace("wa.me/918894101001sanglaonwheels", "wa.me/918894101001")
    text = text.replace("wa.me/91+91 88941-01001", "wa.me/918894101001")
    text = text.replace("https://wa.me/91+91 88941-01001", "https://wa.me/918894101001")
    text = text.replace("91+91 88941-01001", "918894101001")

    # Normalize the QR payload first; remove any possible hidden variant from data URLs too.
    text = re.sub(r"https://wa\.me/91\+91\s*88941-01001", "https://wa.me/918894101001", text)
    text = re.sub(r"\b91\+91\s*88941-01001\b", "918894101001", text)

    # Normalize possible spaces/braces around the phone in JS object literals.
    text = text.replace('"91+91 88941-01001"', '"918894101001"')
    text = text.replace("'91+91 88941-01001'", "'918894101001'")

    file.write_text(text, encoding="utf-8")

print(f"normalized_whatsapp_phone_for_{len(files)}_files")
