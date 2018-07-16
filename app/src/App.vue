<template>
  <div id="app">
    <div>
      <button @click="shareScreen">Share screen</button>
      <br/><br/>
    </div>

    <div>
      <video id="video" ref="videoElement" autoplay></video>
    </div>

  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  import * as adapter from 'webrtc-adapter';

  export default {
    name: 'app',
    components: {
      //HelloWorld
    },
    mounted() {
      window.adapter = adapter;
      console.log('adapter', adapter);
    },
    methods: {
      // Method triggered when clicked on share button
      shareScreen () {
        this.featureDetect();
      },

      // Helper method to detect screen share functionality
      featureDetect () {
        // Check for Firefox support
         const screenShareSupported = !!navigator.mediaDevices.getSupportedConstraints().mediaSource;
         if(!screenShareSupported) {
           console.error('Screen sharing not supported yet.');
           return;
         }

        let constraints = {video: {mediaSource: 'screen'}};
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            console.log('this.$refs.videoElement', this.$refs.videoElement);
            console.log('streaming', stream);
            this.$refs.videoElement.srcObject = stream
          })
          .catch(e => console.log(e.message));

        // return;
        //
        // // @todo Try the native screen capture api (https://w3c.github.io/mediacapture-screen-share/)
        // const getDisplayMedia = (navigator.getDisplayMedia ||
        //   navigator.webkitGetDisplayMedia ||
        //   navigator.mozGetDisplayMedia ||
        //   navigator.msGetDisplayMedia);
        //
        // if (getDisplayMedia) {
        //   console.log('found', getDisplayMedia);
        //
        //   return getDisplayMedia({video: true}).then(stream => {
        //     // we have a stream, attach it to a feedback video element
        //     this.$refs.videoElement.srcObject = stream;
        //   }, error => {
        //     console.log('Unable to acquire screen capture', error);
        //   });
        // }
        //
        // console.log('getDisplayMedia not supported');
      }
    }
  }
</script>

<style>
  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  #video {
    border: 1px solid #ccc;
    height: 80vh;
    width: auto;
  }
</style>
