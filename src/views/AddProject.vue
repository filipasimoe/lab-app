<template>
    <div class="big">
        <form id="add-project" @submit.prevent="submitProject">
            <label for="title">Título do Projecto:</label><br>
            <input type="text" v-model="data.title" id="title" name="title" placeholder="Introduza o título do projecto:"><br>
            <!-- FIXME falta crear um endpoint para adicionar um investigador a um projecto que já exista -->
            
            <label for="email">Email do Investigador Associado:</label><br>
            <input type="email" v-model="data.email" id="email" name="email" placeholder="Introduza o email"><br>
            
            <label for="duration">Duração do Projecto (em anos):</label><br>
            <input type="number"  min="1" step="1" v-model="data.duration" id="duration" name="duration" placeholder="Introduza a duração"><br>
            
            <label for="context">Contexto:</label><br>
            <input type="text" v-model="data.context" id="context" name="context" placeholder="Introduza o contexto do projecto"><br>
            
            <label for="duration">Ano de início:</label><br>
            <input type="number" min="1900" max="2099" step="1" v-model="data.year" id="year" name="year" placeholder="Introduza o ano"><br>
            
            <label for="description">Descrição do Projecto:</label><br>
            <textarea name="description" v-model="data.description" id="description" form="add-project" placeholder="Introduza uma descrição para o projecto"></textarea> 
            
            <input type="submit" value="Adicionar Projecto">
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "AddProject",
    setup() {
        const data = reactive({
            title: '',
            duration: '',
            context: '',
            description: '',
            year: '',
            email: ''
        });

        const router = useRouter()

        const submitProject = async () => {

                const add = await fetch('http://localhost:8000/api/project/add',  {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(data)
                });

                const jsonAdd = await add.json();

                if(add.status == 200) {
                    alert(jsonAdd.message);
                    console.log(jsonAdd.message);
                    await router.push('/projects');
                }

                if(add.status == 400 || add.status == 401 || add.status == 404) {
                    console.log(jsonAdd.message);
                    await router.push('/projects');
                }       
        }   
        return {
            data,
            submitProject
        }
    }  
};
</script>

<style scoped>
.big {
    height: 80vh;
}

form {
    width: 50vw;
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

input[type=text], input[type=email], textarea {
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