<template>
  <div class="notes-page">
    <v-popup v-if="popupData.isOpen"
        :popup="popupData"
        @closePopup='popupData.isOpen = false'
        @submitPupup='popupData.action(popupData.args)'
    ></v-popup>
    <KeepAlive>
    <div class="card">
      <div class="card__header">
        <h1>{{pageTitle}}</h1>
      </div>
      <div class="card__tools"  @click="addToNotes()">
        <a class="card__text text-center">добавить заметку</a>
      </div>
      <vNotesItem
        v-for="(note) in NOTES"
        :key='note.id'
        :note_data="note"
        @removeNote="onRemoveNote"
        @openNote='openNote'
      ></vNotesItem>  
    </div>
    </KeepAlive>
  </div>
</template>

<script>
import vNotesItem from './v-notes-item.vue'
import vPopup from './v-popup.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'notes-page',
    components:{
      vNotesItem,
      vPopup,
    },
    props:{},
    data(){
      return {
        pageTitle: 'Менеджер заметок',
        popupData: {}
      }
    },
    computed:{
      ...mapGetters([
        'NOTES'
      ]),
    },
    methods:{
      ...mapActions([
        'GET_NOTES_FROM_LOCALSTORAGE',
        'ADD_NOTE_TO_NOTES',
        'REMOVE_NOTE_FROM_NOTES'
      ]),
      addToNotes(data){
        this.ADD_NOTE_TO_NOTES(data)
        this.$router.push({name: 'note', query: { 'id': this.NOTES.length-1}})
      },
      openNote(note){
        let noteIndex;
        this.NOTES.filter((el, index) => {
          if(el.id == note.id){
            noteIndex = index;
            return true
          }
        })
        this.$router.push({name: 'note', query: { 'id': noteIndex}})
      },
      removeNote(note){
        this.REMOVE_NOTE_FROM_NOTES(note.id)
      },
      onRemoveNote(note){
        this.openPopup('Предупреждение', 'Удалить заметку?', this.removeNote, note)
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
    },
    mounted(){
      this.GET_NOTES_FROM_LOCALSTORAGE()
    }
}
</script>

<style>
.text-center{
  justify-content: center;
}
</style>