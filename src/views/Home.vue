<template>
    <div class="container">
        <p v-if="admin" id="admin">Sessão iniciada como administrador</p>
         <!-- Slideshow container -->
        <div class="slideshow-container">

            <!-- Full-width images with number and caption text -->
            <div class="mySlides fade">
                <img src="../assets/lab1.jpg" style="width:100%">
                <div class="text">
                    <h4>
                        InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness
                    </h4>
                    <p>
                        IEEE International Conference on Advanced Video and Signal based Surveillance (AVSS)
                    </p>
                    </div>
            </div>

            <div class="mySlides fade">
                <img src="../assets/lab2.jpg" style="width:100%">
                <div class="text">
                    <h4>
                        Generative Adversarial Graph Convolutional Networks for Human Action Synthesis
                    </h4>
                    <p>
                        EEE/CVF Winter Conference on Applications of Computer Vision (WACV)
                    </p>
                </div>
            </div>

            <!-- Next and previous buttons -->
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
            </div>
            <br>

            <!-- The dots/circles -->
            <div style="text-align:center">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
            </div> 
            
            <div class="card">
                <h2>
                    Quem Somos?
                </h2>
                <p>
                    Mollit pariatur ex ipsum duis. Sunt ullamco nulla amet quis exercitation cillum commodo sunt nulla nisi. Magna id non velit sunt fugiat. Eu enim aute reprehenderit elit pariatur. 
                </p>
                <p>
                    Mollit dolore minim amet in. Nulla minim ipsum proident adipisicing commodo elit reprehenderit magna id excepteur reprehenderit adipisicing. Sunt eu sunt aliquip consectetur incididunt proident duis commodo duis velit reprehenderit dolore. Culpa id eu magna aliquip cupidatat esse qui amet elit eiusmod laborum fugiat.
                </p>
                <p>
                    Officia ipsum reprehenderit occaecat et laborum dolor sunt culpa ut. Pariatur ad esse occaecat cupidatat pariatur dolor eiusmod minim aliqua proident nisi cillum est fugiat. Non ad cillum pariatur ea officia do aute fugiat. Cupidatat esse adipisicing nostrud ea nostrud officia incididunt mollit velit. Dolore ipsum in esse cillum.
                </p>
                <button class="team"><router-link class="team-link" :to="{name: 'Team'}">Venha conhecer a nossa equipa!</router-link></button>
            </div>

            <div class="btns">
                <button class="add"><router-link class="add-link" :to="{name: 'Projects'}">Ver Projectos</router-link></button>
                <button class="add"><router-link class="add-link" :to="{name: 'Publications'}">Ver Publicações</router-link></button>
            </div>
        </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

export default {
    name: "Home",
    setup() {
        const message = ref("Sem sessão iniciada");
        const store = useStore();
        
        let slideIndex = 0;

        function showSlides() {
        
            let i;

            let slides = document.getElementsByClassName("mySlides");
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slideIndex++;

            if (slideIndex > slides.length) {slideIndex = 1}

            slides[slideIndex-1].style.display = "block";

            setTimeout(showSlides, 2000); // Change image every 2 seconds
        } 

        onMounted(async () => {

            try {
                let response = await fetch("https://localhost:8000/api/user/user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const content = await response.json();

                if(content.IDU > 0) {
                    await store.dispatch("setAuth", true);
                    await store.dispatch("setId", content.IDU);
                    await store.dispatch("setEmail", content.email);
                    
                    console.log("Autenticado com sucesso");
                   
                   if(content.isAdmin == 1) 
                        await store.dispatch("setAdmin", true);

                }               
                else {
                    await store.dispatch("setAdmin", false);
                    await store.dispatch("setId", 0);

                    console.log("401 - Não autorizado");
                }
            }
            catch (e) {
                await store.dispatch("setAuth", false);
            }

            showSlides();

        });
       
        const admin = computed(() => store.state.isAdmin);

        return {
            message,
            admin,
            showSlides,
            slideIndex
        };
    }
};
</script>

<style scoped>
.container {
    width: 100vw !important;
}

.card {
    background-color: rgba(255, 255, 255, 0.89);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: min-content;
    border-radius: 0.375rem;
    width: 70%;
    margin: 10vh auto 15vh auto;
    padding: 50px;
}

.btns {
    width: 350px;
    margin: 0 auto 10vh auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media screen and (max-width: 700px) {
    .btns {
        flex-direction: column;
    }
}


.add {
    width: 150px;
}

a { 
    text-decoration: none;
    color: white;
}

a:hover { 
    text-decoration: none;
    color: white;
}

#admin {
    width: 70vw;
    margin: 0 auto;
    color: white;
    background-color: #580000;
    border: 2px solid #580000;
    padding: 5px;
    border-radius: 5px;
    opacity: 0.5;
    text-align: center;
}


/* Slideshow container */
.slideshow-container {
  max-width: 100vw;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 16px 12px;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #580000;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #580000;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #58000099;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

</style>