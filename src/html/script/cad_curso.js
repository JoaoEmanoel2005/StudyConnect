import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            themeToggle.classList.add('rotate');
            setTimeout(() => themeToggle.classList.remove('rotate'), 500);
            themeToggle.classList.toggle('fa-moon');
            themeToggle.classList.toggle('fa-sun');
        });

        // Valor do curso: mostrar/ocultar campo de valor pago
        const valorTipoSelect = document.getElementById('valorTipo');
        const valorPagoContainer = document.getElementById('valorPagoContainer');
        const valorPagoInput = document.getElementById('valorPago');
        valorPagoContainer.style.display = 'none';

        valorTipoSelect.addEventListener('change', () => {
            if (valorTipoSelect.value === 'pago') {
                valorPagoContainer.style.display = 'block';
                valorPagoInput.setAttribute('required', 'required');
            } else {
                valorPagoContainer.style.display = 'none';
                valorPagoInput.value = '';
                valorPagoInput.removeAttribute('required');
            }
        });

        // Máscara para valor em Real (R$)
        valorPagoInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                value = (parseInt(value, 10) / 100).toFixed(2) + '';
                value = value.replace('.', ',');
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
            e.target.value = value;
        });

        // Pluralização das unidades de duração
        const duracaoQuantidade = document.getElementById('duracaoQuantidade');
        const duracaoUnidade = document.getElementById('duracaoUnidade');

        duracaoQuantidade.addEventListener('input', () => {
            if (duracaoQuantidade.value === '1') {
                duracaoUnidade.querySelector('option[value="anos"]').textContent = 'Ano';
                duracaoUnidade.querySelector('option[value="meses"]').textContent = 'Mês';
            } else {
                duracaoUnidade.querySelector('option[value="anos"]').textContent = 'Anos';
                duracaoUnidade.querySelector('option[value="meses"]').textContent = 'Meses';
            }
        });

        // Submissão do formulário
        const form = document.getElementById('cursoForm');
        const mensagem = document.getElementById('mensagem');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Valor do curso
            if (data.valorTipo === 'gratuito') {
                data.valorPago = "0";
            } else if (data.valorPago) {
                let valorNumerico = data.valorPago.replace(/\./g, '').replace(',', '.');
                data.valorPago = parseFloat(valorNumerico);
            }

            // Duração do curso (concatena quantidade e unidade)
            data.duracao = `${data.duracaoQuantidade} ${data.duracaoUnidade}`;
            delete data.duracaoQuantidade;
            delete data.duracaoUnidade;

            // Envio do formulário (ajuste a URL para seu backend)
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${BASE_URL}/cursos/cadastro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    mensagem.textContent = result.mensagem;
                    form.reset();
                    valorPagoContainer.style.display = 'none';
                } else {
                    mensagem.textContent = 'Erro: ' + result.mensagem;
                }
            } catch (err) {
                mensagem.textContent = 'Erro de rede: ' + err.message;
            }
        });