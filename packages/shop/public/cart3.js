"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Member = (function () {
    function Member() {
        this.id = "";
    }
    Member.prototype.getCounters = function (covered) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, {
                        'life': {
                            pocket: 123,
                            deduct: 123,
                        },
                        'family': {
                            deduct: 256,
                            pocket: 256
                        }
                    }];
            });
        });
    };
    Member.prototype.getPlan = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            function planRules1() {
                return {};
            }
            return __generator(this, function (_a) {
                return [2, {
                        counter: {
                            'life': {
                                deduct: 1800,
                                pocket: 7000,
                            },
                            'family': {
                                deduct: 4200,
                                pocket: 12000,
                            }
                        },
                        network: {
                            "in": planRules1(),
                            "out": planRules1()
                        },
                        style: {
                            network: [{ key: 'in', name: 'In Network' },
                                { key: 'out', name: 'Out of Network' }],
                            counter: [
                                { name: 'Out of Pocket', set: 'life', key: 'pocket' },
                                { name: 'Deductible', set: 'life', key: 'deduct' },
                                { name: 'Family Out of Pocket', set: 'family', key: 'pocket' },
                                { name: 'Family Deductible', set: 'family', key: 'deduct' }
                            ],
                            claim: [
                                { name: 'You Owe', key: 'owe' },
                                { name: 'Charge', key: 'charge' },
                                { name: 'Plan paid', key: 'paid' }
                            ],
                            line: [
                                {
                                    name: 'Description',
                                    key: 'desc'
                                },
                                {
                                    name: 'Code',
                                    key: 'code'
                                },
                                {
                                    name: 'Charge',
                                    key: 'charge'
                                },
                                {
                                    name: 'Allowed',
                                    key: 'allowed'
                                },
                                {
                                    name: 'Paid',
                                    key: 'paid'
                                },
                                {
                                    name: 'Member Owes',
                                    key: 'owe'
                                },
                                {
                                    name: 'Deductible',
                                    key: 'deduct'
                                },
                                {
                                    name: 'Copay',
                                    key: 'copay'
                                },
                                {
                                    name: 'Coinsurance',
                                    key: 'coins'
                                },
                            ]
                        }
                    }];
            });
        });
    };
    return Member;
}());
var Eob = (function () {
    function Eob(member, plan) {
        this.covered = "";
        this.year = 2022;
        this.line = [];
        this.counter = {};
        this.charge = 0;
        this.allowed = 0;
        this.paid = 0;
        this.owe = 0;
        this.copay = 0;
        this.deduct = 0;
        this.coins = 0;
        this.member = member;
        this.plan = plan;
    }
    return Eob;
}());
function adjudicate1(eob) {
    return __awaiter(this, void 0, void 0, function () {
        var member, plan, _a, _i, _b, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    member = eob.member;
                    return [4, member.getPlan(2020)];
                case 1:
                    plan = _c.sent();
                    _a = eob;
                    return [4, member.getCounters(eob.covered)];
                case 2:
                    _a.counter = _c.sent();
                    for (_i = 0, _b = eob.line; _i < _b.length; _i++) {
                        i = _b[_i];
                        i.code;
                        i.desc;
                        i.network;
                        i.charge = 100;
                        i.allowed = 80;
                        i.paid = 80;
                        i.owe = 0;
                        i.deduct = 0;
                        i.copay = 0;
                        i.coins = 0;
                        eob.charge += i.charge;
                        eob.allowed += i.allowed;
                        eob.owe += i.owe;
                        eob.paid += i.paid;
                    }
                    return [2];
            }
        });
    });
}
function renderCounters(eob) {
    var style = eob.plan.style;
    var renderCounter = function (ck) {
        var paid = eob.counter[ck.set][ck.key];
        var maxpay = eob.plan.counter[ck.set][ck.key];
        return "<div class='sumChart'>\n            <div class='sumLeft'>".concat(ck.name, "</div>\n            <svg width='100%' preserveAspectRatio='none' height='24px' viewBox='0 0 320 24'>\n                <g class='bars'>\n                    <rect class='bg' fill='#ccc' width='100%' height='25'></rect>\n                    <rect class='data' fill='#0074d9' width='45%' height='25'></rect>\n                </g>\n                <div class='sumRight'>").concat(paid, " paid of a maximum ").concat(maxpay, "</div>\n            </svg>\n        </div>");
    };
    return style.counter.map(function (e) { return renderCounter(e); }).join("");
}
function renderCard(eob, name) {
    var style = eob.plan.style;
    var memberPay = eob.owe;
    var datax = eob;
    var claim = style.claim.map(function (e) { return "\n                <tr><td class='data1'>".concat(e.name, "</td><td class=\"ncol\">").concat(datax[e.key].toFixed(2), "</td></tr>"); }).join("");
    var line = eob.line.map(function (m) {
        var ln = "";
        var d = m;
        for (var j = 0; j < style.line.length; j++) {
            var v = d[style.line[j].key] || 0;
            if (j == 0) {
                ln += "<td class='fix'><div>".concat(v, "</div></td>");
            }
            else {
                ln += "<td class=\"ncol\">".concat(v, "</td>");
            }
        }
        return "<tr>".concat(ln, "</tr>");
    }).join("");
    var header = style.line.slice(1).map(function (e) { return "<th class=\"ncol\">".concat(e.name, "</th>"); }).join("");
    return "<div class=\"card\">\n                <h1>Your Cost ".concat(name, "</h1>\n                <h2>$").concat(memberPay, "</h2>\n                <p> If\n                    you choose an in-network provider you can expect to be responsible for $").concat(memberPay, " This is a good faith\n                    estimate of your responsibility for payment given the services\n                    selected in this cart.</p>\n                <table class=\"data\">\n                ").concat(claim, "\n                </table>\n                <div class=\"wrapper\">\n                    <table class=\"scrollTable\">\n                        <thead>\n                        <th class=\"fix\"></th>").concat(header, "\n                        </thead><tbody>\n                ").concat(line, "\n                </tbody></table></div>\n                ").concat(renderCounters(eob), "</div>");
}
function renderCart(cart) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, style, cards, _i, _b, o, _c, _d, i;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!(cart.line.length == 0)) return [3, 2];
                    _a = cart;
                    return [4, member.getCounters(cart.covered)];
                case 1:
                    _a.counter = _e.sent();
                    return [2, "<div class=\"card\">\n        <h1>Plan Status</h1>\n        <p></p>\n          ".concat(renderCounters(cart), "\n      </div>")];
                case 2:
                    style = cart.plan.style;
                    cards = [];
                    _i = 0, _b = style.network;
                    _e.label = 3;
                case 3:
                    if (!(_i < _b.length)) return [3, 6];
                    o = _b[_i];
                    for (_c = 0, _d = cart.line; _c < _d.length; _c++) {
                        i = _d[_c];
                        i.network = o.key;
                    }
                    return [4, adjudicate1(cart)];
                case 4:
                    _e.sent();
                    cards.push(renderCard(cart, o.name));
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3, 3];
                case 6: return [2, " <div class=\"cardList\">\n                ".concat(cards.join(""), "\n                </div>\n            ")];
            }
        });
    });
}
function clearCart() {
    localStorage.cart = "[]";
    updateCart();
}
var member = new Member;
function updateCart() {
    return __awaiter(this, void 0, void 0, function () {
        var plan, eob, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, member.getPlan(2020)];
                case 1:
                    plan = _b.sent();
                    eob = new Eob(member, plan);
                    eob.line = JSON.parse(localStorage.cart || JSON.stringify('[]'));
                    d = document.getElementById('content');
                    if (!d) return [3, 3];
                    _a = d;
                    return [4, renderCart(eob)];
                case 2:
                    _a.innerHTML = _b.sent();
                    _b.label = 3;
                case 3: return [2];
            }
        });
    });
}
function addOne() {
    function addCart(lines) {
        var cart = JSON.parse(localStorage.cart || "[]");
        cart = __spreadArray(__spreadArray([], cart, true), lines, true);
        window.localStorage.cart = JSON.stringify(cart);
    }
    addCart([
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
    ]);
    updateCart();
}
