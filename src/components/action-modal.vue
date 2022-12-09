<template>
    <div
        :class="{'modal': true } "
        :style="`background-color: ${backgroundColor}`"
        v-if="$store.state.actionModal.open"
    >
    {{action}}!
    </div>


</template>

<script>

export default {
    props: {
        action: {
            type: String
        },
        backgroundColor: {
            type: String
        },

    }
}

</script>

<style scoped>

.modal {
    position: fixed;
    font-weight: bold;
    color: white;
    padding: 15px;
    z-index: 100000000000000;
    bottom: 25px;
    left: 50%;
    /* width: ; */
    text-align: center;
    border-radius: 10px;
    text-transform: capitalize;
    user-select: none;
}

</style>