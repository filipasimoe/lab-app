<template>
    <div class="big">
        <p v-if="admin" id="admin">Sessão iniciada como administrador</p>
        <div class="cards">
            <div class="card" v-for="person in team">
                <!-- Tem de ir buscar à memória -->
                <img src="../../assets/team1.jpg" alt="Person">
                <div class="container">
                    <div class="bold">
                        {{ person.name }}
                    </div>
                    {{ person.role }}
                    <br>
                    {{ person.email }}
                    <br>
                    {{ person.bio }}
                    <p><button class="button" @click="setTargetIdProjects(person.IDU)">Ver Projectos</button></p>
                    <p><button class="button" @click="setTargetIdPublications(person.IDU)">Ver Publicações</button></p>
                    <p v-if="person.IDU == id || admin"><button class="button adminButton" @click="setTargetIdEdit(person.IDU)">Editar</button></p>
                    <p v-if="admin"><button class="button add-link adminButton" @click="deletePerson(person.IDU)">Apagar</button></p>

                </div>
            </div>
        </div>
        <div class="add-btn">
            <button class="add" v-if="admin"><router-link class="add-link" :to="{name: 'AddPerson'}">Adicionar Investigador</router-link></button>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import router from '../../router';

export default {
    name: "Team",
    data() {
        const store = useStore();
 
        const admin = computed(() => store.state.isAdmin);

        const id = computed(() => store.state.userId);

        return {
            team: '',
            admin, 
            id
        }
    },
    async beforeCreate() {
        const data = await (await fetch(`https://localhost:8000/api/researcher/all`)).json();
        this.team = data;
    },
    methods: {
        async setTargetIdEdit(target) {
            await this.$store.dispatch("setTarget", target);
            this.$router.push('/edit-person')
        },
        async setTargetIdProjects(target) {
            await this.$store.dispatch("setTarget", target);
            this.$router.push('/projects-id')
        },
        async setTargetIdPublications(target) {
            await this.$store.dispatch("setTarget", target);
            this.$router.push('/publications-id')
        },
        async deletePerson(id) {
            const del = await fetch(`https://localhost:8000/api/researcher/delete/${id}`, {
                method:'DELETE'
            });

            const jsonDel = await del.json();

            alert(jsonDel.message);
            console.log(jsonDel.message);
            await router.push('/team');
        }
    }

};
</script>

<style scoped>
.big {
    margin: 0 auto;
}
.cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .cards {
    flex-direction: column;
  }
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 35px;
  text-align: center;
  line-height: 2em;
  height: min-content;
}

.container {
  padding: 10px 16px 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.container button {
    align-self: center;
    background-color: #580000;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    line-height: 23px;
    outline: none;
    padding: .75rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    margin-top: 2vh;
    width: 100%;
}

.container button:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.container button:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

.card img {
    width: 100%;
}

.bold {
    font-weight: bold;
}

.add {
    align-self: center;
    background-color: #580000;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    line-height: 23px;
    outline: none;
    padding: .75rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: fit-content;
}

.add:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.add:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

.add-link, .add-link:hover {
    font-weight: 500;
    color: white;
    list-style: none;
    text-decoration: none;
}   

.add-btn {
    margin: 5vh auto;
    display: flex;
    justify-content: center;
}

.adminButton {
    background-color: #580000ce !important;
}

#admin {
    width: 70vw;
    margin: 0 auto;
    color: white;
    background-color: #580000;
    border: 2px solid #580000;
    padding: 5px;
    border-radius: 5px;
    opacity: 0.5;
    text-align: center;
}

.btn-link {
    color:white;
    text-decoration: none;
}
</style>