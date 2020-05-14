<template>
  <div>
    <h2>Hello World/SSR</h2>
    <button @click="showMsg">showMsg</button>
  </div>
</template>
<script>
export default {
  methods: {
    showMsg(){
      alert("showmsg");
    }
  },
}
</script>