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

module.exports = EtherFrame;

var mac = require('mac-address');

EtherFrame.TYPE_IP = 0x0800;
EtherFrame.TYPE_ARP = 0x0806;

function EtherFrame(opts) {
  if (opts instanceof Buffer) {
    return EtherFrame.fromBuffer(opts);
  }

  var self = (this instanceof EtherFrame)
           ? this
           : Object.create(EtherFrame.prototype);

  opts = opts || {};

  self.src = opts.src || '00:00:00:00:00:00';
  self.dst = opts.dst || '00:00:00:00:00:00';
  self.type = opts.type || EtherFrame.TYPE_IP;
  self.bytes = opts.bytes || ((mac.LENGTH * 2) + 2);

  return self;
}

EtherFrame.fromBuffer = function(buf, offset) {
  offset = ~~offset;
  var bytes = 0;

  var dst = mac.toString(buf, offset + bytes);
  bytes += mac.LENGTH;

  var src = mac.toString(buf, offset + bytes);
  bytes += mac.LENGTH;

  var type = buf.readUInt16BE(offset + bytes);
  bytes += 2;

  return new EtherFrame({ dst: dst, src: src, type: type, bytes: bytes });
};

EtherFrame.prototype.toBuffer = function(buf, offset) {
  offset = ~~ofset;
  var buf = (buf instanceof Buffer) ? buf : new Buffer(this.bytes);

  mac.toBuffer(this.dst, buf, offset);
  offset += mac.LENGTH;

  mac.toBuffer(this.src, buf, offset);
  offset += mac.LENGTH;

  buf.writeUInt16BE(this.type, offset);
  offset += 2;

  return buf;
};
