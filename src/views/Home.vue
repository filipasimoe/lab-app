<template>
    <div>
        {{ message }}
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Home",
    setup() {
        const message = ref('Sem sessão iniciada');

        const store = useStore();

        onMounted( async () => {
            try {
                let response = await fetch('http://localhost:8000/api/user/user',  {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                const content = await response.json();

                message.value = `Hi ${content.email}`;

                await store.dispatch('setAuth', true);

                if(response.status == 401) {
                    alert("401 - Não autorizado");
                }
            }
            catch(e) {
                await store.dispatch('setAuth', false);
            }
        });

        return {
            message
        }
    }
};
</script>

