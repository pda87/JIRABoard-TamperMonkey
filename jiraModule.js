var jiraModule = {
	init: function() {
		this.cacheDOM();
		this.insertEpicFilter();
		this.insertExpandAllButton();
		this.insertCollapseAllButton();
		this.collapseAll();
		this.addTitleLinks();
		this.colourSwimlanes();
	},
	reload: function(){
		this.cacheDOM();
		this.collapseAll();
		this.addTitleLinks();
		this.colourSwimlanes();
	},
	cacheDOM: function() {
		this.$buttonArea = $("#ghx-modes-tools");
		this.$ghxSwimlane = $(".ghx-swimlane");
		this.$labels = $(".ghx-swimlane-header");
	},
	addTitleLinks: function() {
		var spanButtons = $('span[role="button"]');

		spanButtons.addClass("ghx-expander");
		spanButtons.addClass(" js-expander");
	},
	colourSwimlanes: function() {
		//Too much red is full on
		//var red = "#f18973";
		//var red = "#ffd2dc";

		var amber = "#fff7ce";
		var green = "#edffe5";
		
		//this.colourSwimlane(218, red);
		this.colourSwimlane(252, amber);
		this.colourSwimlane(254, green);
		this.colourSwimlane(256, green);
		//this.colourSwimlane(227, red);
		this.colourSwimlane(228, green);
		//this.colourSwimlane(230, red);
		this.colourSwimlane(229, green);
		this.colourSwimlane(249, green);
	},
	colourSwimlane: function(swimlaneNumber, swimlaneColour) {
		$("li[data-column-id='" + swimlaneNumber + "']").css("background-color", swimlaneColour);
	},
	collapseAll: function() {
		jiraModule.$ghxSwimlane.addClass("ghx-closed");
		$("#epic-filter").change();
	},
	expandAll: function() {
		jiraModule.$ghxSwimlane.removeClass("ghx-closed");
		$("#epic-filter").change();
	},
	insertExpandAllButton: function() {
		this.$buttonArea.append("<button class='aui-button' id='expand-all'>Expand All</button");
        	this.$buttonArea.find("#expand-all").on("click", this.expandAll);
	},
	insertCollapseAllButton: function() {
		var collapseAllButton = "<button class='aui-button' id='collapse-all'>Collapse All</button";
		this.$buttonArea.append(collapseAllButton);
		this.$buttonArea.find("#collapse-all").on("click", this.collapseAll);
	},
	insertEpicFilter: function() {
		//Get Epic filter in alphabetic order
		var dropdown = "<select id='epic-filter'></select>";
		this.$buttonArea.append(dropdown);

		var epicFilter = $("#epic-filter");

		epicFilter.css("padding", "5px");
				
		$("<option value='ALL'>ALL</option>").appendTo("#epic-filter");
		
		var labelNames = [];
		this.$labels.each(function(index, value) {
			var name = value.innerText;
			labelNames.push(name);
		});
		
		labelNames.sort();

		for(i = 0; i < labelNames.length; i++) {
			var name = labelNames[i];
			var headerSelector = $(".ghx-swimlane-header").filter(":contains('" + name + "')");
			$("<option value="+ $(headerSelector).data("swimlaneId") + ">" + name + "</option>").appendTo("#epic-filter");
		}

		epicFilter.on("change", function() {

			$(".ghx-swimlane").fadeOut();

			var swimlaneID = this.value;

			if(swimlaneID == "ALL") {
				$(".ghx-swimlane").fadeIn();
			}
			else {
				$(".ghx-swimlane").each(function(index, value) {
					if($(value).attr("swimlane-id") == swimlaneID) {
						$(value).fadeIn();
						return;
					}
				});
			}
		});
	}
};

jiraModule.init();
