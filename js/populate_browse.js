import data from "../json/items.json" with { type: "json" };

import {
    createCard
} from "./populate_home.js";


import {
    setupSearch
} from "./search.js";





const grid =
    document.querySelector("#item-grid");






function removeExpiredSoldItems(items) {


    const today =
        new Date();



    return items.filter(item => {


        if(item.status !== "sold") {

            return true;

        }



        if(!item.soldAt) {

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








function displayItems(items) {


    grid.replaceChildren();




    if(!items.length) {


        const empty =
            document.createElement("li");


        empty.className =
            "no-results";


        empty.textContent =
            "No listings found.";


        grid.appendChild(empty);


        return;

    }






    items.forEach(item => {


        grid.appendChild(
            createCard(item)
        );


    });



}








const activeItems =
    removeExpiredSoldItems(data);





displayItems(activeItems);





setupSearch(
    activeItems,
    "No listings found."
);