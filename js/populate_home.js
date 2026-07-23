import data from "../json/items.json" with { type: "json" };

import { setupSearch } from "./search.js";


const grid = document.querySelector("#item-grid");





/*
    Remove sold items older than 7 days
*/

function removeExpiredSoldItems(items) {


    const today = new Date();


    return items.filter(item => {


        if (item.status !== "sold") {
            return true;
        }


        if (!item.soldAt) {
            return false;
        }


        const soldDate =
            new Date(item.soldAt);


        const age =
            (today - soldDate)
            /
            (1000 * 60 * 60 * 24);


        return age < 7;

    });

}








/*
    Create element helper
*/

function createElement(
    tag,
    className,
    text = ""
) {


    const element =
        document.createElement(tag);


    if (className) {

        element.className =
            className;

    }


    if (text) {

        element.textContent =
            text;

    }


    return element;

}








/*
    Create product card
*/

function createCard(item) {


    const li =
        createElement(
            "li",
            "item-card"
        );



    const link =
        createElement(
            "a",
            "item-card__link"
        );


    link.href =
        `./item/?id=${item.id}`;






    const image =
        document.createElement("img");


    image.className =
        "item-card__image";


    image.src =
        item.image;


    image.alt =
        item.title;


    image.loading =
        "lazy";



    image.onerror = () => {

        image.src =
            "./assets/placeholder.png";

    };







    const body =
        createElement(
            "div",
            "item-card__body"
        );





    const category =
        createElement(
            "span",
            "item-card__category",
            item.category
        );





    const title =
        createElement(
            "h3",
            "item-card__title",
            item.title
        );





    const description =
        createElement(
            "p",
            "item-card__description",
            item.description ?? ""
        );





    const price =
        createElement(
            "p",
            "item-card__price",
            `$${item.price}`
        );





    const seller =
        createElement(
            "p",
            "item-card__seller",
            `Seller: ${item.seller ?? "Student"}`
        );







    body.append(
        category,
        title,
        description,
        price,
        seller
    );







    if (item.status === "sold") {


        const sold =
            createElement(
                "span",
                "sold",
                "SOLD"
            );


        body.appendChild(sold);


    } else {


        const button =
            createElement(
                "button",
                "item-card__contact-btn",
                "Contact"
            );


        button.type =
            "button";



        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    `Contact seller about ${item.title}`
                );

            }
        );


        body.appendChild(button);

    }







    link.append(
        image,
        body
    );


    li.appendChild(link);



    return li;

}










/*
    Render items
*/

function displayItems(items) {


    grid.replaceChildren();



    if (!items.length) {


        const empty =
            createElement(
                "p",
                "empty-state",
                "No listings available."
            );


        grid.appendChild(empty);


        return;

    }






    items.forEach(item => {


        grid.appendChild(
            createCard(item)
        );


    });


}









/*
    Initialize
*/


const activeItems =
    removeExpiredSoldItems(data);



displayItems(activeItems);



setupSearch(
    activeItems,
    "No listings found."
);