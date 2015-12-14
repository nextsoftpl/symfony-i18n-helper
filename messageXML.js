var XMLWriter = require('xml-writer');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var unescape = require('unescape');

var def = {
    'POLSKI': 'pl',
    'ENGLISH': 'en',
    'NORSK': 'no',
    'SVENSKA': 'sv',
    'DANSK': 'dk'
};


module.exports = {
    MessageXML: MessageXML
};

function MessageXML(lang, rows) {

    mkdirp( 'release/' + def[lang] + "/" );
    var ws = fs.createWriteStream('release/'+def[lang]+'/messages.xml');

    var xw = new XMLWriter(true, function(string, encoding) {
        ws.write(string, encoding);
    });

    xw.startDocument();

    xw.startDocType('xliff',  '-//XLIFF//DTD XLIFF//EN', 'http://www.oasis-open.org/committees/xliff/documents/xliff.dtd');
    xw.endDocType();

    xw.startElement('xliff');
    xw.writeAttribute('version', '1.0');

    xw.startElement('file');
    xw.writeAttribute('source-language', 'EN');
    xw.writeAttribute('target-language', def[lang]);
    xw.writeAttribute('datatype', "plaintext");
    xw.writeAttribute('original', "messages");
    xw.writeAttribute('date', new Date().toString());
    xw.writeAttribute('product-name', "messages");

    xw.startElement('header');
    xw.endElement();

    xw.startElement('body');

    var i = 0;
    _.each(rows, function(element, index){
        i++;
        xw.startElement('trans-unit');
        xw.writeAttribute('id', i);
        xw.writeElement('source', unescape(index).replace(/&#10;/g,"\n"));
        xw.writeElement('target', unescape(element).replace(/&#10;/g,"\n"));
        xw.endElement();
    });

    xw.endElement();
    xw.endElement();
    xw.endElement();

    xw.endDocument();

    ws.end();
}