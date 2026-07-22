const menuButton = document.querySelector("#mobile-menu-btn");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {

    const icon = menuButton.querySelector(".material-symbols-outlined");


    const closeMenu = () => {

        mainNav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        if (icon) {
            icon.textContent = "menu";
        }

    };


    menuButton.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");


        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        if (icon) {
            icon.textContent =
                isOpen ? "close" : "menu";
        }

    });


    mainNav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

}