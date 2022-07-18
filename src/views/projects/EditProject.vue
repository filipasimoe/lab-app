<template>
    <div class="big">
        <form id="edit-project" @submit.prevent="submitProject">

            <label for="duration">Duração do Projecto (em anos):</label><br>
            <input type="number"  min="1" step="1" v-model="data.duration" id="duration" name="duration" placeholder="Introduza a duração"><br>
            
            <label for="context">Contexto:</label><br>
            <input type="text" v-model="data.context" id="context" name="context" placeholder="Introduza o contexto do projecto"><br>
            
            <label for="year">Ano de início:</label><br>
            <input type="number" min="1900" max="2099" step="1" v-model="data.year" id="year" name="year" placeholder="Introduza o ano"><br>
            
            <label for="description">Descrição do Projecto:</label><br>
            <textarea name="description" v-model="data.description" id="description" form="add-project" placeholder="Introduza uma descrição para o projecto"></textarea> 
            
            <input type="submit" value="Submeter Edição">
        </form>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "EditProject",
    setup() {
        const router = useRouter()

        const store = useStore();
 
        const target = computed(() => store.state.targetId);

        const data = ({
            IDP: target.value,
            duration: null,
            context: null,
            year: null,
            description: null
        });

        const submitProject = async () => {
            console.log(data);
            const edit = await fetch('https://localhost:8000/api/project/edit',  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const jsonEdit = await edit.json();

            alert(jsonEdit.message)
            console.log(jsonEdit.message);
            await router.push('/projects');
        }

        return {
            data,
            target,
            submitProject
        }
    },
    async mounted() {
        this.$project = await (await fetch(`https://localhost:8000/api/project/info/${this.target}`)).json();

        document.getElementById("duration").value = this.$project.duration;
        document.getElementById("context").value = this.$project.context;
        document.getElementById("description").value = this.$project.description;
        document.getElementById("year").value = this.$project.year;
    }
}
</script>

<style scoped>
.big {
    height: 80vh;
}
form {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

input[type=file] {
  font-size: 17px;
  color: #b8b8b8;
}

.btn-wrap {
  position: relative;
}

input[type=text], input[type=email], input[type=number], textarea {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-bottom: 2px solid #580000;
    margin-bottom: 10px;
    border-radius: 10px;
}
/*
input[type=file] {
    display: none;
}*/

input[type=submit] {
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
    font-family: Neucha, sans-serif;
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
}

input[type=submit]:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

input[type=submit]:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
</style>

