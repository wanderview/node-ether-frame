// Copyright (c) 2013, Benjamin J. Kelly ("Author")
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

'use strict';

var EtherFrame = require('../ether');

var path = require('path');
var pcap = require('pcap-parser');

var FILE = path.join(__dirname, 'data', 'netbios-ns-b-query-winxp.pcap');

module.exports.fromBuffer = function(test) {
  test.expect(3);

  var parser = pcap.parse(FILE);

  parser.on('packetData', function(payload) {
    var ether = EtherFrame.fromBuffer(payload);
    test.equal('00:50:56:e6:2d:02', ether.dst);
    test.equal('00:0c:29:0d:06:56', ether.src);
    test.equal('ip', ether.type);
    test.done();
  });
};

module.exports.fromBufferNew = function(test) {
  test.expect(3);

  var parser = pcap.parse(FILE);

  parser.on('packetData', function(payload) {
    var ether = new EtherFrame(payload);
    test.equal('00:50:56:e6:2d:02', ether.dst);
    test.equal('00:0c:29:0d:06:56', ether.src);
    test.equal('ip', ether.type);
    test.done();
  });
};

module.exports.toBuffer = function(test) {
  test.expect(14);

  var parser = pcap.parse(FILE);

  parser.on('packetData', function(payload) {
    var ether = EtherFrame.fromBuffer(payload);
    var buf = ether.toBuffer();
    for (var i = 0, n = buf.length; i < n; ++i) {
      test.equal(payload.readUInt8(i), buf.readUInt8(i));
    }
    test.done();
  });
};

module.exports.defaults = function(test) {
  test.expect(3);

  var ether = new EtherFrame();
  test.equal('00:00:00:00:00:00', ether.dst);
  test.equal('00:00:00:00:00:00', ether.src);
  test.equal('ip', ether.type);

  test.done();
};
