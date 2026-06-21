import {
    openModal,
    closeModal
}
from "./modal-ui.js";

export function initMobileUI(){

    document
        .getElementById("leaderboardBtn")
        ?.addEventListener(
            "click",
            ()=>openModal(
                "leaderboardModal"
            )
        );

    document
        .getElementById("logBtn")
        ?.addEventListener(
            "click",
            ()=>openModal(
                "logModal"
            )
        );

    document
        .getElementById("chatBtn")
        ?.addEventListener(
            "click",
            ()=>openModal(
                "chatModal"
            )
        );

    document
        .querySelectorAll(
            ".closeModal"
        )
        .forEach(btn=>{

            btn.addEventListener(
                "click",
                ()=>{

                    btn
                        .closest(".modal")
                        ?.classList.add(
                            "hidden"
                        );

                }
            );

        });

}

export function initMobileTabs(){


    const partyButton =
        document.getElementById("partyTab");


    const trashButton =
        document.getElementById("trashTab");


    const party =
        document.getElementById("partyArea");


    const trash =
        document.getElementById("trashArea");




    function closePanels(){


        party?.classList.remove("mobile-open");

        trash?.classList.remove("mobile-open");

        document.body.classList.remove("popup-open");


        // مهم: ریست کردن state دکمه‌ها
        partyButton?.classList.remove("active");

        trashButton?.classList.remove("active");

    }






    partyButton?.addEventListener("click", ()=>{


        const isOpen =
            party?.classList.contains("mobile-open");


        closePanels();


        // toggle behavior
        if(!isOpen){

            party?.classList.add("mobile-open");

            partyButton.classList.add("active");

            document.body.classList.add("popup-open");
        }

    });






    trashButton?.addEventListener("click", ()=>{


        const isOpen =
            trash?.classList.contains("mobile-open");


        closePanels();


        if(!isOpen){

            trash?.classList.add("mobile-open");

            trashButton.classList.add("active");

            document.body.classList.add("popup-open");
        }

    });






    // close by clicking outside panel
    [party, trash].forEach(panel=>{


        panel?.addEventListener("click", e=>{


            if(e.target === panel){

                closePanels();

            }

        });

    });

}

export function syncMobilePanels(){

    if(window.innerWidth > 900){

        return;
    }
    
    const desktopBoard =
        document.getElementById(
            "leaderboardRows"
        );

    const mobileBoard =
        document.getElementById(
            "mobileLeaderboardContent"
        );

    if(
        desktopBoard &&
        mobileBoard
    ){

        mobileBoard.innerHTML =
            desktopBoard.innerHTML;
    }

    const desktopLog =
        document.getElementById(
            "logEntries"
        );

    const mobileLog =
        document.getElementById(
            "mobileLogContent"
        );

    if(
        desktopLog &&
        mobileLog
    ){

        mobileLog.innerHTML =
            desktopLog.innerHTML;
    }
}