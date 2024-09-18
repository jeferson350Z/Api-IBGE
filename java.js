document.getElementById('estado').addEventListener('change', function() {
    const estado = this.value;
    const cidadeSelect = document.getElementById('cidade');
    
    if (estado) {
        
        cidadeSelect.innerHTML = '<option value="">Carregando cidades...</option>';
        cidadeSelect.disabled = true;
        
        
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
            .then(response => response.json())
            .then(data => {
                
                cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
                
                data.forEach(cidade => {
                    let option = document.createElement('option');
                    option.value = cidade.nome;  
                    option.text = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
                
               
                cidadeSelect.disabled = false;
            })
            .catch(error => {
                console.error('Erro ao buscar cidades:', error);
                cidadeSelect.innerHTML = '<option value="">Erro ao carregar cidades</option>';
            });
    } else {
        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        cidadeSelect.disabled = true;
    }
});
