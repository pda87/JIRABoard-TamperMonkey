// ==UserScript==
// @name         JIRA
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Make JIRA great again...(if it was ever.)
// @author       Pete Arden
// @match        https://yourjiradomainhere.atlassian.net/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
var jiraModule = {
	init: function() {
		this.cacheDOM();
		this.insertEpicFilter();
		this.insertExpandAllButton();
		this.insertCollapseAllButton();
		this.collapseAll();
		this.addTitleLinks();
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
	collapseAll: function() {
		this.$ghxSwimlane.addClass("ghx-closed");
		$("#epic-filter").change();
	},
	expandAll: function() {
		this.$ghxSwimlane.remove("ghx-closed");
		$("#epic-filter").change();
	},
	insertExpandAllButton: function() {
		this.$buttonArea.append("<button class='aui-button' id='expand-all'>Expand All</button");

		this.$buttonArea.find("#expand-all").on("click", function() {
			$(".ghx-swimlane").removeClass("ghx-closed");
		});
	},
	insertCollapseAllButton: function() {
		var collapseAllButton = "<button class='aui-button' id='collapse-all'>Collapse All</button";
		this.$buttonArea.append(collapseAllButton);
		this.$buttonArea.find("#collapse-all").on("click", function() {
			$(".ghx-swimlane").addClass("ghx-closed");
		});
	},
	insertEpicFilter: function() {
		var dropdown = "<select id='epic-filter'></select>";
		this.$buttonArea.append(dropdown);

		this.$epicFilter = $("#epic-filter");

		$("<option value='ALL'>ALL</option>").appendTo("#epic-filter");

		this.$labels.each(function(index, value) {
			var name = value.innerText;
			$("<option value="+ $(value).data("swimlaneId") + ">" + name + "</option>").appendTo("#epic-filter");
		});

		$("#epic-filter").on("change", function() {

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
})();
