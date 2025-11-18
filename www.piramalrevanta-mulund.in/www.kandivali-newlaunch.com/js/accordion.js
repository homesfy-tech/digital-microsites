   // type 1

   var accItem = document.getElementsByClassName('accordionItem');
   var accHD = document.getElementsByClassName('accordionItemHeading');
   for (i = 0; i < accHD.length; i++) {
     accHD[i].addEventListener('click', toggleItem, false);
   }
   function toggleItem() {
     var itemClass = this.parentNode.className;
     console.log(itemClass, "itemClass")
     for (i = 0; i < accItem.length; i++) {
       accItem[i].className = 'accordionItem close';
     }
     if (itemClass == 'accordionItem close') {
       this.parentNode.className = 'accordionItem open';
     }
   }

   // type2

   let items = document.querySelectorAll(".accordion .accordion__item");
   items.forEach(function (t) {
     t.addEventListener("click", function (e) {
       items.forEach(function (e) {
         e !== t || e.classList.contains("open")
           ? e.classList.remove("open")
           : e.classList.add("open");
       });
     });
   });
