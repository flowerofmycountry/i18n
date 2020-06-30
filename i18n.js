const fs = require('fs');
const path = require('path'); 

module.exports = function(opt) {

    let i18n = {},
        local = (typeof opt.local === 'string') ? 
            opt.local : "jp",
        mappingFile = (typeof opt.mappingFile === 'string') ?
            opt.mappingFile : path.join(__dirname, 'i18n.json'),
        mapjson;
    
    i18n.__ = function(msgid, ...argv) {
        if (msgid == null) {
            throw "messageid is required."
        }

        if (mapjson[msgid] == null) {
            throw "messageid is not found."
        }

        let msg = mapjson[msgid][local];

        if (msg == null) { return "" }

        if (argv.length === 0) {
            return msg.replace(/{{\d+}}/g, "");
        } else {
            for (const index in argv) {
                const r = new RegExp(`{${index}(:\\s*(\\w+))?}`, "g");
                msg = msg.replace(r, argv[index])
            }
            return msg;
        }
    }

    if (fs.existsSync(mappingFile)) {
        mapjson = JSON.parse(fs.readFileSync(mappingFile));
    } else {
        throw "mappingFile is not found."
    }

    return i18n;
};