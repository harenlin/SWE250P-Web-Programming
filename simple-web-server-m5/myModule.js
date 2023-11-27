"use strict";
/* myModule.ts */
Object.defineProperty(exports, "__esModule", { value: true });
exports.acs = exports.trm = exports.InternExperience = void 0;
/* Class Definition */
var InternExperience = /** @class */ (function () {
    function InternExperience(company, date, description) {
        this.date = date;
        this.company = company;
        this.description = description;
    }
    InternExperience.prototype.getDate = function () {
        return this.date;
    };
    InternExperience.prototype.getName = function () {
        return this.company;
    };
    InternExperience.prototype.getDescription = function () {
        return this.description;
    };
    return InternExperience;
}());
exports.InternExperience = InternExperience;
exports.trm = new InternExperience("trend-micro", "2021/07 -- 2021/09", "Researched on advanced persistent threats (APTs) within a high-traffic system processing 10M+ email logs daily & Reduced false negatives in the phishing detection system by identifying malicious URLs using CNNs through AWS.");
exports.acs = new InternExperience("academia-sinica", "2019/07 -- 2020/06", "Innovated NFinBERT, a number-aware language model built on BERT, capable of high sensitivity for the numbers in the finance domain by pre-training on pre-processed financial disclosures, SEC 10K report MD&A section.");
