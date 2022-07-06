<template>
   wdawwadawdwdwdwdw
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: "EditPerson",
    data() {
        return {
            person: ''
        }
    },
    async beforeCreate() {
        const store = useStore();
 
        const id = computed(() => store.state.userId);

        const response = (await fetch(`http://localhost:8000/api/researcher/info/id/${id}`)).json();

        console.log(id)
        console.log(response)

        return {
            id
        }
    }
};
</script>

