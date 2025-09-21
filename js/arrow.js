document.addEventListener("DOMContentLoaded", () => {
    let arrowMode = false;
    let arrowStart = null;
    let currentArrow = null;
    let selectedArrow = null;
    const arrowHistory = []; // ← Historique des flèches créées

    // -------------------- Sélection/désélection --------------------
    function selectArrow(line) {
        deselectArrow();
        $(line).addClass("arrow-selected");
        selectedArrow = $(line);
        $("#deleteBtn").show();
    }

    function deselectArrow() {
        if (selectedArrow) {
            selectedArrow.removeClass("arrow-selected");
            selectedArrow = null;
            $("#deleteBtn").hide();
        }
    }

    function makeArrowSelectable(line) {
        line.css('pointer-events', 'all');

        line.on("mousedown.arrowSelect", function (e) {
            e.stopPropagation();
            selectArrow(line);
        });

        line.on("dblclick.arrowDelete", function (e) {
            e.stopPropagation();
            const index = arrowHistory.indexOf(line[0]);
            if (index > -1) arrowHistory.splice(index, 1); // Supprime de l'historique
            line.remove();
            deselectArrow();
            if (window.saveState) window.saveState();
        });
    }

    // -------------------- Bouton supprimer --------------------
    $("#deleteBtn").on("click", function () {
        if (selectedArrow) {
            const index = arrowHistory.indexOf(selectedArrow[0]);
            if (index > -1) arrowHistory.splice(index, 1); // Supprime de l'historique
            selectedArrow.remove();
            deselectArrow();
            if (window.saveState) window.saveState();
        }
    });

    // -------------------- Mode flèche --------------------
    $("#arrowModeBtn").on("click", function () {
        arrowMode = !arrowMode;
        $(this).toggleClass("active btn-danger", arrowMode);
    });

    // -------------------- Création flèche --------------------
    $("#editor").on("mousedown", function (e) {
        if (!arrowMode) return;
        e.preventDefault();

        const offset = $(this).offset();
        arrowStart = { x: e.pageX - offset.left, y: e.pageY - offset.top };
        const color = $("#arrowColor").val();

        currentArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        currentArrow.setAttribute("x1", arrowStart.x);
        currentArrow.setAttribute("y1", arrowStart.y);
        currentArrow.setAttribute("x2", arrowStart.x);
        currentArrow.setAttribute("y2", arrowStart.y);
        currentArrow.setAttribute("stroke", color);
        currentArrow.setAttribute("stroke-width", 3);
        currentArrow.setAttribute("marker-end", "url(#arrowhead)");

        document.getElementById("arrowLayer").appendChild(currentArrow);
        makeArrowSelectable($(currentArrow));

        arrowHistory.push(currentArrow); // ← Ajoute la flèche à l'historique
    });

    $("#editor").on("mousemove", function (e) {
        if (!currentArrow) return;
        const offset = $(this).offset();
        currentArrow.setAttribute("x2", e.pageX - offset.left);
        currentArrow.setAttribute("y2", e.pageY - offset.top);
    });

    $("#editor").on("mouseup", function (e) {
        if (currentArrow) {
            if (window.saveState) window.saveState();
            currentArrow = null;
            arrowStart = null;

            // Désactive automatiquement le mode flèche
            arrowMode = false;
            $("#arrowModeBtn").removeClass("active btn-danger");
        }
    });

    // -------------------- Changement couleur --------------------
    $("#arrowColor").on("input", function () {
        const color = $(this).val();
        if (selectedArrow) {
            selectedArrow.attr("stroke", color);
            if (window.saveState) window.saveState();
        }
    });

    // -------------------- Click dans editor désélection --------------------
    $("#editor").on("mousedown", function (e) {
        if (!arrowMode) deselectArrow();
    });

    // -------------------- Undo Ctrl+Z --------------------
    $(document).on("keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
            e.preventDefault();
            const lastArrow = arrowHistory.pop();
            if (lastArrow) {
                lastArrow.remove();
                deselectArrow();
                if (window.saveState) window.saveState();
            }
        }
    });
});
