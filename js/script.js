var accessibleTabsContainers = document.querySelectorAll('.accessible-tabs-container');
var tabSelector = document.querySelectorAll('.tab-selectors > li');
var tabContent = document.querySelectorAll('.tab-contents > div');
var largeRandNumber = Math.floor((Math.random() * 1000) + 1000);
accessibleTabsContainers.forEach(function(elem, indexAccessibleTabContainer) {
    elem.setAttribute('data-id', indexAccessibleTabContainer);
    tabSelector.forEach(function(singleTabSelector, i) {
        var ariaControlTabContent = 'tab-content-' + largeRandNumber + '-' + i + '_' + indexAccessibleTabContainer;
        var tabSelectorId = 'tab-selector-' + largeRandNumber + '-' + i + '_' + indexAccessibleTabContainer;
        singleTabSelector.setAttribute('data-id', i);
        singleTabSelector.setAttribute('id', tabSelectorId);
        singleTabSelector.setAttribute('aria-controls', ariaControlTabContent);
        tabContent[i].setAttribute('data-id', i);
        tabContent[i].setAttribute('tabindex', 0);
        tabContent[i].setAttribute('role', 'tabpanel');
        tabContent[i].setAttribute('id', ariaControlTabContent);
        tabContent[i].setAttribute('aria-labeledby', tabSelectorId);
        if (i === 0) {
            tabSelector[i].setAttribute('aria-pressed', 'true');
        } else {
            tabSelector[i].setAttribute('aria-pressed', 'false');
            tabSelector[i].setAttribute('tabindex', -1);
        }
    });
});

function onTabSelectorClick(e) {
    accessibleTabsContainers.forEach(function(accessibleTabsContainer, indexAccessibleTabContainer) {
        var tabSelectorSelected = e.target;
        var accessibleTabsContainerSelected = tabSelectorSelected.parentElement.parentElement;
        if (!tabSelectorSelected.classList.contains('active-tab-selector')) {
            var tabSelectorSelectedFromContainer = accessibleTabsContainerSelected.querySelectorAll('.tab-contents > div');
            console.log(tabSelectorSelectedFromContainer);
            tabSelector.forEach(function(singleTabSelected, i) {
                if (tabSelectorSelected.getAttribute('data-id') === tabContent[i].getAttribute('data-id')) {
                    tabContent[i].classList.add('tab-content-active');
                } else {
                    tabSelector[i].classList.remove('active-tab-selector');
                    tabSelector[i].setAttribute('aria-pressed', 'false');
                    tabSelector[i].setAttribute('aria-selected', 'false');
                    tabSelector[i].setAttribute('tabindex', -1);
                    tabContent[i].classList.remove('tab-content-active');
                }
            });
            tabSelectorSelected.classList.add('active-tab-selector');
            tabSelectorSelected.setAttribute('aria-pressed', 'true');
            tabSelectorSelected.setAttribute('aria-selected', 'true');
            tabSelectorSelected.removeAttribute('tabindex');
        }
    });
}
tabSelector.forEach(function(tabSelector) {
    tabSelector.addEventListener('click', onTabSelectorClick);
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

function copyToClipboard(target) {
    var element = document.getElementById(target);
    var text = element.innerHTML;
    CopyToClipboard(text);
    console.log(element);
    /* only for  First
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied to clipboard";
    */
    var buttons = document.querySelectorAll('.copyableInputButton');
    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.target.classList.add("show-tooltip-message");
            console.log(event.target);
            setTimeout(function() {
                event.target.classList.remove("show-tooltip-message");
            }, 2000);
        });
    });
}

function CopyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
