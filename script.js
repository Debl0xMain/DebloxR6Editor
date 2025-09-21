$(function () {
    let zIndexCounter = 2;
    let selectedIcon = null;
    let selectedArrow = null;
    let arrowMode = false;
    let arrowStart = null;
    let currentArrow = null;

    // -------------------- Historique --------------------
    let history = [];
    let historyIndex = -1;

    function saveState() {
        const state = {
            background: $("#editor img.background").attr("src") || null,
            icons: [],
            arrows: $("#arrowLayer").html()
        };
        $("#editor .icon-wrapper").each(function () {
            const $this = $(this);
            state.icons.push({
                src: $this.find("img").attr("src"),
                left: $this.css("left"),
                top: $this.css("top"),
                width: $this.css("width"),
                height: $this.css("height"),
                z: $this.css("z-index")
            });
        });
        history = history.slice(0, historyIndex + 1);
        history.push(state);
        historyIndex++;
    }

    function loadState(index) {
        if (index < 0 || index >= history.length) return;
        const state = history[index];

        $("#editor").empty().append(`
            <svg id="arrowLayer">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0,10 3.5,0 7" fill="context-stroke"/>
                    </marker>
                </defs>
            </svg>
        `);

        if (state.background) {
            $("#editor").prepend($("<img>").addClass("background").attr("src", state.background));
        }

        $("#arrowLayer").html(state.arrows || "");

        state.icons.forEach(icon => {
            addIcon(icon.src, icon.left, icon.top, icon.width, icon.height, icon.z);
        });

        $("#arrowLayer line").each(function () {
            makeArrowSelectable($(this));
        });
    }

    $(document).on("keydown", function (e) {
        if (e.ctrlKey && e.key === "z" && historyIndex > 0) loadState(--historyIndex);
        if (e.ctrlKey && (e.key === "y" || e.key === "Z") && historyIndex < history.length - 1) loadState(++historyIndex);
    });

    // -------------------- Upload --------------------
    $("#bgInput").on("change", function(e){
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt){
            $("#editor").find("img.background").remove();
            $("#editor").prepend($("<img>").addClass("background").attr("src", evt.target.result));
            saveState();
        };
        reader.readAsDataURL(file);
    });

    $("#iconInput").on("change", function(e){
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(evt){
            addIcon(evt.target.result);
            saveState();
            $("#iconInput").val('');
        };
        reader.readAsDataURL(file);
    });

    // -------------------- Icônes --------------------
    function addIcon(src,left,top,width,height,z){
        const wrapper = $("<div>").addClass("icon-wrapper").css({
            left: left || (Math.random()*($("#editor").width()-100))+"px",
            top: top || (Math.random()*($("#editor").height()-100))+"px",
            width: width || "80px",
            height: height || "80px",
            "z-index": z || ++zIndexCounter
        });

        const img = $("<img>").attr("src",src).attr("draggable","false");
        wrapper.append(img);
        $("#editor").append(wrapper);

        // draggable
        wrapper.draggable({
            containment:"#editor",
            start:function(){ $(this).css("z-index",++zIndexCounter); }
        });

        // resizable dès l'ajout
        wrapper.resizable({
            aspectRatio: true,
            containment: "#editor",
            minWidth: 30,
            minHeight: 30,
            handles: "n, e, s, w, ne, se, sw, nw",
            cancel: "" // permet de cliquer sur l'image
        });

        // clic pour sélection
        wrapper.on("mousedown", function(e){
            e.stopPropagation();
            deselectArrow();
            if(selectedIcon && selectedIcon[0] !== wrapper[0]) deselectIcon(selectedIcon);
            selectIcon(wrapper);
        });

        // double-clic pour supprimer
        wrapper.on("dblclick", function(){
            wrapper.remove();
            saveState();
        });

        return wrapper;
    }

    function selectIcon(wrapper){
        deselectIcon(selectedIcon);
        wrapper.addClass("icon-selected");
        selectedIcon = wrapper;
        $("#deleteBtn").show();
    }

    function deselectIcon(wrapper){
        if(!wrapper) wrapper = selectedIcon;
        if(!wrapper) return;
        wrapper.removeClass("icon-selected");
        selectedIcon = null;
        $("#deleteBtn").hide();
    }

    // -------------------- Flèches --------------------
    function selectArrow(line){
        deselectIcon();
        $("#arrowLayer line").removeClass("arrow-selected");
        line.addClass("arrow-selected");
        selectedArrow = line;
        $("#deleteBtn").show();
    }

    function deselectArrow(){
        if(selectedArrow){
            selectedArrow.removeClass("arrow-selected");
            selectedArrow = null;
            $("#deleteBtn").hide();
        }
    }

    $("#deleteBtn").on("click", function(){
        if(selectedIcon){ selectedIcon.remove(); deselectIcon(); saveState(); }
        if(selectedArrow){ selectedArrow.remove(); deselectArrow(); saveState(); }
    });

    $("#editor").on("mousedown",function(e){
        if(!arrowMode && selectedIcon && !$(e.target).closest(".icon-wrapper").length) deselectIcon();
        if(!arrowMode) deselectArrow();
    });

    $("#arrowModeBtn").on("click", function(){
        arrowMode = !arrowMode;
        $(this).toggleClass("active btn-danger", arrowMode);
    });

    // Création flèche
    $("#editor").on("mousedown", function(e){
        if(!arrowMode) return;
        e.preventDefault();
        const offset = $(this).offset();
        arrowStart = {x:e.pageX - offset.left, y:e.pageY - offset.top};
        const color = $("#arrowColor").val();

        currentArrow = document.createElementNS("http://www.w3.org/2000/svg","line");
        currentArrow.setAttribute("x1",arrowStart.x);
        currentArrow.setAttribute("y1",arrowStart.y);
        currentArrow.setAttribute("x2",arrowStart.x);
        currentArrow.setAttribute("y2",arrowStart.y);
        currentArrow.setAttribute("stroke",color);
        currentArrow.setAttribute("stroke-width",3);
        currentArrow.setAttribute("marker-end","url(#arrowhead)");
        document.getElementById("arrowLayer").appendChild(currentArrow);

        makeArrowSelectable($(currentArrow));
    });

    $("#editor").on("mousemove", function(e){
        if(!currentArrow) return;
        const offset = $(this).offset();
        currentArrow.setAttribute("x2", e.pageX - offset.left);
        currentArrow.setAttribute("y2", e.pageY - offset.top);
    });

    $("#editor").on("mouseup", function(e){
        if(currentArrow) {
            saveState();
            currentArrow = null;
            arrowStart = null;
        }
    });

    function makeArrowSelectable(line){
        line.css('pointer-events','all');
        line.on("mousedown.arrowSelect", function(e){
            e.stopPropagation();
            selectArrow(line);
        });
    }

    $("#arrowColor").on("input", function() {
        const color = $(this).val();
        if(selectedArrow){
            selectedArrow.attr("stroke", color);
        }
    });

    // -------------------- Initialisation --------------------
    saveState();
});
