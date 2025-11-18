
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
