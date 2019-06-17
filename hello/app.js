"use strict"

const http = require('http');
const os = require('os');

let hostname = os.hostname();

let langs = {
  'en' : 'Hello',
  'fr' : 'Bonjour',
  'es' : 'Ola'
}

let lang = process.env.LANG || 'en'

http.createServer((req, res) => {  
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    'greeting' : langs[lang],
    'lang' : lang,
    'host' : hostname
  }))
}).listen(3000);