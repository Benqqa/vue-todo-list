<template>
  <div class="v-todos-item">
    <div class="todo">
        <div class="todo__text">
            <input type="checkbox" v-model="todo.isDone">
            <span v-if="!isEdit">{{todo.text}}</span>
        </div>
        <div class="input" v-if="isEdit">
                <input type="text" v-model="todo.text" placeholder="todo text">
            </div>
        <div class="todo__tools">
            <div 
                class="ico"
                @click="editTodo()"
                v-if="isEdit">
                    <img src="@/assets/check.png" alt="delete">
            </div>
             <div 
                class="ico"
                @click="editTodo()"
                v-else>
                    <img src="@/assets/pensil.png" alt="delete">
            </div>
            <div 
                class="ico"
                @click="removeTodo()">
                    <img src="@/assets/dell.png" alt="delete">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'v-todos-item',
    props: {
        todo_data: {
            type: Object,
            default(){
                return {
                    text: 'нет текста',
                    isDone: false,
                }
            }
        },
    },
    data(){
        return {
            todo: {},
            isEdit: false
        }
    },
    mounted(){
        this.todo =  this.todo_data
    },
    methods:{
        removeTodo(){
            this.$emit('removeTodo', this.todo.id)
        },
        editTodo(){
            this.isEdit = !this.isEdit;
            this.$emit('editTodo')
        }
    }
}
</script>

<style>
.todo{
  margin: 10px;
  padding: 10px; 
  background: #e8e8e8;
  color: #11172a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo__text{
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  word-break: break-all;
}
.todo__tools{
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
}
</style>