<template >
    <button
    class="button-comp"
    :disabled="disabled"
    @click.prevent="$emit('click')"
    ><slot />
    </button>
</template>

<script>
export default {
    props:['disabled', 'click']
}
</script>

<style lang="less">
    .button-comp{
        width: 95%;
        padding: 10px 20px;
        margin: 10px auto 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        color: #fff;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
        background: #2884f6;
        cursor: pointer;

        &:disabled{
            opacity: 0.5;
        }
    }
</style>
