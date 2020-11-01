// The Best CRM Ever

// var titles = []
var search = ''
var filters = ['']
var url = 'http://vdnk.space/index.php/'
var surl = '?search='

class CardMeneger {
    constructor(table) {
        this.opened = false
        table.find('tr').click((e) => this.rowClicked(e))
        $('body').click((e) => this.close())
        $('.card').click(e => e.stopPropagation())
    }
    rowClicked(e) {
        if (this.opened == false) {
            $('.card').css("display", "block")
            this.opened = true
            e.stopPropagation()
        }
    }
    close() {
        $('.card').css("display", "none")
        this.opened = false
    }
}

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
    fetch(url + surl + search)
        .then(response => response.json())
        .then(response => toTable(response))
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
        titles.push(t)
    }
    console.log(json)
    titles = setTitles(Object.keys(json[0]))
    var old_tbody = document.getElementsByTagName('tbody')[0]
    var new_tbody = document.createElement('tbody')
    for (var i = 0; i < json.length; ++i) {
        var newRow = new_tbody.insertRow()
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
    if (el.value.slice(-2) != "; " && el.value.length > 0) el.value += '; '
    updateTable()
    alert(search)
}

function handle_filter(el) {
    if (el.value.length > 0) {
        filters[Array.prototype.indexOf.call(document.getElementsByClassName('filter'), el)] = encodeURI(el.value)
        updateTable()
        alert(filters)
    }

}

function newFilter(el) {
    var f = document.getElementsByClassName('filter')
    if (f[f.length - 1].value.length > 0) {
        var new_el = document.createElement("div")
        new_el.innerHTML = '<input type="text" class="filter" onfocusout="hendle_filter(this)">'
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
    new_el.innerHTML = '<input type="text" class="filter" onfocusout="hendle_filter(this)">'
    var parent = el.parentNode
    parent.insertBefore(new_el, parent.firstChild)
    filters = ['']
    alert(filters)
}

function init() {
    var Cards = new CardMeneger($('.result>table'))

    document.getElementById('search')
        .addEventListener("keyup", function(event) {
            event.preventDefault()
            if (event.keyCode === 13) {
                this.blur()
            }
        });

    Array.from(document.getElementsByClassName('filter')).forEach(function(element) {
        element.addEventListener("keyup", function(event) {
            event.preventDefault()
            if (event.keyCode === 13) {
                this.blur()
            }
        });
    });
    updateTable()
}

init()