document.addEventListener("DOMContentLoaded", () => {
    let selectedText = null;

    function addText(content = "Texte", color = "#000000") {
        const editor = document.getElementById("editor");

        const textDiv = document.createElement("div");
        textDiv.classList.add("text-wrapper");
        textDiv.contentEditable = true; // Permet d'éditer le texte directement
        textDiv.style.position = "absolute";
        textDiv.style.left = "50px";
        textDiv.style.top = "50px";
        textDiv.style.color = color;
        textDiv.style.fontSize = "24px";
        textDiv.style.cursor = "move";
        textDiv.style.userSelect = "text";
        textDiv.innerText = content;

        editor.appendChild(textDiv);

        // Draggable
        $(textDiv).draggable({
            containment: "#editor"
        });

        // Click pour sélectionner
        textDiv.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            selectText(textDiv);
        });

        // Double-clic pour supprimer
        textDiv.addEventListener("dblclick", () => {
            textDiv.remove();
            if(window.saveState) window.saveState();
        });

        selectText(textDiv);
        if(window.saveState) window.saveState();
    }

    function selectText(element) {
        deselectText();
        selectedText = element;
        element.style.outline = "2px dashed #ff9900"; // contour pour selection
    }

    function deselectText() {
        if(selectedText) {
            selectedText.style.outline = "none";
            selectedText = null;
        }
    }

    // Click sur bouton Ajouter Texte
    document.getElementById("addTextBtn").addEventListener("click", () => {
        const color = document.getElementById("textColor").value;
        addText("Texte", color);
    });

    // Changement couleur texte
    document.getElementById("textColor").addEventListener("input", () => {
        if(selectedText) {
            selectedText.style.color = document.getElementById("textColor").value;
            if(window.saveState) window.saveState();
        }
    });

    // Click dans l'éditeur pour désélection
    document.getElementById("editor").addEventListener("mousedown", (e) => {
        if(!e.target.classList.contains("text-wrapper")) {
            deselectText();
        }
    });
});
