# Image Editor Pro

A powerful and feature-rich web-based image editor built with HTML5, CSS3, and vanilla JavaScript. Apply professional filters, transform images, and download your edited photos instantly.

## Features

### 🎨 Filters
- **Brightness** (0-200%) - Adjust image brightness
- **Contrast** (0-200%) - Control image contrast
- **Saturation** (0-200%) - Enhance or reduce color intensity
- **Hue Rotate** (0-360°) - Shift colors across the spectrum
- **Blur** (0-20px) - Add Gaussian blur effect
- **Grayscale** (0-100%) - Convert to black and white
- **Sepia** (0-100%) - Apply vintage sepia tone
- **Opacity** (0-100%) - Adjust transparency
- **Invert** (0-100%) - Invert colors

### 🔄 Transform Controls
- **Rotate Left/Right** - 90-degree rotation increments
- **Flip Horizontal** - Mirror image left to right
- **Flip Vertical** - Mirror image top to bottom
- **Zoom** (50-200%) - Scale image for detailed editing

### 💾 Utilities
- **Choose Image** - Upload any image file
- **Reset** - Restore all settings to defaults
- **Download** - Save edited image with all effects applied

## Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- No external dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start editing images immediately!

```bash
# Or run a local server for better development experience
python -m http.server 8000
# Then visit http://localhost:8000
```

## Usage

1. **Upload an Image**
   - Click "Choose Image" button
   - Select any image file from your device
   - The image will load in the canvas area

2. **Apply Filters**
   - Adjust filter sliders in real-time
   - See instant preview of changes
   - Filter values are displayed for precise control

3. **Transform Image**
   - Use transform buttons for rotation and flipping
   - Adjust zoom for detailed work
   - All transforms can be combined

4. **Save Your Work**
   - Click "Download" to save the edited image
   - The image will be downloaded with all effects applied
   - Original file remains unchanged

## File Structure

```
image_editor/
├── index.html      # Main HTML structure
├── style.css       # Main stylesheet
├── theme.css       # CSS variables and dark theme
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technical Details

### Technologies Used
- **HTML5 Canvas** - Image rendering and manipulation
- **CSS Filters** - Real-time image effects
- **CSS Variables** - Theming and consistency
- **Vanilla JavaScript** - No framework dependencies
- **Remix Icons** - Icon library

### Key Features Implementation
- **Canvas-based rendering** for performance
- **CSS filters** for real-time preview
- **File API** for image upload
- **Download API** for saving edited images
- **Responsive design** for all screen sizes

## Browser Compatibility

✅ Chrome 60+  
✅ Firefox 55+  
✅ Safari 12+  
✅ Edge 79+  

## Contributing

Feel free to contribute to this project! Here are some ideas:

1. **New Filters**: Add vignette, sharpen, or noise reduction
2. **Crop Tool**: Implement image cropping functionality
3. **History System**: Add undo/redo capability
4. **Presets**: Create filter combinations for quick effects
5. **Export Options**: Add different file format support

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Remix Icons](https://remixicon.com/) for beautiful icons
- Built with pure web technologies for maximum compatibility

---

*You can visit our website here :* https://kanakreshi.github.io/image-editor/

**Enjoy editing your photos! 📸**
