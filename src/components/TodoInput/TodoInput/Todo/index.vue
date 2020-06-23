<script>
export default {
  data(){
    return{
      todo:''
    }
  },
  methods:{
    submitHandler(){
      if(!this.todo) return
      this.$store.commit('ADD_TODO',{
        content: this.todo,
        complete: false
      })
      this.todo = ''
    }
  }
}
</script>

<template src="./template.html">
  
</template>