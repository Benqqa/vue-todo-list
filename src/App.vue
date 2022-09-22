<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>-->
  <router-view/>
</template>

<style>
body{
  background: #11172a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-weight: bold;
}
.card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 800px;
  padding-bottom: 30px;
  margin: 0 auto;
  background: #20283b;
}
.card__header{
  background: #fcb939;
  display: flex;
  align-items: center;
  justify-content: center;
   word-break: break-all;
}
.card__title{
  font-size: 2em;
}
.card__text{
  display: flex;
  align-items: center;
  min-width: 150px;
  text-align: left;
}
.card__tools{
  background: #878787  ;
  margin: 10px auto;
  padding: 10px;
  width: 50%;
  border-radius: 5px;
  cursor: pointer;
}
.card__tools:hover{
  background: #878777  ;
}
.card__label{
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 20px;  
}
.btn {
  padding: 8px 16px;
  background: red;
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.btn:hover {
    background: green;
}
.checkbox{
  max-width: 100px;
}
.ico{
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  cursor: pointer;
}
.ico>img{
  width: 100%;
  height: 100%;
}
.input{
  background: #f5f9ff;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  
}
.input>input{
  width: 100%;
  border: 0;
  background: transparent;
}
/*Обнуление*/
* {
  border: 0;
}
:focus, :active {
  outline: none; }


</style>
