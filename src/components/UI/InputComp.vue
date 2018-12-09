<template>
    <fieldset class="input-comp">

        <label
        class="input-comp__label"
        :for="id"
        >{{label}}
        </label>

        <input
        class="input-comp__input"
        :id="id"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        >

    </fieldset>
</template>

<script>
export default {
    props: ['id', 'label', 'type', 'value',]
}
</script>

<style lang="less">
    .input-comp{
        border: none;
        display: flex;

        &__label{
            margin: 0 0 5px 10px;
        }

        &__input{
            width: 100%;
            box-sizing: border-box;
            padding: 5px 10px;
        }

        &__select{
            padding: 5px;
            background-color: transparent;
            border: none;
        }
    }
</style>
