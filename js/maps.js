document.addEventListener("DOMContentLoaded", () => {
    const mapMenu = document.getElementById("mapMenu");

    // Liste des maps et leurs étages avec images associées
    const maps = {
        "Banque": {
            "Sous-sol": "maps/banque/soussol.jpg",
            "Rez-de-chaussée": "maps/banque/rez.jpg",
            "1er étage": "maps/banque/etage.jpg",
            "Toit": "maps/banque/toit.jpg"
        },
        "Consulat": {
            "Sous-sol": "maps/consulat/soussol.jpg",
            "Rez-de-chaussée": "maps/consulat/rez.jpg",
            "1er étage": "maps/consulat/etage.jpg",
            "Toit": "maps/consulat/toit.jpg"
        },
        "Chalet": {
            "Sous-sol": "maps/chalet/soussol.jpg",
            "Rez-de-chaussée": "maps/chalet/rez.jpg",
            "1er étage": "maps/chalet/etage.jpg",
            "Toit": "maps/chalet/toit.jpg"
        },
        "Villa": {
            "Sous-sol": "maps/villa/soussol.jpg",
            "Rez-de-chaussée": "maps/villa/rez.jpg",
            "1er étage": "maps/villa/etage.jpg",
            "Toit": "maps/villa/toit.jpg"
        },
        "Café": {
            "Rez-de-chaussée": "maps/cafee/rez.jpg",
            "1er étage": "maps/cafee/etage1.jpg",
            "2ème étage": "maps/cafee/etage2.jpg",
            "Toit": "maps/cafee/toit.jpg"
        },
        "Outback": {
            "Rez-de-chaussée": "maps/outback/r6-maps-outback-blueprint-1.jpg",
            "1er étage": "maps/outback/r6-maps-outback-blueprint-2.jpg",
            "Toit": "maps/outback/r6-maps-outback-blueprint-3.jpg"
        },
        "Frontière": {
            "Rez-de-chaussée": "maps/border/r6-maps-border-blueprint-1.jpg",
            "1er étage": "maps/border/r6-maps-border-blueprint-2.jpg",
            "Toit": "maps/border/r6-maps-border-blueprint-3.jpg"
        },
        "Club-House": {
            "Sous-sol": "maps/clubhouse/r6-maps-border-blueprint-1.jpg",
            "Rez-de-chaussée": "maps/clubhouse/r6-maps-border-blueprint-2.jpg",
            "1er étage": "maps/clubhouse/r6-maps-border-blueprint-3.jpg",
            "Toit": "maps/clubhouse/r6-maps-border-blueprint-4.jpg"
        },
        "Littoral": {
            "Rez-de-chaussée": "maps/coastline/r6-maps-coastline-blueprint-1.jpg",
            "1er étage": "maps/coastline/r6-maps-coastline-blueprint-2.jpg",
            "Toit": "maps/coastline/r6-maps-coastline-blueprint-3.jpg"
        },
        "Canal": {
            "Sous-sol 2": "maps/canal/r6-maps-kanal-blueprint-1.jpg",
            "Sous-sol": "maps/canal/r6-maps-kanal-blueprint-2.jpg",
            "Rez-de-chaussée": "maps/canal/r6-maps-kanal-blueprint-3.jpg",
            "1ème étage": "maps/canal/r6-maps-kanal-blueprint-4.jpg",
            "Toit": "maps/canal/r6-maps-kanal-blueprint-5.jpg"
        },
        "Oregon": {
            "Sous-sol": "maps/oregon/r6-maps-oregon-blueprint-1.jpg",
            "Rez-de-chaussée": "maps/oregon/r6-maps-oregon-blueprint-2.jpg",
            "1er étage": "maps/oregon/r6-maps-oregon-blueprint-3.jpg",
            "2ème étage": "maps/oregon/r6-maps-oregon-blueprint-4.jpg",
            "Toit": "maps/oregon/r6-maps-oregon-blueprint-5.jpg"
        },
        "Palais d'émeraude": {
            "Rez-de-chaussée": "maps/emeraldplains/r6-maps-emeraldplains-blueprint-1.jpg",
            "1er étage": "maps/emeraldplains/r6-maps-emeraldplains-blueprint-2.jpg",
            "Toit": "maps/emeraldplains/r6-maps-emeraldplains-blueprint-3.jpg",
        },
        "Parc d'attractions": {
            "Rez-de-chaussée": "maps/themepark/r6-maps-themepark-blueprint-1.jpg",
            "1er étage": "maps/themepark/r6-maps-themepark-blueprint-2.jpg",
            "Toit": "maps/themepark/r6-maps-themepark-blueprint-3.jpg",
        },
        "Repaire": {
            "Rez-de-chaussée": "maps/lair/r6-maps-lair-blueprint-1.jpg",
            "1er étage": "maps/lair/r6-maps-lair-blueprint-2.jpg",
            "2ème étage": "maps/lair/r6-maps-lair-blueprint-3.jpg",
            "Toit": "maps/lair/r6-maps-lair-blueprint-4.jpg",
        },
        "Labo de Nighthaven": {
            "Rez-de-chaussée": "maps/nighthavenlabs/r6-maps-nighthavenlabs-blueprint-1.jpg",
            "1er étage": "maps/nighthavenlabs/r6-maps-nighthavenlabs-blueprint-2.jpg",
            "2ème étage": "maps/nighthavenlabs/r6-maps-nighthavenlabs-blueprint-3.jpg",
            "Toit": "maps/nighthavenlabs/r6-maps-nighthavenlabs-blueprint-4.jpg",
        },
        "Gratte-Ciel": {
            "Rez-de-chaussée": "maps/skyscraper/r6-maps-skyscraper-blueprint-1.jpg",
            "1er étage": "maps/skyscraper/r6-maps-skyscraper-blueprint-2.jpg",
            "2ème étage": "maps/skyscraper/r6-maps-skyscraper-blueprint-3.jpg",
        },
    };

    // Génération dynamique du menu
    Object.keys(maps).forEach(mapName => {
        const li = document.createElement("li");
        li.classList.add("dropdown-submenu", "dropend");

        const a = document.createElement("a");
        a.className = "dropdown-item dropdown-toggle";
        a.href = "#";
        a.textContent = mapName;

        const subMenu = document.createElement("ul");
        subMenu.className = "dropdown-menu";

        // Ajout des étages
        Object.keys(maps[mapName]).forEach(etage => {
            const etageItem = document.createElement("li");
            const etageLink = document.createElement("a");
            etageLink.className = "dropdown-item";
            etageLink.href = "#";
            etageLink.textContent = etage;

            etageLink.addEventListener("click", (e) => {
                e.preventDefault();
                loadMap(mapName, etage, maps[mapName][etage]);
            });

            etageItem.appendChild(etageLink);
            subMenu.appendChild(etageItem);
        });

        li.appendChild(a);
        li.appendChild(subMenu);
        mapMenu.appendChild(li);
    });

    // Fonction pour charger l’image dans l’éditeur
    function loadMap(mapName, etage, filePath) {
        console.log(`Chargement : ${mapName} - ${etage} (${filePath})`);

        const editor = document.getElementById("editor");
        $(editor).find("img.background").remove();

        const img = document.createElement("img");
        img.classList.add("background");
        img.src = filePath;
        editor.prepend(img);

        if (window.saveState) window.saveState();
    }

    // Gestion des sous-menus (sinon Bootstrap ne les ouvre pas)
    document.querySelectorAll(".dropdown-submenu > a").forEach(el => {
        el.addEventListener("mouseenter", function () {
            const submenu = this.nextElementSibling;
            if (submenu) submenu.classList.add("show");
        });
        el.addEventListener("mouseleave", function () {
            const submenu = this.nextElementSibling;
            if (submenu) submenu.classList.remove("show");
        });
    });
});
