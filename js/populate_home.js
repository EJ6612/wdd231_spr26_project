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
    className = "",
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
    Create item card
*/

function createCard(item) {


    const card =
        createElement(
            "li",
            "item-card"
        );



    const link =
        createElement(
            "a",
            "item-card__link"
        );



    /*
        Item details page
    */

    link.href =
        `./item-details/item-details.html?id=${item.id}`;





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
            "./images/placeholder.png";

    };





    const content =
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



    content.append(
        category,
        title,
        description,
        price,
        seller
    );





    if (item.status === "sold") {


        content.appendChild(

            createElement(
                "span",
                "sold",
                "SOLD"
            )

        );


    } else {


        const contactButton =
            createElement(
                "button",
                "item-card__contact-btn",
                "Contact"
            );



        contactButton.type =
            "button";



        contactButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


                console.log(
                    `Contact seller about ${item.title}`
                );

            }
        );


        content.appendChild(
            contactButton
        );

    }





    link.append(
        image,
        content
    );


    card.appendChild(link);


    return card;

}





/*
    Display listings
*/

function displayItems(items) {


    if (!grid) {

        return;

    }



    grid.replaceChildren();




    if (!items.length) {


        grid.appendChild(

            createElement(
                "p",
                "empty-state",
                "No listings available."
            )

        );


        return;

    }





    items.forEach(item => {


        grid.appendChild(

            createCard(item)

        );


    });

}





/*
    Footer year
*/

function updateFooterYear() {


    const year =
        document.querySelector(".footer__year");



    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}





/*
    Start application
*/


const activeItems =

    Array.isArray(data)

        ? removeExpiredSoldItems(data)

        : [];



displayItems(activeItems);



if (typeof setupSearch === "function") {

    setupSearch(
        activeItems,
        "No listings found."
    );

}



updateFooterYear();