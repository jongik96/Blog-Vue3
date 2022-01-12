<template>
  <nav class="grid grid-cols-6">
      <div class="grid col-start-2 col-span-4 bg-green-200 rounded-md">
          <a href="/" class="col-start-1 col-span-1 text-xl font-bold">JongIk's Blog</a>
          <ul class="flex col-start-2 col-span-3 mt-2">
                <li class="" v-for="(menuItem, id) in menus" :key="id">
                    <button class="text-gray-500 hover:bg-green-500 hover:font-bold rounded-md mr-3 text-gray-500" @click="onMovePage($event, menuItem)">
                        {{ menuItem.value }}
                    </button>
                </li>
          </ul>
      </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    name: 'navBar',
    data(){
        return{
            menus: [
                        {
                            key: 'Home', value: 'Home', URL: '#'
                        },
                        {
                            key: 'App', value: 'App', URL: '#'
                        },
                        {
                            key: 'Profile', value: 'Profile', URL: '#'
                        },
                    ]
        }
    }
    ,
    setup(){
        const menu = ref('home');
        const onMovePage = (evt, menuItem) =>{
            if(evt){
                evt.preventDefault();
            }
            menuItem.value = menuItem.key
        }

        return {
            menu,
            onMovePage
        }
    },

}
</script>

<style>

</style>