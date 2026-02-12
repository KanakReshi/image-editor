const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
        label: "Brightness"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
        label: "Contrast"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
        label: "Saturation"
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
        label: "Hue Rotate"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
        label: "Blur"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
        label: "Grayscale"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
        label: "Sepia"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
        label: "Opacity"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
        label: "Invert"
    }
};

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const placeholderImage = document.querySelector(".placeholder-image");

let currentImage = null;
let ctx = null;
let originalImageData = null;
let rotation = 0;
let flipH = 1;
let flipV = 1;
let zoom = 1;

function createFilterElement(name, label, value, min, max, unit) {
    const div = document.createElement("div");
    div.classList.add("filter");
    
    const labelDiv = document.createElement("div");
    labelDiv.style.display = "flex";
    labelDiv.style.justifyContent = "space-between";
    labelDiv.style.marginBottom = "0.5rem";
    
    const p = document.createElement("p");
    p.innerText = label;
    p.style.margin = "0";
    p.style.fontSize = "0.9rem";
    
    const valueSpan = document.createElement("span");
    valueSpan.id = `${name}-value`;
    valueSpan.innerText = `${value}${unit}`;
    valueSpan.style.color = "var(--text-secondary-color)";
    valueSpan.style.fontSize = "0.8rem";
    
    labelDiv.appendChild(p);
    labelDiv.appendChild(valueSpan);
    
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;
    
    input.addEventListener("input", (e) => {
        const value = e.target.value;
        valueSpan.innerText = `${value}${unit}`;
        filters[name].value = value;
        applyFilters();
    });
    
    div.appendChild(labelDiv);
    div.appendChild(input);
    return div;
}

Object.keys(filters).forEach(filter => {
    const filterElement = createFilterElement(
        filter,
        filters[filter].label,
        filters[filter].value,
        filters[filter].min,
        filters[filter].max,
        filters[filter].unit
    );
    filtersContainer.appendChild(filterElement);
});

function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            ctx = imageCanvas.getContext('2d');
            
            imageCanvas.style.display = "block";
            placeholderImage.querySelector("i").style.display = "none";
            placeholderImage.querySelector("p").style.display = "none";
            
            const maxWidth = placeholderImage.parentElement.offsetWidth;
            const maxHeight = 400;
            
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
            }
            
            imageCanvas.width = width;
            imageCanvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            originalImageData = ctx.getImageData(0, 0, width, height);
            
            applyFilters();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function applyFilters() {
    if (!currentImage || !ctx) return;
    
    ctx.putImageData(originalImageData, 0, 0);
    
    const filterString = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        hue-rotate(${filters.hueRotate.value}deg)
        blur(${filters.blur.value}px)
        grayscale(${filters.grayscale.value}%)
        sepia(${filters.sepia.value}%)
        opacity(${filters.opacity.value}%)
        invert(${filters.invert.value}%)
    `;
    
    imageCanvas.style.filter = filterString;
}

function resetFilters() {
    Object.keys(filters).forEach(filter => {
        filters[filter].value = filter === 'brightness' || filter === 'contrast' || 
                                filter === 'saturation' || filter === 'opacity' ? 100 : 0;
        const input = document.getElementById(filter);
        if (input) {
            input.value = filters[filter].value;
            const valueSpan = document.getElementById(`${filter}-value`);
            if (valueSpan) {
                valueSpan.innerText = `${filters[filter].value}${filters[filter].unit}`;
            }
        }
    });
    
    rotation = 0;
    flipH = 1;
    flipV = 1;
    zoom = 1;
    zoomSlider.value = 100;
    zoomValue.innerText = "100%";
    
    applyFilters();
    applyTransform();
}

function downloadImage() {
    if (!currentImage || !ctx) return;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCanvas.width = imageCanvas.width;
    tempCanvas.height = imageCanvas.height;
    
    tempCtx.filter = imageCanvas.style.filter;
    tempCtx.drawImage(currentImage, 0, 0, imageCanvas.width, imageCanvas.height);
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = tempCanvas.toDataURL();
    link.click();
}

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        loadImage(file);
    }
});

resetBtn.addEventListener("click", resetFilters);
downloadBtn.addEventListener("click", downloadImage);

const rotateLeftBtn = document.querySelector("#rotate-left-btn");
const rotateRightBtn = document.querySelector("#rotate-right-btn");
const flipHorizontalBtn = document.querySelector("#flip-horizontal-btn");
const flipVerticalBtn = document.querySelector("#flip-vertical-btn");
const zoomSlider = document.querySelector("#zoom-slider");
const zoomValue = document.querySelector("#zoom-value");

function applyTransform() {
    if (!currentImage || !ctx) return;
    
    const transform = `
        rotate(${rotation}deg) 
        scaleX(${flipH}) 
        scaleY(${flipV})
        scale(${zoom})
    `;
    
    imageCanvas.style.transform = transform;
}

rotateLeftBtn.addEventListener("click", () => {
    rotation -= 90;
    applyTransform();
});

rotateRightBtn.addEventListener("click", () => {
    rotation += 90;
    applyTransform();
});

flipHorizontalBtn.addEventListener("click", () => {
    flipH *= -1;
    applyTransform();
});

flipVerticalBtn.addEventListener("click", () => {
    flipV *= -1;
    applyTransform();
});

zoomSlider.addEventListener("input", (e) => {
    zoom = e.target.value / 100;
    zoomValue.innerText = `${e.target.value}%`;
    applyTransform();
});