var store = [];
var site;
var mainIndex = 0;
if (localStorage.getItem("ourLocalData") != null) {
    store = JSON.parse(localStorage.getItem("ourLocalData"));
    dispWebSite()
}

var nameRegex = /^[A-Za-z_]{3,}$/
function isNameValid() {
    if (nameRegex.test(document.getElementById("siteName").value)) {
        return true;
    }
    else {
        return false;
    }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid() {
    if (urlRegex.test(document.getElementById("siteUrl").value)) {
        return true;
    }
    else {
        return false;
    }
}
document.getElementById("siteName").onkeyup = function () {
    if (isUrlValid() && isNameValid()) {
        document.getElementById("submitbtn").removeAttribute("disabled");
    } else {
        document.getElementById("submitbtn").disabled = true;
    }
}
document.getElementById("siteUrl").onkeyup = function () {
    if (isUrlValid() && isNameValid()) {
        document.getElementById("submitbtn").removeAttribute("disabled");
    } else {
        document.getElementById("submitbtn").disabled = true;
    }
}
function addWebSite() {
    
    if (document.getElementById("submitbtn").innerHTML == "Update") {
        document.getElementById("submitbtn").innerHTML = "Submit";
        site = {

            siteName: document.getElementById("siteName").value,
            siteUrl: document.getElementById("siteUrl").value,

        }
        store.splice(mainIndex, 1, site)
    }
    else {
        site = {

            siteName: document.getElementById("siteName").value,
            siteUrl: document.getElementById("siteUrl").value,

        }
        store.push(site);
    }


    localStorage.setItem("ourLocalData", JSON.stringify(store))

    // celear ll inputs
    clearInputs()

    // display
    dispWebSite()
    document.getElementById("submitbtn").disabled = true;
}
// call from add function
function clearInputs() {
    document.getElementById("siteName").value = "";
    document.getElementById("siteUrl").value = "";
}

// call from add function
function dispWebSite() {

    var cartona = "";

    for (var i = 0; i < store.length; i++) {

        cartona += `<tr>
                        <td>`+ store[i].siteName + `</td>
                        <td>
                            
                            <a href=${store[i].siteUrl}><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
                            
                            
                        </td>
                        <td>
                            <button onclick="update(`+ i + `)" class="btn btn-update">
                            Update
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">
                            <i class="fa-solid fa-trash pe-2"></i>Delete
                            </button>
                        </td>
                    </tr>`
    }

    document.getElementById("table-body").innerHTML = cartona;

}
function search(userword) {

    var cartona = "";

    for (var i = 0; i < store.length; i++) {
        // matched ==> tr
        if (store[i].siteName.toLowerCase().includes(userword.toLowerCase())) {

            cartona += `<tr>
                            <td>`+ store[i].siteName + `</td>
                            <td>
                                
                                <a href="`+ store[i].siteUrl + `"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
                                
                                
                            </td>
                            <td>
                                <button onclick="update(`+ i + `)" class="btn btn-update">
                                Update
                                </button>
                            </td>
                            <td>
                                <button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">
                                <i class="fa-solid fa-trash pe-2"></i>Delete
                                </button>
                            </td>
                        </tr>`
        }

    }

    document.getElementById("table-body").innerHTML = cartona

}

function update(index) {
    document.getElementById("siteName").value = store[index].siteName;
    document.getElementById("siteUrl").value = store[index].siteUrl;
    document.getElementById("submitbtn").innerHTML = "Update";
    mainIndex = index;
}
function deleteProduct(index) {
    store.splice(index, 1);

    localStorage.setItem("ourLocalData", JSON.stringify(store))

    dispWebSite()
}
