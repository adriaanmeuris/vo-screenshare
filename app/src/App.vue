<template>
  <div id="app">
    <div>
      <button @click="shareScreen">Share screen</button>
      <br/><br/>
    </div>

    <!--<div>-->
    <!--<video id="video" ref="videoElement" autoplay></video>-->
    <!--</div>-->

    <h1>Chat</h1>
    <div>
      <h2>Messages</h2>
      <div class="messages-wrapper">
        <div v-for="m in messages" v-html="m"></div>
      </div>
    </div>

    <div>
      <h2>Send message</h2>
      <textarea v-model="message" @keyup.enter="sendMessage"></textarea>
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
    data () {
      return {
        qc: null,
        dataChannel: null,
        messages: [],
        message: ''
      }
    },
    created () {
      // Setup the RTC connection
      this.setupRtc();
    },
    methods: {
      setupRtc () {
        let self = this;
        this.qc = quickconnect('https://342e112f.ngrok.io', {room: 'qc-simple-demo'})
          .createDataChannel('test') // tell quickconnect we want a datachannel called test
          .on('channel:opened:test', function (id, dc) {
            console.log('Data channel opened');
            self.dataChannel = dc;

            dc.onmessage = function (evt) {
              // Add message to messages
              self.messages.push('<strong style="color:red;">user</strong>' + ': ' + evt.data);
            };

            dc.send(' joined channel.');
          });
      },

      // Method to send the messages
      sendMessage () {
        // @todo empty the message
        if (this.dataChannel) {
          this.dataChannel.send(this.message);
          this.messages.push('<strong>you </strong>:' + this.message);
          this.message = '';
        } else {
          console.warn('Datachannel not opened yet');
        }
      },

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

            if(this.qc) {
              console.log('add to qc');
              this.qc.addStream(stream)
                .on('stream:added', function(id, pc, data) {
                  console.log('stream added!');
                  // attach(pc.getRemoteStreams()[0], { plugins: plugins }, function(err, el) {
                  //   if (err) return;
                  //
                  //   el.dataset.peer = id;
                  //   remote.appendChild(el);
                  // });
                })
            }
            //this.$refs.videoElement.srcObject = stream
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
