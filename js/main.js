// The Best CRM Ever

// var titles = []
var search = ''
var filters = ['']
var url = 'http://vdnk.space/index.php/'
var surl = '?search='
var durl = '?download='

function setTitles(titles) {
    // console.log(titles)
    var thead = document.createElement('thead')
    var newRow = thead.insertRow()
    for (var j = 0; j < titles.length; ++j) {
        var newCell = document.createElement('th')
        var newText = document.createTextNode(titles[j])
        newCell.appendChild(newText)
        newRow.appendChild(newCell)
    }
    document.getElementsByTagName('table')[0].replaceChild(thead, document.getElementsByTagName('thead')[0])
    return titles
}

function updateTable() {
    if (search.length > 0 || filters.length > 1) {
        fetch(url + surl + search)
            .then(response => response.json())
            .then(response => toTable(response))
            //     fetch(url + surl + search + ',' + filters.join())
            //         .then(response => response.json())
            //         .then(response => toTable(response))
    } else {
        fetch(url)
            .then(response => response.json())
            .then(response => toTable(response))
    }
}

function toTable(resp) {
    var json = []
    var titles = []
    for (var i in resp) {
        var t = Object.keys(resp[i])
        var m = {}
        for (var j in t)
            for (var k in resp[i][t[j]])
                Object.assign(m, resp[i][t[j]][k]);
        json.push(m)
    }

    // console.log(json)
    titles = setTitles(Object.keys(json[0]))
    id = Object.keys(resp)
    console.log(id)
    var old_tbody = document.getElementsByTagName('tbody')[0]
    var new_tbody = document.createElement('tbody')
    var newRow
    for (var i = 0; i < json.length; ++i) {
        newRow = new_tbody.insertRow()
        newRow.onclick = function() {
            // console.log(id, Array.prototype.indexOf.call(document.getElementsByTagName('tr'), this) - 1, id[Array.prototype.indexOf.call(document.getElementsByTagName('tr'), this) - 1])
            var win = window.open(url + durl + id[Array.prototype.indexOf.call(document.getElementsByTagName('tr'), this) - 1], '_blank');
            win.focus();
        }
        for (var j = 0; j < titles.length; ++j) {
            var newCell = newRow.insertCell()
            var newText = document.createTextNode(json[i][titles[j]])
            newCell.appendChild(newText)
        }

    }
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
}

function handle_search(el) {
    search = encodeURI(el.value)
    updateTable()
}

function handle_filter(el) {
    if (el.value.length > 0) {
        filters[Array.prototype.indexOf.call(document.getElementsByClassName('filter'), el)] = encodeURI(el.value)
        updateTable()
    }

}

function newFilter(el) {
    var f = document.getElementsByClassName('filter')
    if (f[f.length - 1].value.length > 0) {
        var new_el = document.createElement("div")
        new_el.innerHTML = '<input type="text" class="filter" onfocusout="handle_filter(this)">'
        el.parentNode.insertBefore(new_el, el)
        filters.push('')
    }
}

function resetFilter(el) {
    var f = document.getElementsByClassName('filter')
    while (f[0]) {
        f[0].parentNode.removeChild(f[0])
    }
    var new_el = document.createElement("div")
    new_el.innerHTML = '<input type="text" class="filter" onfocusout="handle_filter(this)">'
    var parent = el.parentNode
    parent.insertBefore(new_el, parent.firstChild)
    filters = ['']
    updateTable()
}

function init_filters_handlers() {
    Array.from(document.getElementsByClassName('filter')).forEach(function(element) {
        element.addEventListener("keyup", function(event) {
            event.preventDefault()
            if (event.keyCode === 13) {
                this.blur()
            }
        })
    })
}

// function init_table_handlers() {
//     var table = document.getElementById("main_t");
//     var rows = table.getElementsByTagName("tr");
//     for (var i = 1; i < rows.length; ++i) {
//         rows[i].addEventListener("click", function() {
//             var win = window.open(url + durl + this.getElementsByTagName("td")[0].innerHTML, '_blank');
//             win.focus();
//         })
//     }
// }

function init() {

    document.getElementById('search')
        .addEventListener("keyup", function(event) {
            event.preventDefault()
            if (event.keyCode === 13) {
                this.blur()
            }
        });

    // init_filters_handlers()

    updateTable()
}

init()