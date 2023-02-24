function fetchData() {
  fetch("https://wcsecure.weblink.com.au/clients/liontown/pricejson.aspx?")
    .then((res) => res.json())

    .then((data) => {
      console.log(data);

      // Symbol
      let asxsymbol = data.quote[0].symbol;
      document.getElementById("symbol").innerHTML = asxsymbol;

      // Last price
      let asxlastprice = data.quote[0].lastprice;
      document.getElementById("lastprice").innerHTML = asxlastprice;

      // Price movementpercent
      let asxmovementpercent = data.quote[0].movementPercent;
      document.getElementById("movementpercent").innerHTML = asxmovementpercent;
      // Function to create class based on number value
      function asxmovementpercentupdown(asxmovementpercent) {
        if (asxmovementpercent > 0) {
          document.getElementById("movementpercent").classList.add("positive");
        } else if (asxmovementpercent < 0) {
          document.getElementById("movementpercent").classList.add("negative");
        } else if (asxmovementpercent == 0) {
          document.getElementById("movementpercent").classList.add("no-change");
        }
      }
      // Display function ouput (class)
      document.getElementById("movementpercent").classList.add = asxmovementpercentupdown(
        asxmovementpercent
      );

      // Date
      let jsonDate = data.quote[0].tradeddate; // JSON date in format yyyymmdd
      // convert JSON date to Date object
      let dateObj = new Date(
        jsonDate.substring(0, 4),
        jsonDate.substring(4, 6) - 1,
        jsonDate.substring(6, 8)
      );
      // get day, month and year from Date object
      let day = dateObj.getDate();
      let monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = dateObj.getMonth() + 1; // months are zero indexed
      let monthName = monthNames[month - 1];
      let year = dateObj.getFullYear();
      // format HTML date string
      let htmlDate = day + " " + monthName + " " + year;
      document.getElementById("tradeddate").innerHTML = htmlDate;

      // Time
      let jsonTime = data.quote[0].tradedtime;
      function convertTime(jsonTime) {
        let time = jsonTime.toString();
        let hours = time.substring(0, 2);
        let minutes = time.substring(2, 4);
        // Remove seconds - would need to add :${seconds} in returns below to include
        // let seconds = time.substring(4, 6);
        if (hours > 12) {
          hours -= 12;
          return `${hours}:${minutes} pm`;
        } else {
          return `${hours}:${minutes} am`;
        }
      }
      // Display function ouput
      document.getElementById("tradedtime").innerHTML = convertTime(jsonTime);
    })

    .catch((error) => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById("lastprice").innerHTML = "Error Loading Data";
    });
}

fetchData();
