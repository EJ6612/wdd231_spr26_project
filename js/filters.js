import {
    createCard
} from "./item-card.js";



export function setupFilters(
    items,
    grid
){


    const categoryInputs =
        document.querySelectorAll(
            'input[name="category"]'
        );


    const minPrice =
        document.querySelector("#min-price");


    const maxPrice =
        document.querySelector("#max-price");


    const applyButton =
        document.querySelector(
            ".btn--apply-filters"
        );



    function filterItems(){


        const selectedCategories =
            Array.from(categoryInputs)

            .filter(input => input.checked)

            .map(input => input.value);



        const min =
            Number(minPrice.value) || 0;


        const max =
            Number(maxPrice.value) || Infinity;




        return items.filter(item => {



            const categoryMatch =

                selectedCategories.length === 0

                ||

                selectedCategories.includes(
                    item.category
                );



            const priceMatch =

                item.price >= min

                &&

                item.price <= max;



            return (
                categoryMatch
                &&
                priceMatch
            );


        });


    }






    function displayFilteredItems(){


        const results =
            filterItems();



        grid.replaceChildren();



        if(!results.length){


            const empty =
                document.createElement("li");


            empty.className =
                "no-results";


            empty.textContent =
                "No listings found.";


            grid.appendChild(empty);


            return;

        }




        results.forEach(item=>{


            grid.appendChild(

                createCard(item)

            );


        });


    }





    applyButton.addEventListener(
        "click",
        displayFilteredItems
    );



}