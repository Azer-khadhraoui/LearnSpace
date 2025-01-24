document.addEventListener('DOMContentLoaded', () => {
    const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default'
    });

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
});