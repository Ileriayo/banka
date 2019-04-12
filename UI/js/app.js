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

/* CONFIRMATION MODAL FOR  DELETING A TRANSACTION*/
const btnDeleteTransaction = document.querySelector('.transaction__item__delete');

btnDeleteTransaction.onclick = () => {
        let modal = btnDeleteTransaction.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
}

const btnCancelDelete = document.querySelector('.transaction__delete__cancel');

btnCancelDelete.onclick = () => {
    (btnCancelDelete.closest(".modal").style.display = "none");
};
/* END CONFIRMATION MODAL FOR  DELETING A TRANSACTION*/