<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "Login",
    setup() {
        const data = reactive({
            email: '',
            password: ''
        });

        const router = useRouter()

        const submit = async () => {
            let result = await fetch('http://localhost:8000/api/user/login',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if(result.status == 200) {
                alert("Login feito com sucesso!");
                await router.push('/');
            }
            else if(result.status == 401) {
                alert("401 - Não autorizado!");
            }
            else if(result.status == 404) {
                alert("404 - Utilizador não encontrado!");
            }
        }

        return {
            data, 
            submit
        }
    }
};
</script>

<template>
  <div class="container">
    <h1 class="h3 mb-3 fw-normal">Iniciar Sessão</h1>
    <form @submit.prevent="submit()">
      <input v-model="data.email" type="email" class="" placeholder="name@example.com">
      <input v-model="data.password" type="password" class="" placeholder="Password">

      <button class="" type="submit">Iniciar Sessão</button>
    </form>
  </div>
</template>

<style scoped>
.container {
    width: 40vw;
}

form {
    display: flex;
    flex-direction: column;
}

input, label {
    margin-bottom: 15px;
    border-radius: 10px;
}

form input[type=email] {
    padding: 12px 20px;
    border: none;
    border-bottom: 2px solid #580000;
}

form input[type=password] {
    padding: 12px 20px;
    border: none;
    border-bottom: 2px solid #580000;
}

input[type=checkbox] {
    margin-right: 15px;
}

button {
  align-self: center;
  background-color: #580000;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
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
  margin-top: 5vh;
}

button:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

button:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

h1 {
  padding-bottom: 6px;
}
</style>
