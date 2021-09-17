/************************* variables ************************/
const formSubition=document.querySelector('#request-quote');



/********************** eventlisteners *********************/
let html = new HTMLUI();
allEventlisteners();
function allEventlisteners() {
  
  //events on loaded
  document.addEventListener("DOMContentLoaded", function () {
    //show the year when page loads
    html.displayYears();
  })

 formSubition.addEventListener('submit',function(e) {
     e.preventDefault();
    let make=document.querySelector('#make').value;
    let year=document.querySelector('#year').value;
    let level=document.querySelector('input[name="level"]:checked').value;

    //check if the model of the car has been selected or not
    if (make=="" || year=="") {
      html.displayError("لطفا همه فیلد ها را دقیق وارد نمایید");
    } else {
      let resultDiv=document.querySelector('#result div');
      if (resultDiv!==null) {
        resultDiv.remove();
      }
      
      const ensurance=new Ensurance(make,year,level);
      const price= ensurance.calculatePrice(ensurance);
      html.ShowResult(price,ensurance);      
    }
 })
}


