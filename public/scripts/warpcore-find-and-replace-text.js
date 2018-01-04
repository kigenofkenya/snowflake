//Find and Replace Text (Javascript) is Copyright 2011 TextMechanic.com All Rights Reserved

function cleartext() {
    document.getElementById('input_output').value = '';
    document.getElementById('found').innerHTML = '';
}

function wrapcontrol(wtype) {
    var area = '';
    var areaid = ['find_this', 'replace_with', 'input_output'];
    var newarea = '';
    var ath = 'dGhldGV4dG1lY2hhbmlj';
    for (var x = 0; x < 3; x++) {
        area = document.getElementById(areaid[x]);
        area.setAttribute('wrap', wtype);
        newarea = area.cloneNode(true);
        newarea.value = area.value;
        area.parentNode.replaceChild(newarea, area);
    }
}

function replacetext() {
    var searchfor = document.getElementById('find_this').value.replace(/\r/gi, '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var replacewith = document.getElementById('replace_with').value.replace(/\r/gi, '');
    var text = document.getElementById('input_output').value.replace(/\r/gi, '')
    var flags = 'gi';
    if (document.getElementById('case_sen').checked == true) flags = 'g';
    var searchexp = new RegExp(searchfor, flags);
    var rcount = 0;
    var matched = text.match(searchexp);
    if (matched != null) rcount = matched.length;
    text = text.replace(searchexp, replacewith);
    document.getElementById('input_output').value = text;
    document.getElementById('found').innerHTML = rcount + ' found and replaced.';
}

function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}