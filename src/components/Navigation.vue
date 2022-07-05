<template>
  <header :class="{'scrolled-nav' : scrolledNav}">
    <nav>
        <div class="branding">
            <img src="../assets/logo.png" alt="">
        </div>
        <ul v-show="!mobile" class="navigation">
            <li><router-link class="link" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link class="link" :to="{name: 'Team'}">Equipa</router-link></li>
            <li><router-link class="link" :to="{name: 'Publications'}">Publicações</router-link></li>
            <li><router-link class="link" :to="{name: 'Projects'}">Projectos</router-link></li>
        </ul>
        <div class="icon">
            <!-- TODO substituir por ícon font-awesome -->
            <i @click="toggleMobileNav" v-show="mobile" :class="{ 'icon-active': mobileNav }">O</i>
        </div>
        <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
            <li><router-link class="link" :to="{name: 'Home'}">Home</router-link></li>
            <li><router-link class="link" :to="{name: 'Team'}">Equipa</router-link></li>
            <li><router-link class="link" :to="{name: 'Publications'}">Publicações</router-link></li>
            <li><router-link class="link" :to="{name: 'Projects'}">Projectos</router-link></li>
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
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
  font-family: "Raleway", sans-serif;
}
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
    color: white;
    border-color: white;
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
    margin-right: 5vw;
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