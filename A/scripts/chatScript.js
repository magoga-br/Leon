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

        // Variável para armazenar o horário da última mensagem
        let lastMessageTime = null;

        function sendMessage() {
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value.trim();

            if (message !== "" && message !== 'ㅤ') {
                const chatContainer = document.getElementById('chat-container');
                const now = new Date();

                // Verifica se é a primeira mensagem ou se a última mensagem foi enviada há mais de 12 horas
                if (!lastMessageTime || (now - lastMessageTime) > 12 * 60 * 60 * 1000) {
                    // Cria uma div com a data atual
                    const dateDiv = document.createElement('div');
                    dateDiv.className = 'date-separator';
                    dateDiv.textContent = now.toLocaleDateString(); // Formata a data
                    chatContainer.appendChild(dateDiv);
                }

                // Atualiza o horário da última mensagem
                lastMessageTime = now;

                // Cria a div da mensagem
                const messageElement = document.createElement('div');
                const timeOptions = { hour: '2-digit', minute: '2-digit' };
                const time = now.toLocaleTimeString([], timeOptions);

                messageElement.innerHTML = `
                <div id="container">    
                    <div id="mensagem">
                        <div class="name"><span>Fabrício</span></div>
                        <div class="text"><span>${message}</span></div>
                        <div class="date"><span>${time}</span></div>
                    </div>
                </div>
                `;
                chatContainer.appendChild(messageElement);
                messageInput.value = "";
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }

        // Permite enviar mensagens pressionando Enter
        document.getElementById('message-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Foca no campo de entrada ao pressionar Enter ou a tecla T
        document.addEventListener('keydown', function (e) {
            const messageInput = document.getElementById('message-input');

            // Tecla Enter
            if (e.key === 'Enter') {
                // Se o campo de texto não estiver em foco, foque nele
                if (document.activeElement !== messageInput) {
                    e.preventDefault(); // Impede o comportamento padrão (como enviar formulários)
                    messageInput.focus();
                }
            }

            // Tecla T
            if (e.key === 'T' || e.key === 't') {
                // Impede o comportamento padrão da tecla (inserir o caractere "T")
                e.preventDefault();
                messageInput.focus();
            }
        });