<template>
    <div class="big">
        <form id="add-person" @submit.prevent="submitPerson">
            <label for="name">Nome:</label><br>
            <input type="text" v-model="data.name" id="name" name="name" placeholder="Introduza o nome"><br>
            <label for="email">Email:</label><br>
            <input type="email" v-model="data.email" id="email" name="email" placeholder="Introduza o email"><br>
            <label for="role">Papel:</label><br>
            <input type="text" v-model="data.role" id="role" name="role" placeholder="Introduza o papel"><br>
            <label for="bio">Biografia:</label><br>
            <textarea name="bio" v-model="data.bio" id="bio" form="add-person" placeholder="Introduza uma pequena biografia"></textarea> 
            <div class="btn-wrap">
                <label for="photo">Fotografia de Perfil</label><br>
                <!--<button @click="pick()">Escolher fotografia</button>-->
                <input type="file" @change="onFileSelected($event)" accept="image/*" id="photo" name="photo"><br>
            </div>
            <input type="submit" value="Adicionar Investigador">
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "AddPerson",
    setup() {
        const data = reactive({
            name: '',
            email: '',
            bio: '',
            photo: '',
            role: ''
        });

        const router = useRouter()

        const onFileSelected = (event) => {
           data.photo = event.target.files[0].name
            // Tem de ir buscar à memória 
        }

        const submitPerson = async () => {
            // Tenho de verificar primeiro se o email já existe

            const response = (await fetch(`http://localhost:8000/api/researcher/info/${data.email}`));

            const jsonResponse = await response.json();

            if(response.status == 200) {
                const add = await fetch('http://localhost:8000/api/researcher/add',  {
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
                    await router.push('/team');
                }

                if(add.status == 400 || add.status == 401 || add.status == 404) {
                    console.log(jsonAdd.message);
                    await router.push('/team');
                }
            }

            else{
                console.log(jsonResponse.message);
                alert(jsonResponse.message);
            }

        }   
        return {
            data,
            selectedFile: null,
            onFileSelected,
            submitPerson
        }
    }  
};
</script>

<style scoped>
.big {
    height: 80vh;
}
form {
    width: fit-content;
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