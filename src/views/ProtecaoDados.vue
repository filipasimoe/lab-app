<template>
    <div class="container">
        <h2>
            Regulamento Geral de Proteção de Dados
        </h2>
        <p>
            O tratamento dos dados é feito de acordo com o Regulamento Geral de Proteção de dados, um Regulamento Europeu que establece regras relativas à proteção das pessoas singulares no que diz respeito ao tratamento de dados pessoais.
            <p><button>Política de Privacidade do Laboratório</button></p>
            Para mais informações ou esclarecimentos no âmbito da proteção dos dados pessoais, envie e-mail para <a href="mailto:dpo@laboratorio.pt">dpo@laboratorio.pt</a>
        </p>
    </div>
</template>

<script>
export default {
    name: "ProtecaoDados",
    mounted () {
        window.scrollTo(0, 0)
    }
};
</script>

<style scoped>
.container {
    height: 100vh;
}   
p button {
    width: fit-content;
    margin-top: 5vh;
    margin-bottom: 5vh;
}

a {
    text-decoration: none;
    color: black;
    font-weight: 500;
}

h2 {
    margin-bottom: 5vh;
    width: fit-content;
    border-bottom: 2px solid #580000;
}
</style>