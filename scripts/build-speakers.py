"""Render Frontier Days speaker cards from the sourced speaker directory."""
from pathlib import Path
from html import escape
import json
import re

base = Path(__file__).resolve().parents[1] / 'if27' / 'speakers'
speakers = json.loads((base / 'speakers.json').read_text())
cards = []
for i, speaker in enumerate(speakers):
    name = escape(speaker['name'])
    platform = 'LinkedIn' if 'linkedin.com' in speaker['profile'] else 'X'
    affiliation = f"<p>{escape(speaker['affiliation'])}</p>" if speaker['affiliation'] else ''
    cards.append(f'''<li class="speaker"><a class="speaker-profile" href="{escape(speaker['profile'], quote=True)}" target="_blank" rel="noopener noreferrer" aria-label="{name} on {platform} (opens in a new tab)"><div class="speaker-photo"><img src="{escape(speaker['photo'], quote=True)}" alt="" width="400" height="400" loading="{'eager' if i < 4 else 'lazy'}" decoding="async" style="object-position:{escape(speaker['photo_position'], quote=True)}"></div><h2>{name}</h2>{affiliation}<span class="speaker-social">{platform} <span aria-hidden="true">↗</span></span></a></li>''')
page = base / 'index.html'
html = page.read_text()
html, count = re.subn(r'(<ul class="speaker-grid">).*?(</ul>)', lambda m: m[1] + '\n'.join(cards) + m[2], html, count=1, flags=re.S)
assert count == 1
page.write_text(html)
print(f'Rendered {len(cards)} speaker cards with portraits and external profile links.')
