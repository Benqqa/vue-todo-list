<template>
<div class="popup__wrapper" ref='popup__wrapper'>
  <div class="v-popup">
      <div class="popup__header">
          <h2>{{popup.title}}</h2>
      </div>
      <div class="popup__body">
        <div class="popup__text">
          {{popup.text}}
        </div>
        <div class="popup__actions">
          <div class="popup__btn" @click='submitPupup()'>OK</div>
          <div class="popup__btn" @click='closePopup()'>Отменить</div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    name:'v-popup',
    props:{
      popup:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{}
    },
    methods:{
      closePopup(){
        this.$emit('closePopup')
      },
      submitPupup(){
        this.$emit('submitPupup')
        this.$emit('closePopup')
      }
    },
    mounted(){
      let vm = this;
      document.addEventListener('click', function(item){
        if(item.target === vm.$refs['popup__wrapper']){
          console.log(123);
          vm.closePopup()
        }
      })
    }
}
</script>

<style>
.popup__wrapper{
  background: rgba(255, 255, 255, 0.411);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-popup{
  background: #3f4d8a;
  position: fixed;
  top: 30%;
  width: 400px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
}
.popup__header{
  background: #fcb939;
  display: flex;
  
  align-items: center;
  justify-content: center;
}
.popup__body{
  padding: 15px;
}
.popup__actions{
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.popup__btn{
  cursor: pointer;
}
.popup__text{
  margin-bottom: 20px;
}
</style>