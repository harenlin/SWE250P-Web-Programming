// const globalAny:any = global;

/* app.ts */
export { start } from './react.js';
import { InternExperience, trm, acs } from './myModule';


export function button(companyName: string) {
	alert("Button! Zot Zot Zot!");
	const getExp = (companyName: string): InternExperience | undefined => {
		if (companyName === "trend-micro") {
			return trm;
		} else if (companyName === "academia-sinica") {
			return acs;
		}
		return undefined;
	};
	const curExp = getExp(companyName);
	const element: HTMLElement | null = document.getElementById(companyName);
	if (element) {
		element!.innerHTML = "<p>" + curExp?.getDate() + ".</p><p>" + curExp?.getDescription() + "</p>";
		element!.style.color = 'black';
		element!.style.fontSize = '16px';
	} else {
		alert("element null");
	} 
}

/* THIS LIKE IS SO IMPORTANT !!! */
// globalAny.document.button = button;
