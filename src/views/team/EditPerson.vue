<template>
    <form>
        <input type="text" id="name" placeholder="fdfds">
    </form>
   {{ this.person.name }}
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: "EditPerson",
    data() {
        const store = useStore();
 
        const id = computed(() => store.state.userId);

        return {
            person: '',
            id
        }
    },
    async created() {
        this.person = await (await fetch(`http://localhost:8000/api/researcher/info/id/${this.id}`)).json();

        document.getElementById("name").value = this.person.name
    }
};
</script>

