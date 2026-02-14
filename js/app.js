import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { appData, phaseDetails, unifiedItems, injectableKeys } from "./data.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvOuLfBr1-faAK7RC5QkgD6hxhD9oWaP0",
    authDomain: "post-surgery-recovery-plan.firebaseapp.com",
    projectId: "post-surgery-recovery-plan",
    storageBucket: "post-surgery-recovery-plan.firebasestorage.app",
    messagingSenderId: "640490803020",
    appId: "1:640490803020:web:07a9a0322792daff0d89e9",
    measurementId: "G-R4BG49JC7N"
};

const RATING_COLORS = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-red-700'];
const FEELING_EMOJIS = { '1': '😞', '2': '😐', '3': '🙂', '4': '😊', '5': '😁' };
const RATING_LABELS = { '1': 'Very Low', '2': 'Low', '3': 'Moderate', '4': 'High', '5': 'Very High' };

let db;
let checklistDocRef;
let logsDocRef;
let unsubscribeChecklist;
let unsubscribeLogs;
let checkboxToUncheck = null;

let mainApp;
let appLoader;
let loaderText;
let modal;
let uncheckModal;
let modalContent;
let modalTitle;
let modalBody;
let modalClose;
let confirmUncheckBtn;
let cancelUncheckBtn;

document.addEventListener('DOMContentLoaded', () => {
    mainApp = document.getElementById('main-app');
    appLoader = document.getElementById('app-loader');
    loaderText = document.getElementById('loader-text');
    modal = document.getElementById('compound-modal');
    uncheckModal = document.getElementById('uncheck-confirm-modal');
    modalContent = document.getElementById('modal-content');
    modalTitle = document.getElementById('modal-title');
    modalBody = document.getElementById('modal-body');
    modalClose = document.getElementById('modal-close');
    confirmUncheckBtn = document.getElementById('confirm-uncheck');
    cancelUncheckBtn = document.getElementById('cancel-uncheck');

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    runApp();
});

function runApp() {
    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
        appLoader.classList.remove('hidden');
        loaderText.textContent = "Firebase config missing in HTML file.";
        return;
    }
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    db = getFirestore(app);
    checklistDocRef = doc(db, "recoveryState", "checklist");
    logsDocRef = doc(db, "recoveryState", "logs");

    startApp();
}

async function startApp() {
    appLoader.classList.remove('hidden');
    initializeProtocolView();
    initializeChecklist();
    initializeLogView();
    handleTabSwitching();
    setupUncheckModalListeners();

    unsubscribeChecklist = onSnapshot(checklistDocRef, (docSnap) => {
        const remoteData = docSnap.exists() ? docSnap.data() : {};
        updateCheckboxesFromRemote(remoteData);
    });

    unsubscribeLogs = onSnapshot(logsDocRef, (docSnap) => {
        const remoteData = docSnap.exists() ? docSnap.data() : {};
        updateLogsFromRemote(remoteData);
    });

    appLoader.classList.add('opacity-0', 'pointer-events-none');
    mainApp.classList.remove('hidden');
}

function updateCheckboxStateInFirestore(id, data) {
     const updateData = { [id]: data };
     setDoc(checklistDocRef, updateData, { merge: true });
}

function updateCheckboxesFromRemote(remoteData) {
    document.querySelectorAll('#checklist-container input[type="checkbox"]').forEach(checkbox => {
        const checkboxData = remoteData[checkbox.id];
        const shouldBeChecked = checkboxData && checkboxData.checked === true;

        if (checkbox.checked !== shouldBeChecked) {
            checkbox.checked = shouldBeChecked;
        }

        const timestampEl = document.getElementById(`ts-${checkbox.id}`);
        if (shouldBeChecked && checkboxData.ts) {
            timestampEl.textContent = `Completed: ${checkboxData.ts}`;
            timestampEl.classList.remove('hidden');
        } else {
            timestampEl.textContent = '';
            timestampEl.classList.add('hidden');
        }

        const dayCard = checkbox.closest('.day-card');
        if(dayCard) updateDayProgress(dayCard);
    });
}

function updateDayProgress(dayCard) {
    const checkboxes = dayCard.querySelectorAll('input[type="checkbox"]');
    const progressBar = dayCard.querySelector('.progress-bar-fg');
    if (!progressBar) return;
    const totalCheckboxes = checkboxes.length;
    const checkedCount = dayCard.querySelectorAll('input[type="checkbox"]:checked').length;
    const progressPercentage = totalCheckboxes > 0 ? (checkedCount / totalCheckboxes) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
}

function handleCheckboxChange(e) {
    const checkbox = e.target;
    if (checkbox.checked) {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        updateCheckboxStateInFirestore(checkbox.id, { checked: true, ts: timestamp });
        const dayCard = checkbox.closest('.day-card');
        if(dayCard) updateDayProgress(dayCard);
    } else {
        checkboxToUncheck = checkbox;
        checkbox.checked = true;
        uncheckModal.classList.remove('invisible', 'opacity-0');
    }
}

function setupUncheckModalListeners() {
    function closeUncheckModal() {
        uncheckModal.classList.add('invisible', 'opacity-0');
        checkboxToUncheck = null;
    }

    cancelUncheckBtn.addEventListener('click', closeUncheckModal);
    uncheckModal.addEventListener('click', (e) => {
        if (e.target === uncheckModal) closeUncheckModal();
    });

    confirmUncheckBtn.addEventListener('click', () => {
        if (checkboxToUncheck) {
            checkboxToUncheck.checked = false;
            updateCheckboxStateInFirestore(checkboxToUncheck.id, { checked: false, ts: null });
            const dayCard = checkboxToUncheck.closest('.day-card');
            if(dayCard) updateDayProgress(dayCard);
        }
        closeUncheckModal();
    });
}

function initializeChecklist() {
    const checklistContainer = document.getElementById('checklist-container');
    checklistContainer.innerHTML = '';
    const { startDate: start, endDate: end, items } = appData.checklist;
    const startDate = new Date(start + 'T00:00:00');
    const endDate = new Date(end + 'T00:00:00');
    let currentDate = new Date(startDate);
    let dayCounter = 0;
    let dayOfWeekCounter = currentDate.getDay();

    const timeSortOrder = { 'AM': 1, 'AM Meal': 1, 'Any': 2, 'With Meal': 2, 'Evening': 3, 'PM': 3, 'PM Meal': 3 };

    while (currentDate <= endDate) {
        const dayIndex = dayCounter;
        const dayCard = document.createElement('div');
        dayCard.className = `day-card bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col`;
        dayCard.id = `day-${dayIndex}`;
        const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        let itemsForDay = [];
        for (const key in items) {
            if (unifiedItems.includes(key)) {
                const item = items[key];
                let shouldAdd = false;
                if (item.freq === 'daily' || (item.freq === 'eod' && dayIndex % 2 === 0)) {
                    shouldAdd = true;
                } else if (item.freq === 'weekly' && dayOfWeekCounter % 7 === 0) {
                    shouldAdd = true;
                }
                if (shouldAdd) itemsForDay.push({ ...item, checklistKey: key });
            }
        }

        itemsForDay.sort((a, b) => (timeSortOrder[a.time] || 99) - (timeSortOrder[b.time] || 99));

        let checklistHTML = itemsForDay.map(item => {
            const id = `check-${dayIndex}-${item.checklistKey}`;
            const injText = item.inj ? `<span class="font-mono text-xs text-blue-400">${item.inj}</span>` : '';
            return `<div class="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                    <label class="flex items-start cursor-pointer flex-grow mr-2">
                        <input type="checkbox" id="${id}" class="checkbox-custom mr-3 flex-shrink-0 mt-1">
                        <div class="min-w-0">
                            <span class="font-medium text-gray-200">${item.name}</span>
                            <span class="text-sm text-gray-400 ml-2">${item.dose}</span>
                            <div id="ts-${id}" class="text-xs text-blue-400 mt-1 hidden"></div>
                        </div>
                    </label>
                    ${injText}<span class="text-sm text-gray-500 ml-auto pl-2 text-right self-start mt-1">${item.time}</span></div>`;
        }).join('');

        dayCard.innerHTML = `<h3 class="font-bold text-lg text-white mb-2">${dateString}</h3><div class="flex-grow">${checklistHTML || '<p class="text-gray-500 text-sm py-2">Rest day from scheduled therapies.</p>'}</div>
            <div class="mt-4"><div class="progress-bar-bg w-full h-2 rounded-full overflow-hidden"><div class="progress-bar-fg h-full" style="width: 0%;"></div></div></div>`;
        checklistContainer.appendChild(dayCard);

        dayCard.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
        dayOfWeekCounter++;
    }
}

function initializeProtocolView() {
     populateProtocolTables();
     populateLibrary();
     populateRiskTable();
     setupProtocolEventListeners();
}

function populateProtocolTables() {
    const unifiedContainer = document.getElementById('protocol-unified');
    let tableRowsHTML = '';
    unifiedItems.forEach(key => {
        const item = appData.checklist.items[key];
        const compound = appData.protocol[item.key];
        const injectable = injectableKeys.has(item.key);
        const lineClass = injectable ? 'bg-emerald-500' : 'bg-blue-500';
        tableRowsHTML += `<tr class="hover:bg-gray-700/50"><td class="p-3 font-medium"><span class="inline-block w-1 h-4 ${lineClass} mr-2"></span><button data-key="${item.key}" class="compound-link text-blue-400 hover:text-blue-300 hover:underline">${compound.name}</button></td><td class="p-3 text-gray-300">${item.dose}</td><td class="p-3 text-gray-300">${item.freq}</td><td class="p-3 text-gray-300">${item.time}</td><td class="p-3 text-gray-300 font-mono">${item.inj || '—'}</td></tr>`;
    });
    unifiedContainer.innerHTML = `<div class="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"><div class="overflow-x-auto"><table class="w-full table-auto text-left text-sm"><thead class="bg-gray-700/50 text-gray-300"><tr><th class="p-3 font-semibold">Compound</th><th class="p-3 font-semibold">Dosage</th><th class="p-3 font-semibold">Frequency</th><th class="p-3 font-semibold">Time of Day</th><th class="p-3 font-semibold">Inj. Amount (units)</th></tr></thead><tbody class="divide-y divide-gray-700">${tableRowsHTML}</tbody></table></div></div>`;
}

function populateLibrary() {
    const libraryGrid = document.getElementById('library-grid');
    libraryGrid.innerHTML = '';
    for (const key in appData.protocol) {
        const compound = appData.protocol[key];
        const statusStyles = {
            research: { icon: '🔬', bg: 'bg-blue-500/20', text: 'text-blue-300' },
            experimental: { icon: '🧪', bg: 'bg-purple-500/20', text: 'text-purple-300' },
            prescription: { icon: '💊', bg: 'bg-green-500/20', text: 'text-green-300' },
            'prescription-c': { icon: '⚠️', bg: 'bg-red-500/20', text: 'text-red-300' },
            supplement: { icon: '🌿', bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
            device: { icon: '💡', bg: 'bg-gray-500/20', text: 'text-gray-300' }
        };
        const style = statusStyles[compound.status] || statusStyles['device'];
        const card = `<button data-key="${key}" class="compound-link text-left w-full h-full bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-700/50 transition-all duration-200 flex flex-col justify-between border border-gray-700"><div><h4 class="font-bold text-white">${compound.name}</h4><p class="text-xs text-gray-400 mb-2">${compound.category}</p><p class="text-sm text-gray-300">${compound.info.summary}</p></div><div class="mt-3"><span class="text-xs font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}">${style.icon} ${compound.status.replace('-c', ' (Controlled)')}</span></div></button>`;
        libraryGrid.innerHTML += card;
    }
}

function populateRiskTable() {
    const riskTableBody = document.getElementById('risk-table');
    riskTableBody.innerHTML = '';
    for (const key in appData.protocol) {
        const compound = appData.protocol[key];
        if (!compound.risk) continue;
        let nameCellClass = "text-gray-200";
        if(compound.status === 'prescription-c') nameCellClass = "text-red-400 font-bold";
        if(compound.status === 'research' || compound.status === 'experimental') nameCellClass = "text-blue-400 font-semibold";
        const row = `<tr class="hover:bg-gray-700/50"><td class="p-3 font-medium ${nameCellClass}">${compound.name}</td><td class="p-3 text-gray-300">${compound.risk.status}</td><td class="p-3 text-gray-300">${compound.risk.primary}</td><td class="p-3 text-gray-300">${compound.risk.monitoring}</td></tr>`;
        riskTableBody.innerHTML += row;
    }
}

function openModal(key) {
    const compound = appData.protocol[key];
    modalTitle.textContent = compound.name;
    let notesHtml = compound.info.notes ? `<div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md"><h5 class="font-semibold text-blue-300">Key Notes</h5><p class="text-sm text-blue-300/80">${compound.info.notes}</p></div>` : '';
    modalBody.innerHTML = `<p class="text-gray-300 mb-4">${compound.info.summary}</p><h4 class="font-bold text-lg text-white mb-2">Mechanism of Action</h4><p class="text-gray-300">${compound.info.mechanism}</p>${notesHtml}`;
    modal.classList.remove('invisible', 'opacity-0');
    modalContent.classList.remove('scale-95');
}

function openPhaseModal(key) {
    const phase = phaseDetails[key];
    modalTitle.textContent = phase.title;
    modalBody.innerHTML = phase.body;
    modal.classList.remove('invisible', 'opacity-0');
    modalContent.classList.remove('scale-95');
}

function closeModal() {
    modal.classList.add('invisible', 'opacity-0');
    modalContent.classList.add('scale-95');
}

function setupProtocolEventListeners() {
    document.querySelectorAll('#protocol-view .compound-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(link.dataset.key);
        });
    });
    document.querySelectorAll('.phase-card').forEach(card => {
        card.addEventListener('click', () => openPhaseModal(card.dataset.phase));
    });
}

function handleTabSwitching() {
    document.querySelectorAll('.main-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            document.getElementById(`${tab.dataset.tab}-view`).classList.remove('hidden');
        });
    });
}

function initializeLogView() {
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';
    const { startDate: start, endDate: end } = appData.checklist;
    const startDate = new Date(start + 'T00:00:00');
    const endDate = new Date(end + 'T00:00:00');
    let currentDate = new Date(startDate);
    let dayCounter = 0;

    while(currentDate <= endDate) {
        const dayIndex = `day-${dayCounter}`;
        const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        const logCard = document.createElement('div');
        logCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col space-y-4';
        logCard.id = `log-${dayIndex}`;
        logCard.innerHTML = `
            <div>
                <h3 class="font-bold text-lg text-white">${dateString}</h3>
                <div id="log-display-${dayIndex}" class="mt-2 text-sm text-gray-400">No entry for this day.</div>
            </div>
            <div id="log-form-${dayIndex}" class="log-entry-form">
                <div class="space-y-4">
                    <div>
                        <label class="font-semibold text-gray-300 text-sm">Overall Feeling:</label>
                        <div data-metric="feeling" class="flex justify-around items-center text-2xl mt-2">
                            <span data-value="1" class="rating-emoji">😞</span>
                            <span data-value="2" class="rating-emoji">😐</span>
                            <span data-value="3" class="rating-emoji">🙂</span>
                            <span data-value="4" class="rating-emoji">😊</span>
                            <span data-value="5" class="rating-emoji">😁</span>
                        </div>
                    </div>
                    <div>
                        <label class="font-semibold text-gray-300 text-sm">Swelling / Inflammation:</label>
                        <div data-metric="swelling" class="flex justify-between items-center mt-2 space-x-1">
                            <div data-value="1" class="rating-bar flex-1 h-3 bg-gray-600 rounded-l-lg"></div>
                            <div data-value="2" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="3" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="4" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="5" class="rating-bar flex-1 h-3 bg-gray-600 rounded-r-lg"></div>
                        </div>
                    </div>
                    <div>
                        <label class="font-semibold text-gray-300 text-sm">Scar Appearance:</label>
                        <div data-metric="scar" class="flex justify-between items-center mt-2 space-x-1">
                            <div data-value="1" class="rating-bar flex-1 h-3 bg-gray-600 rounded-l-lg"></div>
                            <div data-value="2" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="3" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="4" class="rating-bar flex-1 h-3 bg-gray-600"></div>
                            <div data-value="5" class="rating-bar flex-1 h-3 bg-gray-600 rounded-r-lg"></div>
                        </div>
                    </div>
                    <div>
                        <label for="notes-${dayIndex}" class="font-semibold text-gray-300 text-sm">Notes:</label>
                        <textarea id="notes-${dayIndex}" class="w-full bg-gray-700 text-gray-200 rounded-md p-2 mt-2 h-24 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <button data-dayindex="${dayIndex}" class="save-log-btn w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Log</button>
                </div>
            </div>
            <button data-dayindex="${dayIndex}" class="toggle-log-form-btn mt-auto text-sm text-blue-400 hover:text-blue-300 self-start">Add / Edit Log</button>
        `;
        logContainer.appendChild(logCard);
        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
    }
    setupLogEventListeners();
}

function updateRatingBars(container, value) {
    if (!container) return;
    const bars = container.querySelectorAll('.rating-bar');

    bars.forEach((b, i) => {
        if (i < value) {
            b.className = `rating-bar flex-1 h-3 ${RATING_COLORS[i]} transition-colors`;
        } else {
            b.className = 'rating-bar flex-1 h-3 bg-gray-600 transition-colors';
        }
    });
    if (bars.length > 0) {
        bars[0].classList.add('rounded-l-lg');
        bars[bars.length - 1].classList.add('rounded-r-lg');
    }
}

function setupLogEventListeners() {
    document.querySelectorAll('.toggle-log-form-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const form = document.getElementById(`log-form-${btn.dataset.dayindex}`);
            form.classList.toggle('open');
            btn.textContent = form.classList.contains('open') ? 'Close' : 'Add / Edit Log';
        });
    });

    document.querySelectorAll('.rating-emoji').forEach(emoji => {
        emoji.addEventListener('click', () => {
            const parent = emoji.parentElement;
            parent.querySelectorAll('.rating-emoji').forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
            parent.dataset.rating = emoji.dataset.value;
        });
    });

    document.querySelectorAll('[data-metric] .rating-bar').forEach(bar => {
        bar.addEventListener('click', () => {
            const parent = bar.parentElement;
            const value = bar.dataset.value;
            updateRatingBars(parent, value);
            parent.dataset.rating = value;
        });
    });

    document.querySelectorAll('.save-log-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dayIndex = btn.dataset.dayindex;
            const form = document.getElementById(`log-form-${dayIndex}`);
            const logData = {
                feeling: form.querySelector('[data-metric="feeling"]').dataset.rating || null,
                swelling: form.querySelector('[data-metric="swelling"]').dataset.rating || null,
                scar: form.querySelector('[data-metric="scar"]').dataset.rating || null,
                notes: form.querySelector(`#notes-${dayIndex}`).value,
                timestamp: new Date().toISOString()
            };
            updateLogStateInFirestore(dayIndex, logData);
            form.classList.remove('open');
            document.querySelector(`.toggle-log-form-btn[data-dayindex="${dayIndex}"]`).textContent = 'Add / Edit Log';
        });
    });
}

function updateLogStateInFirestore(dayIndex, data) {
     const updateData = { [dayIndex]: data };
     setDoc(logsDocRef, updateData, { merge: true });
}

function updateLogsFromRemote(remoteData) {
    for (const dayIndex in remoteData) {
        const logData = remoteData[dayIndex];
        const displayEl = document.getElementById(`log-display-${dayIndex}`);
        const formEl = document.getElementById(`log-form-${dayIndex}`);

        if (displayEl) {
            if (logData && logData.timestamp) {
                let displayHTML = '<ul class="space-y-1">';
                if (logData.feeling) displayHTML += `<li>Feeling: <span class="text-xl">${FEELING_EMOJIS[logData.feeling]}</span></li>`;
                if (logData.swelling) displayHTML += `<li>Swelling: <span class="font-semibold text-gray-200">${RATING_LABELS[logData.swelling]}</span></li>`;
                if (logData.scar) displayHTML += `<li>Scar Appearance: <span class="font-semibold text-gray-200">${RATING_LABELS[logData.scar]}</span></li>`;
                if (logData.notes) displayHTML += `<li>Notes: <p class="whitespace-pre-wrap italic text-gray-400">${logData.notes}</p></li>`;
                displayHTML += '</ul>';
                displayEl.innerHTML = displayHTML;
            } else {
                displayEl.innerHTML = 'No entry for this day.';
            }
        }

        if (formEl && logData) {
            const feelingContainer = formEl.querySelector('[data-metric="feeling"]');
            if (logData.feeling) {
                feelingContainer.dataset.rating = logData.feeling;
                feelingContainer.querySelectorAll('.rating-emoji').forEach(e => {
                    e.classList.toggle('selected', e.dataset.value === logData.feeling);
                });
            }
            const swellingContainer = formEl.querySelector('[data-metric="swelling"]');
            if(logData.swelling) {
                 swellingContainer.dataset.rating = logData.swelling;
                 updateRatingBars(swellingContainer, logData.swelling);
            }
            const scarContainer = formEl.querySelector('[data-metric="scar"]');
            if(logData.scar) {
                 scarContainer.dataset.rating = logData.scar;
                 updateRatingBars(scarContainer, logData.scar);
            }
            formEl.querySelector(`#notes-${dayIndex}`).value = logData.notes || '';
        }
    }
}
