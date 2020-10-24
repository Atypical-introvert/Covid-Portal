let notif_button = document.getElementsByClassName("button_new")[0]

async function contact_details(){
    const contact_data = await axios.get('https://api.rootnet.in/covid19-in/notifications')
    var i;
    var table=document.getElementsByClassName('table-fill')[0];
    var tbody=document.getElementsByClassName('table-hover')[0].innerHTML="";
    console.log(contact_data.data.data.notifications)
    for(i=0;i<contact_data.data.data.notifications.length;i++)
    {
        var loc="<td>"+contact_data.data.data.notifications[i].title+"</td>";
        var num="<td class='contact-link'><a href=" + contact_data.data.data.notifications[i].link + " target='_blank'>" + contact_data.data.data.notifications[i].link + "</a></td>";
        var fdata=loc+num;
        var ffdata="<tr>"+fdata+"</tr>";
        $(table).find('tbody').append(ffdata);

    }
}