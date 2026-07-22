export function createElement(
    tag,
    className = "",
    text = ""
){

    const element =
        document.createElement(tag);


    if(className){
        element.className = className;
    }


    if(text){
        element.textContent = text;
    }


    return element;

}




export function createCard(item){


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


    link.href =
        `../item-details/item-details.html?id=${item.id}`;



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
            "../images/placeholder.png";

    };



    const body =
        createElement(
            "div",
            "item-card__body"
        );



    body.append(

        createElement(
            "span",
            "item-card__category",
            item.category
        ),


        createElement(
            "h3",
            "item-card__title",
            item.title
        ),


        createElement(
            "p",
            "item-card__description",
            item.description ?? ""
        ),


        createElement(
            "p",
            "item-card__price",
            `$${item.price}`
        )

    );



    link.append(
        image,
        body
    );


    card.appendChild(link);


    return card;

}