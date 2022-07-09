<template>
    <div class="big">
        {{ this.target }}
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
            const edit = await fetch('http://localhost:8000/api/researcher/edit',  {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(data)
                });

                const jsonedit = await edit.json();

                if(edit.status == 200) {
                    alert(jsonedit.message);
                    console.log("1")
                    console.log(jsonedit.message);
                    await router.push('/team');
                }

                if(edit.status == 400 || edit.status == 401 || edit.status == 404) {
                    console.log(jsonedit.message);
                    console.log("2")
                    await router.push('/team');
                }
        }

        return {
            data,
            target, 
            submitPerson
        }
        
    },
    async mounted() {
        this.$person = await (await fetch(`http://localhost:8000/api/researcher/info/id/${this.target}`)).json();

        document.getElementById("name").value = this.$person.name;
        document.getElementById("role").value = this.$person.role;
        document.getElementById("bio").value = this.$person.bio;

    }
}

/*
export default {
    name: "EditPerson",
    data() {
        const store = useStore();
 
        const target = computed(() => store.state.targetId);

        return {
            person: '',
            target
        }
    },
    async created() {
        console.log(this.target)
        this.person = await (await fetch(`http://localhost:8000/api/researcher/info/id/${this.target}`)).json();
    },
    methods: {
        submitPerson() {
            const newData: {
                this.data.name,

            };
            console.log(this.data.name);
        }
    }
};*/
</script>

