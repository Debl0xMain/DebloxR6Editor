document.addEventListener("DOMContentLoaded", () => {
    // ================================
    // Système d'icônes avec préfixe faEditor
    // ================================
    window.faEditorIconSystem = (function () {
        let faEditorZIndex = 2;
        let faEditorSelectedIcon = null;
        let faEditorIconColor = "#ff0000"; // couleur par défaut

        // Changer la couleur des nouvelles icônes
        function faEditorSetColor(color) {
            faEditorIconColor = color;
        }

        function faEditorAddIcon(iconClass, editorSelector = "#editor", deleteBtnSelector = "#deleteBtn", left, top, size, z) {
            const wrapper = $("<div>").addClass("faEditor-icon-wrapper").css({
                left: left || (Math.random() * ($(editorSelector).width() - 100)) + "px",
                top: top || (Math.random() * ($(editorSelector).height() - 100)) + "px",
                width: size || "80px",
                height: size || "80px",
                "z-index": z || ++faEditorZIndex,
                position: "absolute",
                cursor: "move",
                display: "flex",
                "align-items": "center",
                "justify-content": "center"
            });

            // Création de l'icône <i> Font Awesome
            const icon = $(`<i class="${iconClass} faEditor-icon"></i>`).css({
                color: faEditorIconColor,
                "font-size": "2rem",
                "display": "inline-block",
                "font-family": "Font Awesome 6 Free",
                "font-weight": 900
            });
            wrapper.append(icon);
            $(editorSelector).append(wrapper);

            // Ajuster la taille de l'icône au wrapper
            const updateSize = () => {
                const w = wrapper.width();
                const h = wrapper.height();
                const newSize = Math.min(w, h) * 0.8;
                icon.css("font-size", newSize + "px");
            };
            updateSize();

            // draggable
            wrapper.draggable({
                containment: editorSelector,
                start: function () { $(this).css("z-index", ++faEditorZIndex); }
            });

            // resizable
            wrapper.resizable({
                aspectRatio: true,
                containment: editorSelector,
                minWidth: 30,
                minHeight: 30,
                resize: updateSize
            });

            wrapper.find(".ui-resizable-handle").hide();

            // clic pour sélectionner
            wrapper.on("mousedown", function (e) {
                e.stopPropagation();
                faEditorDeselectIcon(deleteBtnSelector);
                faEditorSelectIcon(wrapper, deleteBtnSelector);
            });

            // double-clic pour supprimer
            wrapper.on("dblclick", function () {
                wrapper.remove();
                faEditorDeselectIcon(deleteBtnSelector);
            });

            return wrapper;
        }

        function faEditorSelectIcon(wrapper, deleteBtnSelector = "#deleteBtn") {
            faEditorDeselectIcon(deleteBtnSelector);
            wrapper.addClass("faEditor-icon-selected");
            wrapper.find(".ui-resizable-handle").show();
            faEditorSelectedIcon = wrapper;
            $(deleteBtnSelector).show();
        }

        function faEditorDeselectIcon(deleteBtnSelector = "#deleteBtn") {
            if (!faEditorSelectedIcon) return;
            faEditorSelectedIcon.removeClass("faEditor-icon-selected");
            faEditorSelectedIcon.find(".ui-resizable-handle").hide();
            faEditorSelectedIcon = null;
            $(deleteBtnSelector).hide();
        }

        // clic dans l’éditeur pour désélectionner
        $("#editor").on("mousedown", function (e) {
            if (!$(e.target).closest(".faEditor-icon-wrapper").length) faEditorDeselectIcon();
        });

        // bouton supprimer
        $("#deleteBtn").on("click", function () {
            if (faEditorSelectedIcon) {
                faEditorSelectedIcon.remove();
                faEditorSelectedIcon = null;
                $(this).hide();
            }
        });

        return {
            addIcon: faEditorAddIcon,
            selectIcon: faEditorSelectIcon,
            deselectIcon: faEditorDeselectIcon,
            setColor: faEditorSetColor
        };
    })();

    // ================================
    // Gestion couleur pour nouvelles icônes
    // ================================
    const faEditorColorInput = document.getElementById("faEditorIconColor");
    if (faEditorColorInput) {
        faEditorColorInput.addEventListener("input", () => {
            window.faEditorIconSystem.setColor(faEditorColorInput.value);
        });
    }

    // ================================
    // Gestion recherche d’icônes
    // ================================
    const faEditorAllIcons = [
        "fa-solid fa-bomb",           // Bombe
        "fa-solid fa-gun",            // Arme à feu
        "fa-solid fa-shield-halved",  // Bouclier
        "fa-solid fa-user",           // Personnage
        "fa-solid fa-users",          // Groupe
        "fa-solid fa-headset",        // Casque
        "fa-solid fa-microphone",     // Microphone
        "fa-solid fa-helmet-safety",  // Casque de sécurité
        "fa-solid fa-map-marker-alt", // Marqueur sur la carte
        "fa-solid fa-crosshairs",     // Viseur
        "fa-solid fa-bullseye",       // Cible
        "fa-solid fa-eye",            // Surveillance
        "fa-solid fa-battery-half",   // Batterie
        "fa-solid fa-cogs",           // Engrenages
        "fa-solid fa-broadcast-tower",// Antenne
        "fa-solid fa-bolt",           // Éclair
        "fa-solid fa-bullhorn",       // Haut-parleur
        "fa-solid fa-battery-quarter",// Batterie faible
        "fa-solid fa-battery-full",   // Batterie pleine
        "fa-solid fa-battery-empty",  // Batterie vide
        "fa-solid fa-battery-three-quarters", // Batterie 3/4
        "fa-solid fa-battery",        // Batterie (générique)
        "fa-solid fa-star",          // étoile / objectif
        "fa-solid fa-heart",         // santé / vie
        "fa-solid fa-tree",          // environnement / cache
        "fa-solid fa-car",           // véhicule
        "fa-solid fa-user",          // joueur / opérateur
        "fa-solid fa-users",         // équipe
        "fa-solid fa-house",         // bâtiment / zone
        "fa-solid fa-bomb",          // bombe / explosif
        "fa-solid fa-ghost",         // furtif / invisibilité
        "fa-solid fa-dragon",        // boss / ennemi spécial
        "fa-solid fa-shield-halved", // bouclier / défense
        "fa-solid fa-dog",           // drone / animal
        "fa-solid fa-cat",           // animal / distraction
        "fa-solid fa-plane",         // aéronef / drone aérien
        "fa-solid fa-gun",           // arme à feu
        "fa-solid fa-crosshairs",    // viseur / ciblage
        "fa-solid fa-bullseye",      // objectif / point stratégique
        "fa-solid fa-eye",           // surveillance / observation
        "fa-solid fa-map-marker-alt",// point d’intérêt / marqueur
        "fa-solid fa-bolt",          // alerte / action rapide
        "fa-solid fa-bullhorn",      // communication / annonce
        "fa-solid fa-cogs",          // équipement / gadget
        "fa-solid fa-wifi",          // communication / réseau
        "fa-solid fa-microchip",     // électronique / gadget
        "fa-solid fa-satellite",     // drone / satellite
        "fa-solid fa-lock",          // verrou / sécurisation
        "fa-solid fa-unlock",        // déverrouillage
        "fa-solid fa-fire",          // danger / explosion
        "fa-solid fa-skull",         // élimination / mort
        "fa-solid fa-hand-paper",    // arrêt / défense
        "fa-solid fa-hand-rock",     // attaque / coup
        "fa-solid fa-hand-scissors", // diversion / stratégie
        "fa-solid fa-battery-half",  // énergie / batterie gadget
        "fa-solid fa-battery-full",  // énergie pleine
        "fa-solid fa-battery-empty",  // énergie vide
        "fa-solid fa-star",          // étoile / objectif
        "fa-solid fa-heart",         // santé / vie
        "fa-solid fa-tree",          // environnement / cache
        "fa-solid fa-car",           // véhicule
        "fa-solid fa-user",          // joueur / opérateur
        "fa-solid fa-users",         // équipe
        "fa-solid fa-house",         // bâtiment / zone
        "fa-solid fa-bomb",          // bombe / explosif
        "fa-solid fa-ghost",         // furtif / invisibilité
        "fa-solid fa-dragon",        // boss / ennemi spécial
        "fa-solid fa-shield-halved", // bouclier / défense
        "fa-solid fa-dog",           // drone / animal
        "fa-solid fa-cat",           // animal / distraction
        "fa-solid fa-plane",         // aéronef / drone aérien
        "fa-solid fa-gun",           // arme à feu
        "fa-solid fa-crosshairs",    // viseur / ciblage
        "fa-solid fa-bullseye",      // objectif / point stratégique
        "fa-solid fa-eye",           // surveillance / observation
        "fa-solid fa-map-marker-alt",// point d’intérêt / marqueur
        "fa-solid fa-bolt",          // alerte / action rapide
        "fa-solid fa-bullhorn",      // communication / annonce
        "fa-solid fa-cogs",          // équipement / gadget
        "fa-solid fa-wifi",          // communication / réseau
        "fa-solid fa-microchip",     // électronique / gadget
        "fa-solid fa-satellite",     // drone / satellite
        "fa-solid fa-lock",          // verrou / sécurisation
        "fa-solid fa-unlock",        // déverrouillage
        "fa-solid fa-fire",          // danger / explosion
        "fa-solid fa-skull",         // élimination / mort
        "fa-solid fa-hand-paper",    // arrêt / défense
        "fa-solid fa-hand-rock",     // attaque / coup
        "fa-solid fa-hand-scissors", // diversion / stratégie
        "fa-solid fa-battery-half",  // énergie / batterie gadget
        "fa-solid fa-battery-full",  // énergie pleine
        "fa-solid fa-battery-empty"  // énergie vide
    ];

    const faEditorSearchInput = document.getElementById("faEditorIconSearchInput");
    const faEditorResultsContainer = document.getElementById("faEditorIconResults");

    function faEditorRenderIcons(query = "") {
        faEditorResultsContainer.innerHTML = "";
        const filtered = faEditorAllIcons.filter(icon =>
            icon.toLowerCase().includes(query.toLowerCase())
        );

        filtered.forEach(iconClass => {
            const btn = document.createElement("button");
            btn.className = "fa-btn btn btn-light m-1";
            btn.innerHTML = `<i class="${iconClass}"></i>`;
            btn.onclick = () => window.faEditorIconSystem.addIcon(iconClass);
            faEditorResultsContainer.appendChild(btn);
        });
    }

    if (faEditorSearchInput && faEditorResultsContainer) {
        faEditorSearchInput.addEventListener("input", () => faEditorRenderIcons(faEditorSearchInput.value));
        faEditorRenderIcons(); // affichage initial
    }
});
