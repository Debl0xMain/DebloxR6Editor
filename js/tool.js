document.addEventListener("DOMContentLoaded", () => {
    const tools = [
        "wall","rotation","shield","barbele",
    ];

    const menu = document.getElementById("toolsMenu");
    menu.innerHTML = "";

    tools.forEach(name => {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "dropdown-item d-flex flex-column align-items-center justify-content-center";
        a.style.width = "calc(100% / 7 - 5px)";
        a.style.padding = "2px";
        a.innerHTML = `
            <img src="tools/${name}.svg" alt="${name}" style="width:40px; height:40px; margin-bottom:2px;">
            <span style="font-size:0.7rem; text-align:center;">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
        `;
        menu.appendChild(a);

        a.addEventListener("click", () => {
            window.iconSystem.addIcon(`tools/${name}.svg`);
            const dropdown = bootstrap.Dropdown.getOrCreateInstance(document.getElementById("attaqueDropdown"));
            dropdown.hide();
        });
    });
});
