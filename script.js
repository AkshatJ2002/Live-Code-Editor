
document.getElementById('export-html').addEventListener('click', function() {
    const htmlCode = htmlEditor.getValue();
    downloadFile('code.html', htmlCode);
});

document.getElementById('export-css').addEventListener('click', function() {
    const cssCode = cssEditor.getValue();
    downloadFile('style.css', cssCode);
});

document.getElementById('export-js').addEventListener('click', function() {
    const jsCode = jsEditor.getValue();
    downloadFile('script.js', jsCode);
});

document.getElementById('import-html').addEventListener('change', function(event) {
    const file = event.target.files[0];
    importFile(file, htmlEditor);
});

document.getElementById('import-css').addEventListener('change', function(event) {
    const file = event.target.files[0];
    importFile(file, cssEditor);
});

document.getElementById('import-js').addEventListener('change', function(event) {
    const file = event.target.files[0];
    importFile(file, jsEditor);
});

// Functions for downloadFile and importFile would be the same as before


function downloadFile(filename, content) {
    const element = document.createElement('a');      // Create a temporary <a> element
    const file = new Blob([content], { type: 'text/plain' });  // Create a Blob object with the file content
    element.href = URL.createObjectURL(file);         // Create a downloadable URL from the Blob
    element.download = filename;                      // Set the filename for download
    document.body.appendChild(element);               // Append the element to the body
    element.click();                                  // Programmatically click the element to trigger the download
    document.body.removeChild(element);               // Remove the element from the DOM after download
}

function importFile(file, editor) {
    const reader = new FileReader();  // Create a FileReader object

    reader.onload = function(e) {
        editor.setValue(e.target.result);  // Set the content of the file into the editor
    };

    reader.readAsText(file);  // Read the file as text
}











const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
    mode: 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true
});

function run() {
    let htmlcode = htmlEditor.getValue();
    let csscode = cssEditor.getValue();
    let jscode = jsEditor.getValue();
    let iframe = document.getElementById("output");

    const blob = new Blob([`
        <html>
        <head>
            <style>
                ${csscode}
            </style>
        </head>
        <body>
            ${htmlcode}
            <script>
                ${jscode}
            </script>
        </body>
        </html>
    `], { type: 'text/html' });

    iframe.src = URL.createObjectURL(blob);
}


// Attach the run function to the CodeMirror change events
function attachChangeListeners() {
    htmlEditor.on('change', run);
    cssEditor.on('change', run);
    jsEditor.on('change', run);
}

// Initialize change listeners
attachChangeListeners();













// Function to store the code in localStorage
function storeCode() {
    localStorage.setItem('htmlCode', htmlEditor.getValue());
    localStorage.setItem('cssCode', cssEditor.getValue());
    localStorage.setItem('jsCode', jsEditor.getValue());
}

// Function to retrieve the code from localStorage
function loadCode() {
    const storedHtml = localStorage.getItem('htmlCode') || '';
    const storedCss = localStorage.getItem('cssCode') || '';
    const storedJs = localStorage.getItem('jsCode') || '';

    htmlEditor.setValue(storedHtml);
    cssEditor.setValue(storedCss);
    jsEditor.setValue(storedJs);
}

// Attach the run function to the CodeMirror change events
function attachChangeListeners() {
    htmlEditor.on('change', () => {
        run();
        storeCode();
    });
    cssEditor.on('change', () => {
        run();
        storeCode();
    });
    jsEditor.on('change', () => {
        run();
        storeCode();
    });
}

// Load code from localStorage on page load
window.onload = function() {
    loadCode();
    attachChangeListeners();
};

