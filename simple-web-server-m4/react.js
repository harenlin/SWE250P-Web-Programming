		function start() {
			class SocialMediaBlock  extends React.Component {
 				constructor(props) {
					super(props);
         			console.log("Bookmark component created");
					this.message = this.props.platform;
				}
       			
				render() {
         			return (
            			React.createElement("li", { },
		               		React.createElement("a", { }, this.message),
							// React.createElement("a", { href : this.props.href, target: "_blank" }, this.props.platform),
			             	React.createElement("button", 
												{ onClick : () => {
													  window.open(this.props.href, '_blank');
								               		  this.message = "Thanks for visiting my page. Please feel free to follow my " + this.props.platform + ".";
			                						  this.setState({});
            		     						  }
	                							}, "Click Me"),
						)
            		);
          		}
	    	} 

			const rootElement = 
			React.createElement("div", { },
	            React.createElement("h2", { }, "Contact Information"),
				React.createElement("ul", { },
					React.createElement(SocialMediaBlock, { platform: "LinkedIn", href: "https://www.linkedin.com/in/harenlin"}),
					React.createElement(SocialMediaBlock, { platform: "GitHub", href: "https://github.com/harenlin"}),
					React.createElement(SocialMediaBlock, { platform: "Medium", href: "https://haren.medium.com/"}),
              		React.createElement("li", { }, React.createElement("a", {href: "mailto:laolunl@uci.edu"}, "Email: laolunl@uci.edu")),
            	)
			);
    		ReactDOM.render(rootElement, document.getElementById("contact-details"));
		}
