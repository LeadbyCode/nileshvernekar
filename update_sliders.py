#!/usr/bin/env python3
"""Script to add sliders to all app cards"""

import re

# Read the HTML file
with open('index.html', 'r') as f:
    content = f.read()

# App configurations with screenshots
apps_config = {
    'hear-com': {
        'screenshots': [
            'images/apps/hear-com/screenshot-1.jpg',
            'images/apps/hear-com/screenshot-2.jpg',
            'images/apps/hear-com/screenshot-3.jpg'
        ]
    },
    'viya': {
        'screenshots': [
            'images/apps/viya/screenshot-1.jpg',
            'images/apps/viya/screenshot-2.jpg',
            'images/apps/viya/screenshot-3.jpg'
        ]
    },
    'club-apparel': {
        'screenshots': [
            'images/apps/club-apparel/screenshot-1.jpg',
            'images/apps/club-apparel/screenshot-2.jpg',
            'images/apps/club-apparel/screenshot-3.jpg'
        ]
    },
    'tim-hortons': {
        'screenshots': [
            'images/apps/tim-hortons/screenshot-1.jpg',
            'images/apps/tim-hortons/screenshot-2.jpg',
            'images/apps/tim-hortons/screenshot-3.jpg'
        ]
    },
    'starbucks': {
        'screenshots': [
            'images/apps/starbucks/screenshot-1.jpg',
            'images/apps/starbucks/screenshot-2.jpg',
            'images/apps/starbucks/screenshot-3.jpg'
        ]
    }
}

def create_slider_html(app_name, screenshots):
    """Create slider HTML for an app"""
    slider_images = '\n                                    '.join([
        f'<img src="{img}" alt="{app_name} Screenshot {i+1}" class="app-screenshot">'
        for i, img in enumerate(screenshots)
    ])

    return f'''<div class="app-slider">
                                <div class="app-slider-track">
                                    {slider_images}
                                </div>
                                <button class="slider-btn slider-prev" onclick="slideApp('{app_name}', -1)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="15 18 9 12 15 6"/>
                                    </svg>
                                </button>
                                <button class="slider-btn slider-next" onclick="slideApp('{app_name}', 1)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="9 18 15 12 9 6"/>
                                    </svg>
                                </button>
                                <div class="slider-dots"></div>
                            </div>'''

# Process each app
for app_name, config in apps_config.items():
    # Find the old structure and replace with slider
    old_pattern = rf'(<!-- {app_name.replace("-", " ").title()}.*?-->.*?<div class="hero-app-image">)\s*<img[^>]*class="app-screenshot"[^>]*>\s*(<img[^>]*class="floating-app-icon"[^>]*>)\s*<button class="view-gallery-btn".*?</button>\s*(</div>)'

    # Create replacement with slider
    slider_html = create_slider_html(app_name, config['screenshots'])
    replacement = rf'\1\n                            {slider_html}\n                            \2\n                        \3'

    # Replace in content
    content = re.sub(old_pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w') as f:
    f.write(content)

print("✅ Updated all app cards with sliders!")
