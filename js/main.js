// The Best CRM Ever

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

var Cards = new CardMeneger($('.result>table'))

let url = 'https://api.jsonbin.io/b/5f981e4430aaa01ce619a115';
var json
fetch(url)
    .then(response => response.json())
    .then(response => json = e)
alert(json[0].name)
var old_tbody = document.getElementById('t')
var new_tbody = document.createElement('tbody')
for (var i = 0; i < 10; ++i) {
    var newRow = new_tbody.insertRow()
    for (var j = 0; j < 5; ++j) {
        var newCell = newRow.insertCell()
        var newText = document.createTextNode(i.toString() + ' ' + j.toString())
        newCell.appendChild(newText)
    }
}
old_tbody.parentNode.replaceChild(new_tbody, old_tbody)