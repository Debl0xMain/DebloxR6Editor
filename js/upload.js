document.addEventListener("DOMContentLoaded", () => {
    window.uploadIconEditorSystem = (function () {
        let zIndexCounter = 2;
        let selectedUploadIcon = null;
        let iconColor = "#ff0000"; // couleur par défaut

        function setColor(color) {
            iconColor = color;
            if (selectedUploadIcon) {
                selectedUploadIcon.find("img").css("filter", `drop-shadow(0 0 0 ${iconColor})`);
            }
        }

        function addUploadIcon(src, editorSelector = "#editor", deleteBtnSelector = "#deleteBtn", left, top, width, height, z) {
            const wrapper = $("<div>").addClass("upload-icon-wrapper").css({
                left: left || (Math.random() * ($(editorSelector).width() - 100)) + "px",
                top: top || (Math.random() * ($(editorSelector).height() - 100)) + "px",
                width: width || "80px",
                height: height || "80px",
                "z-index": z || ++zIndexCounter,
                position: "absolute",
                cursor: "move",
                display: "flex",
                "align-items": "center",
                "justify-content": "center"
            });

            const img = $("<img>").attr("src", src).attr("draggable", "false").css({
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: `drop-shadow(0 0 0 ${iconColor})`
            });
            wrapper.append(img);
            $(editorSelector).append(wrapper);

            wrapper.draggable({
                containment: editorSelector,
                start: function () { $(this).css("z-index", ++zIndexCounter); }
            });

            wrapper.resizable({
                aspectRatio: true,
                containment: editorSelector,
                minWidth: 30,
                minHeight: 30
            });

            wrapper.on("mousedown", function (e) {
                e.stopPropagation();
                deselectUploadIcon(deleteBtnSelector);
                selectUploadIcon(wrapper, deleteBtnSelector);
            });

            wrapper.on("dblclick", function () {
                wrapper.remove();
                deselectUploadIcon(deleteBtnSelector);
            });

            return wrapper;
        }

        function selectUploadIcon(wrapper, deleteBtnSelector = "#deleteBtn") {
            deselectUploadIcon(deleteBtnSelector);
            wrapper.addClass("upload-icon-selected");
            selectedUploadIcon = wrapper;
            $(deleteBtnSelector).show();
        }

        function deselectUploadIcon(deleteBtnSelector = "#deleteBtn") {
            if (!selectedUploadIcon) return;
            selectedUploadIcon.removeClass("upload-icon-selected");
            selectedUploadIcon = null;
            $(deleteBtnSelector).hide();
        }

        $("#editor").on("mousedown", function (e) {
            if (!$(e.target).closest(".upload-icon-wrapper").length) deselectUploadIcon();
        });

        $("#deleteBtn").on("click", function () {
            if (selectedUploadIcon) {
                selectedUploadIcon.remove();
                selectedUploadIcon = null;
                $(this).hide();
            }
        });

        return { addUploadIcon, setColor, selectUploadIcon, deselectUploadIcon };
    })();

    const colorInput = document.getElementById("iconColor");
    if (colorInput) {
        colorInput.addEventListener("input", () => {
            window.uploadIconEditorSystem.setColor(colorInput.value);
        });
    }

    const uploadInputModal = document.getElementById("uploadIconInputModal");
    if (uploadInputModal) {
        uploadInputModal.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (evt) {
                window.uploadIconEditorSystem.addUploadIcon(evt.target.result);
                uploadInputModal.value = "";
                // fermer la modale automatiquement après upload
                const modal = bootstrap.Modal.getInstance(document.getElementById("uploadIconModal"));
                modal.hide();
            };
            reader.readAsDataURL(file);
        });
    }
});
