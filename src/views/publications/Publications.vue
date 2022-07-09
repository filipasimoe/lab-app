<template>
    <div class=".big">
        <div class="articles">
            <div class="article" v-for="article in articles">
                <div class="container">
                    <p class="title">
                        {{ article.title }}
                    </p>
                    <p>
                        {{ getMonthName(article.month ) + " " + article.year}}
                    </p>
                    <p class="italic">
                        {{ article.authors }}
                    </p>
                    <p>
                        {{ article.context }}
                    </p>
                    <p><button class="button"><a target="_blank" :href="`${article.url}`">Aceder ao Artigo</a></button></p>
                </div>
            </div>
        </div>
        <div class="add-btn">
            <!-- Só deve poder adicionar artigos para o email que tem sessão iniciada -->
            <button class="add"><router-link class="add-link" :to="{name: 'AddPublication'}">Adicionar Publicação</router-link></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Articles",
    data() {
        return {
            articles: ''
        }
    },
    async beforeCreate() {
        const data = await (await fetch(`http://localhost:8000/api/article/all`)).json();
        this.articles = data;
    },
    methods: {
        getMonthName(month){
            const d = new Date();
            d.setMonth(month-1);
            const monthName = d.toLocaleString("default", {month: "long"});

            const monthCaps = monthName.charAt(0).toUpperCase() + monthName.slice(1);

            return monthCaps;
        }
    }
};
</script>

<style scoped>
.big {
    margin: 0 auto;
}
.articles {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .articles {
    flex-direction: column;
  }
}

.article {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 35px;
  line-height: 2em;
  height: min-content;
  border-radius: 0.375rem;
}

.container {
  padding: 10px 16px 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.container button {
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
    width: fit-content;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 10vh;
    margin-top: 10vh;
}

.container p {
    width: 80%;
    margin: 0 auto;
    line-height: 1.5em;
    margin-bottom: 15px;
}

.container button:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.container button:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

.underline {
    text-decoration: underline;
}

.title {
    font-weight: bold;
    font-size: 1.8em;
    margin-top: 10vh !important;
}

a {
    text-decoration: none;
    color: black;
    font-weight: 500;
}

.add {
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
    width: fit-content;
}

.add:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.add:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

.add-link, .add-link:hover {
    font-weight: 500;
    color: white;
    list-style: none;
    text-decoration: none;
}   

.add-btn {
    margin: 5vh auto;
    display: flex;
    justify-content: center;
}

.italic {
    font-style: italic;
}

a {
    text-decoration: none;
    color: white;
}

a:hover {
    text-decoration: none;
    color: white;
}
</style>