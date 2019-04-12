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