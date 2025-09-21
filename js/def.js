document.addEventListener("DOMContentLoaded", () => {
    const defenseurs = [
        "recruit", "smoke", "mute", "castle", "pulse", "doc", "rook", "kapkan", "tachanka",
        "jager", "bandit", "frost", "valkyrie", "caveira", "echo", "mira", "lesion",
        "ela", "vigil", "maestro", "alibi", "clash", "kaid", "mozzie", "warden",
        "goyo", "wamai", "oryx", "melusi", "aruni", "thorn", "azami", "solis", "fenrir", "tubarao", "skopos", "denari",
    ];

    const menu = document.getElementById("defenseurMenu");
    menu.innerHTML = "";

    defenseurs.forEach(name => {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "dropdown-item d-flex flex-column align-items-center justify-content-center";
        a.style.width = "calc(100% / 7 - 5px)";
        a.style.padding = "2px";
        a.innerHTML = `
            <img src="defenseur/${name}.svg" alt="${name}" style="width:40px; height:40px; margin-bottom:2px;">
            <span style="font-size:0.7rem; text-align:center;">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
        `;
        menu.appendChild(a);

        a.addEventListener("click", () => {
            window.iconSystem.addIcon(`defenseur/${name}.svg`);
            const dropdown = bootstrap.Dropdown.getOrCreateInstance(document.getElementById("defenseurDropdown"));
            dropdown.hide();
        });
    });
});
