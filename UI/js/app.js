/* MODAL FOR VIEWING TRANSACTIONS */
const btnViewTransaction = document.querySelectorAll('.transaction__item__view ');

btnViewTransaction.forEach((button) => {
  const btn = button;
  btn.onclick = () => {
    const modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = 'block';
  };
});

const btnCloseTransaction = document.querySelectorAll('.transaction__item__close');

btnCloseTransaction.forEach((button) => {
  const btn = button;
  btn.onclick = () => {
    btn.closest('.modal').style.display = 'none';
  };
});
/* END MODAL FOR VIEWING TRANSACTIONS */

/* CONFIRMATION MODAL FOR DELETING AN ACCOUNT */
const btnDeleteTransaction = document.querySelector('.transaction__item__delete');

btnDeleteTransaction.onclick = () => {
  const modal = btnDeleteTransaction.getAttribute('data-modal');
  document.getElementById(modal).style.display = 'block';
};

const btnCancelDelete = document.querySelector('.transaction__delete__cancel');

btnCancelDelete.onclick = () => {
  (btnCancelDelete.closest('.modal').style.display = 'none');
};
/* END CONFIRMATION MODAL FOR DELETING AN ACCOUNT */

/* MODAL FOR DEBITING/CREDITING A USER ACCOUNT */
const btnCreditDebit = document.querySelector('.credit-debit');

btnCreditDebit.onclick = () => {
  const modal = btnCreditDebit.getAttribute('data-modal');
  document.getElementById(modal).style.display = 'block';
};

const btnCancelCredDeb = document.querySelector('.cancel-debit-credit');

btnCancelCredDeb.onclick = () => {
  (btnCancelCredDeb.closest('.modal').style.display = 'none');
};
/* END MODAL FOR DEBITING/CREDITING A USER ACCOUNT */
