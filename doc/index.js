
const asciidoctor = require('asciidoctor')();
asciidoctor.convertFile('./doc/file.adoc', { safe: 'safe', attributes: { linkcss: true } });