// tab start
let tabMenu=document.querySelectorAll('[data-tab="tab"]');
let tabItem=document.querySelectorAll('.tab-item>div')
tabItem[0].classList.add('active')
tabMenu[0].classList.add('active')

tabMenu.forEach(item=>{
  item.addEventListener('click',toggleActiveTab)
})
function toggleActiveTab(e) {
  tabMenu.forEach((item,i)=>{
    item.classList.remove('active');
  })
  e.target.parentElement.classList.add('active')
}

  //tab end


  