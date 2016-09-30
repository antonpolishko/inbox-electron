onload = () => {
    const webview = document.getElementById('webview');

    const loadstop = () => {
        webview.insertCSS("::-webkit-scrollbar {display: none;}");
    };

webview.addEventListener('load-commit', loadstop);
};