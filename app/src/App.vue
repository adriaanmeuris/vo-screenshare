<template>
  <div id="app">
    <div>
      <button @click="shareScreen">Share screen</button>
      <br/><br/>
    </div>

    <div>
      <textarea ref="messages"></textarea>
    </div>

    <div>
      <video id="video" ref="videoElement" autoplay></video>
    </div>

  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  import * as adapter from 'webrtc-adapter';

  import quickconnect from 'rtc-quickconnect';
  //import rtc from 'rtc';

  export default {
    name: 'app',
    components: {
      //HelloWorld
    },
    mounted () {
      // let rtcInstance = rtc({
      //   room: 'contactcenter',
      //   signaller: 'https://da12ab52.ngrok.io/',
      //   //capture: false
      // });
      //
      // rtcInstance.on('ready', function(session) {
      //   console.log('ready!', session);
      // });

      quickconnect('https://da12ab52.ngrok.io', { room: 'qc-simple-demo' })
        .on('call:started', function(id, pc, data) {
          console.log('we have a new connection to: ' + id);
        });

      // let conference;
      //
      // // extend our configuration with the defaults
      // config = defaults({}, config, require('./defaultconfig.js'));
      //
      // // remap our options based on top level settings
      // config.options = extend({
      //   room: config.room,
      //   ice: config.ice,
      //   plugins: config.plugins,
      //   expectedLocalStreams: config.constraints ? 1 : 0
      // }, config.options);
      //
      // // create our conference instance
      // conference = quickconnect(config.signaller, config.options);
      //
      // conference
      //   .on('call:ended', removeRemoteVideos)
      //   .on('stream:added', remoteVideo(conference, config));
      //
      // Object.keys(config.channels || {}).forEach(function(name) {
      //   var channelConfig = config.channels[name];
      //
      //   conference.createDataChannel(name, channelConfig === true ? null : channelConfig);
      // });
      //
      // // if we have constraints, then capture video
      // if (config.constraints) {
      //   localVideo(conference, config);
      // }
      //
      // return conference;

    },
    methods: {
      // rtcReady() {
      //   console.log('rtcReady');
      // },

      // Method triggered when clicked on share button
      shareScreen () {
        // Do feature detection
        if (!this.featureDetect()) {
          console.error('Screen capture not supported in this browser.');
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
      },

      // Helper method to detect screen share functionality
      featureDetect () {
        // Check for Firefox support
        if (!!navigator.mediaDevices.getSupportedConstraints().mediaSource) {
          return true;
        }

        // // @todo Try the native screen capture api (https://w3c.github.io/mediacapture-screen-share/)
        // const getDisplayMedia = (navigator.getDisplayMedia ||
        //   navigator.webkitGetDisplayMedia ||
        //   navigator.mozGetDisplayMedia ||
        //   navigator.msGetDisplayMedia);
        //
        // if (getDisplayMedia) {}

        // return false by default
        return false;
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
