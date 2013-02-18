# ether-frame

Node module to manipulate ethernet frame headers.

[![Build Status](https://travis-ci.org/wanderview/node-ether-frame.png)](https://travis-ci.org/wanderview/node-ether-frame)

Work in progress.  Example below is more API planning than actual support
at this point.  My current target is a simplistic implementation aiming at a
simple IP payload without any fanciness like VLAN tagging, etc.

## Example

```javascript
var EtherFrame = require('ether-frame');

var ef = EtherFrame.fromBuffer(buf);
ef.src === '12:34:56:78:90:12';     // true
ef.dst === '98:76:54:32:10:98':     // true
ef.type === 'ip';                   // true
ef.bytes === 14;                    // true
var payload = buf.slice(ef.bytes);
var buf = ef.toBuffer();
```
