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
    table = document.getElementsByTagName('table')[0]
    table.insertBefore(thead, table.firstChild)
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
                search = this.value;
                if (this.value.slice(-2) != "; ") this.value += '; '
                updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
                alert(search)
            }
        });
    document.getElementsByClassName('filter')[0].addEventListener("keyup", function(event) {
        event.preventDefault()
        if (event.keyCode === 13) {
            search = this.value;
            document.getElementById('search').value += 'hi; '
            updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
            alert(search)
        }
    });
    // for (var i in f) {
    //     console.log(f[i])
    //     f[i]
    // }
    updateTable('https://api.jsonbin.io/b/5f981e4430aaa01ce619a115')
}

init()