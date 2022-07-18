<template>
    <div class="big">
        <form id="edit-person" @submit.prevent="submitPerson">
            <label for="name">Nome:</label><br>
            <input type="text" v-model="data.name" id="name" name="name" placeholder="Introduza o nome"><br>

            <label for="role">Papel:</label><br>
            <input type="text" v-model="data.role" id="role" name="role" placeholder="Introduza o papel"><br>
            
            <label for="bio">Biografia:</label><br>
            <textarea name="bio" v-model="data.bio" id="bio" form="add-person" placeholder="Introduza uma pequena biografia"></textarea> 

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
    setup() {
        const router = useRouter()

        const store = useStore();
 
        const target = computed(() => store.state.targetId);

        const data = ({
            IDU: target.value,
            name: null,
            bio: null,
            role: null
        });

        const submitPerson = async () => {
            const edit = await fetch('https://localhost:8000/api/researcher/edit',  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const jsonedit = await edit.json();

            alert(jsonedit.message);
            console.log(jsonedit.message);
            await router.push('/team');
        }

        return {
            data,
            target, 
            submitPerson
        }
        
    },
    async mounted() {
        this.$person = await (await fetch(`https://localhost:8000/api/researcher/info/id/${this.target}`)).json();

        document.getElementById("name").value = this.$person.name;
        document.getElementById("role").value = this.$person.role;
        document.getElementById("bio").value = this.$person.bio;

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

