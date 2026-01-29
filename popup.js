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
    titleInput.placeholder = 'Title substring';
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
    const pairs = [];
    const pairElements = document.querySelectorAll('.pair');
    pairElements.forEach(el => {
        const domain = el.querySelector('.domain').value.trim();
        const title = el.querySelector('.title').value.trim();
        if (domain || title) {
            pairs.push({ domain, title });
        }
    });

    chrome.storage.sync.set({ autoClosePairs: pairs }, () => {
        status.textContent = 'Options saved.';
        setTimeout(() => { status.textContent = ''; }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({ autoClosePairs: [] }, (items) => {
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
