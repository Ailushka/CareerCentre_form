/* -------------------- */
/*  Textarea autoresize */
/* -------------------- */

let textareaList = document.querySelectorAll("textarea");
textareaList.forEach(textarea => {
  textarea.setAttribute("data-autoresize", "");
  textarea.setAttribute("rows", "4");
  textarea.style.overflowY = "hidden";
});


function addAutoResize() {
  document.querySelectorAll('[data-autoresize]').forEach(function (element) {
    const offset = element.offsetHeight - element.clientHeight;
    element.addEventListener('input', function (event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
    element.removeAttribute('data-autoresize');
  });
}

addAutoResize();

/* -------------------- */
/*       Accordeon      */
/* -------------------- */

document.querySelectorAll('.accordeon__button').forEach((item) => {
  item.addEventListener('click', (evt) => {

    const content = evt.target.closest('.accordeon').querySelector('.accordeon__content');

    if (!item.classList.contains('accordeon__button_active'))
    {
      item.classList.add('accordeon__button_active');
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      item.classList.remove('accordeon__button_active');
      content.style.maxHeight = '';
    }



  })
})


let multiselect_block = document.querySelectorAll(".multiselect");
multiselect_block.forEach(parent => {
    let label = parent.querySelector(".multiselect__button");
    let options = parent.querySelectorAll(".checkbox__input");
    let text = label.textContent;
    options.forEach(option => {
      option.addEventListener("change", function(element) {
        let selectedOptions = [];
        selectedOptions = Array.from(options).filter(i => i.checked);

          label.innerHTML = "";
          let container = document.createElement('div');
          container.className = "checkbox-container";
          label.append(container);

              for (let option of selectedOptions) {


                  let button = document.createElement("button");
                  button.type = "button";
                  button.className = "checkbox__button";
                  button.textContent = option.value;
                  button.onclick = (evt) => {
                    evt.stopPropagation();
                    console.log(option);
                      option.checked = false;
                      selectedOptions = Array.from(options).filter(i => i.checked);

                      button.remove();

                      if (!selectedOptions.length) {
                        container.remove();
                        label.textContent = text;
                      }
                  };
                  container.append(button);
              }
              if (!container.hasChildNodes()) {
                container.remove();
                label.textContent = text;
              }
          })
    });

})
