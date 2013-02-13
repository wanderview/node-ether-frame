# ether-frame

Node moudle to manipulate ethernet frame headers.

[![Build Status](https://travis-ci.org/wanderview/node-ether-frame.png)](https://travis-ci.org/wanderview/node-ether-frame)

Work in progress.  Example below is more API planning than actual support
at this point.  My current target is a simplistic implementation aiming at a
simple IP payload without any fanciness like VLAN tagging, etc.

## Example

```javascript
var EtherFrame = require('ether-frame');
var MacAddress = require('ether-frame/mac');

var ef = EtherFrame.fromBuffer(buf);
ef.src === new MacAddress('12:34:56:78'); // true
ef.dst === new MacAddress('98:76:54:32'): // true
ef.type === EtherFrame.TYPE_IP;           // true
var payload = ef.payload;
var buf = ef.toBuffer();
```
