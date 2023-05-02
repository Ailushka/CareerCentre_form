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

/* -------------------- */
/*      Сбор данных     */
/* -------------------- */

const registrationForm = document.querySelector('.form_type_registration');

// сбор данных из формы

function serializeForm(formNode) {
  const data = new FormData(formNode);
  // const formJSON = Object.fromEntries(data.entries());
  const formJSON = {};
  formJSON.skills = data.getAll('skills');
  formJSON.contacts = {};
  formJSON.contacts.email = data.get('email');
  formJSON.contacts.phone_number = data.get('phone');
  formJSON.contacts.tg_username = data.get('telegram');
  data.delete('email');
  return formJSON;
}

const handleRegistrationFormSubmit = (evt) => {
  console.log('я вызвалась');
  evt.preventDefault();
  const registrationFormData = serializeForm(registrationForm);
  console.log(registrationFormData);
};

registrationForm.addEventListener('submit', handleRegistrationFormSubmit);

/* -------------------- */
/*     Autosuggester    */
/* -------------------- */

const searchBtn = document.querySelector("input[type='search']");
const outputList = document.querySelector(".multiselect-container_type_search");
const checkboxItemTemplateElement = document.querySelector('.template_type_checkbox-item').content;

const renderChildEl = function(e) {
  let searchText = !!e ? e.target.value : '';
  if (searchText.length == 0) {
    outputList.innerHTML = '';
    e.stopPropagation();
    return;
  }

  const filtered = skills.filter(e => e.title.toLowerCase().includes(searchText.toLowerCase()));
  console.log(filtered);

  outputList.textContent = '';
  for (const skill of filtered) {
    const newCheckboxItem = checkboxItemTemplateElement.querySelector('.checkbox__item').cloneNode(true);

    console.log(newCheckboxItem);

    const labelElement = newCheckboxItem.querySelector('.checkbox__label');
    labelElement.insertAdjacentText('beforeend', skill.title);
    labelElement.htmlFor = skill.title;

    const inputElement = newCheckboxItem.querySelector('.checkbox__input');
    inputElement.id = skill.title;
    inputElement.name = 'skills';
    inputElement.value = skill.title;

    console.log(outputList);

    outputList.append(newCheckboxItem);
    // const
    // childsEl += `<li onclick="selectFruit(event)"> ${skill.title}</li>`;
  }
//   console.log(childsEl);
// outputList.innerHTML = childsEl;
}
searchBtn.addEventListener('keyup', renderChildEl);
// const selectFruit = (e) => {
//   searchBtn.value = e.target.textContent.trim();
// }

/* -------------------- */
/*   Accordeon search   */
/* -------------------- */

const accordeonSearchButton = document.querySelector('.accordeon__search-button');

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.querySelectorAll(".checkbox__label");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

accordeonSearchButton.addEventListener('keyup', filterFunction);

/* -------------------- */
/*     Autocomplete     */
/* -------------------- */

const cityInput = document.querySelector("input[name='city']");

function autocomplete(inp, arr) {
  /* функция автозаполнения принимает два аргумента,
  элемент текстового поля и массив возможных значений автозаполнения: */
  var currentFocus;
  /* выполнение функции, когда кто-то пишет в текстовом поле: */
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /* закрыть все уже открытые списки значений автозаполнения */
      closeAllLists();
      if (!val) {
        cityInput.disabled = true;
        return false;
      }
      currentFocus = -1;
      /* создайте элемент DIV, который будет содержать элементы (значения): */
      a = document.createElement("ul");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items multiselect-container list");
      /* добавьте элемент DIV в качестве дочернего элемента контейнера автозаполнения: */
      this.parentNode.appendChild(a);
      /* для каждого элемента в массиве... */
      for (i = 0; i < arr.length; i++) {
        /* проверьте, начинается ли элемент с тех же букв, что и значение текстового поля: */

        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /* создайте элемент DIV для каждого соответствующего элемента: */
          b = document.createElement("li");
          /* сделайте соответствующие буквы жирным шрифтом: */
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /* вставьте поле ввода, которое будет содержать значение текущего элемента массива: */
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /* выполнение функции, когда кто-то нажимает на значение элемента (элемент DIV): */
              b.addEventListener("click", function(e) {
              /* вставьте значение для текстового поля автозаполнения: */
              inp.value = this.getElementsByTagName("input")[0].value;
              cityInput.disabled = false;
              /* закройте список значений автозаполнения,
              (или любые другие открытые списки значений автозаполнения : */
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
      if (!a.childNodes.length) {
        closeAllLists();
      }
  });
  /* выполнение функции нажимает клавишу на клавиатуре: */
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("ul");
      if (e.keyCode == 40) {
        /* Если нажата клавиша со стрелкой вниз,
        увеличение текущей переменной фокуса: */
        currentFocus++;
        /* и сделать текущий элемент более видимым: */
        addActive(x);
      } else if (e.keyCode == 38) { //вверх
        /* Если нажата клавиша со стрелкой вверх,
        уменьшите текущую переменную фокуса: */
        currentFocus--;
        /* и сделать текущий элемент более видимым: */
        addActive(x);
      } else if (e.keyCode == 13) {
        /* Если нажата клавиша ENTER, предотвратите отправку формы, */
        e.preventDefault();
        if (currentFocus > -1) {
          /* и имитировать щелчок по элементу "active": */
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /* функция для классификации элемента как "active": */
    if (!x) return false;
    /* начните с удаления "активного" класса для всех элементов: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*добавить класса "autocomplete-active": */
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /* функция для удаления "активного" класса из всех элементов автозаполнения: */
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /* закройте все списки автозаполнения в документе,
    кроме того, который был передан в качестве аргумента: */
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/* выполнение функции, когда кто-то щелкает в документе: */
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("country-autocomplete"), countries);
