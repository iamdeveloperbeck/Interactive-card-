const checkLength = (element) => {
    if (element.dataset.length < element.value.length) {
        element.value = element.value.slice(0, element.dataset.length);
    } 
    console.log(element.value.length)
    if (element.value.length == 0) {
        resetElement(element)
    }
}

const checkPattern = (element) => {
    return new RegExp(element.pattern).test(element.value);
}

const addSpaces = (element) => {
    console.log(element.value.split(' ').join('').match(/.{1,4}/g).join(' '))
    element.value = element.value.split(' ').join('').match(/.{1,4}/g).join(' ');
}
const changeElement = (element) => {
    if (!checkPattern(element)) {
        element.parentNode.parentNode.querySelector('.input-error').classList.add('visible');
        element.classList.add('wrong');
        return false;
    } else {
        element.parentNode.parentNode.querySelector('.input-error').classList.remove('visible');
        element.classList.remove('wrong');
        return true;
    }
}

const resetPage = () => {
    for (const el of document.querySelectorAll('.input-field')) {
        document.querySelector('.' + el.dataset.input).textContent = el.dataset.base;
        el.value = '';
    }
}; 

const resetElement = (el) => {
    console.log(el.dataset.base)
    document.querySelector('.' + el.dataset.input).textContent = el.dataset.base;
};


for (const el of document.querySelectorAll('.input-field')) {
    el.addEventListener('input', function (e) {
        document.querySelector('.' + e.target.dataset.input).textContent = e.target.value;
        checkLength(e.target);
        changeElement(e.target);
    });
}

document.querySelector("#number").addEventListener("keypress", function (evt) {
    if (evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});

document.querySelector('#number').addEventListener('input', (e) => {
    addSpaces(e.target)
});

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    let b = e.target.querySelector('.button');
    let t = true;
    for (const el of document.querySelectorAll('.input-field')) {
        t = t & changeElement(el);
    }

    if (!t) {
        b.parentNode.querySelector('.input-error').classList.add('visible');
    } else {
        b.parentNode.querySelector('.input-error').classList.remove('visible');
        if (b.textContent === 'Continue') {
            resetPage();
        }
        let a = b.dataset.text;
        b.dataset.text = b.textContent;
        b.textContent = a;
        for (const el of document.querySelectorAll('.to-toggle')) {
            el.classList.toggle('not-displayed');
        }
    }
});