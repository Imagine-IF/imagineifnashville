"""Render the public past-speaker archive and unlisted 2027 lineup."""
from pathlib import Path
from html import escape
import json
import re

root = Path(__file__).resolve().parents[1]
for directory in ('speakers', 'pastspeakers'):
    base = root / 'if27' / directory
    speakers = json.loads((base / 'speakers.json').read_text())
    cards = []
    for i, speaker in enumerate(speakers):
        name = escape(speaker['name'])
        profile = speaker.get('profile', '')
        platform = 'LinkedIn' if 'linkedin.com' in profile else 'X' if 'x.com/' in profile or 'twitter.com/' in profile else 'Profile'
        affiliation = f"<p>{escape(speaker['affiliation'])}</p>" if speaker['affiliation'] else ''
        years = f'<p class="speaker-years">{" · ".join(str(y) for y in sorted(speaker["years"]))}</p>' if speaker.get('years') else ''
        photo = escape(speaker['photo'], quote=True)
        position = escape(speaker.get('photo_position', 'center 25%'), quote=True)
        content = f'<div class="speaker-photo"><img src="{photo}" alt="" width="400" height="400" loading="{"eager" if i < 4 else "lazy"}" decoding="async" style="object-position:{position}"></div><h2>{name}</h2>{affiliation}{years}'
        links = []
        for field, label in (('x', 'X'), ('linkedin', 'LinkedIn')):
            url = speaker.get(field)
            if url:
                links.append(f'<a href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer" aria-label="{name} on {label} (opens in a new tab)">{label} <span aria-hidden="true">↗</span></a>')
        socials = f'<div class="speaker-socials">{"".join(links)}</div>' if links else ''
        cards.append(f'<li class="speaker">{content}{socials}</li>')
    page = base / 'index.html'
    html, count = re.subn(r'(<ul class="speaker-grid">).*?(</ul>)', lambda m: m[1] + '\n'.join(cards) + m[2], page.read_text(), count=1, flags=re.S)
    assert count == 1
    page.write_text(html)
    print(f'Rendered {len(cards)} {directory}.')
