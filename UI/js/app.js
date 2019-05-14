/* HAMBURGER */
const hamburger = document.querySelector('.hamburger');
const menuList = document.querySelector('.navbar__menu-lsit');
hamburger.addEventListener('click', () => {
    if (menuList.style.display === "block") {
        menuList.style.display = "none";
    } else {
        menuList.style.display = "block";
    }
})
/* END HAMBURGER */

/* MODAL FOR VIEWING TRANSACTIONS */
const btnViewTransaction = document.querySelectorAll('.transaction__item__view ');

btnViewTransaction.forEach(btn => {
    btn.onclick = () => {
        let modal = btn.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
    }
});

const btnCloseTransaction = document.querySelectorAll('.transaction__item__close');

btnCloseTransaction.forEach(btn => {
    btn.onclick = () => {
        let modal = (btn.closest(".modal").style.display = "none");
    }
});
/* END MODAL FOR VIEWING TRANSACTIONS */

/* CONFIRMATION MODAL FOR DELETING AN ACCOUNT*/
const btnDeleteTransaction = document.querySelector('.transaction__item__delete');

btnDeleteTransaction.onclick = () => {
        let modal = btnDeleteTransaction.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
}

const btnCancelDelete = document.querySelector('.transaction__delete__cancel');

btnCancelDelete.onclick = () => {
    (btnCancelDelete.closest(".modal").style.display = "none");
};
/* END CONFIRMATION MODAL FOR DELETING AN ACCOUNT*/

/* MODAL FOR DEBITING/CREDITING A USER ACCOUNT*/
const btnCreditDebit = document.querySelector('.credit-debit');

btnCreditDebit.onclick = () => {
        let modal = btnCreditDebit.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
}

const btnCancelCredDeb = document.querySelector('.cancel-debit-credit');

btnCancelCredDeb.onclick = () => {
    (btnCancelCredDeb.closest(".modal").style.display = "none");
};
/* END MODAL FOR DEBITING/CREDITING A USER ACCOUNT*/