<template>
  <div class="note-page">
    <v-popup v-if="popupData.isOpen"
        :popup="popupData"
        @closePopup='popupData.isOpen = false'
        @submitPupup='popupData.action(popupData.args)'
    ></v-popup>
    <div class="card">
        <div class="card__header">
            <h1>Редактирование заметки</h1>
            <!--<div class="undo" @click='undo()'>undo</div>
            <div class="redo" @click='redo()'>redo</div>   -->
        </div>
        <div class="card__label">
            <div class="card__text">
                Имя заметки:
            </div>
            <div class="input ">
                <input type="text" v-model="noteData.title" placeholder="note text">
            </div>
            <div class="ico"
                @click="openPopup('Предупреждение', 'Удалить заметку?', removeNote)">
                    <img src="@/assets/dell.png" alt="">
            </div>
        </div>
        <div class="card__label">
            <div class="card__text">
                Добавить todo:
            </div>
            <div class="input">
                <input type="text" v-model="todoText" placeholder="todo text">
            </div>
            <div class="ico"
                @click="addTodo(todoText)">
                    <img src="@/assets/check.png" alt="">
            </div>
        </div>
     <v-todos-item
        v-for="(todo) in noteData.todos"
        :key="todo.id"
        :todo_data='todo'
        @removeTodo='onRemoveTodo'
        @editTodo='editTodo'
     ></v-todos-item>
    
    <div class="note-page__btns">
        <div class="note-page__btn" @click="saveChanges()">
            Сохранить
        </div>
        <div class="note-page__btn"
            @click="openPopup('Предупреждение', 'Отменить изменения?', cancelChanges)">
            Отменить
        </div>
    </div>
    </div>   
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import vTodosItem from './v-todos-item.vue'
import vPopup from './v-popup.vue'

export default {
    name:'note-page',
    components:{
        vTodosItem,
        vPopup,
    },
    props:{
    },
    data(){
        return {
            noteData: {},
            saveData: {},
            isSave: false,
            todoText: 'Новое дело',
            indexHistory: 0,
            popupData: {isOpen: false}
        }
    },
    computed:{
        ...mapGetters([
        'NOTES',
        'HISTORY'
      ]),
      note(){
        return this.NOTES[this.$route.query.id]
      }
    },
    methods:{
        ...mapActions([
            'CHANGE_NOTE',
            'REMOVE_NOTE_FROM_NOTES',
            'GET_NOTES_FROM_LOCALSTORAGE',
            'SET_NOTE_TO_HISTORY'
        ]),
        saveChanges(){
            this.CHANGE_NOTE(this.noteData)
            this.isSave = true;
            this.$router.push({name: 'home'})
        },
        cancelChanges(){
            this.$router.push({name: 'home'})
        },
        addTodo(txt){
            
            let new_id;
            if(this.noteData.todos.length == 0)
                new_id=0;
            else    new_id =this.noteData.todos.slice(-1)[0].id+1

            if(this.todoText != ''){
                this.noteData.todos.push({
                    text: txt,
                    isDone: false,
                    id: new_id
                })
            }
            this.todoText='';
        },
        removeNote(){
            this.REMOVE_NOTE_FROM_NOTES(this.noteData.id)
            this.$router.push({name: 'home'})
        },
        removeTodo(tid){
           this.noteData.todos = this.noteData.todos.filter(el=> el.id != tid)
           this.SET_NOTE_TO_HISTORY(this.noteData)
        },
        onRemoveTodo(tid){
            this.openPopup('Предупреждение', 'Удалить todo?', this.removeTodo, tid)
        },
        editTodo(){
            this.SET_NOTE_TO_HISTORY(this.noteData)
        },
        openPopup(title, text, action, args){
            this.popupData={
                title,
                text,
                action,
                args,
                isOpen: true
            }
        },
        /*undo(){
            this.indexHistory--;
            this.noteData = this.HISTORY[this.indexHistory]
        }*/
    },
    mounted(){
        this.GET_NOTES_FROM_LOCALSTORAGE()
        this.noteData = Object.assign({}, this.note);
    },
}
</script>

<style>

</style>