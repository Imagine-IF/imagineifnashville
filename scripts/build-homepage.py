#!/usr/bin/env python3
"""Publish the IF27 homepage at / while preserving its legacy /if27/ URL.
Run after editing if27/index.html. Subpages and assets remain under /if27/.
"""
from pathlib import Path
import re
from urllib.parse import urljoin
root = Path(__file__).resolve().parents[1]
source = (root / 'if27/index.html').read_text()
def absolute(match):
    attr, quote, value = match.groups()
    if not value or value.startswith(('#', '/', 'https:', 'http:', 'mailto:', 'data:')):
        return match.group(0)
    return f'{attr}={quote}{urljoin("/if27/", value)}{quote}'
source = re.sub(r'''\b(href|src|poster)=(['"])(.*?)\2''', absolute, source)
(root / 'index.html').write_text(source)
