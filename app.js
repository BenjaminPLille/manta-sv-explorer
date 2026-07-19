/**
 * Manta SV Explorer - Core Application Logic
 * Author: Antigravity Pair-Programming Agent
 */

// Haematological Translocation Database
const HEME_TRANSLOCATIONS = {
    LAM: [
        {
            name: "t(8;21)(q22;q22)",
            genes: ["RUNX1", "RUNX1T1"],
            chrs: ["8", "21"],
            desc: "Fusion RUNX1-RUNX1T1 (AML1-ETO). Diagnostic de Leucémie Aiguë Myéloïde core-binding factor (CBF). Bon pronostic."
        },
        {
            name: "t(15;17)(q22;q12)",
            genes: ["PML", "RARA"],
            chrs: ["15", "17"],
            desc: "Fusion PML-RARA. Diagnostic de la Leucémie Aiguë Promyélocytaire (LAM3). Urgence thérapeutique absolue (traitement ATRA/ATO)."
        },
        {
            name: "inv(16)(p13.1q22) ou t(16;16)",
            genes: ["CBFB", "MYH11"],
            chrs: ["16", "16"],
            desc: "Fusion CBFB-MYH11. Diagnostic de LAM core-binding factor (CBF) avec éosinophiles anormaux. Bon pronostic."
        },
        {
            name: "t(9;11)(p22;q23)",
            genes: ["KMT2A", "MLLT3"],
            chrs: ["9", "11"],
            desc: "Fusion KMT2A-MLLT3 (MLL-AF9). Associée à des leucémies aiguës monoblastiques."
        },
        {
            name: "t(6;9)(p23;q34)",
            genes: ["DEK", "NUP214"],
            chrs: ["6", "9"],
            desc: "Fusion DEK-NUP214. Associée à une dysplasie multilignée, pronostic défavorable."
        },
        {
            name: "inv(3)(q21q26.2) ou t(3;3)",
            genes: ["GATA2", "MECOM"],
            chrs: ["3", "3"],
            desc: "Réarrangement GATA2/MECOM (EVI1). Hijacking de l'enhancer de GATA2 vers MECOM. Pronostic très défavorable."
        },
        {
            name: "t(1;22)(p13.3;q13.1)",
            genes: ["RBM15", "MKL1"],
            chrs: ["1", "22"],
            desc: "Fusion RBM15-MKL1. Spécifique des LAM mégacaryoblastiques aiguës (LAM-M7) du nourrisson."
        },
        {
            name: "t(11;19)(q23.3;p13.3)",
            genes: ["KMT2A", "MLLT1"],
            chrs: ["11", "19"],
            desc: "Fusion KMT2A-MLLT1 (MLL-ENL). Fréquente dans les LAM et LAL."
        },
        {
            name: "t(5;11)(q35;p15)",
            genes: ["NUP98", "NSD1"],
            chrs: ["5", "11"],
            desc: "Fusion cryptique NUP98-NSD1. Associée à un pronostic extrêmement défavorable."
        }
    ],
    LAL_B: [
        {
            name: "t(9;22)(q34.1;q11.2)",
            genes: ["BCR", "ABL1"],
            chrs: ["9", "22"],
            desc: "Chromosome Philadelphie (fusion BCR-ABL1 p190 ou p210). Facteur pronostique majeur, ciblé par les inhibiteurs de tyrosine kinase (ITK)."
        },
        {
            name: "t(12;21)(p13.2;q22.1)",
            genes: ["ETV6", "RUNX1"],
            chrs: ["12", "21"],
            desc: "Fusion ETV6-RUNX1 (TEL-AML1). Leucémie pédiatrique la plus fréquente, excellent pronostic."
        },
        {
            name: "t(1;19)(q23;p13.3)",
            genes: ["TCF3", "PBX1"],
            chrs: ["1", "19"],
            desc: "Fusion TCF3-PBX1 (E2A-PBX1). LAL pré-B, souvent associée à un risque accru de rechute neuroméningée."
        },
        {
            name: "t(4;11)(q21;q23)",
            genes: ["KMT2A", "AFF1"],
            chrs: ["4", "11"],
            desc: "Fusion KMT2A-AFF1 (MLL-AF4). Fréquent chez le nourrisson, pronostic très sombre."
        },
        {
            name: "t(5;14)(q31;q32)",
            genes: ["IL3", "IGH"],
            chrs: ["5", "14"],
            desc: "Juxtaposition IL3/IGH (enhancer hijacking). Entraîne une hyperéosinophilie sanguine associée."
        },
        {
            name: "t(8;14)(q24;q32)",
            genes: ["MYC", "IGH"],
            chrs: ["8", "14"],
            desc: "Translocation MYC/IGH. Caractéristique des LAL de type Burkitt (LAL3)."
        },
        {
            name: "t(x;14)(p22;q32) ou t(y;14)",
            genes: ["CRLF2", "IGH"],
            chrs: ["X", "14"],
            desc: "Surexpression de CRLF2 par hijacking de l'enhancer IGH. Profil Ph-like, cible thérapeutique potentielle (JAKi)."
        }
    ],
    LAL_T: [
        {
            name: "t(10;14)(q24;q11)",
            genes: ["TLX1", "TCRAD"],
            chrs: ["10", "14"],
            desc: "Activation oncogénique de TLX1 (HOX11) par les enhancers du locus TCR alpha/delta (TCRAD)."
        },
        {
            name: "t(5;14)(q35;q11)",
            genes: ["TLX3", "TCRAD"],
            chrs: ["5", "14"],
            desc: "Activation oncogénique de TLX3 (HOX11L2) par les enhancers de TCRAD ou TCRB. Groupe homogène de LAL-T de pronostic intermédiaire."
        },
        {
            name: "t(1;14)(p32;q11)",
            genes: ["TAL1", "TCRAD"],
            chrs: ["1", "14"],
            desc: "Translocation ou microdélétion activant le facteur de transcription TAL1 (SCL) via les enhancers TCRAD."
        },
        {
            name: "t(11;14)(p15;q11)",
            genes: ["LMO2", "TCRAD"],
            chrs: ["11", "14"],
            desc: "Activation de l'oncogène LMO2 par les enhancers TCRAD. Impliqué dans la différenciation des cellules T."
        },
        {
            name: "t(11;14)(p13;q11)",
            genes: ["LMO1", "TCRAD"],
            chrs: ["11", "14"],
            desc: "Activation de l'oncogène LMO1 par les enhancers TCRAD."
        },
        {
            name: "t(7;9)(q34;q34)",
            genes: ["TCRB", "NOTCH1"],
            chrs: ["7", "9"],
            desc: "Juxtaposition TCRB et NOTCH1, entraînant une activation constitutive de la voie NOTCH1."
        }
    ],
    MYELOME: [
        {
            name: "t(11;14)(q13;q32)",
            genes: ["CCND1", "IGH"],
            chrs: ["11", "14"],
            desc: "Translocation CCND1/IGH (cyclin D1). Présente dans 15-20% des cas. Sensibilité accrue au Venetoclax."
        },
        {
            name: "t(4;14)(p16;q32)",
            genes: ["FGFR3", "IGH"],
            chrs: ["4", "14"],
            desc: "Translocation FGFR3-NSD2/IGH. Entraîne la surexpression de FGFR3 et NSD2 (MMSET). Risque cytogénétique élevé."
        },
        {
            name: "t(14;16)(q32;q23)",
            genes: ["MAF", "IGH"],
            chrs: ["14", "16"],
            desc: "Translocation MAF/IGH (surexpression de c-MAF). Risque cytogénétique élevé."
        },
        {
            name: "t(14;20)(q32;q12)",
            genes: ["MAFB", "IGH"],
            chrs: ["14", "20"],
            desc: "Translocation MAFB/IGH (surexpression de MAFB). Risque cytogénétique élevé."
        },
        {
            name: "t(6;14)(p21;q32)",
            genes: ["CCND3", "IGH"],
            chrs: ["6", "14"],
            desc: "Translocation CCND3/IGH (cyclin D3). Entraîne l'activation de CCND3."
        },
        {
            name: "t(8;14)(q24;q32)",
            genes: ["MYC", "IGH"],
            chrs: ["8", "14"],
            desc: "Translocation MYC/IGH. Souvent associée à une progression de la maladie."
        }
    ],
    LYMPHOME: [
        {
            name: "t(11;14)(q13;q32)",
            genes: ["CCND1", "IGH"],
            chrs: ["11", "14"],
            desc: "Translocation CCND1/IGH. Pathognomonique et requise pour le diagnostic du Lymphome à Cellules du Manteau (MCL)."
        },
        {
            name: "t(14;18)(q32;q21)",
            genes: ["BCL2", "IGH"],
            chrs: ["14", "18"],
            desc: "Translocation BCL2/IGH. Présente dans 90% des Lymphomes Folliculaires et 30% des Lymphomes Diffus à Grands Lymphocytes B (DLBCL)."
        },
        {
            name: "t(8;14)(q24;q32)",
            genes: ["MYC", "IGH"],
            chrs: ["8", "14"],
            desc: "Translocation MYC/IGH. Pathognomonique du Lymphome de Burkitt. Également présente dans les lymphomes double-hit."
        },
        {
            name: "t(11;18)(q21;q21)",
            genes: ["BIRC3", "MALT1"],
            chrs: ["11", "18"],
            desc: "Fusion BIRC3-MALT1 (API2-MALT1). Caractéristique du Lymphome de la zone marginale de type MALT."
        },
        {
            name: "t(14;18)(q32;q21) [MALT1/IGH]",
            genes: ["MALT1", "IGH"],
            chrs: ["14", "18"],
            desc: "Translocation MALT1/IGH. Présente dans les Lymphomes MALT extra-nodaux."
        },
        {
            name: "t(1;14)(p22;q32)",
            genes: ["BCL10", "IGH"],
            chrs: ["1", "14"],
            desc: "Translocation BCL10/IGH. Entraîne une activation de la voie NF-kB dans les lymphomes MALT."
        },
        {
            name: "t(3;14)(q27;q32)",
            genes: ["BCL6", "IGH"],
            chrs: ["3", "14"],
            desc: "Translocation BCL6/IGH. Fréquente dans les Lymphomes Diffus à Grands Lymphocytes B (DLBCL)."
        }
    ]
};

// Genomic Coordinate Ranges for Regulatory/Enhancer Hijacking Translocations (hg19/hg38 compatible)
const REGULATORY_REGIONS = [
    {
        name: "t(11;14)(q13;q32) [CCND1/IGH]",
        chrs: ["11", "14"],
        ranges: [
            { chr: "11", start: 68000000, end: 72000000 },
            { chr: "14", start: 104500000, end: 107500000 }
        ]
    },
    {
        name: "t(4;14)(p16;q32) [FGFR3/NSD2/IGH]",
        chrs: ["4", "14"],
        ranges: [
            { chr: "4", start: 1400000, end: 2500000 },
            { chr: "14", start: 104500000, end: 107500000 }
        ]
    },
    {
        name: "t(14;16)(q32;q23) [MAF/IGH]",
        chrs: ["14", "16"],
        ranges: [
            { chr: "14", start: 104500000, end: 107500000 },
            { chr: "16", start: 78000000, end: 81000000 }
        ]
    },
    {
        name: "t(14;20)(q32;q12) [MAFB/IGH]",
        chrs: ["14", "20"],
        ranges: [
            { chr: "14", start: 104500000, end: 107500000 },
            { chr: "20", start: 39000000, end: 42000000 }
        ]
    },
    {
        name: "t(8;14)(q24;q32) [MYC/IGH]",
        chrs: ["8", "14"],
        ranges: [
            { chr: "8", start: 126000000, end: 130000000 },
            { chr: "14", start: 104500000, end: 107500000 }
        ]
    },
    {
        name: "t(14;18)(q32;q21) [BCL2/IGH]",
        chrs: ["14", "18"],
        ranges: [
            { chr: "14", start: 104500000, end: 107500000 },
            { chr: "18", start: 62000000, end: 65000000 }
        ]
    },
    {
        name: "t(10;14)(q24;q11) [TLX1/TCRAD]",
        chrs: ["10", "14"],
        ranges: [
            { chr: "10", start: 100000000, end: 103000000 },
            { chr: "14", start: 21000000, end: 24000000 }
        ]
    },
    {
        name: "t(11;14)(p15;q11) [LMO2/TCRAD]",
        chrs: ["11", "14"],
        ranges: [
            { chr: "11", start: 32500000, end: 35500000 },
            { chr: "14", start: 21000000, end: 24000000 }
        ]
    },
    {
        name: "t(11;14)(p13;q11) [LMO1/TCRAD]",
        chrs: ["11", "14"],
        ranges: [
            { chr: "11", start: 7800000, end: 9200000 },
            { chr: "14", start: 21000000, end: 24000000 }
        ]
    },
    {
        name: "t(1;14)(p32;q11) [TAL1/TCRAD]",
        chrs: ["1", "14"],
        ranges: [
            { chr: "1", start: 46000000, end: 49000000 },
            { chr: "14", start: 21000000, end: 24000000 }
        ]
    }
];

// Application State
const state = {
    headers: [],
    rawRows: [],
    fullRows: [],
    splitRows: [],
    sampleCols: [],
    normalSampleCol: null,  // Control/Sain
    tumorSampleCol: null,   // Tumor/Malade
    
    // View state
    currentView: 'full', // 'full' (Vue Globale) or 'split' (Vue Gènes)
    filteredRows: [],
    currentPage: 1,
    pageSize: 50,
    
    // Sorting state
    sortColumn: null,
    sortDirection: 'asc',
    
    // Autocomplete & Unique values
    genesList: [],
    chromosomesList: [],
    
    // Active filters
    filters: {
        svType: '',
        chr: '',
        acmg: '',
        gene: '',
        vafTumor: 0.0,
        vafNormal: 1.0,
        sizeMin: 0,
        textQuery: ''
    },
    
    selectedRow: null,
    genomeAssembly: 'hg38' // 'hg38' or 'hg19'
};

// Document Elements
const el = {
    mantaInput: document.getElementById('mantaInput'),
    dropZone: document.getElementById('dropZone'),
    landingPage: document.getElementById('landingPage'),
    resultsSection: document.getElementById('resultsSection'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingMessage: document.getElementById('loadingMessage'),
    resetFileBtn: document.getElementById('resetFileBtn'),
    assemblySelect: document.getElementById('assemblySelect'),
    assemblySelectorContainer: document.getElementById('assemblySelectorContainer'),
    
    // Stats elements
    statTotalSVs: document.getElementById('statTotalSVs'),
    statPathogenic: document.getElementById('statPathogenic'),
    statGeneInvolved: document.getElementById('statGeneInvolved'),
    statSomaticSpecific: document.getElementById('statSomaticSpecific'),
    typeDistribution: document.getElementById('typeDistribution'),
    
    // Intelligent Predictor
    pathologySelect: document.getElementById('pathologySelect'),
    pathologyResults: document.getElementById('pathologyResults'),
    
    // Filter controls
    svTypeFilter: document.getElementById('svTypeFilter'),
    chrFilter: document.getElementById('chrFilter'),
    acmgFilter: document.getElementById('acmgFilter'),
    geneSearchInput: document.getElementById('geneSearchInput'),
    geneAutocompleteList: document.getElementById('geneAutocompleteList'),
    vafTumorSlider: document.getElementById('vafTumorSlider'),
    vafTumorVal: document.getElementById('vafTumorVal'),
    vafNormalSlider: document.getElementById('vafNormalSlider'),
    vafNormalVal: document.getElementById('vafNormalVal'),
    sizeMinSlider: document.getElementById('sizeMinSlider'),
    sizeMinVal: document.getElementById('sizeMinVal'),
    textSearchInput: document.getElementById('textSearchInput'),
    clearAllFiltersBtn: document.getElementById('clearAllFiltersBtn'),
    activeFilterPills: document.getElementById('activeFilterPills'),
    filteredCount: document.getElementById('filteredCount'),
    totalCount: document.getElementById('totalCount'),
    
    // Table elements
    svTable: document.getElementById('svTable'),
    tableHeaderRow: document.getElementById('tableHeaderRow'),
    tableBody: document.getElementById('tableBody'),
    pageSizeSelect: document.getElementById('pageSizeSelect'),
    
    // View toggles
    modeFullBtn: document.getElementById('modeFullBtn'),
    modeSplitBtn: document.getElementById('modeSplitBtn'),
    
    // Pagination elements
    paginationInfo: document.getElementById('paginationInfo'),
    pageNumbers: document.getElementById('pageNumbers'),
    prevPageBtn: document.getElementById('prevPageBtn'),
    nextPageBtn: document.getElementById('nextPageBtn'),
    
    // Drawer elements
    detailsDrawer: document.getElementById('detailsDrawer'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    drawerContent: document.getElementById('drawerContent'),
    closeDrawerBtn: document.getElementById('closeDrawerBtn')
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupFileLoaders();
    setupFilters();
    setupViewToggles();
    setupTableControls();
    setupDrawer();
    setupPathologyPredictor();
}

// ----------------------------------------------------
// 1. File Uploading & Loading
// ----------------------------------------------------
function setupFileLoaders() {
    el.mantaInput.addEventListener('change', handleFileSelect);
    
    el.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        el.dropZone.classList.add('dragover');
    });
    
    el.dropZone.addEventListener('dragleave', () => {
        el.dropZone.classList.remove('dragover');
    });
    
    el.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        el.dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            loadFile(e.dataTransfer.files[0]);
        }
    });

    el.resetFileBtn.addEventListener('click', () => {
        if (confirm("Voulez-vous charger un autre fichier ? L'analyse en cours sera perdue.")) {
            location.reload();
        }
    });
}

function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        loadFile(e.target.files[0]);
    }
}

function loadFile(file) {
    showLoading(`Lecture du fichier ${file.name} en cours...`);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            parseAndProcessData(e.target.result);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'analyse du fichier : " + error.message);
            hideLoading();
        }
    };
    reader.onerror = function() {
        alert("Erreur lors de la lecture du fichier.");
        hideLoading();
    };
    
    reader.readAsText(file);
}

function showLoading(msg) {
    el.loadingMessage.textContent = msg;
    el.loadingOverlay.classList.add('active');
}

function hideLoading() {
    el.loadingOverlay.classList.remove('active');
}

// ----------------------------------------------------
// 2. TSV / CSV Parsing and Processing
// ----------------------------------------------------
function parseAndProcessData(text) {
    showLoading("Analyse des lignes du tableau...");
    
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) {
        throw new Error("Le fichier semble vide ou invalide.");
    }
    
    let separator = '\t';
    const firstLine = lines[0];
    if (!firstLine.includes('\t') && firstLine.includes(';')) {
        separator = ';';
    } else if (!firstLine.includes('\t') && firstLine.includes(',')) {
        separator = ',';
    }
    
    const rawHeaders = firstLine.split(separator).map(h => h.trim().replace(/^"|"$/g, ''));
    state.headers = rawHeaders;
    
    const idxFormat = rawHeaders.indexOf('FORMAT');
    const idxAnnotMode = rawHeaders.indexOf('Annotation_mode');
    
    if (idxFormat === -1 || idxAnnotMode === -1) {
        throw new Error("Le fichier ne contient pas les colonnes 'FORMAT' et/ou 'Annotation_mode' requises par AnnotSV.");
    }
    
    state.sampleCols = rawHeaders.slice(idxFormat + 1, idxAnnotMode);
    
    if (state.sampleCols.length === 0) {
        console.warn("Aucune colonne d'échantillon trouvée entre FORMAT et Annotation_mode.");
    } else {
        detectControlAndTumorSamples();
    }
    
    const rawRows = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const fields = line.split(separator).map(f => f.trim().replace(/^"|"$/g, ''));
        if (fields.length < rawHeaders.length) {
            while (fields.length < rawHeaders.length) fields.push('');
        }
        
        const row = {};
        for (let j = 0; j < rawHeaders.length; j++) {
            row[rawHeaders[j]] = fields[j];
        }
        
        // Pre-parse sample metrics
        row._parsedSamples = {};
        const formatVal = row['FORMAT'];
        
        state.sampleCols.forEach(col => {
            const rawVal = row[col];
            row._parsedSamples[col] = parseSampleVal(rawVal, formatVal);
        });
        
        if (state.normalSampleCol && row._parsedSamples[state.normalSampleCol]) {
            row._normalVAF = row._parsedSamples[state.normalSampleCol].vaf;
            row._normalAlt = row._parsedSamples[state.normalSampleCol].alt;
            row._normalDP = row._parsedSamples[state.normalSampleCol].dp;
        } else {
            row._normalVAF = 0.0;
            row._normalAlt = 0;
            row._normalDP = 0;
        }
        
        if (state.tumorSampleCol && row._parsedSamples[state.tumorSampleCol]) {
            row._tumorVAF = row._parsedSamples[state.tumorSampleCol].vaf;
            row._tumorAlt = row._parsedSamples[state.tumorSampleCol].alt;
            row._tumorDP = row._parsedSamples[state.tumorSampleCol].dp;
        } else {
            row._tumorVAF = 0.0;
            row._tumorAlt = 0;
            row._tumorDP = 0;
        }
        
        row._parsedSize = parseSVLength(row['SV_length']);
        
        // Parse and store coordinates (chr_start, chr_end, pos_start, pos_end)
        const coords = getSVCoordinates(row);
        row._chrStart = coords.chrStart;
        row._chrEnd = coords.chrEnd;
        row._posStart = coords.posStart;
        row._posEnd = coords.posEnd;
        
        rawRows.push(row);
    }
    
    state.rawRows = rawRows;
    state.fullRows = rawRows.filter(r => r['Annotation_mode'] === 'full');
    state.splitRows = rawRows.filter(r => r['Annotation_mode'] === 'split');
    
    extractUniqueGenesAndChromosomes();
    populateChrFilterDropdown();
    resetFilterState();
    
    el.landingPage.classList.remove('active');
    el.resultsSection.classList.add('active');
    el.resetFileBtn.style.display = 'inline-flex';
    el.assemblySelectorContainer.style.display = 'inline-flex';
    
    // Evaluate pathology prediction if a pathology is selected
    if (el.pathologySelect.value) {
        evaluatePathology(el.pathologySelect.value);
    } else {
        el.pathologyResults.innerHTML = '<p class="placeholder-text">Sélectionnez une pathologie pour analyser les translocations somatiques.</p>';
    }
    
    runAnalysisAndRender();
    hideLoading();
}

function detectControlAndTumorSamples() {
    const cols = state.sampleCols;
    
    if (cols.length === 2) {
        const c1 = cols[0].toLowerCase();
        const c2 = cols[1].toLowerCase();
        
        const normalPatterns = ['-c', '_c', 'control', 'normal', 'sain', 'n', 'c'];
        const tumorPatterns = ['-t', '_t', 'tumor', 'cancer', 'tumoral', 't'];
        
        let hasC1Normal = normalPatterns.some(pat => c1.endsWith(pat) || c1.includes(pat));
        let hasC2Tumor = tumorPatterns.some(pat => c2.endsWith(pat) || c2.includes(pat));
        
        let hasC1Tumor = tumorPatterns.some(pat => c1.endsWith(pat) || c1.includes(pat));
        let hasC2Normal = normalPatterns.some(pat => c2.endsWith(pat) || c2.includes(pat));
        
        if (hasC1Normal || hasC2Tumor) {
            state.normalSampleCol = cols[0];
            state.tumorSampleCol = cols[1];
        } else if (hasC2Normal || hasC1Tumor) {
            state.normalSampleCol = cols[1];
            state.tumorSampleCol = cols[0];
        } else {
            state.normalSampleCol = cols[0];
            state.tumorSampleCol = cols[1];
        }
    } else if (cols.length > 2) {
        const normalCol = cols.find(c => {
            const lc = c.toLowerCase();
            return lc.includes('control') || lc.includes('normal') || lc.includes('sain') || lc.endsWith('-c') || lc.endsWith('_c');
        });
        const tumorCol = cols.find(c => {
            const lc = c.toLowerCase();
            return lc.includes('tumor') || lc.includes('cancer') || lc.includes('tumoral') || lc.endsWith('-t') || lc.endsWith('_t');
        });
        
        state.normalSampleCol = normalCol || cols[0];
        state.tumorSampleCol = tumorCol || (cols[1] || cols[0]);
    } else {
        state.normalSampleCol = null;
        state.tumorSampleCol = cols[0];
    }
}

function parseSampleVal(val, format) {
    if (!val || val === '.' || val === 'N/A' || val === '') {
        return { vaf: 0, alt: 0, dp: 0, raw: val };
    }
    
    const parts = String(val).split(':');
    const formatParts = String(format).split(':');
    
    let vaf = 0.0;
    try {
        vaf = parseFloat(parts[parts.length - 1]);
        if (isNaN(vaf)) vaf = 0.0;
    } catch(e) {
        vaf = 0.0;
    }
    
    let alt = 0;
    let dp = 0;
    try {
        for (let i = 0; i < formatParts.length - 1; i++) {
            const f = formatParts[i];
            const p = parts[i];
            if ((f === 'PR' || f === 'SR') && p) {
                const counts = p.split(',').map(Number);
                if (counts.length >= 2) {
                    dp += counts[0] + counts[1];
                    alt += counts[1];
                }
            }
        }
    } catch (e) {
        // Ignore read parsing errors
    }
    
    return { vaf, alt, dp, raw: val };
}

function parseSVLength(lenStr) {
    if (!lenStr || lenStr === 'N/A' || lenStr === '.') return 0;
    let clean = String(lenStr).trim().toLowerCase();
    
    clean = clean.replace(/[+-\s]/g, '');
    
    if (clean.includes('mb')) {
        const val = parseFloat(clean.replace('mb', ''));
        return isNaN(val) ? 0 : Math.round(val * 1000000);
    }
    if (clean.includes('kb')) {
        const val = parseFloat(clean.replace('kb', ''));
        return isNaN(val) ? 0 : Math.round(val * 1000);
    }
    if (clean.includes('bp')) {
        const val = parseFloat(clean.replace('bp', ''));
        return isNaN(val) ? 0 : Math.round(val);
    }
    
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : Math.round(val);
}

/**
 * Format size with exactly 2 decimal places after the comma
 */
function formatSVLength(lenStr, type) {
    if (type === 'BND') return 'N/A';
    if (!lenStr || lenStr === 'N/A' || lenStr === '.') return 'N/A';
    
    let clean = String(lenStr).trim().toLowerCase();
    
    if (clean.includes('mb')) {
        const val = parseFloat(clean.replace('mb', ''));
        return isNaN(val) ? lenStr : val.toFixed(2) + ' Mb';
    }
    if (clean.includes('kb')) {
        const val = parseFloat(clean.replace('kb', ''));
        return isNaN(val) ? lenStr : val.toFixed(2) + ' kb';
    }
    if (clean.includes('bp')) {
        const val = parseFloat(clean.replace('bp', ''));
        return isNaN(val) ? lenStr : val.toFixed(2) + ' bp';
    }
    
    const val = parseFloat(clean);
    if (isNaN(val)) return lenStr;
    
    if (val >= 1000000) {
        return (val / 1000000).toFixed(2) + ' Mb';
    } else if (val >= 1000) {
        return (val / 1000).toFixed(2) + ' kb';
    } else {
        return val.toFixed(0) + ' bp';
    }
}

/**
 * Identify the partner chromosome for translocations (BND)
 */
function getSVCoordinates(row) {
    const chrStart = String(row['SV_chrom'] || '');
    const posStart = parseInt(row['SV_start'] || '0');
    
    let chrEnd = chrStart;
    let posEnd = parseInt(row['SV_end'] || '0');
    
    if (row['SV_type'] === 'BND') {
        const alt = String(row['ALT'] || '');
        const match = alt.match(/[\[\]]([^\[\]]+)[\[\]]/);
        if (match) {
            const parts = match[1].split(':');
            if (parts.length >= 2) {
                let partnerChr = parts[0];
                if (chrStart.toLowerCase().startsWith('chr') && !partnerChr.toLowerCase().startsWith('chr')) {
                    partnerChr = 'chr' + partnerChr;
                } else if (!chrStart.toLowerCase().startsWith('chr') && partnerChr.toLowerCase().startsWith('chr')) {
                    partnerChr = partnerChr.replace(/chr/i, '');
                }
                chrEnd = partnerChr;
                posEnd = parseInt(parts[1]);
            }
        }
    }
    
    return { chrStart, posStart, chrEnd, posEnd };
}

function extractUniqueGenesAndChromosomes() {
    const genesSet = new Set();
    const chrSet = new Set();
    
    state.rawRows.forEach(r => {
        if (r._chrStart) {
            chrSet.add(String(r._chrStart));
        }
        
        const geneStr = r['Gene_name'];
        if (geneStr && geneStr !== 'N/A' && geneStr !== '.') {
            geneStr.split(';').forEach(g => {
                const cleanGene = g.trim();
                const baseGene = cleanGene.split(' ')[0].trim();
                if (baseGene) {
                    genesSet.add(baseGene);
                }
            });
        }
    });
    
    state.genesList = Array.from(genesSet).sort();
    
    state.chromosomesList = Array.from(chrSet).sort((a, b) => {
        const aNum = parseInt(a.replace(/chr/i, ''));
        const bNum = parseInt(b.replace(/chr/i, ''));
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        if (!isNaN(aNum)) return -1;
        if (!isNaN(bNum)) return 1;
        return a.localeCompare(b);
    });
}

function populateChrFilterDropdown() {
    el.chrFilter.innerHTML = '<option value="">Tous</option>';
    state.chromosomesList.forEach(chr => {
        const opt = document.createElement('option');
        opt.value = chr;
        opt.textContent = chr;
        el.chrFilter.appendChild(opt);
    });
}

// ----------------------------------------------------
// 3. Stats Calculations & Charts
// ----------------------------------------------------
function calculateStatistics() {
    const svs = state.fullRows;
    const totalSVs = svs.length;
    
    let pathogenic = 0;
    let genesInvolved = 0;
    let somaticSpecific = 0;
    
    const typeCounts = {
        DEL: 0,
        DUP: 0,
        INV: 0,
        BND: 0,
        INS: 0
    };
    
    svs.forEach(r => {
        const cl = String(r['ACMG_class']).trim();
        if (cl === '4' || cl === '5' || cl.includes('full=4') || cl.includes('full=5')) {
            pathogenic++;
        }
        
        const gName = r['Gene_name'];
        if (gName && gName !== '.' && gName !== 'N/A') {
            genesInvolved++;
        }
        
        if (state.normalSampleCol && state.tumorSampleCol) {
            if (r._normalVAF === 0 && r._tumorVAF > 0) {
                somaticSpecific++;
            }
        } else if (state.tumorSampleCol) {
            if (r._tumorVAF > 0) {
                somaticSpecific++;
            }
        }
        
        const type = r['SV_type'];
        if (typeCounts.hasOwnProperty(type)) {
            typeCounts[type]++;
        }
    });
    
    el.statTotalSVs.textContent = totalSVs.toLocaleString();
    el.statPathogenic.textContent = pathogenic.toLocaleString();
    el.statGeneInvolved.textContent = genesInvolved.toLocaleString();
    el.statSomaticSpecific.textContent = somaticSpecific.toLocaleString();
    
    renderTypeChart(typeCounts, totalSVs);
}

function renderTypeChart(typeCounts, totalSVs) {
    el.typeDistribution.innerHTML = '';
    
    const types = [
        { key: 'DEL', label: 'Délétion (DEL)', class: 'del' },
        { key: 'DUP', label: 'Duplication (DUP)', class: 'dup' },
        { key: 'INV', label: 'Inversion (INV)', class: 'inv' },
        { key: 'BND', label: 'Translocation (BND)', class: 'bnd' },
        { key: 'INS', label: 'Insertion (INS)', class: 'ins' }
    ];
    
    types.forEach(t => {
        const count = typeCounts[t.key] || 0;
        const percent = totalSVs > 0 ? (count / totalSVs) * 100 : 0;
        
        const row = document.createElement('div');
        row.className = 'type-bar-item';
        row.innerHTML = `
            <span class="type-bar-label">${t.label}</span>
            <div class="type-bar-track">
                <div class="type-bar-fill ${t.class}" style="width: ${percent}%"></div>
            </div>
            <span class="type-bar-count">${count.toLocaleString()}</span>
        `;
        el.typeDistribution.appendChild(row);
    });
}

// ----------------------------------------------------
// 4. Intelligent Pathology Predictor
// ----------------------------------------------------
function setupPathologyPredictor() {
    el.pathologySelect.addEventListener('change', (e) => {
        const val = e.target.value;
        evaluatePathology(val);
    });
}

function evaluatePathology(pathologyKey) {
    if (!pathologyKey) {
        el.pathologyResults.innerHTML = '<p class="placeholder-text">Sélectionnez une pathologie pour analyser les translocations somatiques.</p>';
        return;
    }
    
    if (state.rawRows.length === 0) {
        el.pathologyResults.innerHTML = '<p class="placeholder-text">Veuillez charger un fichier de variants d\'abord.</p>';
        return;
    }
    
    const list = HEME_TRANSLOCATIONS[pathologyKey];
    if (!list) {
        el.pathologyResults.innerHTML = '<p class="placeholder-text">Pathologie non prise en charge.</p>';
        return;
    }
    
    // Check if the dataset contains any parsed read support
    const hasReadSupportData = state.fullRows.some(r => r._tumorAlt > 0);
    
    // Extract somatic variants: Tumor VAF >= 0.01 and Normal VAF <= 0.03 (tolerant to tumor contamination / sequencing noise)
    // Enforce tumor alternate reads >= 3 if read support is available in the dataset
    const somaticRows = state.fullRows.filter(r => {
        const passVAF = r._tumorVAF >= 0.01 && (state.normalSampleCol ? r._normalVAF <= 0.03 : true);
        const passReads = hasReadSupportData ? (r._tumorAlt >= 3) : true;
        return passVAF && passReads;
    });
    
    let html = '';
    let positiveCount = 0;
    const detectedList = [];
    
    list.forEach(trans => {
        const detection = checkTranslocationPresence(trans, somaticRows);
        if (detection.detected) {
            positiveCount++;
            detectedList.push({ trans, row: detection.row });
        }
    });
    
    // Overall alert header
    if (positiveCount > 0) {
        html += `
            <div class="pathology-summary-alert alert-positive">
                ⚠️ ALERTE : ${positiveCount} translocation(s) somatique(s) caractéristique(s) de cette pathologie détectée(s) !
            </div>
        `;
    } else {
        html += `
            <div class="pathology-summary-alert alert-negative">
                ℹ️ Aucune translocation somatique typique détectée pour cette pathologie.
            </div>
        `;
    }
    
    // Individual translocations status
    list.forEach(trans => {
        const match = detectedList.find(d => d.trans.name === trans.name);
        
        if (match) {
            const row = match.row;
            const tumorVafPercent = (row._tumorVAF * 100).toFixed(2);
            const normalVafPercent = state.normalSampleCol ? (row._normalVAF * 100).toFixed(2) + '%' : 'N/A';
            const tumorAltText = row._tumorAlt !== undefined ? `, Reads support: ${row._tumorAlt}` : '';
            
            html += `
                <div class="pathology-result-item">
                    <div class="pathology-result-header">
                        <span class="pathology-result-name">${trans.name}</span>
                        <span class="pathology-status-badge detected">Présente</span>
                    </div>
                    <p class="pathology-result-details">${trans.desc}</p>
                    <p class="pathology-result-details" style="color: var(--accent); font-weight: 600; margin-top: 0.15rem;">
                        Variant : ${row['AnnotSV_ID']} (VAF Tumor: ${tumorVafPercent}%${tumorAltText}, Sain: ${normalVafPercent})
                    </p>
                    <div class="pathology-result-action">
                        <button class="btn primary btn-sm focus-variant-btn" data-id="${row['AnnotSV_ID']}" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; border-radius: 6px;">🔍 Voir</button>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="pathology-result-item" style="opacity: 0.6;">
                    <div class="pathology-result-header">
                        <span class="pathology-result-name" style="color: #8892b0;">${trans.name}</span>
                        <span class="pathology-status-badge not-detected">Non détectée</span>
                    </div>
                    <p class="pathology-result-details">${trans.desc}</p>
                </div>
            `;
        }
    });
    
    el.pathologyResults.innerHTML = html;
    
    // Add event listeners to the focus buttons
    el.pathologyResults.querySelectorAll('.focus-variant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const varId = btn.dataset.id;
            focusAndZoomVariant(varId);
        });
    });
}

/**
 * Intelligent matching logic for hematological translocations
 */
function checkTranslocationPresence(trans, somaticRows) {
    const targetGenes = trans.genes;
    // Normalize target chromosomes
    const targetChrs = trans.chrs.map(c => String(c).replace(/chr/i, '').trim());
    
    // Check if the translocation itself is inter-chromosomal
    const isTranslocationInterChromosomic = (targetChrs.length === 2 && targetChrs[0] !== targetChrs[1]);
    
    // Check coordinate-based matching first (for regulatory/enhancer hijacking)
    const regDef = REGULATORY_REGIONS.find(r => 
        (r.chrs[0] === targetChrs[0] && r.chrs[1] === targetChrs[1]) ||
        (r.chrs[0] === targetChrs[1] && r.chrs[1] === targetChrs[0])
    );
    
    const candidateRows = [];
    
    for (const row of somaticRows) {
        const cStart = String(row._chrStart || '').replace(/chr/i, '').trim();
        const cEnd = String(row._chrEnd || '').replace(/chr/i, '').trim();
        const pStart = parseInt(row._posStart || '0');
        const pEnd = parseInt(row._posEnd || '0');
        
        // RULE 1: If the translocation is inter-chromosomic, the variant MUST be BND
        const variantIsInterChromosomic = (cStart && cEnd && cStart !== cEnd);
        if (isTranslocationInterChromosomic) {
            if (!variantIsInterChromosomic || row['SV_type'] !== 'BND') {
                continue;
            }
        }
        
        let matched = false;
        
        // A. If we have a coordinate-based regulatory definition, check it!
        if (regDef) {
            const rangeStart = regDef.ranges.find(r => r.chr === cStart);
            const rangeEnd = regDef.ranges.find(r => r.chr === cEnd);
            
            if (rangeStart && rangeEnd) {
                const isStartIn = (pStart >= rangeStart.start && pStart <= rangeStart.end);
                const isEndIn = (pEnd >= rangeEnd.start && pEnd <= rangeEnd.end);
                
                if (isStartIn && isEndIn) {
                    matched = true;
                }
            }
            
            if (!matched) {
                // Try reverse direction
                const rangeStartRev = regDef.ranges.find(r => r.chr === cEnd);
                const rangeEndRev = regDef.ranges.find(r => r.chr === cStart);
                
                if (rangeStartRev && rangeEndRev) {
                    const isStartIn = (pEnd >= rangeStartRev.start && pEnd <= rangeStartRev.end);
                    const isEndIn = (pStart >= rangeEndRev.start && pStart <= rangeEndRev.end);
                    
                    if (isStartIn && isEndIn) {
                        matched = true;
                    }
                }
            }
        }
        
        // B. Fallback to Gene Name substring match if not matched by coordinates
        if (!matched) {
            let chrMatch = false;
            if (targetChrs.length === 2) {
                chrMatch = (cStart === targetChrs[0] && cEnd === targetChrs[1]) ||
                           (cStart === targetChrs[1] && cEnd === targetChrs[0]);
            } else if (targetChrs.length === 1) {
                chrMatch = (cStart === targetChrs[0] || cEnd === targetChrs[0]);
            }
            
            if (chrMatch) {
                const rowGeneStr = String(row['Gene_name'] || '').toLowerCase();
                
                if (targetGenes.length === 2) {
                    const g1 = targetGenes[0].toLowerCase();
                    const g2 = targetGenes[1].toLowerCase();
                    
                    if (rowGeneStr.includes(g1) || rowGeneStr.includes(g2)) {
                        matched = true;
                    }
                } else if (targetGenes.length === 1) {
                    const g1 = targetGenes[0].toLowerCase();
                    if (rowGeneStr.includes(g1)) {
                        matched = true;
                    }
                }
            }
        }
        
        if (matched) {
            candidateRows.push(row);
        }
    }
    
    if (candidateRows.length > 0) {
        // Sort candidates by tumor VAF descending to get the highest VAF
        candidateRows.sort((a, b) => b._tumorVAF - a._tumorVAF);
        return { detected: true, row: candidateRows[0] };
    }
    
    return { detected: false };
}

function focusAndZoomVariant(variantId) {
    // Switch to global view
    state.currentView = 'full';
    el.modeFullBtn.classList.add('active');
    el.modeSplitBtn.classList.remove('active');
    
    // Clear filters and set text search to the specific variant ID
    resetFilterState();
    state.filters.textQuery = variantId.toLowerCase();
    el.textSearchInput.value = variantId;
    
    // Filter and sort
    runFiltering();
    
    // Locate the row in the table and open the drawer
    setTimeout(() => {
        const tableRow = el.tableBody.querySelector(`tr[data-id="${variantId}"]`);
        if (tableRow) {
            tableRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            tableRow.click();
        }
    }, 150);
}

// ----------------------------------------------------
// 5. Filtering Logic
// ----------------------------------------------------
function setupFilters() {
    el.svTypeFilter.addEventListener('change', (e) => {
        state.filters.svType = e.target.value;
        runFiltering();
    });
    
    el.chrFilter.addEventListener('change', (e) => {
        state.filters.chr = e.target.value;
        runFiltering();
    });
    
    el.acmgFilter.addEventListener('change', (e) => {
        state.filters.acmg = e.target.value;
        runFiltering();
    });
    
    el.vafTumorSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        el.vafTumorVal.textContent = val.toFixed(3);
        state.filters.vafTumor = val;
        runFiltering();
    });
    
    el.vafNormalSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        el.vafNormalVal.textContent = val.toFixed(3);
        state.filters.vafNormal = val;
        runFiltering();
    });
    
    el.sizeMinSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        if (val === 0) {
            el.sizeMinVal.textContent = "Toutes";
        } else if (val >= 1000000) {
            el.sizeMinVal.textContent = "> " + (val / 1000000).toFixed(1) + " Mb";
        } else if (val >= 1000) {
            el.sizeMinVal.textContent = "> " + (val / 1000).toFixed(0) + " kb";
        } else {
            el.sizeMinVal.textContent = "> " + val + " bp";
        }
        state.filters.sizeMin = val;
        runFiltering();
    });
    
    setupGeneAutocomplete();
    
    let searchTimeout;
    el.textSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.filters.textQuery = e.target.value.trim().toLowerCase();
            runFiltering();
        }, 300);
    });
    
    el.clearAllFiltersBtn.addEventListener('click', () => {
        resetFilterState();
        runFiltering();
    });
}

function resetFilterState() {
    state.filters = {
        svType: '',
        chr: '',
        acmg: '',
        gene: '',
        vafTumor: 0.0,
        vafNormal: 1.0,
        sizeMin: 0,
        textQuery: ''
    };
    
    el.svTypeFilter.value = '';
    el.chrFilter.value = '';
    el.acmgFilter.value = '';
    el.geneSearchInput.value = '';
    el.textSearchInput.value = '';
    
    el.vafTumorSlider.value = 0.0;
    el.vafTumorVal.textContent = "0.000";
    
    el.vafNormalSlider.value = 1.0;
    el.vafNormalVal.textContent = "1.000";
    
    el.sizeMinSlider.value = 0;
    el.sizeMinVal.textContent = "Toutes";
    
    el.geneAutocompleteList.style.display = 'none';
}

function setupGeneAutocomplete() {
    const input = el.geneSearchInput;
    const list = el.geneAutocompleteList;
    
    input.addEventListener('input', () => {
        const val = input.value.trim().toLowerCase();
        list.innerHTML = '';
        
        if (!val) {
            list.style.display = 'none';
            state.filters.gene = '';
            runFiltering();
            return;
        }
        
        const matches = state.genesList.filter(g => g.toLowerCase().startsWith(val)).slice(0, 10);
        
        if (matches.length === 0) {
            list.style.display = 'none';
            state.filters.gene = val;
            runFiltering();
            return;
        }
        
        matches.forEach(m => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = m;
            div.addEventListener('click', () => {
                input.value = m;
                state.filters.gene = m;
                list.style.display = 'none';
                runFiltering();
            });
            list.appendChild(div);
        });
        
        list.style.display = 'block';
        state.filters.gene = val;
        runFiltering();
    });
    
    document.addEventListener('click', (e) => {
        if (e.target !== input && e.target !== list) {
            list.style.display = 'none';
        }
    });
}

function runFiltering() {
    const mode = state.currentView;
    const data = mode === 'full' ? state.fullRows : state.splitRows;
    const f = state.filters;
    
    const filtered = data.filter(row => {
        if (f.svType && row['SV_type'] !== f.svType) return false;
        
        if (f.chr && String(row._chrStart) !== f.chr) return false;
        
        if (f.acmg) {
            const cl = String(row['ACMG_class']).trim();
            const matchesAcmg = cl === f.acmg || cl.includes(`full=${f.acmg}`);
            if (!matchesAcmg) return false;
        }
        
        if (f.gene) {
            const rowGene = String(row['Gene_name']).toLowerCase();
            if (!rowGene.includes(f.gene.toLowerCase())) return false;
        }
        
        if (row._tumorVAF < f.vafTumor) return false;
        if (row._normalVAF > f.vafNormal) return false;
        
        if (f.sizeMin > 0) {
            if (row._parsedSize < f.sizeMin) return false;
        }
        
        if (f.textQuery) {
            const matchesQuery = 
                String(row['AnnotSV_ID']).toLowerCase().includes(f.textQuery) ||
                String(row['Gene_name']).toLowerCase().includes(f.textQuery) ||
                String(row._chrStart).toLowerCase().includes(f.textQuery) ||
                String(row._chrEnd).toLowerCase().includes(f.textQuery) ||
                String(row['SV_type']).toLowerCase().includes(f.textQuery) ||
                String(row['Location']).toLowerCase().includes(f.textQuery) ||
                String(row['OMIM_phenotype']).toLowerCase().includes(f.textQuery) ||
                String(row['ID']).toLowerCase().includes(f.textQuery);
                
            if (!matchesQuery) return false;
        }
        
        return true;
    });
    
    state.filteredRows = filtered;
    state.currentPage = 1;
    
    el.filteredCount.textContent = filtered.length.toLocaleString();
    el.totalCount.textContent = data.length.toLocaleString();
    
    updateFilterPills();
    
    if (state.sortColumn) {
        sortData(state.sortColumn, state.sortDirection, false);
    } else {
        renderTable();
    }
}

function updateFilterPills() {
    el.activeFilterPills.innerHTML = '';
    const f = state.filters;
    
    const addPill = (label, key, resetVal) => {
        const pill = document.createElement('div');
        pill.className = 'filter-pill';
        pill.innerHTML = `
            <span>${label}</span>
            <span class="filter-pill-close">&times;</span>
        `;
        pill.querySelector('.filter-pill-close').addEventListener('click', () => {
            state.filters[key] = resetVal;
            syncFilterControlDOM(key, resetVal);
            runFiltering();
        });
        el.activeFilterPills.appendChild(pill);
    };
    
    if (f.svType) addPill(`Type: ${f.svType}`, 'svType', '');
    if (f.chr) addPill(`Chr Start: ${f.chr}`, 'chr', '');
    if (f.acmg) addPill(`ACMG: Classe ${f.acmg}`, 'acmg', '');
    if (f.gene) addPill(`Gène: ${f.gene}`, 'gene', '');
    if (f.vafTumor > 0) addPill(`VAF Tumor ≥ ${f.vafTumor.toFixed(3)}`, 'vafTumor', 0.0);
    if (f.vafNormal < 1) addPill(`VAF Sain ≤ ${f.vafNormal.toFixed(3)}`, 'vafNormal', 1.0);
    if (f.sizeMin > 0) addPill(`Taille ≥ ${(f.sizeMin / 1000).toFixed(0)} kb`, 'sizeMin', 0);
    if (f.textQuery) addPill(`Texte: "${f.textQuery}"`, 'textQuery', '');
}

function syncFilterControlDOM(key, val) {
    switch (key) {
        case 'svType': el.svTypeFilter.value = val; break;
        case 'chr': el.chrFilter.value = val; break;
        case 'acmg': el.acmgFilter.value = val; break;
        case 'gene': el.geneSearchInput.value = val; break;
        case 'textQuery': el.textSearchInput.value = val; break;
        case 'vafTumor': 
            el.vafTumorSlider.value = val; 
            el.vafTumorVal.textContent = val.toFixed(3);
            break;
        case 'vafNormal': 
            el.vafNormalSlider.value = val; 
            el.vafNormalVal.textContent = val.toFixed(3);
            break;
        case 'sizeMin': 
            el.sizeMinSlider.value = val; 
            el.sizeMinVal.textContent = "Toutes";
            break;
    }
}

// ----------------------------------------------------
// 6. View toggles & Sorts
// ----------------------------------------------------
function setupViewToggles() {
    el.modeFullBtn.addEventListener('click', () => {
        if (state.currentView === 'full') return;
        state.currentView = 'full';
        el.modeFullBtn.classList.add('active');
        el.modeSplitBtn.classList.remove('active');
        state.sortColumn = null;
        runFiltering();
    });
    
    el.modeSplitBtn.addEventListener('click', () => {
        if (state.currentView === 'split') return;
        state.currentView = 'split';
        el.modeSplitBtn.classList.add('active');
        el.modeFullBtn.classList.remove('active');
        state.sortColumn = null;
        runFiltering();
    });
}

function setupTableControls() {
    el.pageSizeSelect.addEventListener('change', (e) => {
        state.pageSize = parseInt(e.target.value);
        state.currentPage = 1;
        renderTable();
    });
    
    el.prevPageBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderTable();
        }
    });
    
    el.nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(state.filteredRows.length / state.pageSize);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderTable();
        }
    });
}

function handleHeaderClick(col) {
    if (state.sortColumn === col) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = col;
        state.sortDirection = 'asc';
    }
    
    sortData(state.sortColumn, state.sortDirection, true);
}

function sortData(col, dir, triggerRender = true) {
    const rows = [...state.filteredRows];
    
    rows.sort((a, b) => {
        let valA = a[col];
        let valB = b[col];
        
        if (col === '_tumorVAF') {
            valA = a._tumorVAF;
            valB = b._tumorVAF;
        } else if (col === '_normalVAF') {
            valA = a._normalVAF;
            valB = b._normalVAF;
        } else if (col === '_parsedSize') {
            valA = a._parsedSize;
            valB = b._parsedSize;
        } else if (col === '_chrStart' || col === '_chrEnd') {
            const val = col === '_chrStart' ? a._chrStart : a._chrEnd;
            const vbl = col === '_chrStart' ? b._chrStart : b._chrEnd;
            const ca = parseInt(String(val).replace(/chr/i, ''));
            const cb = parseInt(String(vbl).replace(/chr/i, ''));
            if (!isNaN(ca) && !isNaN(cb)) {
                valA = ca;
                valB = cb;
            } else {
                valA = String(val);
                valB = String(vbl);
            }
        } else if (col === '_posStart' || col === '_posEnd') {
            valA = col === '_posStart' ? a._posStart : a._posEnd;
            valB = col === '_posStart' ? b._posStart : b._posEnd;
        } else if (col === 'AnnotSV_ranking_score' || col === 'Gene_count' || col === 'Overlapped_CDS_percent') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
            if (isNaN(valA)) valA = -99999999;
            if (isNaN(valB)) valB = -99999999;
        } else {
            valA = String(valA || '').toLowerCase();
            valB = String(valB || '').toLowerCase();
        }
        
        if (valA < valB) return dir === 'asc' ? -1 : 1;
        if (valA > valB) return dir === 'asc' ? 1 : -1;
        return 0;
    });
    
    state.filteredRows = rows;
    if (triggerRender) {
        renderTable();
    }
}

// ----------------------------------------------------
// 7. Rendering Table Rows
// ----------------------------------------------------
function renderTable() {
    renderHeaders();
    
    const totalItems = state.filteredRows.length;
    const totalPages = Math.ceil(totalItems / state.pageSize) || 1;
    
    if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
    }
    
    const startIndex = (state.currentPage - 1) * state.pageSize;
    const endIndex = Math.min(startIndex + state.pageSize, totalItems);
    
    const pageRows = state.filteredRows.slice(startIndex, endIndex);
    
    el.tableBody.innerHTML = '';
    
    if (pageRows.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="20" style="text-align: center; color: #8892b0; padding: 3rem;">Aucun variant ne correspond à vos critères de filtrage.</td>`;
        el.tableBody.appendChild(tr);
    } else {
        pageRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.dataset.id = row['AnnotSV_ID'];
            
            if (state.selectedRow && state.selectedRow['AnnotSV_ID'] === row['AnnotSV_ID']) {
                tr.classList.add('selected');
            }
            
            if (state.currentView === 'full') {
                tr.innerHTML = getFullRowCells(row);
            } else {
                tr.innerHTML = getSplitRowCells(row);
            }
            
            tr.addEventListener('click', () => {
                const currentSelected = el.tableBody.querySelector('tr.selected');
                if (currentSelected) currentSelected.classList.remove('selected');
                
                tr.classList.add('selected');
                state.selectedRow = row;
                openDetailsDrawer(row);
            });
            
            el.tableBody.appendChild(tr);
        });
    }
    
    renderPagination(totalItems, totalPages, startIndex, endIndex);
}

function renderHeaders() {
    const mode = state.currentView;
    let headersHtml = '';
    
    const getSortClass = (col) => {
        if (state.sortColumn !== col) return 'sortable';
        return `sortable sort-${state.sortDirection}`;
    };
    
    if (mode === 'full') {
        headersHtml = `
            <th style="width: 50px;">Détails</th>
            <th class="${getSortClass('AnnotSV_ID')}" data-col="AnnotSV_ID">Identifiant <span class="sort-icon"></span></th>
            <th class="${getSortClass('SV_type')}" data-col="SV_type">Type <span class="sort-icon"></span></th>
            <th class="${getSortClass('_chrStart')}" data-col="_chrStart">chr_start <span class="sort-icon"></span></th>
            <th class="${getSortClass('_chrEnd')}" data-col="_chrEnd">chr_end <span class="sort-icon"></span></th>
            <th class="${getSortClass('_posStart')}" data-col="_posStart">Position <span class="sort-icon"></span></th>
            <th class="${getSortClass('_parsedSize')}" data-col="_parsedSize">Taille <span class="sort-icon"></span></th>
            <th class="${getSortClass('_normalVAF')}" data-col="_normalVAF">VAF Sain <span class="sort-icon"></span></th>
            <th class="${getSortClass('_tumorVAF')}" data-col="_tumorVAF">VAF Tumeur <span class="sort-icon"></span></th>
            <th>Gènes impliqués</th>
            <th class="${getSortClass('ACMG_class')}" data-col="ACMG_class">ACMG <span class="sort-icon"></span></th>
        `;
    } else {
        headersHtml = `
            <th style="width: 50px;">Détails</th>
            <th class="${getSortClass('Gene_name')}" data-col="Gene_name">Gène <span class="sort-icon"></span></th>
            <th class="${getSortClass('SV_type')}" data-col="SV_type">Type SV <span class="sort-icon"></span></th>
            <th class="${getSortClass('AnnotSV_ID')}" data-col="AnnotSV_ID">Variant ID <span class="sort-icon"></span></th>
            <th class="${getSortClass('_chrStart')}" data-col="_chrStart">chr_start <span class="sort-icon"></span></th>
            <th class="${getSortClass('_chrEnd')}" data-col="_chrEnd">chr_end <span class="sort-icon"></span></th>
            <th class="${getSortClass('Location')}" data-col="Location">Localisation <span class="sort-icon"></span></th>
            <th class="${getSortClass('Overlapped_CDS_percent')}" data-col="Overlapped_CDS_percent">% CDS <span class="sort-icon"></span></th>
            <th class="${getSortClass('_normalVAF')}" data-col="_normalVAF">VAF Sain <span class="sort-icon"></span></th>
            <th class="${getSortClass('_tumorVAF')}" data-col="_tumorVAF">VAF Tumeur <span class="sort-icon"></span></th>
            <th class="${getSortClass('ACMG_class')}" data-col="ACMG_class">ACMG <span class="sort-icon"></span></th>
        `;
    }
    
    el.tableHeaderRow.innerHTML = headersHtml;
    
    el.tableHeaderRow.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.col;
            handleHeaderClick(col);
        });
    });
}

function getFullRowCells(row) {
    const actionsCell = `
        <td style="text-align: center;">
            <div class="stat-icon-wrapper blue" style="width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: inline-flex;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
        </td>
    `;
    
    const svType = row['SV_type'];
    const typeClass = String(svType).toLowerCase();
    const typeBadge = `<span class="sv-badge ${typeClass}">${svType}</span>`;
    
    const posVal = `<span class="mono">${getCurrentPos(row, 'start').toLocaleString()}</span>`;
    const formattedLength = formatSVLength(row['SV_length'], svType);
    
    const normalVAF = row._normalVAF > 0 ? `<span class="vaf-text normal">${(row._normalVAF * 100).toFixed(2)}%</span>` : `<span class="mono" style="color:#555;">0%</span>`;
    const tumorVAF = row._tumorVAF > 0 ? `<span class="vaf-text tumor" style="font-weight:700;">${(row._tumorVAF * 100).toFixed(2)}%</span>` : `<span class="mono" style="color:#555;">0%</span>`;
    
    let genesBadges = '';
    const geneStr = row['Gene_name'];
    if (geneStr && geneStr !== '.' && geneStr !== 'N/A') {
        const genes = geneStr.split(';').slice(0, 5);
        genes.forEach(g => {
            const cleanG = g.trim();
            const baseG = cleanG.split(' ')[0].trim();
            
            const isMorbid = cleanG.includes('(morbid)');
            const isCensus = row['Gene_Census_list'] && row['Gene_Census_list'].includes(baseG);
            
            let badgeClass = 'gene-badge';
            if (isMorbid) badgeClass += ' morbid';
            if (isCensus) badgeClass += ' census';
            
            genesBadges += `<span class="${badgeClass}" title="${cleanG}">${baseG}</span>`;
        });
        
        const count = parseInt(row['Gene_count']) || 0;
        if (count > 5) {
            genesBadges += `<span class="gene-badge" style="background:rgba(255,255,255,0.1); font-weight:700;">+${count - 5}</span>`;
        }
    } else {
        genesBadges = `<span style="color:#555; font-style:italic;">Aucun gène</span>`;
    }
    
    const acmgCl = getACMGClassOnly(row['ACMG_class']);
    const acmgBadge = `<span class="acmg-badge class-${acmgCl}">Classe ${acmgCl}</span>`;
    
    return `
        ${actionsCell}
        <td class="mono" style="font-weight: 500; color:var(--text-highlight);">${row['AnnotSV_ID']}</td>
        <td>${typeBadge}</td>
        <td class="mono">${row._chrStart}</td>
        <td class="mono">${row._chrEnd}</td>
        <td>${posVal}</td>
        <td class="mono">${formattedLength}</td>
        <td>${normalVAF}</td>
        <td>${tumorVAF}</td>
        <td><div class="gene-badges-list">${genesBadges}</div></td>
        <td>${acmgBadge}</td>
    `;
}

function getSplitRowCells(row) {
    const actionsCell = `
        <td style="text-align: center;">
            <div class="stat-icon-wrapper blue" style="width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: inline-flex;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
        </td>
    `;
    
    const rawGene = row['Gene_name'];
    const cleanGene = rawGene.split(' ')[0].trim();
    const isMorbid = rawGene.includes('(morbid)');
    const isCensus = row['Gene_Census_list'] && row['Gene_Census_list'].includes(cleanGene);
    
    let geneBadgeClass = 'gene-badge';
    if (isMorbid) geneBadgeClass += ' morbid';
    if (isCensus) geneBadgeClass += ' census';
    
    const geneLabel = `<span class="${geneBadgeClass}" style="font-size:0.9rem; padding: 0.25rem 0.65rem;">${cleanGene}</span>`;
    
    const svType = row['SV_type'];
    const typeBadge = `<span class="sv-badge ${String(svType).toLowerCase()}">${svType}</span>`;
    
    const cdsVal = row['Overlapped_CDS_percent'] ? `<span class="mono">${parseFloat(row['Overlapped_CDS_percent']).toFixed(1)}%</span>` : `<span style="color:#555;">-</span>`;
    
    const normalVAF = row._normalVAF > 0 ? `<span class="vaf-text normal">${(row._normalVAF * 100).toFixed(2)}%</span>` : `<span class="mono" style="color:#555;">0%</span>`;
    const tumorVAF = row._tumorVAF > 0 ? `<span class="vaf-text tumor" style="font-weight:700;">${(row._tumorVAF * 100).toFixed(2)}%</span>` : `<span class="mono" style="color:#555;">0%</span>`;
    
    const acmgCl = getACMGClassOnly(row['ACMG_class']);
    const acmgBadge = `<span class="acmg-badge class-${acmgCl}">Classe ${acmgCl}</span>`;
    
    return `
        ${actionsCell}
        <td>${geneLabel}</td>
        <td>${typeBadge}</td>
        <td class="mono">${row['AnnotSV_ID']}</td>
        <td class="mono">${row._chrStart}</td>
        <td class="mono">${row._chrEnd}</td>
        <td>${row['Location'] || '<span style="color:#555;">-</span>'}</td>
        <td>${cdsVal}</td>
        <td>${normalVAF}</td>
        <td>${tumorVAF}</td>
        <td>${acmgBadge}</td>
    `;
}

function getACMGClassOnly(classStr) {
    if (!classStr) return '3';
    
    let cl = String(classStr).trim();
    if (cl.includes('full=')) {
        const m = cl.match(/full=(\d)/);
        if (m) return m[1];
    }
    
    const parsed = parseInt(cl);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        return String(parsed);
    }
    
    return '3';
}

// ----------------------------------------------------
// 8. Pagination Rendering
// ----------------------------------------------------
function renderPagination(totalItems, totalPages, startIndex, endIndex) {
    if (totalItems === 0) {
        el.paginationInfo.textContent = "Affichage de 0 variants";
        el.prevPageBtn.disabled = true;
        el.prevPageBtn.classList.add('disabled');
        el.nextPageBtn.disabled = true;
        el.nextPageBtn.classList.add('disabled');
        el.pageNumbers.innerHTML = '';
        return;
    }
    
    el.paginationInfo.textContent = `Affichage de ${startIndex + 1} à ${endIndex} sur ${totalItems.toLocaleString()} variants`;
    
    if (state.currentPage === 1) {
        el.prevPageBtn.disabled = true;
        el.prevPageBtn.classList.add('disabled');
    } else {
        el.prevPageBtn.removeAttribute('disabled');
        el.prevPageBtn.classList.remove('disabled');
    }
    
    if (state.currentPage === totalPages) {
        el.nextPageBtn.disabled = true;
        el.nextPageBtn.classList.add('disabled');
    } else {
        el.nextPageBtn.removeAttribute('disabled');
        el.nextPageBtn.classList.remove('disabled');
    }
    
    el.pageNumbers.innerHTML = '';
    
    const maxVisiblePages = 5;
    const pages = [];
    
    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        
        let start = Math.max(2, state.currentPage - 1);
        let end = Math.min(totalPages - 1, state.currentPage + 1);
        
        if (state.currentPage <= 3) {
            end = 4;
        } else if (state.currentPage >= totalPages - 2) {
            start = totalPages - 3;
        }
        
        if (start > 2) {
            pages.push('...');
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (end < totalPages - 1) {
            pages.push('...');
        }
        
        pages.push(totalPages);
    }
    
    pages.forEach(p => {
        const btn = document.createElement('button');
        if (p === '...') {
            btn.className = 'page-link dots';
            btn.textContent = '...';
        } else {
            btn.className = 'page-link';
            if (p === state.currentPage) btn.classList.add('active');
            btn.textContent = p;
            btn.addEventListener('click', () => {
                state.currentPage = p;
                renderTable();
            });
        }
        el.pageNumbers.appendChild(btn);
    });
}

// ----------------------------------------------------
// 9. Details Drawer Sidebar
// ----------------------------------------------------
function setupDrawer() {
    el.closeDrawerBtn.addEventListener('click', closeDetailsDrawer);
    el.drawerOverlay.addEventListener('click', closeDetailsDrawer);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetailsDrawer();
    });
}

function openDetailsDrawer(row) {
    el.drawerContent.innerHTML = '';
    
    const svType = row['SV_type'];
    const typeClass = String(svType).toLowerCase();
    const formattedLength = formatSVLength(row['SV_length'], svType);
    
    const isMorbid = row['OMIM_morbid'] === 'yes' || row['OMIM_morbid_candidate'] === 'yes';
    const morbidTag = isMorbid ? `<span class="badge fail" style="margin-left:5px;">Morbid Gene</span>` : '';
    
    const chrom = row._chrStart;
    const partnerChrom = row._chrEnd;
    const start = getCurrentPos(row, 'start');
    const end = getCurrentPos(row, 'end');
    
    const coordinatesSection = `
        <div class="drawer-section">
            <h4>🧬 Variante Structurale</h4>
            <div class="detail-row">
                <span class="detail-label">ID AnnotSV</span>
                <span class="detail-val mono">${row['AnnotSV_ID']}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type de SV</span>
                <span class="detail-val"><span class="sv-badge ${typeClass}">${svType}</span></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">chr_start</span>
                <span class="detail-val mono">${chrom}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">chr_end (Partenaire)</span>
                <span class="detail-val mono">${partnerChrom}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Position Début (bp)</span>
                <span class="detail-val mono">${start.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Position Fin (bp)</span>
                <span class="detail-val mono">${end.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Taille</span>
                <span class="detail-val mono">${formattedLength}</span>
            </div>
        </div>
    `;
    
    let normalVAFHtml = '';
    let tumorVAFHtml = '';
    
    if (state.normalSampleCol && row._parsedSamples[state.normalSampleCol]) {
        const sm = row._parsedSamples[state.normalSampleCol];
        normalVAFHtml = `
            <div class="vaf-meter-container">
                <div class="vaf-meter-bar">
                    <span class="detail-label">Sain (Control)</span>
                    <span class="vaf-text normal" style="font-weight:700;">${(sm.vaf * 100).toFixed(3)}%</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; color:#666;">Lectures: ALT=${sm.alt}, DP=${sm.dp}</span>
                    <div class="vaf-progress-track">
                        <div class="vaf-progress-fill normal" style="width: ${sm.vaf * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        normalVAFHtml = `<div class="detail-row"><span class="detail-label">Sain (Control)</span><span class="detail-val" style="color:#555;">Non disponible</span></div>`;
    }
    
    if (state.tumorSampleCol && row._parsedSamples[state.tumorSampleCol]) {
        const sm = row._parsedSamples[state.tumorSampleCol];
        tumorVAFHtml = `
            <div class="vaf-meter-container" style="margin-top: 1rem;">
                <div class="vaf-meter-bar">
                    <span class="detail-label" style="color:var(--text-highlight);">Tumoral (Tumor)</span>
                    <span class="vaf-text tumor" style="font-weight:800; font-size: 0.95rem;">${(sm.vaf * 100).toFixed(3)}%</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; color:#666;">Lectures: ALT=${sm.alt}, DP=${sm.dp}</span>
                    <div class="vaf-progress-track">
                        <div class="vaf-progress-fill tumor" style="width: ${sm.vaf * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        tumorVAFHtml = `<div class="detail-row"><span class="detail-label">Tumoral (Tumor)</span><span class="detail-val" style="color:#555;">Non disponible</span></div>`;
    }
    
    const vafSection = `
        <div class="drawer-section">
            <h4>📊 Fréquence Allélique (VAF)</h4>
            ${normalVAFHtml}
            ${tumorVAFHtml}
            <div class="detail-row" style="margin-top:1rem; border-top:1px solid rgba(255,255,255,0.05); padding-top:0.5rem;">
                <span class="detail-label">Format Somatique</span>
                <span class="detail-val mono" style="font-size:0.8rem;">${row['FORMAT']}</span>
            </div>
        </div>
    `;
    
    const acmgCl = getACMGClassOnly(row['ACMG_class']);
    const rankingScore = row['AnnotSV_ranking_score'] || 'N/A';
    
    let geneDetailsHtml = '';
    const geneStr = row['Gene_name'];
    if (geneStr && geneStr !== '.' && geneStr !== 'N/A') {
        geneDetailsHtml = `
            <div class="detail-row">
                <span class="detail-label">Gène(s)</span>
                <span class="detail-val highlight-text" style="font-size:1.05rem;">${geneStr} ${morbidTag}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Nombre de gènes</span>
                <span class="detail-val mono">${row['Gene_count'] || '1'}</span>
            </div>
        `;
        
        if (state.currentView === 'split') {
            geneDetailsHtml += `
                <div class="detail-row">
                    <span class="detail-label">Localisation</span>
                    <span class="detail-val">${row['Location'] || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Exon(s) touchés</span>
                    <span class="detail-val mono">${row['Exon_count'] || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Chevauchement CDS</span>
                    <span class="detail-val mono">${row['Overlapped_CDS_percent'] ? parseFloat(row['Overlapped_CDS_percent']).toFixed(1) + '%' : 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Transcript de réf.</span>
                    <span class="detail-val mono">${row['Tx'] || 'N/A'}</span>
                </div>
            `;
        }
    } else {
        geneDetailsHtml = `<div class="detail-row"><span class="detail-label">Gène(s)</span><span class="detail-val" style="font-style:italic; color:#555;">Aucun gène chevauché</span></div>`;
    }
    
    const geneSection = `
        <div class="drawer-section">
            <h4>🏷️ Impact Génique &amp; ACMG</h4>
            ${geneDetailsHtml}
            <div class="detail-row" style="margin-top:0.5rem; border-top:1px solid rgba(255,255,255,0.05); padding-top:0.5rem;">
                <span class="detail-label">ACMG Score final</span>
                <span class="detail-val"><span class="acmg-badge class-${acmgCl}">Classe ${acmgCl}</span></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">AnnotSV Score</span>
                <span class="detail-val highlight-text mono">${rankingScore}</span>
            </div>
            <div class="detail-row" style="align-items:flex-start;">
                <span class="detail-label">Critères AnnotSV</span>
                <span class="detail-val" style="font-size:0.75rem; text-align:right; font-family:'JetBrains Mono',monospace;">${row['AnnotSV_ranking_criteria'] || 'Aucun'}</span>
            </div>
        </div>
    `;
    
    let omimHtml = '';
    if (row['OMIM_ID']) {
        omimHtml = `
            <div class="detail-row">
                <span class="detail-label">OMIM ID</span>
                <span class="detail-val"><a href="https://www.omim.org/entry/${row['OMIM_ID'].split(';')[0]}" target="_blank" class="clinvar-link">${row['OMIM_ID']} ↗</a></span>
            </div>
            <div class="detail-row" style="flex-direction:column; align-items:flex-start; gap:0.25rem;">
                <span class="detail-label">OMIM Phénotype</span>
                <span class="detail-val" style="text-align:left; font-size:0.8rem; font-weight:normal; max-width:100%;">${row['OMIM_phenotype'] || '-'}</span>
            </div>
        `;
    }
    
    const chromName = String(chrom).replace(/chr/i, '');
    const decipherUrl = `https://www.deciphergenomics.org/browser#q/chr${chromName}:${start}-${end}`;
    const ucscUrl = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position=chr${chromName}:${start}-${end}`;
    
    const clinicalSection = `
        <div class="drawer-section">
            <h4>🏥 Pathologie &amp; Base de Données</h4>
            ${omimHtml}
            <div class="detail-row">
                <span class="detail-label">DDD HI % (Haploinsuf.)</span>
                <span class="detail-val mono">${row['DDD_HI_percent'] ? parseFloat(row['DDD_HI_percent']).toFixed(1) + '%' : 'Non disponible'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">DDD Pathologie</span>
                <span class="detail-val" style="font-size:0.8rem; font-weight:normal;">${row['DDD_disease'] || '-'}</span>
            </div>
            
            <div class="detail-row" style="margin-top:1rem; border-top:1px solid rgba(255,255,255,0.05); padding-top:1rem;">
                <span class="detail-label">Explorateur Decipher</span>
                <span class="detail-val"><a href="${decipherUrl}" target="_blank" class="clinvar-link">Ouvrir dans Decipher ↗</a></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">UCSC Genome Browser</span>
                <span class="detail-val"><a href="${ucscUrl}" target="_blank" class="clinvar-link">Ouvrir dans UCSC ↗</a></span>
            </div>
        </div>
    `;
    
    el.drawerContent.innerHTML = coordinatesSection + vafSection + geneSection + clinicalSection;
    
    el.detailsDrawer.classList.add('active');
    el.drawerOverlay.classList.add('active');
}

function closeDetailsDrawer() {
    el.detailsDrawer.classList.remove('active');
    el.drawerOverlay.classList.remove('active');
    
    state.selectedRow = null;
    const currentSelected = el.tableBody.querySelector('tr.selected');
    if (currentSelected) currentSelected.classList.remove('selected');
}

// ----------------------------------------------------
// 9. Complex Genomic Signatures (Chromothripsis & Chromoplexy)
// ----------------------------------------------------
function detectAndRenderComplexSignatures() {
    if (state.rawRows.length === 0) {
        return;
    }
    
    // We only detect complex signatures & TP53 on variants with VAF >= 20%
    const somaticRowsForSignatures = state.fullRows.filter(r => 
        r._tumorVAF >= 0.20 && (state.normalSampleCol ? r._normalVAF <= 0.03 : true)
    );
    
    // 1. Chromothripsis Detection (VAF >= 20%)
    const byChr = {};
    somaticRowsForSignatures.forEach(row => {
        const chr = row._chrStart;
        if (!chr) return;
        if (!byChr[chr]) byChr[chr] = [];
        byChr[chr].push(row);
    });
    
    const chromothripsisList = [];
    
    Object.keys(byChr).forEach(chr => {
        const rows = byChr[chr].sort((a, b) => a._posStart - b._posStart);
        const positions = rows.map(r => r._posStart);
        
        if (positions.length >= 5) {
            let maxDensity = 0;
            let bestRange = [0, 0];
            
            for (let i = 0; i < positions.length; i++) {
                const posStart = positions[i];
                let count = 0;
                for (let j = i; j < positions.length; j++) {
                    if (positions[j] - posStart <= 10000000) { // 10 Mb
                        count++;
                    } else {
                        break;
                    }
                }
                if (count > maxDensity) {
                    maxDensity = count;
                    bestRange = [posStart, positions[i + count - 1]];
                }
            }
            
            if (maxDensity >= 6) {
                chromothripsisList.push({
                    chr,
                    density: maxDensity,
                    range: bestRange,
                    total: positions.length
                });
            }
        }
    });
    
    // Render Chromothripsis
    const ctResultsEl = document.getElementById('chromothripsisResults');
    if (ctResultsEl) {
        if (chromothripsisList.length === 0) {
            ctResultsEl.innerHTML = '<p class="placeholder-text">Aucun cluster de breakpoints de type chromothripsis détecté (VAF >= 20%).</p>';
        } else {
            let html = '';
            chromothripsisList.sort((a, b) => b.density - a.density).forEach(ct => {
                const startMb = (ct.range[0] / 1000000).toFixed(2);
                const endMb = (ct.range[1] / 1000000).toFixed(2);
                html += `
                    <div class="pathology-result-item" style="border-left: 4px solid var(--color-del); margin-bottom: 0.5rem; background: rgba(255, 75, 75, 0.03); padding: 0.6rem 0.8rem; border-radius: 6px;">
                        <div class="pathology-result-header" style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="pathology-result-name" style="color: var(--color-del); font-size: 0.9rem; font-weight:700;">Chromosome ${ct.chr}</span>
                            <span class="pathology-status-badge detected" style="background: rgba(255, 75, 75, 0.12); color: var(--color-del); border-color: rgba(255, 75, 75, 0.2); font-size:0.7rem; padding: 0.15rem 0.4rem; border-radius:4px;">Cluster Détecté</span>
                        </div>
                        <p class="pathology-result-details" style="margin-top: 0.25rem; font-size: 0.8rem; line-height:1.4;">
                            <strong>${ct.density} breakpoints</strong> localisés dans une fenêtre de 10 Mb (${startMb} Mb à ${endMb} Mb).
                        </p>
                        <p class="pathology-result-details" style="color: #8892b0; font-size: 0.72rem; margin-top:0.15rem;">
                            Total de variants somatiques sur ce chromosome : ${ct.total}.
                        </p>
                    </div>
                `;
            });
            ctResultsEl.innerHTML = html;
        }
    }
    
    // 2. Chromoplexy Detection (VAF >= 20%)
    const somaticBnds = somaticRowsForSignatures.filter(r => r['SV_type'] === 'BND');
    
    // Build adjacency list
    const adj = {};
    somaticBnds.forEach(row => {
        const u = String(row._chrStart).replace(/chr/i, '').trim();
        const v = String(row._chrEnd).replace(/chr/i, '').trim();
        if (u && v && u !== v) {
            if (!adj[u]) adj[u] = new Set();
            if (!adj[v]) adj[v] = new Set();
            adj[u].add(v);
            adj[v].add(u);
        }
    });
    
    const loops3 = [];
    const loops4 = [];
    const nodes = Object.keys(adj).sort();
    
    // Find loops of length 3
    for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        adj[n1].forEach(n2 => {
            if (n2 <= n1) return;
            adj[n2].forEach(n3 => {
                if (n3 <= n2 || n3 === n1) return;
                if (adj[n3].has(n1)) {
                    loops3.push([n1, n2, n3]);
                }
            });
        });
    }
    
    // Find loops of length 4
    for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        adj[n1].forEach(n2 => {
            if (n2 <= n1) return;
            adj[n2].forEach(n3 => {
                if (n3 <= n2 || n3 === n1) return;
                adj[n3].forEach(n4 => {
                    if (n4 <= n3 || n4 === n2 || n4 === n1) return;
                    if (adj[n4].has(n1)) {
                        loops4.push([n1, n2, n3, n4]);
                    }
                });
            });
        });
    }
    
    const cpResultsEl = document.getElementById('chromoplexyResults');
    if (cpResultsEl) {
        if (loops3.length === 0 && loops4.length === 0) {
            cpResultsEl.innerHTML = '<p class="placeholder-text">Aucun cycle de translocation chaîné de type chromoplexy détecté (VAF >= 20%).</p>';
        } else {
            let html = '';
            
            // Header summary
            html += `
                <div class="pathology-summary-alert alert-positive" style="background: rgba(174, 82, 212, 0.08); border-color: rgba(174, 82, 212, 0.2); color: #d6adff; padding:0.5rem; margin-bottom: 0.5rem; font-size:0.8rem; border-radius:6px;">
                    ⛓️ ${loops3.length + loops4.length} boucle(s) de translocations réciproques complexe(s) !
                </div>
            `;
            
            // Display loops of size 3
            if (loops3.length > 0) {
                html += `<div style="font-weight: 700; font-size: 0.8rem; color: #d6adff; margin-bottom: 0.35rem; margin-top:0.25rem;">Boucles réciproques à 3 voies :</div>`;
                loops3.slice(0, 3).forEach(loop => {
                    html += `
                        <div class="pathology-result-item" style="padding: 0.4rem 0.6rem; margin-bottom:0.25rem; background: rgba(174, 82, 212, 0.04); border: 1px solid rgba(174, 82, 212, 0.1); border-radius:4px;">
                            <span class="mono" style="font-weight: 700; color: #e1c2ff; font-size: 0.78rem;">
                                Chr ${loop[0]} ⇄ Chr ${loop[1]} ⇄ Chr ${loop[2]} ⇄ Chr ${loop[0]}
                            </span>
                        </div>
                    `;
                });
            }
            
            // Display loops of size 4
            if (loops4.length > 0) {
                html += `<div style="font-weight: 700; font-size: 0.8rem; color: #d6adff; margin-top: 0.5rem; margin-bottom: 0.35rem;">Boucles réciproques à 4 voies :</div>`;
                loops4.slice(0, 3).forEach(loop => {
                    html += `
                        <div class="pathology-result-item" style="padding: 0.4rem 0.6rem; margin-bottom:0.25rem; background: rgba(174, 82, 212, 0.04); border: 1px solid rgba(174, 82, 212, 0.1); border-radius:4px;">
                            <span class="mono" style="font-weight: 700; color: #e1c2ff; font-size: 0.78rem;">
                                Chr ${loop[0]} ⇄ Chr ${loop[1]} ⇄ Chr ${loop[2]} ⇄ Chr ${loop[3]} ⇄ Chr ${loop[0]}
                            </span>
                        </div>
                    `;
                });
            }
            
            cpResultsEl.innerHTML = html;
        }
    }

    // 3. TP53 / del(17p) Detection (VAF >= 20%)
    const tp53Dels = state.fullRows.filter(r => 
        r['SV_type'] === 'DEL' && 
        String(r._chrStart).replace(/chr/i, '') === '17' &&
        (String(r['Gene_name'] || '').includes('TP53') || (r._posStart <= 7687538 && r._posEnd >= 7661779)) &&
        r._tumorVAF >= 0.20
    );
    
    const tp53ResultsEl = document.getElementById('tp53Results');
    if (tp53ResultsEl) {
        if (tp53Dels.length === 0) {
            tp53ResultsEl.innerHTML = '<p class="placeholder-text">Aucune délétion del(17p)/TP53 détectée avec VAF >= 20%.</p>';
        } else {
            let html = '';
            tp53Dels.forEach(row => {
                const vafPercent = (row._tumorVAF * 100).toFixed(2);
                const sizeText = formatSVLength(row['SV_length'], 'DEL');
                html += `
                    <div class="pathology-result-item" style="border-left: 4px solid #ff5e62; margin-bottom: 0.5rem; background: rgba(255, 94, 98, 0.04); padding: 0.6rem 0.8rem; border-radius: 6px;">
                        <div class="pathology-result-header" style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="pathology-result-name" style="color: #ff5e62; font-size: 0.9rem; font-weight:700;">del(17p) détectée</span>
                            <span class="pathology-status-badge detected" style="background: rgba(255, 94, 98, 0.12); color: #ff5e62; border-color: rgba(255, 94, 98, 0.2); font-size:0.7rem; padding: 0.15rem 0.4rem; border-radius:4px;">VAF >= 20%</span>
                        </div>
                        <p class="pathology-result-details" style="margin-top: 0.25rem; font-size: 0.8rem; line-height:1.4;">
                            <strong>TP53 délété</strong> (Taille : ${sizeText}, Position : chr17:${getCurrentPos(row, 'start').toLocaleString()} - ${getCurrentPos(row, 'end').toLocaleString()}).
                        </p>
                        <p class="pathology-result-details" style="color: var(--accent); font-weight: 600; font-size: 0.75rem; margin-top:0.15rem;">
                            VAF Tumorale : ${vafPercent}% (ID: ${row['AnnotSV_ID']})
                        </p>
                        <div class="pathology-result-action" style="margin-top: 0.4rem;">
                             <button class="btn primary btn-sm focus-variant-btn" data-id="${row['AnnotSV_ID']}" style="padding: 0.15rem 0.4rem; font-size: 0.7rem; border-radius: 4px; background: rgba(255, 94, 98, 0.1); border-color: rgba(255, 94, 98, 0.3); color: #ff8e91;">🔍 Voir</button>
                        </div>
                    </div>
                `;
            });
            tp53ResultsEl.innerHTML = html;
            
            // Add click listeners
            tp53ResultsEl.querySelectorAll('.focus-variant-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const varId = btn.dataset.id;
                    focusAndZoomVariant(varId);
                });
            });
        }
    }
}

// ----------------------------------------------------
// Genomic Liftover Utility (hg38 to hg19)
// ----------------------------------------------------
function liftOver38To19(chr, pos) {
    if (typeof LIFTOVER_MAP === 'undefined') return pos;
    const cleanChr = String(chr).replace(/chr/i, '').trim();
    const intervals = LIFTOVER_MAP[cleanChr];
    if (!intervals) return pos;
    
    // Binary search for the interval
    let low = 0;
    let high = intervals.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const interval = intervals[mid];
        if (pos >= interval.start && pos <= interval.end) {
            return pos + interval.offset;
        } else if (pos < interval.start) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    // Fallback to closest interval if within 5Mb
    let minDiff = Infinity;
    let bestOffset = 0;
    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const diff = Math.min(Math.abs(pos - interval.start), Math.abs(pos - interval.end));
        if (diff < minDiff) {
            minDiff = diff;
            bestOffset = interval.offset;
        }
    }
    if (minDiff < 5000000) {
        return pos + bestOffset;
    }
    return pos;
}

function getCurrentPos(row, field) {
    const pos = (field === 'start') ? row._posStart : row._posEnd;
    if (state.genomeAssembly === 'hg19') {
        const chr = (field === 'start') ? row._chrStart : row._chrEnd;
        return liftOver38To19(chr, pos);
    }
    return pos;
}

// ----------------------------------------------------
// 10. Analysis and Rendering Pipeline
// ----------------------------------------------------
function runAnalysisAndRender() {
    calculateStatistics();
    runFiltering();
    detectAndRenderComplexSignatures();
}

// ----------------------------------------------------
// 11. Assembly Selector Event Listener
// ----------------------------------------------------
el.assemblySelect.addEventListener('change', (e) => {
    state.genomeAssembly = e.target.value;
    runAnalysisAndRender();
});
