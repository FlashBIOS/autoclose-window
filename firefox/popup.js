const container = document.getElementById('pairs-container');
const addBtn = document.getElementById('add-pair');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');

function createPairElement(domain = '', title = '') {
    const div = document.createElement('div');
    div.className = 'pair';

    const domainInput = document.createElement('input');
    domainInput.placeholder = 'Domain (e.g. example.com)';
    domainInput.value = domain;
    domainInput.className = 'domain';

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Page Title';
    titleInput.value = title;
    titleInput.className = 'title';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => div.remove();

    div.appendChild(domainInput);
    div.appendChild(titleInput);
    div.appendChild(removeBtn);
    container.appendChild(div);
}

function saveOptions() {
    console.log("Saving options...");
    const pairs = [];
    const pairElements = document.querySelectorAll('.pair');
    pairElements.forEach(el => {
        const domain = el.querySelector('.domain').value.trim();
        const title = el.querySelector('.title').value.trim();
        if (domain || title) {
            pairs.push({ domain, title });
        }
    });

    browser.storage.local.set({ autoClosePairs: pairs }, () => {
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 2000);
    });
}

function addLabels() {
    console.log("Adding labels...");
    const labelElement = document.createElement('label');
    labelElement.textContent = 'Domain & Page Title:';
    labelElement.className = 'label';
    container.appendChild(labelElement);
}

function restoreOptions() {
    console.log("Restoring options...");
    addLabels();
    browser.storage.local.get({ autoClosePairs: [] }, (items) => {
        items.autoClosePairs.forEach(pair => {
            createPairElement(pair.domain, pair.title);
        });
        if (items.autoClosePairs.length === 0) {
            createPairElement();
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
addBtn.addEventListener('click', () => createPairElement());
saveBtn.addEventListener('click', saveOptions);
