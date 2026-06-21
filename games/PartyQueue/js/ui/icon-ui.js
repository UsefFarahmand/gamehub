export async function loadIcons(){

    const response = await fetch("../../data/config.json");

    const config = await response.json();


    document.querySelectorAll("[data-icon]")
    .forEach(element=>{


        const name = element.dataset.icon;


        const value = config.icons[name];


        if(!value) return;



        // اگر تصویر بود

        if(
            /\.(png|jpg|jpeg|svg|webp|gif)$/i.test(value)
        ){

            const img = document.createElement("img");


            img.src = value;

            img.alt = name;

            img.className = "icon-image";


            element.innerHTML = "";

            element.appendChild(img);


        }


        // اگر ایموجی بود

        else{

            element.textContent = value;

        }


    });

}