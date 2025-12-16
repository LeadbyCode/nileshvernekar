# App Screenshots Gallery - Setup Guide

## Overview
I've successfully integrated an image gallery system into your portfolio that allows visitors to view multiple screenshots for each app project. The gallery features:

- ✨ Beautiful modal with carousel navigation
- 🖼️ Support for multiple screenshots per app
- ⌨️ Keyboard navigation (Arrow keys, ESC to close)
- 📱 Fully responsive design
- 🎯 Smooth animations and transitions

## What's Been Added

### 1. Folder Structure
Created organized folders for app screenshots:
```
images/
└── apps/
    ├── verizon-protect/
    ├── starbucks/
    ├── tim-hortons/
    ├── viya/
    ├── club-apparel/
    ├── hear-com/
    ├── audibene/
    └── verizon-cloud/
```

### 2. HTML Changes
- Added gallery modal with carousel
- Added "View Gallery" buttons on each app card
- Gallery appears on hover for desktop, always visible on mobile

### 3. CSS Styling
- Gallery modal with dark overlay
- Smooth slide transitions
- Navigation arrows and dot indicators
- Responsive design for all screen sizes

### 4. JavaScript Functionality
- `openGallery(appName)` - Opens gallery for specific app
- `closeGallery()` - Closes the gallery
- `changeSlide(direction)` - Navigate between screenshots
- Keyboard support (ESC, Arrow Left/Right)

## How to Add Screenshots

You need to save the images you shared into the appropriate folders. Here's the mapping:

### Verizon Protect (5 screenshots)
Save screenshots 1-5 from your images to:
- `images/apps/verizon-protect/screenshot-1.jpg` (Expert support)
- `images/apps/verizon-protect/screenshot-2.jpg` (Wi-Fi networks)
- `images/apps/verizon-protect/screenshot-3.jpg` (Security assessment)
- `images/apps/verizon-protect/screenshot-4.jpg` (Protection dashboard)
- `images/apps/verizon-protect/screenshot-5.jpg` (Boost security)

### Starbucks (3 screenshots)
Save to:
- `images/apps/starbucks/screenshot-1.jpg` (Find a Store)
- `images/apps/starbucks/screenshot-2.jpg` (Collect Stars)
- `images/apps/starbucks/screenshot-3.jpg` (Scan in Store)

### Tim Hortons (4 screenshots)
Save to:
- `images/apps/tim-hortons/screenshot-1.jpg` (Faster checkout)
- `images/apps/tim-hortons/screenshot-2.jpg` (Personalized offers)
- `images/apps/tim-hortons/screenshot-3.jpg` (Tims Rewards)
- `images/apps/tim-hortons/screenshot-4.jpg` (Welcome screen)

### Viya (4 screenshots)
Save to:
- `images/apps/viya/screenshot-1.jpg` (Book Golf)
- `images/apps/viya/screenshot-2.jpg` (Introducing Viya)
- `images/apps/viya/screenshot-3.jpg` (Viya Access)
- `images/apps/viya/screenshot-4.jpg` (Earn & Save)

### Club Apparel (5 screenshots)
Save to:
- `images/apps/club-apparel/screenshot-1.jpg` (Gift Cards)
- `images/apps/club-apparel/screenshot-2.jpg` (Latest Brand Products)
- `images/apps/club-apparel/screenshot-3.jpg` (Digital Invoice)
- `images/apps/club-apparel/screenshot-4.jpg` (Personalized Offers)
- `images/apps/club-apparel/screenshot-5.jpg` (Earn & Redeem)

### Hear.com Horizon (5 screenshots)
Save to:
- `images/apps/hear-com/screenshot-1.jpg` (German interface - Hörgeräte)
- `images/apps/hear-com/screenshot-2.jpg` (Adjust hearing aid)
- `images/apps/hear-com/screenshot-3.jpg` (Simple and intuitive)
- `images/apps/hear-com/screenshot-4.jpg` (Control hearing aids)
- `images/apps/hear-com/screenshot-5.jpg` (My Mode)

## How to Use

1. **Save the images** from the conversation to the appropriate folders listed above
2. **Open index.html** in your browser
3. **Hover over any app card** (or tap on mobile) and click the "View Gallery" button
4. **Navigate** using:
   - Arrow buttons on screen
   - Keyboard arrow keys (← →)
   - Dot indicators at the bottom
   - ESC key to close

## Adding More Apps to Gallery

To add gallery support for other apps (like Audibene, Verizon Cloud), follow this pattern:

1. **Add data attribute to HTML card:**
   ```html
   <div class="hero-app-card" data-app="app-name">
   ```

2. **Add View Gallery button:**
   ```html
   <button class="view-gallery-btn" onclick="openGallery('app-name')">
       <svg>...</svg>
       View Gallery
   </button>
   ```

3. **Add app data to script.js:**
   ```javascript
   'app-name': {
       title: 'App Title',
       images: [
           'images/apps/app-name/screenshot-1.jpg',
           'images/apps/app-name/screenshot-2.jpg'
       ]
   }
   ```

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Keyboard Navigation**: Arrow keys for next/prev, ESC to close
- **Touch Friendly**: Optimized for mobile devices
- **Performance**: Lazy loading for images
- **Accessibility**: ARIA labels and keyboard support
- **Smooth Animations**: Beautiful transitions between slides

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

If you encounter any issues:
1. Make sure all image paths are correct
2. Check browser console for errors (F12)
3. Verify images are in the correct folders
4. Ensure filenames match exactly (case-sensitive)

---

**Status**: Ready to use once you add the screenshot images!
