var _i18n;

function init(opt) {
    _i18n = require("./i18n")(opt);
}

function getMessage(msgid, ...argv) {
    return _i18n.__.apply(_i18n, [msgid].concat(argv));
}

module.exports = {
    init: init,
    getMessage: getMessage
}