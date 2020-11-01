// The Best CRM Ever

// var titles = []
var search = ''

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
    console.log(titles)
    var thead = document.createElement('thead')
    var newRow = thead.insertRow()
    for (var j = 0; j < titles.length; ++j) {
        var newCell = document.createElement('th')
        var newText = document.createTextNode(titles[j])
        newCell.appendChild(newText)
        newRow.appendChild(newCell)
    }
    document.getElementsByTagName('table')[0].appendChild(thead)
    return titles
}

function updateTable(url) {
    fetch(url)
        .then(response => response.json())
        .then(response => toTable(response))
}

function toTable(json) {
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

function init() {
    var Cards = new CardMeneger($('.result>table'))
        // document.getElementById('search').oninput = function() {
        //     alert(this.value)
        // };
    document.getElementById('search')
        .addEventListener("keyup", function(event) {
            event.preventDefault()
            if (event.keyCode === 13) {
                search = document.getElementById('search').value;
                updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
                alert(search)
            }
        });
    updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
}

init()