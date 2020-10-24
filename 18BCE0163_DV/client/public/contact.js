let contact_button = document.getElementsByClassName("button_new")[0]
let heading = document.getElementsByClassName("heading")[0]

var countries = []
async function contact_details(){
    // e.preventDefault();
    const contact_data = await axios.get('https://api.rootnet.in/covid19-in/contacts')
    var i;
    var table=document.getElementsByClassName('table-fill')[0];
    var tbody=document.getElementsByClassName('table-hover')[0].innerHTML="";
    console.log(contact_data.data.data.contacts.regional)
    for(i=0;i<contact_data.data.data.contacts.regional.length;i++)
    {
        countries.push(contact_data.data.data.contacts.regional[i].loc)
        var loc="<td>"+contact_data.data.data.contacts.regional[i].loc+"</td>";
        var num="<td>"+contact_data.data.data.contacts.regional[i].number+"</td>";
        var fdata=loc+num;
        var ffdata="<tr>"+fdata+"</tr>";
        $(table).find('tbody').append(ffdata);

    }

    console.log("Heyyaaaa")
}

var button=document.getElementsByTagName("form")[0];
  button.addEventListener('submit',(e)=>{
    e.preventDefault();
    search_place();
  });

  async function search_place()
  {
    var placex=document.getElementsByTagName('input')[0].value;
    console.log(placex)
    const contact_data = await axios.get('https://api.rootnet.in/covid19-in/contacts')
    console.log(contact_data)
    const { regional } = contact_data.data.data.contacts
    console.log(regional)
    const find = regional.find((loc) => { return loc.loc == placex })
    let msg = "The contact number for " + find.loc + " is " + find.number + " ."
    heading.innerHTML = msg
    console.log(find)
  }

  function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        
        this.parentNode.appendChild(a);
  
        var hosb=0;
        
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
  
            if(hosb<300)
            {
              
              hosb=hosb+41.7;
            }
            else
            {
              document.getElementsByClassName('autocomplete-items')[0].style.overflowY="scroll";
            }
            
            // console.log(hosb);
            document.getElementsByClassName('autocomplete-items')[0].style.height=hosb+"px";
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        });
  }
  
  autocomplete(document.getElementById("myInput"), countries);
