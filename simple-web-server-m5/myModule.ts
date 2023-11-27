/* myModule.ts */

/* Class Definition */
export class InternExperience {
    date: string;
    company: string;
    description: string;
    constructor(company: string, date: string, description: string) {
    	this.date = date;
   		this.company = company;
    	this.description = description;
    }
  	public getDate() : string {
    	return this.date;
  	}
  	public getName() : string {
    	return this.company;
  	}
  	public getDescription() : string {
    	return this.description;
  	}
}

export const trm = new InternExperience(
		"trend-micro",
		"2021/07 -- 2021/09",
		"Researched on advanced persistent threats (APTs) within a high-traffic system processing 10M+ email logs daily & Reduced false negatives in the phishing detection system by identifying malicious URLs using CNNs through AWS."
);

export const acs = new InternExperience(
		"academia-sinica",
		"2019/07 -- 2020/06",
		"Innovated NFinBERT, a number-aware language model built on BERT, capable of high sensitivity for the numbers in the finance domain by pre-training on pre-processed financial disclosures, SEC 10K report MD&A section."
);

