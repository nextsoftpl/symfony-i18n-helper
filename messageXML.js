var XMLWriter = require('xml-writer');
var xw = new XMLWriter();
var _ = require('underscore');


module.exports = {
    MessageXML: MessageXML
};

function MessageXML(lang, rows) {

    xw.startDocument();

    xw.startDocType('xliff',  '-//XLIFF//DTD XLIFF//EN', 'http://www.oasis-open.org/committees/xliff/documents/xliff.dtd', 'PUBLIC');
    xw.endDocType();

    xw.startElement('xliff');
    xw.writeAttribute('version', '1.0');

    xw.startElement('file');
    xw.writeAttribute('source-language', 'EN');
    xw.writeAttribute('target-language', lang);
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
        xw.startElement('source');
        xw.writeElement('source', index);
        xw.writeElement('target', element);
    });

    xw.endDocument();

    console.log(xw.toString());
}