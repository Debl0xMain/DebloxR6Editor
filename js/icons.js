document.addEventListener("DOMContentLoaded", () => {
    window.iconSystem = (function () {
        let zIndexCounter = 2;
        let selectedIcon = null;

        function addIcon(src, editorSelector = "#editor", deleteBtnSelector = "#deleteBtn", left, top, width, height, z) {
            const wrapper = $("<div>").addClass("icon-wrapper").css({
                left: left || (Math.random() * ($(editorSelector).width() - 100)) + "px",
                top: top || (Math.random() * ($(editorSelector).height() - 100)) + "px",
                width: width || "80px",
                height: height || "80px",
                "z-index": z || ++zIndexCounter
            });

            const img = $("<img>").attr("src", src).attr("draggable", "false");
            wrapper.append(img);
            $(editorSelector).append(wrapper);

            // draggable
            wrapper.draggable({
                containment: editorSelector,
                start: function () { $(this).css("z-index", ++zIndexCounter); }
            });

            // resizable avec handles cachés par défaut
            wrapper.resizable({
                aspectRatio: true,
                containment: editorSelector,
                minWidth: 30,
                minHeight: 30,
                handles: "n, e, s, w, ne, se, sw, nw",
                cancel: ""
            });

            // cacher les handles tant que l'icône n'est pas sélectionnée
            wrapper.find(".ui-resizable-handle").hide();

            // clic pour sélectionner
            wrapper.on("mousedown", function (e) {
                e.stopPropagation();
                deselectIcon(deleteBtnSelector);
                selectIcon(wrapper, deleteBtnSelector);
            });

            // double-clic pour supprimer
            wrapper.on("dblclick", function () {
                wrapper.remove();
                deselectIcon(deleteBtnSelector);
            });

            return wrapper;
        }

        function selectIcon(wrapper, deleteBtnSelector = "#deleteBtn") {
            deselectIcon(deleteBtnSelector);
            wrapper.addClass("icon-selected");
            wrapper.find(".ui-resizable-handle").show();
            selectedIcon = wrapper;
            $(deleteBtnSelector).show();
        }

        function deselectIcon(deleteBtnSelector = "#deleteBtn") {
            if (!selectedIcon) return;
            selectedIcon.removeClass("icon-selected");
            selectedIcon.find(".ui-resizable-handle").hide();
            selectedIcon = null;
            $(deleteBtnSelector).hide();
        }

        // clic dans l’éditeur pour désélectionner
        $("#editor").on("mousedown", function (e) {
            if (!$(e.target).closest(".icon-wrapper").length) deselectIcon();
        });

        // bouton supprimer
        $("#deleteBtn").on("click", function () {
            if (selectedIcon) {
                selectedIcon.remove();
                selectedIcon = null;
                $(this).hide();
            }
        });

        return {
            addIcon,
            selectIcon,
            deselectIcon
        };
    })();
});
