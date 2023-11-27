/* Class Definition */
class InternExperience {
	date: string;
	company: string;
	description: string;
	constructor(company: string, date: string, description: string){
		this.date = date;
		this.company = company;
		this.description = description;
	}
	public getDate() {
		return this.date;
	}
	public getName() {
		return this.company;
	}
	public getDescription() {
		return this.description;
	}
}

const trm = new InternExperience("trend-micro", "2021/07 -- 2021/09", "Researched on advanced persistent threats (APTs) within a high-traffic system processing 10M+ email logs daily & Reduced false negatives in the phishing detection system by identifying malicious URLs using CNNs through AWS.");

const acs = new InternExperience("academia-sinica", "2019/07 -- 2020/06", "Innovated NFinBERT, a number-aware language model built on BERT, capable of high sensitivity for the numbers in the finance domain by pre-training on pre-processed financial disclosures, SEC 10K report MD&A section.");

function button(companyName: string): void {
	/* Arrow Function */
	const getExp = (companyName: string): InternExperience | undefined => {
    	if (companyName === "trend-micro") {
			// document.write("tm");
    		return trm;
    	} else if (companyName === "academia-sinica") {
			// document.write("as");
    		return acs;
    	}
    	return undefined;
  	};
	const curExp = getExp(companyName);
	const element: HTMLElement = document.getElementById(companyName) as HTMLElement
	element.innerHTML = "<p>" + curExp.getDate() + ".</p><p>" + curExp.getDescription() + "</p>";
	element.style.color = 'black';
  	element.style.fontSize = '16px';
}

/*
In TypeScript, `HTMLElement` is a type that represents a generic HTML element in the Document Object Model (DOM). It is part of the DOM API and provides a common set of properties and methods that can be used to interact with and manipulate HTML elements.

Some of the common properties and methods you can access on an `HTMLElement` include:

- **innerHTML**: A property that allows you to get or set the HTML content within the element. You can push HTML content, such as text, other elements, or tags, into the `innerHTML` property to modify the content of the element.

- **innerText**: A property that allows you to get or set the text content within the element, excluding any HTML tags. This is useful when you want to work with text content only.

- **textContent**: Similar to `innerText`, this property allows you to get or set the text content within the element, excluding HTML tags.

- **id**: A property that represents the ID attribute of the element, which can be used to uniquely identify an element.

- **className**: A property to get or set the CSS class name of the element.

- **style**: An object that allows you to access and modify the inline CSS styles of the element. For example, you can set the `element.style.color` property to change the text color.

- **setAttribute**: A method that allows you to set a specified attribute on the element.

- **getAttribute**: A method to get the value of a specified attribute on the element.

- **addEventListener**: A method to attach event listeners to the element, allowing you to respond to user interactions, like clicks or mouse events.

- **removeEventListener**: A method to remove event listeners that were previously added with `addEventListener`.

- **parentElement**: A property that refers to the parent element of the current element.

- **children**: A property that provides a collection of child elements (nodes) contained within the element.

- **querySelector**: A method to select the first descendant element that matches a specified CSS selector.

These are just a few of the many properties and methods available on the `HTMLElement` type. The exact properties and methods you can use may vary depending on the specific HTML element you're working with, but `HTMLElement` provides a common set of properties and methods shared by most HTML elements.
*/
