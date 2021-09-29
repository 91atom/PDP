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
