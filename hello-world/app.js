"use strict"

const http = require('http');
const os = require('os');
const zip = require('rxjs').zip;
const map = require('rxjs/operators').map;
const RxHR = require('@akanass/rx-http-request').RxHR

const options = {
  json: true
};

let hostname = os.hostname()

let lang = process.env.LANG || 'en'
let helloSvc = process.env.HELLO_SVC || 'http://hello:3000'
let worldSvc = process.env.WORLD_SVC || 'http://world:3000'

http.createServer((req, res) => {
  zip(
    RxHR.get(helloSvc, options),
    RxHR.get(worldSvc, options)
  ).pipe(
    map(v => [v[0].body, v[1].body])
  ).subscribe(v => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      'message': `${v[0].greeting} ${v[1].recipient}`,
      'hosts': [
        v[0].host,
        v[1].host,
        hostname
      ],
      'langs': mapUnique(v, e => e.lang)
    }))
  })
}).listen(3000)

function mapUnique(array, extraction) {
  let used = []
  array
    .map(e => extraction(e))
    .forEach(e => {
      if (!used.includes(e))
        used.push(e)
    })
  return used
}