document.addEventListener("DOMContentLoaded", () => {
    let zoomLevel = 1;
    const zoomStep = 0.1;
    const minZoom = 0.5;
    const maxZoom = 3;

    const editor = document.getElementById("editor");
    const mapLayer = document.getElementById("mapLayer");

    function applyZoom() {
        const img = mapLayer.querySelector("img.background");
        if (img) {
            img.style.transform = `scale(${zoomLevel})`;
            img.style.transformOrigin = "center center";
        }
    }

    // Boutons de zoom
    document.getElementById("zoomIn").addEventListener("click", () => {
        if (zoomLevel < maxZoom) {
            zoomLevel += zoomStep;
            applyZoom();
        }
    });

    document.getElementById("zoomOut").addEventListener("click", () => {
        if (zoomLevel > minZoom) {
            zoomLevel -= zoomStep;
            applyZoom();
        }
    });

    document.getElementById("zoomReset").addEventListener("click", () => {
        zoomLevel = 1;
        applyZoom();
    });
});
