<template>
    <div class="container">
        <div v-if="admin">É ADMINISTRADOR</div>
        <div class="card">
            <h2>
                Quem Somos?
            </h2>
            <p>
                Mollit pariatur ex ipsum duis. Sunt ullamco nulla amet quis exercitation cillum commodo sunt nulla nisi. Magna id non velit sunt fugiat. Eu enim aute reprehenderit elit pariatur. 
            </p>
            <p>
                Mollit dolore minim amet in. Nulla minim ipsum proident adipisicing commodo elit reprehenderit magna id excepteur reprehenderit adipisicing. Sunt eu sunt aliquip consectetur incididunt proident duis commodo duis velit reprehenderit dolore. Culpa id eu magna aliquip cupidatat esse qui amet elit eiusmod laborum fugiat.
            </p>
            <p>
                Officia ipsum reprehenderit occaecat et laborum dolor sunt culpa ut. Pariatur ad esse occaecat cupidatat pariatur dolor eiusmod minim aliqua proident nisi cillum est fugiat. Non ad cillum pariatur ea officia do aute fugiat. Cupidatat esse adipisicing nostrud ea nostrud officia incididunt mollit velit. Dolore ipsum in esse cillum.
            </p>
            <button class="team"><router-link class="team-link" :to="{name: 'Team'}">Venha conhecer a nossa equipa!</router-link></button>
        </div>

        <div class="btns">
            <button class="add"><router-link class="add-link" :to="{name: 'AddProject'}">Ver Projectos</router-link></button>
            <button class="add"><router-link class="add-link" :to="{name: 'AddProject'}">Ver Publicações</router-link></button>
        </div>
            </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

export default {
    name: "Home",
    setup() {
        const message = ref("Sem sessão iniciada");
        const store = useStore();
        
        onMounted(async () => {
            try {
                let response = await fetch("http://localhost:8000/api/user/user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const content = await response.json();
                
                await store.dispatch("setAuth", true);

                if(content.IDU > 0) {
                    await store.dispatch("setId", content.IDU);
                    if(content.isAdmin == 1) 
                        await store.dispatch("setAdmin", true);

                }               
                else {
                    await store.dispatch("setAdmin", false);
                    await store.dispatch("setId", 0);
                }

                if (response.status == 401) {
                    alert("401 - Não autorizado");
                }
                if (response.status == 200) {
                    console.log("Autenticado com sucesso");
                }
            }
            catch (e) {
                await store.dispatch("setAuth", false);
            }
        });
       
        const admin = computed(() => store.state.isAdmin);

        return {
            message,
            admin
        };
    }
};
</script>

<style scoped>


.card {
    background-color: rgba(255, 255, 255, 0.89);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: min-content;
    border-radius: 0.375rem;
    width: 70%;
    margin: 10vh auto 15vh auto;
    padding: 50px;
}

.btns {
    width: 350px;
    margin: 0 auto 10vh auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media screen and (max-width: 700px) {
    .btns {
        flex-direction: column;
    }
}


.add {
    width: 150px;
}

a { 
    text-decoration: none;
    color: white;
}

a:hover { 
    text-decoration: none;
    color: white;
}
</style>