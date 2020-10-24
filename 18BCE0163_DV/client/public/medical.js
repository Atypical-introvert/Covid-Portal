
let countries = [] 
async function contact_details(){
    // e.preventDefault();
    const contact_data = await axios.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
    console.log(contact_data.data.data)
    var i;
    var table=document.getElementsByClassName('table-fill')[1];
    var tbody=document.getElementsByClassName('table-hover')[1].innerHTML="";
    
    for(i=0;i<contact_data.data.data.medicalColleges.length;i++)
    {
        countries.push(contact_data.data.data.medicalColleges[i].state+" - "+contact_data.data.data.medicalColleges[i].name)
        var loc="<td>"+contact_data.data.data.medicalColleges[i].state+"</td>";
        var name="<td>"+contact_data.data.data.medicalColleges[i].name+"</td>";
        var city="<td>"+contact_data.data.data.medicalColleges[i].city+"</td>";
        var ownership="<td>"+contact_data.data.data.medicalColleges[i].ownership+"</td>";
        var admissionCapacity="<td>"+contact_data.data.data.medicalColleges[i].admissionCapacity+"</td>";
        var hospitalBeds="<td>"+contact_data.data.data.medicalColleges[i].hospitalBeds+"</td>";
        var fdata=loc+name+city+ownership+admissionCapacity+hospitalBeds;
        var ffdata="<tr>"+fdata+"</tr>";
        $(table).find('tbody').append(ffdata);
    }
}

var button=document.getElementsByTagName("form")[0];
  button.addEventListener('submit',(e)=>{
    e.preventDefault();
    search_place();
  });

  async function search_place()
  {
    var placex=document.getElementsByTagName('input')[0].value;
    placex = placex.split("-")
    placex[0] = placex[0].trim()
    placex[1] = placex[1].trim()
    const contact_data = await axios.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
    console.log(contact_data)
    const { medicalColleges } = contact_data.data.data
    console.log(medicalColleges)
    const find = medicalColleges.filter((loc) => { return loc.state == placex[0] })
    const find_col = find.find((loc) => { return loc.name == placex[1] })
    var table=document.getElementsByClassName('table-fill')[0];
    var tbody=document.getElementsByClassName('table-hover')[0].innerHTML="";
    var head = '<tr> <th class="text-left">State</th> <th class="text-left" >Name</th> <th class="text-left" >City</th> <th class="text-left" >Ownership</th> <th class="text-left" >Admission Capacity</th> <th class="text-left" >Hospital Beds</th> </tr>'
    $(table).find('tbody').append(head);
    var loc="<td>"+find_col.state+"</td>";
    var name="<td>"+find_col.name+"</td>";
    var city="<td>"+find_col.city+"</td>";
    var ownership="<td>"+find_col.ownership+"</td>";
    var admissionCapacity="<td>"+find_col.admissionCapacity+"</td>";
    var hospitalBeds="<td>"+find_col.hospitalBeds+"</td>";
    var fdata=loc+name+city+ownership+admissionCapacity+hospitalBeds;
    var ffdata="<tr>"+fdata+"</tr>";
    $(table).find('tbody').append(ffdata);
    console.log(find_col)
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

