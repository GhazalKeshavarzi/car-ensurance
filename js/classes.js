/************************* classes ************************/
//calculate the ensurance
//construcror ensurance
class Ensurance {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }

  //calculate price of ensurance
  calculatePrice(info) {
    //calculating the model of car ensurance
    let make = info.make;
    let price = this.calculatemake(make);

    //calculating the year of ensurance
    //each year that the car is older the ensurance is 3% cheaper.
    let year = info.year;
    let diffrence = this.getYeardiffrence(year);
    price = price - (diffrence * 3) / 100;

    //calculating the category of ensurance
    let level = info.level;
    price = this.calculateLevel(level, price);
    return price;
  }

  calculatemake(make) {
    const base = 2000000;
    let price;
    /*
    pride==>1.15
    optima==>1.30
    porcheh==>1.80
    */
    switch (make) {
      case "1":
        price = base * 1.15;
        break;
      case "2":
        price = base * 1.3;
        break;
      case "3":
        price = base * 1.8;
        break;
    }
    return price;
  }

  getYeardiffrence(year) {
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ],
      fixNumbers = function (str) {
        if (typeof str === "string") {
          for (var i = 0; i < 10; i++) {
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    //get the maximom year of ensurance
    let today = new Date().toLocaleDateString("fa-IR");
    let now = today.slice(0, 4);
    let max = fixNumbers(now);
    year = max - year;
    return year;
  }

  calculateLevel(level, price) {
    /*
     basic ==> increase 30%
     complete ==> increase 50%
     */
    if (level == "basic") {
      price = price * 1.3;
    } else {
      price = price * 1.5;
    }
    return price;
  }
}

// **** main object ****
class HTMLUI {
  // ****show the years of second feild ****

  displayYears() {
    //for converting date to persian date
  //   //convert persian numbers to english numbers
  //   let persianNumbers = [
  //       /۰/g,
  //       /۱/g,
  //       /۲/g,
  //       /۳/g,
  //       /۴/g,
  //       /۵/g,
  //       /۶/g,
  //       /۷/g,
  //       /۸/g,
  //       /۹/g,
  //     ],
  //     arabicNumbers = [
  //       /٠/g,
  //       /١/g,
  //       /٢/g,
  //       /٣/g,
  //       /٤/g,
  //       /٥/g,
  //       /٦/g,
  //       /٧/g,
  //       /٨/g,
  //       /٩/g,
  //     ],
  //     fixNumbers = function (str) {
  //       if (typeof str === "string") {
  //         for (var i = 0; i < 10; i++) {
  //           str = str
  //             .replace(persianNumbers[i], i)
  //             .replace(arabicNumbers[i], i);
  //         }
  //       }
  //       return str;
  //     };
  //   //get the maximom year of ensurance
  //   let today = new Date().toLocaleDateString("fa-IR");
  //   let now = today.slice(0, 4);
    let max = new Date().getFullYear();

    //get the minimom year of ensurance
    let min = max - 20;

    //access to the second feild which we can choose our year
    let yearsFeild = document.querySelector("#year");

    //show the 20 range of years for ensurance
    for (let i = max; i >= min; i--) {
      //create option element
      let option = document.createElement("option");
      option.value = i;
      option.innerText = i;
      //append option element to the yearsFeild element
      yearsFeild.appendChild(option);
    }
  }

  // *** display error ***
  displayError(err) {
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerText = err;
    formSubition.insertBefore(div, document.querySelector(".form-group"));

    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
  }

  //show the factor of ensurance in the HTML
  ShowResult(price, ensurance) {
    let result = document.querySelector("#result");
    let div = document.createElement("div");
    //convert make value to the name of car
    let make = ensurance.make;
    switch (make) {
      case "1":
        make = "BMW";
        break;
      case "2":
        make = "Benz";
        break;
      case "3":
        make = "Toyota";
        break;
    }

    let level = ensurance.level;
    if (level == "basic") {
      level = "simple - third person";
    } else {
      level = "compelete-third person with body insurance";
    }

    div.innerHTML = `
      <p class="header">: Bill</p>
      <p class=""total>car name:${make}</p>
      <p class="total">construction year : ${ensurance.year}</p>
      <p class="total">insurance type : ${level}</p>
      <p class="total"> final price:${price}</p>
      `;

    //show loader
    let spinner = document.querySelector("#loading img");
    spinner.style.display = "block";
    setTimeout(() => {
      (spinner.style.display = "none"), result.appendChild(div);
    }, 2000);
  }
}
