<template>
  <div class="big">
    <form id="add-publication" @submit.prevent="submitPublication">
      <label for="title">Título da publicação:</label><br>
      <input type="text" v-model="data.title" id="title" name="title" placeholder="Introduza o título da publicação:"><br>

      <label for="email">Email do Investigador Associado:</label><br>
      <input type="email" v-model="data.email" id="email" name="email" placeholder="Introduza o email"><br>
      
      <label for="month">Mês (número):</label><br>
      <input type="number" min="1" max="12" step="1" v-model="data.month" id="month" name="month" placeholder="Introduza o mês"><br>

      <label for="year">Ano:</label><br>
      <input type="number" min="1900" max="2099" step="1" v-model="data.year" id="year" name="year" placeholder="Introduza o ano"><br>
      
      <label for="authors">Autores:</label><br>
      <textarea name="authors" v-model="data.authors" id="authors" form="add-publication" placeholder="Introduza os autores da publicação"></textarea><br>
      
      <label for="context">Contexto:</label><br>
      <input type="text" v-model="data.context" id="context" name="context" placeholder="Introduza o contexto da publicação:"><br>

      <label for="url">URL:</label><br>
      <input type="text" v-model="data.url" id="url" name="url" placeholder="Introduza o url da publicação:"><br>

      <input type="submit" value="Adicionar Publicação">
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: "AddPublication",
  setup() {
    const data = reactive({
      title: '',
      month: '',
      year: '',
      email: '',
      authors: '',
      context: '',
      url: ''
    });

    const router = useRouter();

    const store = useStore();

    const email = computed(() => store.state.userEmail);

    const admin = computed(() => store.state.isAdmin);

    const submitPublication = async () => {
      if(email.value != data.email && !admin.value) {
        alert("Esta conta não tem permissão para adicionar projectos para " + data.email);
        console.log("Esta conta não tem permissão para adicionar projectos para " + data.email);
      }
      
      else {
        const add = await fetch('https://localhost:8000/api/article/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });

        const jsonAdd = await add.json();

        alert(jsonAdd.message);
        console.log(jsonAdd.message);
        await router.push('/publications');
    

        console.log(jsonAdd.message);
        await router.push('/publications');
      } 
    }

    return {
            data,
            submitPublication
        }
  }
}
</script>
<style scoped>
.big {
    height: 80vh;
    margin-bottom: 25vh;
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