<template>
    <label for="input" class="upload-btn">
    {{uploadProgress}}
        <input
            id="input"
            type="file"
            @change="uploadFunction()"
            accept=".jpg, .jpeg, .png"
            style="display: none;"
            :disabled="uploading"
        >
    </label>
</template>

<script>
export default {
  methods: {
    uploadFunction() {
        this.$emit('uploadFunction')
    }
  },
  data() {
    return {
        uploading: false,
    }
  },
  computed: {
    uploadProgress() {
      const uploadProgress = this.$store.state.uploadProgress

      if (!this.uploading) {
        return 'Change Profile Pic'
      } else if (this.uploading) {
          if (isNaN(uploadProgress)) {
            return uploadProgress
          } else {
            return 'Uploading: ' + uploadProgress + '%'
          } 
      }         
    }
  }
}
</script>

<style scoped>

.upload-btn {
    margin: 10px 0;
    background: green;
    color: white;
    padding: 3px 7px;
    cursor: pointer;
    width: 135px;
    text-align: center;
  }

</style>