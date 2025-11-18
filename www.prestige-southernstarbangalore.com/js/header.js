
function openNav() {
    document.getElementById("navbarSupportedContent").style.width = "200px";
    document.getElementById("overlay").style.display = "block";
  
  }
  function closeNav() {
    document.getElementById("navbarSupportedContent").style.width = "0";
    document.getElementById("overlay").style.display = "none";
  }

  document.addEventListener('mouseup', function (e) {
    document.getElementById("navbarSupportedContent").style.width = "0";
    document.getElementById("overlay").style.display = "none";
  });

window.onscroll = () => {
    let ele= document.getElementById("navbar-area-nav")
      if(window.scrollY>120)
      {
        ele.classList.add("is-sticky")
      }
      else{
        ele.classList.remove("is-sticky")
      }
  }
