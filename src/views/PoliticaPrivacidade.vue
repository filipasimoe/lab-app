<template>
    <div class="container">
        <h2>
            Política de Privacidade 
        </h2>
        <h4>
            Medidas de Segurança
        </h4>
        <p> As empresas do Grupo Laboratorial da Filipa desenvolvem os seus melhores esforços para proteger os dados pessoais dos Utilizadores contra acessos não autorizados através da Internet. Para o efeito utiliza sistemas de segurança, regras e outros procedimentos, de modo a garantir a proteção dos dados pessoais, bem como para prevenir o acesso não autorizado aos dados, o uso impróprio, a sua divulgação, perda ou destruição. É, no entanto, da sua responsabilidade garantir e assegurar que o computador que está a utilizar encontra-se adequadamente protegido contra softwares nocivos, vírus informáticos e worms. Adicionalmente, deverá estar ciente que, sem a adoção de medidas de segurança adequadas (por exemplo, a configuração segura do programa de navegação, software antivírus atualizado, software de barreira de segurança e a não utilização de software de origem duvidosa), o risco de os dados pessoais e passwords serem acedidos por terceiros, sem autorização para tal, é agravado.
            No entanto, note-se que sempre que a recolha de dados seja realizada em redes abertas, como a Internet, os seus dados poderão circular sem condições de segurança, existindo o risco de serem vistos e utilizados por terceiros não autorizados.   
        </p>
        <br>
        <br>
        <h4>
            Política de cookies
        </h4> 
        <p>
            Nos sites do Grupo Laboratorial da Filipa são usados cookies para assegurar uma experiência de utilização adequada. A informação obtida não tem qualquer outra utilização. O cookie é uma informação que é colocada automaticamente nos discos rígidos dos computadores dos utilizadores quando estes acedem a alguns sites. Os sites das empresas do Grupo Germano de Sousa, utilizam cookies apenas durante uma sessão, nomeadamente para guardar a língua, a unidade, o tipo de dispositivo de acesso e para apresentar questionários.
            O processo de recolha de elementos através dos cookies é efetuado de acordo com os procedimentos e práticas de segurança padronizados neste tipo de ferramentas. Além destes cookies, específicos dos sites das empresas do Grupo Germano de Sousa, podem também ser usados cookies que têm como objetivo registar dados estatísticos relativos ao fluxo de visitas e suas características. Os cookies definidos enviam dados somente para o servidor onde está instalado o domínio, o que os torna propriedade desse domínio. Estes dados não podem ser alterados ou recuperados por nenhum serviço ou por outro domínio.
            A informação obtida através destes meios não permite estabelecer qualquer relacionamento ao nível do endereço de IP dos utilizadores com o propósito de verificar dados pessoais.
        </p>
        <br>
        <br>
        <h4>
            Alterações à Política de Privacidade    
        </h4>
        <p> O Grupo Laboratorial da Filipa reserva-se o direito de, a todo o momento e sem aviso prévio e com efeitos imediatos, alterar, acrescentar ou revogar, parcial ou totalmente, a presente Política de Privacidade.
            Quaisquer alterações serão imediatamente divulgadas nesta mesma página online.        
        </p>
    </div>
</template>

<script>
export default {
    name: "PoliticaPrivacidade",
    mounted () {
        window.scrollTo(0, 0)
    }
};
</script>

<style scoped>
.container {
    height: 100vh;
    margin-bottom: 15vh;
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