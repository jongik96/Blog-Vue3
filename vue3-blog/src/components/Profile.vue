<template>
    <div>
        <div>
            <p>{{user_data.name}}</p>
        </div>
        <div>
            <p>{{ user_data.email}}</p>
        </div>
        <div>
        <Card></Card>
        <div>
            <div>
                <div></div>
                <div></div>
            </div>
                <h1>
                    <span></span>
                </h1>
                <div>
                    <div>
                    </div>
                    <div></div>
                </div>
            </div>
            <Card></Card>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import useAxios from '/@app_modules/axios.js'

const Card = defineComponent({
    name: 'Card',
    props:{
        top: Boolean,
        resume: Object,
        show: Boolean,
    },
    setup(props) {},
    template: `
    <div v-if="show">
        <div>
            <div>
                <h4>{{resume.title}}</h4>
                <hr/>
                <p>{{resume.content}}</p>
                <a v-if="resume.URL !='null'" :href="resume.URL" target="_blank">Link</a>
            </div>
        </div>
    </div>
    <div v-if="!show"></div>
    `
})

export default {
    name: 'Profile',
    setup(){
        const store = useStore()
        const { axiosGet } = useAxios();
        
        const onSuccess = (data) =>{
            store.dispatch('setAboutMeData', data.data)
        }
        axiosGet('/db/about-me', onSuccess)
        const user_data = computed(()=> store.getters['about_me/user_data']))

        return {
            user_data,
        }
    },
    components: {
        Card,
    },
}
</script>
