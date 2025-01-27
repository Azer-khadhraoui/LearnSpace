document.addEventListener('DOMContentLoaded', () => {
    const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default'
    });

    // Fonction pour exécuter le code
    window.runCode = function() {
        const code = editor.getValue();
        const outputElement = document.getElementById('output');
        outputElement.textContent = ''; 

        // Capture console.log output
        const originalConsoleLog = console.log;
        console.log = function(...args) {
            args.forEach(arg => {
                outputElement.textContent += arg + '\n';
            });
            originalConsoleLog.apply(console, args);
        };

        try {
            eval(code);
        } catch (error) {
            outputElement.textContent += error + '\n';
        }

        // Restore original console.log
        console.log = originalConsoleLog;
    };

    // Fonction pour sauvegarder le code
    window.saveCode = function() {
        const code = editor.getValue();
        localStorage.setItem('savedCode', code);
        alert('Code sauvegardé localement.');
    };

    // Fonction pour charger le code
    window.loadCode = function() {
        const savedCode = localStorage.getItem('savedCode');
        if (savedCode) {
            editor.setValue(savedCode);
        } else {
            alert('Aucun code sauvegardé trouvé.');
        }
    };

    // Fonction pour réinitialiser le code
    window.resetCode = function() {
        editor.setValue('');
    };

    // Fonction pour télécharger le code
    window.downloadCode = function() {
        const code = editor.getValue();
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.js';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Fonction pour charger du code à partir d'un fichier
    window.uploadCode = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                editor.setValue(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    // Fonction pour changer le thème
    window.changeTheme = function(theme) {
        editor.setOption('theme', theme);
    };

    // Charger le code sauvegardé si disponible
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        editor.setValue(savedCode);
    }
});