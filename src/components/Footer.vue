<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="footer-col">
                    <h4>
                        Serviços
                    </h4>
                    <ul>
                        <li>
                            <router-link class="link" :to="{name: 'FAQs'}">FAQs</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'PoliticaPrivacidade'}">Política de Privacidade</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'ProtecaoDados'}">Proteção de Dados</router-link>
                        </li>
                        <li>
                            <a href="https://portaldodenunciantegermanodesousa.integrityline.com">Plataforma do Denunciante</a>
                        </li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>
                        Mapa
                    </h4>
                    <ul>
                        <li>
                            <router-link class="link" :to="{name: 'Team'}">Equipa</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'Publications'}">Publicações</router-link>
                        </li>
                        <li>
                            <router-link class="link" :to="{name: 'Projects'}">Projectos</router-link>
                        </li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>
                        Área Reservada
                    </h4>
                    <ul>
                         <li><router-link class="link" :to="{name: 'Login'}" v-if="!auth">Entrar</router-link></li>
                        <li><router-link class="link" :to="{name: 'Register'}" v-if="!auth">Registar</router-link></li>
                        <li><router-link class="link" :to="{name: 'Login'}" v-if="auth" @click="logout()">Sair</router-link></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>
                        Redes Sociais
                    </h4>
                    <div class="social-links">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: "Footer",
    setup() {
        const store = useStore();
       
        const auth = computed(() => store.state.authenticated);
       
        const logout = async () => {
            await fetch('http://localhost:8000/api/user/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
        }

        return {
            auth,
            logout
        }
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

*:not(i) {
  font-family: "Raleway", sans-serif;
  line-height: 1.5;
}
.container {
	max-width: 1170px;
	margin:auto;
}
.row {
	display: flex;
	flex-wrap: wrap;
}

ul {
	list-style: none;
    padding-left: 0;
}

footer {
	background-color: #580000;
    padding: 70px 0;
    bottom: 0;
    left: 0;
    width: 100%;

}

.footer-col {
   width: 25%;
   padding: 0 15px;
}

.footer-col h4 {
	font-size: 18px;
	color: #ffffff;
	text-transform: capitalize;
	margin-bottom: 35px;
	font-weight: 500;
	position: relative;
}

.footer-col h4::before {
	content: '';
	position: absolute;
	left:0;
	bottom: -10px;
	background-color: white;
	height: 2px;
	box-sizing: border-box;
	width: 50px;
}

.footer-col ul li:not(:last-child) {
	margin-bottom: 10px;
}

.footer-col ul li a {
	font-size: 16px;
	text-transform: capitalize;
	color: #ffffff;
	text-decoration: none;
	font-weight: 300;
	color: #bbbbbb;
	display: block;
	transition: all 0.3s ease;
}

.footer-col ul li a:hover {
	color: #ffffff;
	padding-left: 8px;
}

.footer-col .social-links a {
	display: inline-block;
	height: 40px;
	width: 40px;
	background-color: rgba(255,255,255,0.2);
	margin:0 10px 10px 0;
	text-align: center;
	line-height: 40px;
	border-radius: 50%;
	color: #ffffff;
	transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
	color: #24262b;
	background-color: #ffffff;
}

@media(max-width: 767px) {
    .footer-col{
        width: 50%;
        margin-bottom: 30px;
    }
}
@media(max-width: 574px) {
    .footer-col{
        width: 100%;
    }
}
</style>