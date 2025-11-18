let slideMain = document.querySelector('[data-slider="slider-main"]')
let item = document.getElementsByClassName('item')
let leftArrow = document.createElement('i')
leftArrow.className = 'icon-circle-left';
let rightArrow = document.createElement('i')
rightArrow.className = 'icon-circle-right';


const secondEle = document.querySelector('[data-slider="slider-main"] :nth-child(2)');
const firstEle = document.querySelector('[data-slider="slider-main"] :nth-child(1)');

secondEle.classList.add("add")
firstEle.classList.add('zero-ele')
let targetElement = document.querySelectorAll('.add img')


targetElement[0].parentNode.insertBefore(leftArrow, targetElement[0]);
targetElement[0].after(rightArrow);

rightArrow.addEventListener("click", function () {
    slideMain.append(item[0])
    arrowFix()
})
leftArrow.addEventListener("click", function () {
    slideMain.prepend(item[item.length - 1])
    arrowFix()
})

const arrowFix = () => {
    Array.from(item).forEach((ele, i) => {
        if (i === 1) {
            ele.childNodes[1].before(leftArrow)
            ele.childNodes[2].after(rightArrow);
            ele.classList.add("add")
        }
        else {
            ele.classList.remove("add")
        }
        if(i===0){
            ele.classList.add("zero-ele")
        }
        else{
            ele.classList.remove("zero-ele")
        }
    })
}
