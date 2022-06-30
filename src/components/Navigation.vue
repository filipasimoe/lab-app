<template>
  <header :class="{'scrolled-nav' : scrolledNav}">
    <nav>
        <div class="branding">
            <img src="../assets/logo.png" alt="">
        </div>
        <ul v-show="!mobile" class="navigation">
            <li><router-link class="link" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link class="link" :to="{name: 'Team'}">Equipa</router-link></li>
            <li><router-link class="link" :to="{name: 'Publications'}">Publicaçõoes</router-link></li>
            <li><router-link class="link" :to="{name: 'Projects'}">Projectos</router-link></li>
            <li><router-link class="link" :to="{name: 'Login'}" v-if="!auth">Entrar</router-link></li>
            <li><router-link class="link" :to="{name: 'Register'}" v-if="!auth">Registar</router-link></li>
            <li><router-link class="link" :to="{name: 'Login'}" v-if="auth" @click="logout()">Sair</router-link></li>
        </ul>
        <div class="icon">
            <!-- TODO substituir por ícon font-awesome -->
            <i @click="toggleMobileNav" v-show="mobile" :class="{ 'icon-active': mobileNav }">O</i>
        </div>
        <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
            <li><router-link class="link" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link class="link" :to="{name: 'Team'}">Equipa</router-link></li>
            <li><router-link class="link" :to="{name: 'Publications'}">Publicaçõoes</router-link></li>
            <li><router-link class="link" :to="{name: 'Projects'}">Projectos</router-link></li>
            <li><router-link class="link" :to="{name: 'Login'}" v-if="!auth">Entrar</router-link></li>
            <li><router-link class="link" :to="{name: 'Register'}" v-if="!auth">Registar</router-link></li>
            <li><router-link class="link" :to="{name: 'Login'}" v-if="auth" @click="logout()">Sair</router-link></li>
        </ul>
        </transition>
    </nav>
  </header>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: "navigation",
    data() {
        return {
            scrolledNav: null,
            mobile: true,
            mobileNav: null,
            windowWidth: null
        }
    },
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
    created() {
        // Listen for when the window is resized
        window.addEventListener('resize', this.checkScreen);
        // Explicitly run the method every time the component is created
        this.checkScreen();
    },
    mounted() {
        window.addEventListener("scroll", this.updateScroll);
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        updateScroll() {
            const scrollPosition = window.scrollY;
            if(scrollPosition > 50) {
                this.scrolledNav = true;
                return;
            }
            this.scrolledNav = false;
            return;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        }
    }
};
</script>

<style scoped>
header {
    background-color: #580000;
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: .5 ease all;
    color: white;
}

nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5 ease all;
    width: 90%;
    margin: 0 auto;
}

ul, .link {
    font-weight: 500;
    color: white;
    list-style: none;
    text-decoration: none;
}   

li {
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
}

.link {
    font-size: 14px;
    transition: .5 ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

.link:hover {
    color: purple;
    border-color: red;
}

.branding {
    display: flex;
    align-items: center;
}

.branding img {
    width: 50px;
    transition: .5 ease all;
}

.navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin-bottom: 0;
}

.icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 24px;
    height: 100%; 
}

i { 
    cursor: pointer;
    font-size: 24px;
    transition: .8 ease all;
}

/* TODO substituir por 90 graus */
.icon-active {
    transform: rotate(180deg);
}

.dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    height: 100%;
    background-color: white;
    top: 0;
    left: 0;
}

.dropdown-nav li {
    margin-left: 0;
}

.dropdown-nav li .link {
    color: black;
}

.scrolled-nav {
    background-color: black;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.scrolled-nav nav {
    pad: 8px 0;
}

.scrolled-nav nav .branding img {
    width: 30px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mobile-nav-enter-active {
    transition: 1s ease all;
}

.mobile-nav-leave-active {
    transition: 1s ease all;
}


.mobile-nav-enter-from {
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}

.mobile-nav-leave-to {
    transform: translateX(-250px);
}
</style>