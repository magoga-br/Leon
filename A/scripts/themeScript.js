        // Verifica a preferência do tema no localStorage ao carregar a página
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;

        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            document.getElementById("change").textContent = "Change to White Mode";
        }

        function change() {
            // Alterna entre os temas
            const isDarkMode = body.classList.toggle('dark-mode');
            
            // Atualiza o texto do botão
            document.getElementById("change").textContent = isDarkMode ? "Change to White Mode" : "Change to Dark Mode";

            // Salva a preferência no localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }