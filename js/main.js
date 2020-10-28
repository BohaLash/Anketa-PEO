// The Best CRM Ever

var titles = ['name', 'age', 'city']

class CardMeneger {
    constructor(table) {
        this.opened = false
        table.find("tr").click((e) => this.rowClicked(e))
        $("body").click((e) => this.close())
        $(".card").click(e => e.stopPropagation())
    }
    rowClicked(e) {
        if (this.opened == false) {
            $('.card').css("display", "block")
            this.opened = true;
            e.stopPropagation()
        }
    }
    close() {
        $('.card').css("display", "none")
        this.opened = false
    }
}

function setTitles() {
    console.log(titles)
    var thead = document.createElement('thead')
    var newRow = thead.insertRow()
    for (var j = 0; j < titles.length; ++j) {
        var newCell = newRow.insertCell()
        var newText = document.createTextNode(titles[j])
        newCell.appendChild(newText)
    }
    document.getElementsByTagName('table')[0].appendChild(thead)
}

function updateTable(url) {
    fetch(url)
        .then(response => response.json())
        .then(response => toTable(response))
}

function toTable(json) {
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

function init() {
    var Cards = new CardMeneger($('.result>table'))
    fetch('https://0.0.0.0:80/')
        .then(response => response.text())
        .then(response => titles = response.split())
        .then(setTitles())
    updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
}

init()