<template>
  <div class="v-notes-item">
    <div class="note">
        <div class="note__title">
            {{itemData.title}}
        </div>
        <div class="note__body">
            <div 
                class="note__todo"
                v-for="(todo, index) in itemData.todos"
                :key="todo.id">
                <div 
                    class="note__text"
                    v-if="index<3"
                    :class="{'green': todo.isDone}">
                    {{todo.text}}<span v-if="index!=itemData.todos.length-1">,</span>
                </div>
            </div>
            <span class="note__text" v-if="itemData.todos.length>3">и т.д...</span>
        </div>
        <div class="note__bottom">
            <div class="ico" @click="openNote(itemData)"><img src="@/assets/pensil.png"  alt="edit"></div>
            <div class="ico" @click="removeNote(itemData)"><img src="@/assets/dell.png" alt="delete"></div>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
    name: 'v-notes-item', 
    components:{

    },
    props:{
        note_data:{
            type: Object,
            default(){
                return {}
            }
        },
        id:{
            type: Number,
            default(){
                return undefined
            }
        }
    },
    data(){
        return {
            itemData: this.note_data
        }
    },
    methods:{
        removeNote(note){
            this.$emit('removeNote', note)
        },
        openNote(note){
            this.$emit('openNote', note)
        }
    }
}
</script>

<style>
.green{
    color: green;
}
</style>