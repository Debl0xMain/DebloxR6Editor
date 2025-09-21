document.addEventListener("DOMContentLoaded", () => {
    const attaquants = [
        "recruit", "sledge", "thatcher", "ash", "thermite", "twitch", "montagne", "glaz",
        "fuze", "blitz", "iq", "buck", "capitao", "blackbeard", "hibana",
        "jackal", "ying", "zofia", "dokkaebi", "lion", "finka", "maverick",
        "nomad", "gridlock", "nokk", "amaru", "kali", "iana", "ace",
        "flores", "osa", "sens", "grim", "brava", "ram", "deimos", "rauora"
    ];

    const menu = document.getElementById("attaqueMenu");
    menu.innerHTML = "";

    attaquants.forEach(name => {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "dropdown-item d-flex flex-column align-items-center justify-content-center";
        a.style.width = "calc(100% / 7 - 5px)";
        a.style.padding = "2px";
        a.innerHTML = `
            <img src="attaque/${name}.svg" alt="${name}" style="width:40px; height:40px; margin-bottom:2px;">
            <span style="font-size:0.7rem; text-align:center;">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
        `;
        menu.appendChild(a);

        a.addEventListener("click", () => {
            window.iconSystem.addIcon(`attaque/${name}.svg`);
            const dropdown = bootstrap.Dropdown.getOrCreateInstance(document.getElementById("attaqueDropdown"));
            dropdown.hide();
        });
    });
});
