<template>
  <div>
    <h2>Hello World/SSR</h2>
    <h4>{{msg}}</h4>
    <button @click="showMsg">showMsg</button>
    <h3>{{msg}}</h3>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    msg(){
      return this.$store.state.msg
    }
  },
  methods: {
    showMsg(){
      alert(this.msg);
    }
  },
  async asyncData({ route, store}) {
    await store.commit("setMsg","hello Soter MSG");
  },
}
</script>